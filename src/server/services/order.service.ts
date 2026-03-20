import { db } from '@/server/db/client';
import { SHIPPING, TAX_RATE } from '@/constants/currency';
import { ShippingZone, ShippingSpeed } from '@/types/order';

export class ShippingService {
  static calculateShippingFee(zone: ShippingZone, speed: ShippingSpeed): number {
    if (zone === ShippingZone.DHAKA) {
      return speed === ShippingSpeed.EXPRESS
        ? SHIPPING.DHAKA.EXPRESS
        : SHIPPING.DHAKA.STANDARD;
    } else {
      return speed === ShippingSpeed.EXPRESS
        ? SHIPPING.OUTSIDE_DHAKA.EXPRESS
        : SHIPPING.OUTSIDE_DHAKA.STANDARD;
    }
  }

  static applyFreeShippingIfEligible(subtotal: number, shippingFee: number): number {
    if (subtotal >= SHIPPING.FREE_THRESHOLD && shippingFee === SHIPPING.DHAKA.STANDARD) {
      return 0;
    }
    return shippingFee;
  }

  static estimateDeliveryDays(
    zone: ShippingZone,
    speed: ShippingSpeed
  ): { min: number; max: number } {
    if (speed === ShippingSpeed.EXPRESS) {
      return { min: 1, max: 1 };
    }
    if (zone === ShippingZone.DHAKA) {
      return { min: 2, max: 3 };
    }
    return { min: 3, max: 5 };
  }

  static calculateEstimatedDelivery(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
}

export class OrderService {
  static calculateOrderTotal(subtotal: number, shippingFee: number, discountAmount: number = 0): {
    taxAmount: number;
    total: number;
  } {
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = Math.round(taxableAmount * TAX_RATE * 100) / 100;
    const total = Math.round((subtotal + shippingFee - discountAmount + taxAmount) * 100) / 100;

    return { taxAmount, total };
  }

  static async createOrder(data: {
    userId: string;
    vendorId: string;
    deliveryAddressId: string;
    items: Array<{
      productId: string;
      variantId?: string;
      quantity: number;
      unitPrice: number;
    }>;
    shippingFee: number;
    shippingZone: ShippingZone;
    shippingSpeed: ShippingSpeed;
    paymentMethod: string;
    discountAmount?: number;
    couponCode?: string;
  }) {
    const subtotal = data.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const discountAmount = data.discountAmount || 0;
    const { taxAmount, total } = this.calculateOrderTotal(subtotal, data.shippingFee, discountAmount);

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const trackingNumber = `TRK-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: data.userId,
        vendorId: data.vendorId,
        deliveryAddressId: data.deliveryAddressId,
        subtotal,
        shippingFee: data.shippingFee,
        shippingZone: data.shippingZone,
        shippingSpeed: data.shippingSpeed,
        taxAmount,
        discountAmount,
        total,
        paymentMethod: data.paymentMethod as any,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * item.quantity,
          })),
        },
        payment: {
          create: {
            amount: total,
            method: data.paymentMethod as any,
            status: 'PENDING',
          },
        },
        shipment: {
          create: {
            trackingNumber,
            status: 'PENDING',
            estimatedDeliveryAt: ShippingService.calculateEstimatedDelivery(
              ShippingService.estimateDeliveryDays(data.shippingZone, data.shippingSpeed).max
            ),
          },
        },
      },
      include: {
        items: true,
        payment: true,
        shipment: true,
      },
    });

    return order;
  }

  static async getOrderById(orderId: string) {
    return db.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true, variant: true } },
        payment: true,
        shipment: true,
        deliveryAddress: true,
        vendor: { include: { store: true } },
        user: { include: { profile: true } },
      },
    });
  }

  static async getUserOrders(userId: string, limit = 10, offset = 0) {
    return db.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
        payment: true,
        shipment: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  static async getVendorOrders(vendorId: string, limit = 10, offset = 0) {
    return db.order.findMany({
      where: { vendorId },
      include: {
        items: true,
        user: { include: { profile: true } },
        deliveryAddress: true,
        payment: true,
        shipment: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }
}

export class PaymentService {
  static async completePayment(orderId: string, transactionId?: string) {
    const payment = await db.payment.update({
      where: { orderId },
      data: {
        status: 'COMPLETED',
        transactionId,
        completedAt: new Date(),
      },
    });

    // Update order status
    await db.order.update({
      where: { id: orderId },
      data: { status: 'CONFIRMED' },
    });

    return payment;
  }

  static async failPayment(orderId: string) {
    return db.payment.update({
      where: { orderId },
      data: {
        status: 'FAILED',
      },
    });
  }

  static async getPaymentByOrderId(orderId: string) {
    return db.payment.findUnique({
      where: { orderId },
    });
  }
}

export class InventoryService {
  static async reserveInventory(productId: string, variantId: string | undefined, quantity: number) {
    const where = variantId
      ? { productId_variantId: { productId, variantId } }
      : { productId, variantId: null };

    const inventory = await db.inventory.findUnique({
      where,
    });

    if (!inventory || inventory.availableQuantity < quantity) {
      return null;
    }

    return db.inventory.update({
      where,
      data: {
        reservedQuantity: {
          increment: quantity,
        },
        availableQuantity: {
          decrement: quantity,
        },
      },
    });
  }

  static async releaseInventory(productId: string, variantId: string | undefined, quantity: number) {
    const where = variantId
      ? { productId_variantId: { productId, variantId } }
      : { productId, variantId: null };

    return db.inventory.update({
      where,
      data: {
        reservedQuantity: {
          decrement: quantity,
        },
        availableQuantity: {
          increment: quantity,
        },
      },
    });
  }

  static async commitInventory(productId: string, variantId: string | undefined, quantity: number) {
    const where = variantId
      ? { productId_variantId: { productId, variantId } }
      : { productId, variantId: null };

    return db.inventory.update({
      where,
      data: {
        reservedQuantity: {
          decrement: quantity,
        },
        quantity: {
          decrement: quantity,
        },
      },
    });
  }

  static async checkAvailability(productId: string, variantId: string | undefined): Promise<boolean> {
    const where = variantId
      ? { productId_variantId: { productId, variantId } }
      : { productId, variantId: null };

    const inventory = await db.inventory.findUnique({ where });
    return !!inventory && inventory.availableQuantity > 0;
  }
}
