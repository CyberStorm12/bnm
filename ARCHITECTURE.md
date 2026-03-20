# Bangladesh Multivendor Ecommerce Marketplace - Architecture

**Date**: March 20, 2026  
**Project**: Premium Multivendor Ecommerce Platform for Bangladesh  
**Tech Stack**: Next.js 14+, React, TypeScript, Tailwind CSS, Prisma, MySQL, Auth.js

---

## 1. SYSTEM OVERVIEW

A full-stack, production-ready multivendor ecommerce marketplace tailored for Bangladesh market. Three primary user roles:

- **Customers/Buyers**: Browse, search, purchase products, manage orders, write reviews
- **Vendors**: Manage stores, list products, manage inventory, handle orders, request payouts
- **Admins**: Moderate content, approve vendors, manage site configuration, view analytics

---

## 2. TECHNOLOGY STACK

### Frontend Framework
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript** (strict mode)

### Styling & Components
- **Tailwind CSS 3+**
- **shadcn/ui** (headless component library)
- **Lucide Icons** (SVG icons)
- **Framer Motion** (subtle animations only)

### Forms & Validation
- **React Hook Form** (efficient form handling)
- **Zod** (TypeScript-first schema validation)

### State Management
- **TanStack Query (React Query)** (server state)
- **Zustand** (minimal client state, only when necessary)
- **Next.js Context API** (theme, auth context)

### Database & ORM
- **MySQL 8+** (local development on Kali Linux)
- **Prisma ORM** (database abstraction)

### Authentication
- **Auth.js (NextAuth v5)** with credentials provider
- **bcryptjs** (password hashing)
- **JWT** (session management)

### File Handling
- **Local file uploads** (development)
- **Abstraction layer** for future S3/Cloudinary integration

### Payment
- **Payment abstraction layer**
- **Cash on Delivery (COD)** - fully working
- **SSLCommerz, bKash, Nagad, Rocket** - integration-ready structure

### Code Quality
- **ESLint** (code linting)
- **Prettier** (code formatting)
- **TypeScript** (type safety)

---

## 3. FOLDER STRUCTURE

```
project-root/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/           # Public routes group
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── shop/
│   │   │   ├── vendors/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── (auth)/             # Auth routes group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── customer/           # Protected customer routes
│   │   │   ├── account/
│   │   │   ├── orders/
│   │   │   ├── addresses/
│   │   │   └── wishlist/
│   │   ├── vendor/             # Protected vendor routes
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   └── settings/
│   │   ├── admin/              # Protected admin routes
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── vendors/
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── orders/
│   │   │   └── settings/
│   │   ├── api/                # API routes (server actions preferred)
│   │   ├── layout.tsx          # Root layout
│   │   └── error.tsx           # Error boundary
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── shared/             # Reusable shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SidebarNav.tsx
│   │   │   └── ...
│   │   ├── layouts/            # Layout wrappers
│   │   │   ├── CustomerLayout.tsx
│   │   │   ├── VendorLayout.tsx
│   │   │   └── AdminLayout.tsx
│   │   ├── cards/              # Card components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── VendorCard.tsx
│   │   │   └── ...
│   │   └── forms/              # Form components
│   │
│   ├── features/               # Feature-specific logic
│   │   ├── auth/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── reviews/
│   │   ├── wishlist/
│   │   ├── vendors/
│   │   ├── admin/
│   │   ├── search/
│   │   └── notifications/
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── api/                # API client utilities
│   │   ├── utils/              # Helper functions
│   │   ├── constants/          # Constants
│   │   ├── validations/        # Zod schemas
│   │   └── helpers/            # Domain helpers
│   │
│   ├── server/                 # Backend logic
│   │   ├── actions/            # Server Actions
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   └── ...
│   │   ├── db/                 # Database utilities
│   │   │   └── client.ts
│   │   ├── services/           # Business logic services
│   │   │   ├── authService.ts
│   │   │   ├── productService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── paymentService.ts
│   │   │   ├── shippingService.ts
│   │   │   └── ...
│   │   ├── repositories/       # Data access layer
│   │   │   ├── userRepository.ts
│   │   │   ├── productRepository.ts
│   │   │   └── ...
│   │   ├── auth/               # Auth configuration
│   │   │   ├── authConfig.ts
│   │   │   ├── providers.ts
│   │   │   └── middleware.ts
│   │   └── mail/               # Email service
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useUser.ts
│   │   └── ...
│   │
│   ├── types/                  # TypeScript types & interfaces
│   │   ├── auth.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── vendor.ts
│   │   ├── api.ts
│   │   └── ...
│   │
│   ├── config/                 # Configuration files
│   │   ├── site.config.ts
│   │   ├── routes.config.ts
│   │   └── payment.config.ts
│   │
│   ├── constants/              # Application constants
│   │   ├── statuses.ts
│   │   ├── roles.ts
│   │   ├── currency.ts
│   │   ├── shipping.ts
│   │   └── ...
│   │
│   └── middleware.ts           # Next.js middleware
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed script
│
├── public/                     # Static assets
│   ├── images/
│   │   ├── products/
│   │   ├── vendors/
│   │   └── ...
│   └── uploads/                # User uploads
│
├── .env.example                # Environment template
├── .env.local                  # Local environment (gitignored)
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
├── README.md
└── ARCHITECTURE.md
```

---

## 4. DATABASE SCHEMA OVERVIEW

### Core Models

**User Management**
- `User` - Base user account
- `UserProfile` - Extended profile info
- `Address` - Delivery addresses
- `Session` - Auth session tracking

**Vendor Management**
- `Vendor` - Vendor profile
- `VendorApplication` - Vendor registration requests
- `Store` - Vendor store frontend
- `VendorSetting` - Vendor preferences

**Product Catalog**
- `Category` - Product categories
- `Brand` - Product brands
- `Product` - Main product model
- `ProductImage` - Product photos
- `ProductVariant` - Size, color variants
- `VariantAttribute` - Variant metadata
- `VariantValue` - Attribute values
- `Inventory` - Stock tracking per variant

**Shopping Cart**
- `Cart` - Cart container
- `CartItem` - Cart line items

**Orders & Fulfillment**
- `Order` - Order header
- `OrderItem` - Order line items
- `Payment` - Payment records
- `Shipment` - Shipping records
- `Notification` - Order notifications

**Customer Engagement**
- `Review` - Product reviews
- `Wishlist` - Favorite products
- `Coupon` - Discount codes
- `CouponUsage` - Coupon redemption tracking

**Admin & Site**
- `Banner` - Homepage banners
- `SiteSetting` - Configuration
- `PayoutRequest` - Vendor payout requests
- `AuditLog` - Activity logging

---

## 5. AUTHENTICATION & AUTHORIZATION

### Roles & Permissions

| Role | Capabilities |
|------|---|
| **CUSTOMER** | Browse products, purchase, manage orders, reviews, wishlist, account |
| **VENDOR** | Manage store, products, inventory, orders, coupons, payouts |
| **ADMIN** | Full control: users, vendors, products, categories, orders, site config |

### Authentication Flow

1. **Registration**: Email/password-based signup
2. **Login**: Credentials provider via Auth.js
3. **Session**: JWT-based persistent sessions
4. **Password Reset**: Email verification link
5. **Protected Routes**: Middleware-based role enforcement

### Middleware Strategy

- `middleware.ts` redirects unauthorized requests
- Role checks on sensitive routes
- Admin routes require admin token
- Vendor dashboard requires vendor approval

---

## 6. PAYMENT SYSTEM ARCHITECTURE

### Payment Abstraction Layer

```typescript
PaymentProvider (Interface)
├── CashOnDelivery (✅ Implemented)
├── SSLCommerz (Ready for integration)
├── bKash (Ready for integration)
├── Nagad (Ready for integration)
└── Rocket (Ready for integration)
```

### Payment Flow

1. **Order Creation** → Payment status: PENDING
2. **Payment Provider Selection** → Gateway-specific process
3. **Payment Verification** → Status update: COMPLETED/FAILED
4. **Order Status Update** → CONFIRMED if paid

### Database Tracking

- `Payment` model stores transaction references
- Payment status linked to order status
- Extensible for multiple providers

---

## 7. SHIPPING SYSTEM DESIGN

### Shipping Zones & Pricing

**Zone 1: Inside Dhaka**
- Standard (2-3 days): ৳50
- Express (Next day): ৳150

**Zone 2: Outside Dhaka**
- Standard (3-5 days): ৳100
- Express (2 days): ৳250

### Free Shipping Threshold
- Orders ≥ ৳1500: Free standard shipping

### Order Status Flow

```
PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
                       ↓
                   CANCELLED (at any point)
```

### Shipment Tracking

- Unique tracking ID per order
- Estimated delivery date calculation
- Vendor-specific shipping rules support

---

## 8. FEATURES BREAKDOWN

### Public Storefront (Phase 3)
- [ ] Homepage with hero, categories, featured products
- [ ] Product listing with filters & sorting
- [ ] Product detail pages
- [ ] Vendor profiles & store pages
- [ ] Search with autocomplete
- [ ] Cart (persistent)
- [ ] Wishlist
- [ ] About & Contact pages

### Customer Account (Phase 3-4)
- [ ] Registration & login
- [ ] Profile management
- [ ] Address book
- [ ] Order history & tracking
- [ ] Wishlist management
- [ ] Product reviews & ratings
- [ ] Notifications
- [ ] Password reset

### Checkout & Orders (Phase 4)
- [ ] Shopping cart management
- [ ] Address selection
- [ ] Coupon application
- [ ] Shipping calculation
- [ ] Payment method selection
- [ ] Order placement
- [ ] Order confirmation
- [ ] Order tracking

### Vendor Dashboard (Phase 5)
- [ ] Store profile setup
- [ ] Product management (CRUD)
- [ ] Variant & inventory management
- [ ] Order management
- [ ] Coupon creation
- [ ] Earnings dashboard
- [ ] Payout requests
- [ ] Analytics

### Admin Dashboard (Phase 6)
- [ ] Analytics & reports
- [ ] User management
- [ ] Vendor approval/rejection
- [ ] Product moderation
- [ ] Category/Brand management
- [ ] Banner management
- [ ] Coupon management
- [ ] Order management
- [ ] Review moderation
- [ ] Settings

---

## 9. SECURITY CONSIDERATIONS

### Input Validation
- Zod schema validation on all forms
- Server-side validation for API requests
- File upload validation (size, type)

### Data Protection
- Passwords hashed with bcryptjs
- Sensitive fields excluded from logs
- SQL injection prevention via Prisma

### Authorization
- Middleware-based route protection
- Role-based access control (RBAC)
- Ownership verification for resources

### Rate Limiting
- Auth endpoints (login, register): 5 requests/minute
- API endpoints: 100 requests/minute per IP

### Secure Headers
- CSRF protection
- XSS prevention
- Secure cookies

---

## 10. PERFORMANCE OPTIMIZATION

### Caching Strategy
- Static homepage cache: 1 hour
- Product pages: 24 hours
- Category pages: 24 hours
- Cart/account: No cache (dynamic)

### Image Optimization
- Next.js Image component
- Lazy loading for product galleries
- WebP format where supported

### Database Optimization
- Proper indexes on frequently queried columns
- Pagination for large result sets
- Eager loading to prevent N+1 queries

### Frontend Performance
- Code splitting via Next.js
- Tree-shaking with ESM
- Minimal JavaScript bundles

---

## 11. LOCALIZATION STRATEGY

### Phase 1: English (Current)
- All UI in English
- BDT currency with ৳ symbol
- Bangladesh address system
- Local phone formats

### Phase 2: Bangla (Future Ready)
- i18n infrastructure prepared
- Bangla content ready
- RTL support prepared

---

## 12. DEPLOYMENT READINESS

### Environment Tiers

**Development (Local)**
- Kali Linux MySQL
- Local file uploads
- Debug logging

**Staging**
- Production-like MySQL
- Testing payment flow
- CI/CD pipeline

**Production**
- Cloud MySQL or RDS
- S3/Cloudinary uploads
- Real payment gateways
- Monitoring & alerting

### Docker Support
- Optional Dockerfile for containerization
- docker-compose for local MySQL + app

---

## 13. IMPLEMENTATION ROADMAP

### Phase 1: Foundation ✅
- Architecture planning
- Folder structure
- Database schema design
- Route mapping

### Phase 2: Setup 🔄
- Next.js initialization
- Tailwind & shadcn/ui setup
- Prisma & MySQL
- Auth.js configuration

### Phase 3: Core Features
- Homepage & layouts
- Product discovery
- Cart & wishlist
- Customer account basics

### Phase 4: Transactions
- Checkout flow
- Payment integration (COD)
- Order creation
- Order tracking

### Phase 5: Vendor Platform
- Vendor registration
- Dashboard
- Product CRUD
- Order management

### Phase 6: Admin Panel
- Admin dashboard
- Vendor management
- Content moderation
- Site configuration

### Phase 7: Polish
- QA & testing
- Performance tuning
- Security audit
- Documentation

---

## 14. KEY DESIGN PRINCIPLES

1. **Production-Ready**: No fake buttons, incomplete flows, or TODO comments in core features
2. **User-Centric**: Intuitive UX, responsive design, clear feedback
3. **Maintainable**: Clean code, proper abstractions, clear patterns
4. **Secure**: Validation, authorization, secure defaults
5. **Performant**: Optimized queries, caching, lazy loading
6. **Scalable**: Extensible architecture, modular design
7. **Bangladesh-First**: Currency, addresses, shipping for local market
8. **Original**: Premium design inspired by market leaders, not copied

---

## 15. DEVELOPMENT ENVIRONMENT

### Requirements
- **OS**: Kali Linux (or any Linux)
- **Node.js**: 18+ LTS
- **MySQL**: 8+
- **Editor**: VS Code recommended

### Local Setup
1. Clone repository
2. Copy `.env.example` → `.env.local`
3. `npm install`
4. Setup local MySQL database
5. Run `npx prisma migrate dev`
6. `npm run seed`
7. `npm run dev`

---

## Next Steps

This architecture provides a solid foundation for building a production-ready multivendor ecommerce platform. The modular structure allows parallel development, the database schema is normalized and scalable, and the tech stack is proven and modern.

**Ready to begin Phase 2: Setup** ✅
