import { PrismaClient, UserRole, VendorStatus, OrderStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@bd-ecommerce.local',
      passwordHash: await hash('Admin@123456', 12),
      role: UserRole.ADMIN,
      isActive: true,
      emailVerified: new Date(),
      profile: {
        create: {
          firstName: 'System',
          lastName: 'Admin',
        },
      },
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Create sample vendors
  const vendor1User = await prisma.user.create({
    data: {
      email: 'vendor1@example.com',
      passwordHash: await hash('Vendor@123456', 12),
      role: UserRole.VENDOR,
      isActive: true,
      emailVerified: new Date(),
      phone: '+8801700000001',
      profile: {
        create: {
          firstName: 'Rashid',
          lastName: 'Electronics',
        },
      },
    },
  });

  const vendor1 = await prisma.vendor.create({
    data: {
      userId: vendor1User.id,
      shopName: 'Rashid Electronics',
      shopSlug: 'rashid-electronics',
      status: VendorStatus.APPROVED,
      businessRegistration: 'BR12345678',
      taxId: 'TAX123456',
      isVerified: true,
      bankName: 'Dhaka Bank',
      bankAccount: '1234567890',
      store: {
        create: {
          description:
            'Premium electronics store offering laptops, phones, and accessories. Quality guaranteed.',
          phone: '+8801700000001',
          email: 'rashid@example.com',
          address: 'Gulshan, Dhaka',
          logoUrl: 'https://via.placeholder.com/200',
          bannerUrl: 'https://via.placeholder.com/1200x300',
          rating: 4.5,
        },
      },
      vendorSettings: {
        create: {
          shippingPolicy: 'Free shipping on orders over 1500 BDT',
          returnPolicy: '30 days return policy',
          standardShippingFee: 50,
          expressShippingFee: 150,
          freeShippingThreshold: 1500,
        },
      },
    },
  });
  console.log('✅ Vendor 1 created:', vendor1.shopName);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets',
        imageUrl: 'https://via.placeholder.com/300x300',
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Clothing and accessories',
        imageUrl: 'https://via.placeholder.com/300x300',
        isActive: true,
        displayOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home decor and gardening items',
        imageUrl: 'https://via.placeholder.com/300x300',
        isActive: true,
        displayOrder: 3,
      },
    }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // Create brands
  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        name: 'Samsung',
        slug: 'samsung',
        logoUrl: 'https://via.placeholder.com/150x150',
        isActive: true,
      },
    }),
    prisma.brand.create({
      data: {
        name: 'Apple',
        slug: 'apple',
        logoUrl: 'https://via.placeholder.com/150x150',
        isActive: true,
      },
    }),
    prisma.brand.create({
      data: {
        name: 'Sony',
        slug: 'sony',
        logoUrl: 'https://via.placeholder.com/150x150',
        isActive: true,
      },
    }),
  ]);
  console.log('✅ Brands created:', brands.length);

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        vendorId: vendor1.id,
        categoryId: categories[0].id,
        brandId: brands[0].id,
        name: 'Samsung Galaxy S23 Ultra',
        slug: 'samsung-galaxy-s23-ultra',
        description: 'Latest flagship smartphone with advanced features',
        shortDescription: 'Premium smartphone',
        basePrice: 125000,
        discountPrice: 105000,
        discountPercentage: 16,
        status: 'ACTIVE',
        isFeatured: true,
        sku: 'SAM-S23-001',
        reviewCount: 15,
        rating: 4.5,
        totalSold: 45,
        images: {
          create: [
            {
              imageUrl: 'https://via.placeholder.com/500x500?text=Samsung+S23',
              altText: 'Samsung Galaxy S23 Ultra',
              displayOrder: 1,
              isPrimary: true,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        vendorId: vendor1.id,
        categoryId: categories[0].id,
        brandId: brands[1].id,
        name: 'Apple MacBook Pro 14"',
        slug: 'apple-macbook-pro-14',
        description: 'Powerful laptop for professionals',
        shortDescription: 'Professional laptop',
        basePrice: 250000,
        discountPrice: 235000,
        discountPercentage: 6,
        status: 'ACTIVE',
        isFeatured: true,
        sku: 'APP-MBP-001',
        reviewCount: 8,
        rating: 4.8,
        totalSold: 12,
        images: {
          create: [
            {
              imageUrl: 'https://via.placeholder.com/500x500?text=MacBook+Pro',
              altText: 'Apple MacBook Pro',
              displayOrder: 1,
              isPrimary: true,
            },
          ],
        },
      },
    }),
  ]);
  console.log('✅ Products created:', products.length);

  // Create inventory for products
  for (const product of products) {
    await prisma.inventory.create({
      data: {
        productId: product.id,
        quantity: 100,
        reservedQuantity: 10,
        availableQuantity: 90,
        reorderLevel: 20,
      },
    });
  }
  console.log('✅ Inventory created');

  // Create sample customer
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      passwordHash: await hash('Customer@123456', 12),
      role: UserRole.CUSTOMER,
      isActive: true,
      emailVerified: new Date(),
      phone: '+8801700000099',
      profile: {
        create: {
          firstName: 'Ahmed',
          lastName: 'Khan',
        },
      },
      addresses: {
        create: [
          {
            division: 'Dhaka',
            district: 'Dhaka',
            upazila: 'Gulshan',
            area: 'Baridhara',
            postalCode: '1212',
            detailedAddress: 'House 45, Road 12, Baridhara, Dhaka',
            phone: '+8801700000099',
            isDefault: true,
          },
        ],
      },
    },
  });
  console.log('✅ Customer created:', customer.email);

  // Create cart for customer
  const cart = await prisma.cart.create({
    data: {
      userId: customer.id,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            addedPrice: products[0].discountPrice || products[0].basePrice,
          },
        ],
      },
    },
  });
  console.log('✅ Cart created');

  // Create sample order
  const order = await prisma.order.create({
    data: {
      orderNumber: `ORD-${Date.now()}`,
      userId: customer.id,
      vendorId: vendor1.id,
      deliveryAddressId: customer.addresses[0]!.id,
      status: OrderStatus.CONFIRMED,
      paymentMethod: 'COD',
      subtotal: 105000,
      shippingFee: 50,
      shippingZone: 'DHAKA',
      shippingSpeed: 'STANDARD',
      taxAmount: 15750,
      discountAmount: 20000,
      total: 100800,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            unitPrice: products[0].discountPrice || products[0].basePrice,
            totalPrice: products[0].discountPrice || products[0].basePrice,
          },
        ],
      },
      payment: {
        create: {
          amount: 100800,
          method: 'COD',
          status: 'PENDING',
        },
      },
      shipment: {
        create: {
          trackingNumber: `TRK-${Date.now()}`,
          carrier: 'Local Courier',
          status: 'PENDING',
          estimatedDeliveryAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
      },
    },
  });
  console.log('✅ Sample order created:', order.orderNumber);

  // Create banners
  await prisma.banner.create({
    data: {
      title: 'Summer Sale - Up to 50% Off',
      imageUrl: 'https://via.placeholder.com/1200x300?text=Summer+Sale',
      position: 'HERO',
      displayOrder: 1,
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });
  console.log('✅ Banners created');

  // Create site settings
  await prisma.siteSetting.create({
    data: {
      key: 'store_name',
      value: 'BD Ecommerce Marketplace',
      type: 'STRING',
      description: 'Name of the online store',
    },
  });

  await prisma.siteSetting.create({
    data: {
      key: 'free_shipping_threshold',
      value: '1500',
      type: 'NUMBER',
      description: 'Minimum order amount for free shipping',
    },
  });

  console.log('✅ Site settings created');
  console.log('🎉 Database seed completed successfully!');
  console.log('\n📝 Demo Credentials:');
  console.log('Admin: admin@bd-ecommerce.local / Admin@123456');
  console.log('Vendor: vendor1@example.com / Vendor@123456');
  console.log('Customer: customer@example.com / Customer@123456');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
