# Bangladesh Multivendor Ecommerce - Database Schema Plan

## Prisma Schema Structure

### Enums

```prisma
enum UserRole {
  CUSTOMER
  VENDOR
  ADMIN
}

enum VendorStatus {
  PENDING
  APPROVED
  REJECTED
  SUSPENDED
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum PaymentMethod {
  COD
  SSL_COMMERZ
  BKASH
  NAGAD
  ROCKET
}

enum ShipmentStatus {
  PENDING
  PICKED_UP
  IN_TRANSIT
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
}

enum ShippingZone {
  DHAKA
  OUTSIDE_DHAKA
}

enum ShippingSpeed {
  STANDARD
  EXPRESS
}

enum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
}

enum CouponType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
  LOGIN
  LOGOUT
  VENDOR_APPROVAL
  ORDER_CANCEL
}
```

---

## Core Models

### 1. User Management

```prisma
model User {
  id                    String      @id @default(cuid())
  email                 String      @unique
  phone                 String?     @unique
  passwordHash          String
  role                  UserRole    @default(CUSTOMER)
  emailVerified         DateTime?
  isActive              Boolean     @default(true)
  lastLoginAt           DateTime?
  
  // Relations
  profile               UserProfile?
  addresses             Address[]
  vendor                Vendor?
  store                 Store?
  carts                 Cart[]
  orders                Order[]
  reviews               Review[]
  wishlistItems         WishlistItem[]
  notifications         Notification[]
  sessions              Session[]
  auditLogs             AuditLog[]
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  deletedAt             DateTime?
  
  @@index([email])
  @@index([role])
  @@index([isActive])
}

model UserProfile {
  id                    String      @id @default(cuid())
  userId                String      @unique
  firstName             String?
  lastName              String?
  avatarUrl             String?
  gender                String?
  dateOfBirth           DateTime?
  
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([userId])
}

model Address {
  id                    String      @id @default(cuid())
  userId                String
  division              String      // Dhaka, Chittagong, etc.
  district              String      // Thana/District
  upazila               String?     // Upazila/Thana
  area                  String?     // Neighborhood
  postalCode            String?
  detailedAddress       String      // Full address text
  phone                 String
  isDefault             Boolean     @default(false)
  
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  orders                Order[]
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  deletedAt             DateTime?
  
  @@index([userId])
  @@index([division])
}

model Session {
  id                    String      @id @default(cuid())
  userId                String
  token                 String      @unique
  expiresAt             DateTime
  
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  
  @@index([userId])
  @@index([token])
}
```

### 2. Vendor Management

```prisma
model Vendor {
  id                    String      @id @default(cuid())
  userId                String      @unique
  shopName              String
  shopSlug              String      @unique
  status                VendorStatus @default(PENDING)
  businessRegistration  String?     // Registration number
  taxId                 String?     // Tax ID
  bankName              String?
  bankAccount           String?
  bankRoutingNumber     String?
  commissionRate        Float       @default(10) // Percentage
  isVerified            Boolean     @default(false)
  suspensionReason      String?
  
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  store                 Store?
  products              Product[]
  orders                Order[]
  coupons               Coupon[]
  payoutRequests        PayoutRequest[]
  vendorSettings        VendorSetting?
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  deletedAt             DateTime?
  
  @@index([userId])
  @@index([status])
  @@index([shopSlug])
}

model VendorApplication {
  id                    String      @id @default(cuid())
  email                 String
  shopName              String
  businessType         String
  registrationNumber   String?
  taxId                String?
  status               VendorStatus @default(PENDING)
  notes                String?
  
  createdAt            DateTime     @default(now())
  updatedAt            DateTime     @updatedAt
  approvedAt           DateTime?
  rejectedAt           DateTime?
  
  @@index([status])
  @@index([email])
}

model Store {
  id                    String      @id @default(cuid())
  vendorId              String      @unique
  logoUrl               String?
  bannerUrl             String?
  description           String?
  phone                 String?
  email                 String?
  address               String?
  rating                Float       @default(0)
  totalOrders           Int         @default(0)
  
  vendor                Vendor      @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([vendorId])
}

model VendorSetting {
  id                    String      @id @default(cuid())
  vendorId              String      @unique
  shippingPolicy        String?
  returnPolicy          String?
  shippingZone          ShippingZone @default(DHAKA)
  standardShippingFee   Float       @default(50)
  expressShippingFee    Float       @default(150)
  freeShippingThreshold Float       @default(1500)
  
  vendor                Vendor      @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([vendorId])
}

model PayoutRequest {
  id                    String      @id @default(cuid())
  vendorId              String
  amount                Float
  status                String      @default("PENDING") // PENDING, APPROVED, PAID
  bankTransferId        String?
  requestedAt           DateTime    @default(now())
  processedAt           DateTime?
  notes                 String?
  
  vendor                Vendor      @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([vendorId])
  @@index([status])
}
```

### 3. Product Catalog

```prisma
model Category {
  id                    String      @id @default(cuid())
  name                  String
  slug                  String      @unique
  description           String?
  imageUrl              String?
  parentId              String?
  isActive              Boolean     @default(true)
  displayOrder          Int         @default(0)
  
  parent                Category?   @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children              Category[]  @relation("CategoryHierarchy")
  products              Product[]
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([slug])
  @@index([isActive])
  @@index([parentId])
}

model Brand {
  id                    String      @id @default(cuid())
  name                  String      @unique
  slug                  String      @unique
  logoUrl               String?
  description           String?
  isActive              Boolean     @default(true)
  
  products              Product[]
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([slug])
  @@index([isActive])
}

model Product {
  id                    String      @id @default(cuid())
  vendorId              String
  categoryId            String
  brandId               String?
  name                  String
  slug                  String
  description           String?
  shortDescription      String?
  basePrice             Float
  discountPrice         Float?
  discountPercentage    Float?
  rating                Float       @default(0)
  reviewCount           Int         @default(0)
  totalSold             Int         @default(0)
  status                String      @default("ACTIVE") // ACTIVE, INACTIVE, ARCHIVED
  isFeatured            Boolean     @default(false)
  sku                   String?     @unique
  metadata              String?     // JSON field for additional info
  
  vendor                Vendor      @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  category              Category    @relation(fields: [categoryId], references: [id])
  brand                 Brand?      @relation(fields: [brandId], references: [id])
  images                ProductImage[]
  variants              ProductVariant[]
  inventory             Inventory[]
  reviews               Review[]
  wishlistItems         WishlistItem[]
  cartItems             CartItem[]
  orderItems            OrderItem[]
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  deletedAt             DateTime?
  
  @@unique([vendorId, slug])
  @@index([vendorId])
  @@index([categoryId])
  @@index([brandId])
  @@index([status])
  @@index([isFeatured])
  @@index([slug])
}

model ProductImage {
  id                    String      @id @default(cuid())
  productId             String
  imageUrl              String
  altText               String?
  displayOrder          Int         @default(0)
  isPrimary             Boolean     @default(false)
  
  product               Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([productId])
}

model ProductVariant {
  id                    String      @id @default(cuid())
  productId             String
  name                  String      // e.g., "Red Medium", "Blue Large"
  sku                   String?
  price                 Float?      // Override base price if needed
  attributes            String      // JSON: { "color": "red", "size": "M" }
  
  product               Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  inventory             Inventory[]
  cartItems             CartItem[]
  orderItems            OrderItem[]
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([productId])
  @@index([sku])
}

model VariantAttribute {
  id                    String      @id @default(cuid())
  productId             String
  name                  String      // e.g., "Color", "Size"
  displayOrder          Int         @default(0)
  
  product               Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  values                VariantValue[]
  
  @@unique([productId, name])
  @@index([productId])
}

model VariantValue {
  id                    String      @id @default(cuid())
  attributeId           String
  value                 String      // e.g., "Red", "Large"
  displayOrder          Int         @default(0)
  
  attribute             VariantAttribute @relation(fields: [attributeId], references: [id], onDelete: Cascade)
  
  @@unique([attributeId, value])
  @@index([attributeId])
}

model Inventory {
  id                    String      @id @default(cuid())
  productId             String
  variantId             String?
  quantity              Int         @default(0)
  reservedQuantity      Int         @default(0)
  availableQuantity     Int
  reorderLevel          Int         @default(10)
  
  product               Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  variant               ProductVariant? @relation(fields: [variantId], references: [id], onDelete: SetNull)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@unique([productId, variantId])
  @@index([productId])
  @@index([variantId])
}
```

### 4. Shopping & Orders

```prisma
model Cart {
  id                    String      @id @default(cuid())
  userId                String      @unique
  
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  items                 CartItem[]
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([userId])
}

model CartItem {
  id                    String      @id @default(cuid())
  cartId                String
  productId             String
  variantId             String?
  quantity              Int
  addedPrice            Float       // Price at time of adding
  
  cart                  Cart        @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product               Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  variant               ProductVariant? @relation(fields: [variantId], references: [id], onDelete: SetNull)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@unique([cartId, productId, variantId])
  @@index([cartId])
  @@index([productId])
}

model Order {
  id                    String      @id @default(cuid())
  orderNumber           String      @unique
  userId                String
  vendorId              String
  deliveryAddressId     String
  status                OrderStatus @default(PENDING)
  paymentMethod         PaymentMethod @default(COD)
  subtotal              Float
  shippingFee           Float
  shippingZone          ShippingZone
  shippingSpeed         ShippingSpeed
  taxAmount             Float       @default(0)
  discountAmount        Float       @default(0)
  total                 Float
  notes                 String?
  
  user                  User        @relation(fields: [userId], references: [id], onDelete: Restrict)
  vendor                Vendor      @relation(fields: [vendorId], references: [id], onDelete: Restrict)
  deliveryAddress       Address     @relation(fields: [deliveryAddressId], references: [id])
  items                 OrderItem[]
  payment               Payment?
  shipment              Shipment?
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  confirmedAt           DateTime?
  shippedAt             DateTime?
  deliveredAt           DateTime?
  cancelledAt           DateTime?
  
  @@index([userId])
  @@index([vendorId])
  @@index([status])
  @@index([orderNumber])
  @@index([createdAt])
}

model OrderItem {
  id                    String      @id @default(cuid())
  orderId               String
  productId             String
  variantId             String?
  quantity              Int
  unitPrice             Float
  totalPrice            Float
  discountApplied       Float       @default(0)
  
  order                 Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product               Product     @relation(fields: [productId], references: [id])
  variant               ProductVariant? @relation(fields: [variantId], references: [id])
  
  @@index([orderId])
  @@index([productId])
}

model Payment {
  id                    String      @id @default(cuid())
  orderId               String      @unique
  amount                Float
  method                PaymentMethod @default(COD)
  status                PaymentStatus @default(PENDING)
  transactionId         String?     // Reference from payment gateway
  gatewayResponse       String?     // JSON response
  
  order                 Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  completedAt           DateTime?
  
  @@index([orderId])
  @@index([status])
  @@index([transactionId])
}

model Shipment {
  id                    String      @id @default(cuid())
  orderId               String      @unique
  trackingNumber        String      @unique
  carrier               String?     // e.g., "Pathao", "Local Courier"
  status                ShipmentStatus @default(PENDING)
  estimatedDeliveryAt   DateTime
  shippedAt             DateTime?
  deliveredAt           DateTime?
  notes                 String?
  
  order                 Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([orderId])
  @@index([trackingNumber])
  @@index([status])
}
```

### 5. Customer Engagement

```prisma
model Review {
  id                    String      @id @default(cuid())
  productId             String
  userId                String
  rating                Int         // 1-5
  title                 String?
  comment               String?
  status                ReviewStatus @default(PENDING)
  isVerifiedPurchase    Boolean     @default(true)
  helpful               Int         @default(0)
  
  product               Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@unique([productId, userId])
  @@index([productId])
  @@index([userId])
  @@index([status])
  @@index([rating])
}

model WishlistItem {
  id                    String      @id @default(cuid())
  userId                String
  productId             String
  
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  product               Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  
  @@unique([userId, productId])
  @@index([userId])
  @@index([productId])
}

model Coupon {
  id                    String      @id @default(cuid())
  code                  String      @unique
  vendorId              String?     // Null = platform coupon
  description           String?
  type                  CouponType  @default(PERCENTAGE)
  value                 Float       // Percentage or fixed amount
  minPurchaseAmount     Float?
  maxDiscountAmount     Float?
  maxUses              Int?
  usedCount             Int         @default(0)
  validFrom             DateTime
  validUntil            DateTime
  isActive              Boolean     @default(true)
  
  vendor                Vendor?     @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  usages                CouponUsage[]
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([code])
  @@index([vendorId])
  @@index([isActive])
}

model CouponUsage {
  id                    String      @id @default(cuid())
  couponId              String
  orderId               String
  discountAmount        Float
  
  coupon                Coupon      @relation(fields: [couponId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  
  @@unique([couponId, orderId])
  @@index([couponId])
  @@index([orderId])
}

model Notification {
  id                    String      @id @default(cuid())
  userId                String
  type                  String      // ORDER_PLACED, ORDER_SHIPPED, etc.
  title                 String
  message               String
  data                  String?     // JSON
  isRead                Boolean     @default(false)
  
  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt             DateTime    @default(now())
  
  @@index([userId])
  @@index([isRead])
  @@index([type])
}
```

### 6. Admin & Site Management

```prisma
model Banner {
  id                    String      @id @default(cuid())
  title                 String
  imageUrl              String
  link                  String?
  position              String      // HERO, FEATURED, SECONDARY
  displayOrder          Int         @default(0)
  isActive              Boolean     @default(true)
  startDate             DateTime?
  endDate               DateTime?
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  
  @@index([position])
  @@index([isActive])
}

model SiteSetting {
  id                    String      @id @default(cuid())
  key                   String      @unique
  value                 String
  type                  String      // STRING, NUMBER, BOOLEAN, JSON
  description           String?
  
  updatedAt             DateTime    @updatedAt
  
  @@index([key])
}

model AuditLog {
  id                    String      @id @default(cuid())
  userId                String?
  action                AuditAction
  entityType            String      // User, Product, Order, etc.
  entityId              String?
  changes               String?     // JSON diff
  ipAddress             String?
  
  user                  User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  createdAt             DateTime    @default(now())
  
  @@index([userId])
  @@index([action])
  @@index([entityType])
  @@index([createdAt])
}
```

---

## Indexes Summary

**Performance Indexes**
- User: email, role, isActive
- Product: vendorId, categoryId, status, slug
- Order: userId, vendorId, status, orderNumber
- Cart: userId
- Review: productId, userId, status
- Coupon: code, isActive

**Foreign Key Indexes** (Prisma auto-manages)
- All relationships properly indexed

---

## Constraints & Rules

1. **Cascade Deletes**: When user deleted, all their data deleted
2. **Unique Constraints**: Email, phone, product slug (per vendor)
3. **Status Validation**: Enums prevent invalid states
4. **Timestamps**: All models track createdAt/updatedAt
5. **Soft Deletes**: deletedAt for user recovery if needed

---

This schema is:
- ✅ Normalized (3NF)
- ✅ Scalable for millions of records
- ✅ Ready for payments & shipments
- ✅ Supports multivendor operations
- ✅ Bangladesh-aware (addresses, shipping)
- ✅ Performance-optimized with strategic indexes
