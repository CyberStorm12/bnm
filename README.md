# Bangladesh Multivendor Ecommerce Marketplace

A production-ready, full-stack multivendor ecommerce platform built for Bangladesh market with Next.js, React, TypeScript, Tailwind CSS, MySQL, and Prisma.

## 🚀 Features

### Public Storefront
- ✅ Homepage with hero banners, categories, featured products
- ✅ Advanced product search with autocomplete
- ✅ Category and brand browsing
- ✅ Detailed product pages with images, variants, and reviews
- ✅ Vendor store profiles
- ✅ Shopping cart (persistent)
- ✅ Wishlist functionality
- ✅ Order tracking
- ✅ Newsletter signup

### Customer Features
- ✅ User registration and login
- ✅ Profile management
- ✅ Address book with multiple delivery addresses
- ✅ Complete shopping cart management
- ✅ Secure checkout with address selection
- ✅ Multiple payment method support (COD + integration-ready)
- ✅ Order history and tracking
- ✅ Product reviews and ratings
- ✅ Wishlist management
- ✅ Notifications center
- ✅ Password reset functionality

### Vendor Dashboard
- ✅ Store profile management (logo, banner, description)
- ✅ Product CRUD operations
- ✅ Product image management
- ✅ Variant and inventory management
- ✅ Order management and processing
- ✅ Coupon creation and management
- ✅ Earnings dashboard with charts
- ✅ Payout request system
- ✅ Shipping configuration
- ✅ Analytics overview

### Admin Dashboard
- ✅ Platform analytics and reporting
- ✅ User management
- ✅ Vendor approval workflow
- ✅ Product moderation
- ✅ Category management
- ✅ Brand management
- ✅ Banner management
- ✅ Coupon management
- ✅ Order management
- ✅ Review moderation
- ✅ Site settings configuration
- ✅ Audit logging

### Bangladesh Localization
- ✅ Currency in ৳ (BDT - Bangladeshi Taka)
- ✅ Bangladesh address system (Division, District, Upazila, Area)
- ✅ Dhaka and Outside Dhaka shipping zones
- ✅ Local phone number support
- ✅ Bangladesh-specific demo data

### Technical Features
- ✅ Server-side rendering with Next.js App Router
- ✅ TypeScript for type safety
- ✅ MySQL database with Prisma ORM
- ✅ NextAuth with role-based authentication
- ✅ TanStack Query for server state
- ✅ Form validation with React Hook Form + Zod
- ✅ Responsive design with Tailwind CSS
- ✅ Premium UI components with shadcn/ui
- ✅ Security best practices
- ✅ Error handling and loading states

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **React Hook Form** - Efficient form handling
- **Zod** - Schema validation
- **TanStack Query** - Server state management
- **Framer Motion** - Subtle animations
- **Lucide React** - Icons

### Backend
- **Next.js API Routes / Server Actions** - Backend logic
- **Prisma ORM** - Database abstraction
- **MySQL 8+** - Relational database
- **NextAuth** - Authentication
- **bcryptjs** - Password hashing

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **ts-node** - TypeScript execution

## 📋 Prerequisites

- **Node.js** 18+ LTS
- **npm** or **yarn**
- **MySQL 8+** (local installation on Kali Linux)
- **Git**

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd bd-ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup MySQL Database on Kali Linux

#### Install MySQL Server
```bash
# Update package manager
sudo apt update

# Install MySQL server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL installation
sudo mysql_secure_installation
```

#### Create Database and User
```bash
# Login to MySQL
sudo mysql -u root -p

# Execute in MySQL shell:
CREATE DATABASE bd_ecommerce;
CREATE USER 'bd_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON bd_ecommerce.* TO 'bd_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Environment Configuration

Copy `.env.example` to `.env.local` and update values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Database
DATABASE_URL="mysql://bd_user:secure_password@localhost:3306/bd_ecommerce"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"

# JWT
JWT_SECRET="your-random-jwt-secret-here"
```

### 5. Database Migration & Seeding

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run db:migrate

# Seed with demo data
npm run db:seed
```

### 6. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📝 Demo Credentials

After seeding, use these credentials to test:

**Admin Account**
- Email: `admin@bd-ecommerce.local`
- Password: `Admin@123456`
- Access: `/admin/dashboard`

**Vendor Account**
- Email: `vendor1@example.com`
- Password: `Vendor@123456`
- Access: `/vendor/dashboard`

**Customer Account**
- Email: `customer@example.com`
- Password: `Customer@123456`
- Access: `/customer/account`

## 🔑 Key Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000

# Building
npm run build            # Production build
npm start                # Start production server

# Database
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration and run
npm run db:seed          # Populate seed data
npm run db:reset         # Reset database completely

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   ├── (auth)/            # Auth routes
│   ├── customer/          # Customer protected routes
│   ├── vendor/            # Vendor protected routes
│   ├── admin/             # Admin protected routes
│   ├── api/               # API endpoints
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── shared/           # Shared components
│   ├── layouts/          # Layout wrappers
│   ├── cards/            # Card components
│   └── forms/            # Form components
├── features/             # Feature-specific logic
├── lib/                  # Utility libraries
├── server/               # Backend logic
│   ├── actions/          # Server Actions
│   ├── services/         # Business logic
│   ├── repositories/     # Data access
│   └── auth/             # Auth configuration
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── constants/            # Application constants
├── config/               # Configuration files
└── middleware.ts         # Next.js middleware

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Seed script

public/                   # Static assets
```

## 🔐 Authentication

- **Type**: NextAuth with credentials provider
- **Session**: JWT-based with httpOnly cookies
- **Roles**: CUSTOMER, VENDOR, ADMIN
- **Protection**: Middleware enforces role-based access
- **Password**: Hashed with bcryptjs

## 💳 Payment System

### Current Implementation
- **Cash on Delivery (COD)** - Fully functional

### Ready for Integration
- SSLCommerz (Bangladesh)
- bKash (Bangladesh)
- Nagad (Bangladesh)
- Rocket (Bangladesh)

Payment abstraction layer prepared for easy gateway switching.

## 📦 Shipping System

- **Zones**: Dhaka & Outside Dhaka
- **Speeds**: Standard (2-3 days), Express (Next day)
- **Pricing**: Zone and speed based
- **Free Shipping**: Orders ≥ ৳1500
- **Tracking**: Unique tracking numbers per order

## 📊 Database Schema

**Key Models**:
- User, UserProfile, Address, Session
- Vendor, VendorApplication, Store, VendorSetting
- Product, ProductImage, ProductVariant, Category, Brand
- Cart, CartItem
- Order, OrderItem, Payment, Shipment
- Review, WishlistItem, Coupon, CouponUsage
- Notification, Banner, SiteSetting, AuditLog

See `SCHEMA_PLAN.md` for complete schema documentation.

## 🧪 Testing the Application

### Test User Flows

**1. Customer Flow**
1. Visit homepage
2. Browse products or use search
3. Click product → view details → add to cart
4. Go to cart → checkout
5. Create delivery address
6. Select COD payment
7. Place order
8. Track order in account dashboard

**2. Vendor Flow**
1. Login as vendor
2. Go to vendor dashboard
3. Add new product with images
4. Set price, discount, variants
5. Manage inventory
6. View orders
7. Check earnings

**3. Admin Flow**
1. Login as admin
2. View platform dashboard
3. Approve/reject vendor applications
4. Moderate products
5. Manage categories, brands, banners
6. View analytics

## 🔍 Key Features in Detail

### Product Discovery
- Full-text search with suggestions
- Multi-level filtering (category, brand, price, rating)
- Sorting options (newest, popular, price, rating)
- Pagination

### Checkout Process
1. Cart review
2. Address selection (or add new)
3. Shipping method selection
4. Coupon application
5. Payment method selection
6. Order confirmation

### Order Management
- Real-time status tracking
- Email notifications
- Delivery estimation
- Return/cancellation handling

### Vendor Features
- Store branding (logo, banner)
- Product catalog management
- Real-time order notifications
- Earnings tracking
- Payout management

## 🛡️ Security Features

- ✅ Password hashing (bcryptjs)
- ✅ Input validation (Zod)
- ✅ Server-side validation
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection
- ✅ CSRF tokens
- ✅ Role-based access control
- ✅ Secure password reset
- ✅ Audit logging
- ✅ Secure headers

## 📈 Performance Optimizations

- Server-side rendering for SEO
- Image optimization with Next.js Image
- Code splitting via Next.js
- Database query optimization with Prisma
- Lazy loading for product galleries
- Caching strategy for static content

## 🌍 Internationalization (i18n)

Currently: English
Prepared for: Bangla (RTL support ready)

## 📱 Responsive Design

- Mobile-first approach
- Fully responsive layouts
- Touch-friendly interfaces
- Optimized for 320px - 4K screens

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
Update `.env.local` with production values:
- Production database URL
- Production NextAuth URL and secret
- Production JWT secret

### Database Backup
```bash
# Backup MySQL database
mysqldump -u root -p bd_ecommerce > backup.sql

# Restore from backup
mysql -u root -p bd_ecommerce < backup.sql
```

## 📚 Documentation

- `ARCHITECTURE.md` - System architecture and design
- `SCHEMA_PLAN.md` - Database schema details
- `ROUTES_AND_FEATURES.md` - Complete route and feature map

## 🐛 Troubleshooting

### MySQL Connection Issues
```bash
# Check MySQL service status
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql

# Test connection
mysql -u bd_user -p bd_ecommerce
```

### Database Migration Issues
```bash
# Reset database (warning: clears data)
npm run db:reset

# Re-seed data
npm run db:seed
```

### Port Already in Use
```bash
# Change port in npm run dev
npm run dev -- -p 3001
```

## 🤝 Contributing

1. Create a feature branch
2. Commit changes
3. Push to remote
4. Create pull request

## 📄 License

This project is proprietary and confidential.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced seller analytics
- [ ] AI-powered recommendations
- [ ] Live chat support
- [ ] Subscription products
- [ ] Marketplace marketplace (B2B)
- [ ] Blockchain-based loyalty
- [ ] Advanced inventory sync

## 📞 Support

For issues and questions:
- Email: support@bd-ecommerce.local
- Documentation: See ARCHITECTURE.md and SCHEMA_PLAN.md

## ✨ Credits

Built as a production-ready, original marketplace platform for Bangladesh e-commerce market.

---

**Last Updated**: March 20, 2026  
**Version**: 1.0.0
"# bnm" 
