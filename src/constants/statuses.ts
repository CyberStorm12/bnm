import { UserRole, VendorStatus } from '@/types/auth';
import {
  OrderStatus,
  PaymentStatus,
  ShipmentStatus,
  PaymentMethod,
  ShippingSpeed,
  ShippingZone,
} from '@/types/order';

// User Role Options
export const USER_ROLE_OPTIONS = [
  { value: UserRole.CUSTOMER, label: 'Customer' },
  { value: UserRole.VENDOR, label: 'Vendor' },
  { value: UserRole.ADMIN, label: 'Administrator' },
];

// Vendor Status Options
export const VENDOR_STATUS_OPTIONS = [
  { value: VendorStatus.PENDING, label: 'Pending Approval' },
  { value: VendorStatus.APPROVED, label: 'Approved' },
  { value: VendorStatus.REJECTED, label: 'Rejected' },
  { value: VendorStatus.SUSPENDED, label: 'Suspended' },
];

// Order Status Options
export const ORDER_STATUS_OPTIONS = [
  { value: OrderStatus.PENDING, label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: OrderStatus.CONFIRMED, label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { value: OrderStatus.PROCESSING, label: 'Processing', color: 'bg-purple-100 text-purple-800' },
  { value: OrderStatus.SHIPPED, label: 'Shipped', color: 'bg-cyan-100 text-cyan-800' },
  { value: OrderStatus.DELIVERED, label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: OrderStatus.CANCELLED, label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  { value: OrderStatus.RETURNED, label: 'Returned', color: 'bg-gray-100 text-gray-800' },
];

// Payment Status Options
export const PAYMENT_STATUS_OPTIONS = [
  { value: PaymentStatus.PENDING, label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: PaymentStatus.COMPLETED, label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: PaymentStatus.FAILED, label: 'Failed', color: 'bg-red-100 text-red-800' },
  { value: PaymentStatus.REFUNDED, label: 'Refunded', color: 'bg-gray-100 text-gray-800' },
];

// Payment Method Options
export const PAYMENT_METHOD_OPTIONS = [
  { value: PaymentMethod.COD, label: 'Cash on Delivery (COD)' },
  { value: PaymentMethod.SSL_COMMERZ, label: 'SSLCommerz' },
  { value: PaymentMethod.BKASH, label: 'bKash' },
  { value: PaymentMethod.NAGAD, label: 'Nagad' },
  { value: PaymentMethod.ROCKET, label: 'Rocket' },
];

// Shipment Status Options
export const SHIPMENT_STATUS_OPTIONS = [
  { value: ShipmentStatus.PENDING, label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: ShipmentStatus.PICKED_UP, label: 'Picked Up', color: 'bg-blue-100 text-blue-800' },
  { value: ShipmentStatus.IN_TRANSIT, label: 'In Transit', color: 'bg-cyan-100 text-cyan-800' },
  {
    value: ShipmentStatus.OUT_FOR_DELIVERY,
    label: 'Out for Delivery',
    color: 'bg-purple-100 text-purple-800',
  },
  { value: ShipmentStatus.DELIVERED, label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: ShipmentStatus.CANCELLED, label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

// Shipping Speed Options
export const SHIPPING_SPEED_OPTIONS = [
  { value: ShippingSpeed.STANDARD, label: 'Standard Delivery (2-3 days)' },
  { value: ShippingSpeed.EXPRESS, label: 'Express Delivery (Next day)' },
];

// Shipping Zone Options
export const SHIPPING_ZONE_OPTIONS = [
  { value: ShippingZone.DHAKA, label: 'Inside Dhaka' },
  { value: ShippingZone.OUTSIDE_DHAKA, label: 'Outside Dhaka' },
];

// Helper functions
export const getStatusColor = (status: OrderStatus | PaymentStatus | ShipmentStatus): string => {
  const allOptions = [...ORDER_STATUS_OPTIONS, ...PAYMENT_STATUS_OPTIONS, ...SHIPMENT_STATUS_OPTIONS];
  const option = allOptions.find((o) => o.value === status);
  return option?.color || 'bg-gray-100 text-gray-800';
};

export const getStatusLabel = (
  status: OrderStatus | PaymentStatus | ShipmentStatus | PaymentMethod | ShippingSpeed
): string => {
  const allOptions = [
    ...ORDER_STATUS_OPTIONS,
    ...PAYMENT_STATUS_OPTIONS,
    ...SHIPMENT_STATUS_OPTIONS,
    ...PAYMENT_METHOD_OPTIONS,
    ...SHIPPING_SPEED_OPTIONS,
  ];
  const option = allOptions.find((o) => o.value === status);
  return option?.label || status;
};
