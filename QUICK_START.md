# ⚡ Quick Start Guide

## 5-Minute Setup on Kali Linux

### Step 1: Install MySQL (if not already installed)
```bash
sudo apt update && sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql -u root << 'EOF'
CREATE DATABASE bd_ecommerce;
CREATE USER 'bd_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON bd_ecommerce.* TO 'bd_user'@'localhost';
FLUSH PRIVILEGES;
EOF
```

### Step 2: Install Node Dependencies
```bash
cd /home/kali/Documents/a
npm install
```

### Step 3: Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="mysql://bd_user:secure_password@localhost:3306/bd_ecommerce"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-min-32-chars"
JWT_SECRET="your-random-jwt-secret-min-32-chars"
```

### Step 4: Setup Database
```bash
npm run prisma:generate
npm run db:migrate
npm run db:seed
```

### Step 5: Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🔑 Login Credentials

| Role     | Email                      | Password           |
|----------|----------------------------|--------------------|
| Admin    | admin@bd-ecommerce.local   | Admin@123456       |
| Vendor   | vendor1@example.com        | Vendor@123456      |
| Customer | customer@example.com       | Customer@123456    |

---

## 📂 Project Structure Overview

```
src/
├── app/                 # Next.js App Router (pages & layouts)
├── components/          # React components
├── features/            # Feature-specific logic
├── server/             # Backend logic & services
├── lib/                # Utilities & helpers
├── types/              # TypeScript types
├── constants/          # App constants
├── config/             # Configuration
└── hooks/              # Custom React hooks

prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Demo data

docs/
├── ARCHITECTURE.md     # System design
├── SCHEMA_PLAN.md      # Database schema
├── ROUTES_AND_FEATURES.md
├── README.md           # Setup guide
└── IMPLEMENTATION_STATUS.md
```

---

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000

# Building
npm run build            # Create production build
npm start                # Run production build

# Database
npm run db:migrate       # Create/run migrations
npm run db:seed          # Seed demo data
npm run db:reset         # ⚠️ Clear database

# Code Quality
npm run lint             # Check for linting errors
npm run format           # Auto-format code
npm run type-check       # TypeScript check
```

---

## 🛠️ Troubleshooting

### MySQL Connection Issues
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Restart MySQL if needed
sudo systemctl restart mysql

# Test connection
mysql -u bd_user -p bd_ecommerce
```

### Database Not Synced
```bash
# Re-run migrations
npm run db:migrate

# Reset and reseed
npm run db:reset
npm run db:seed
```

### Port 3000 Already in Use
```bash
# Run on different port
npm run dev -- -p 3001
```

---

## 📈 What's Included

✅ **32 Database Models** - Complete schema for multivendor marketplace
✅ **50+ Routes** - Public, customer, vendor, and admin routes
✅ **9 Validation Schemas** - Zod for form validation
✅ **5 Service Classes** - Business logic abstraction
✅ **Bangladesh Localization** - ৳ BDT currency, divisions, shipping
✅ **Authentication** - NextAuth with role-based access
✅ **Security** - Password hashing, input validation, CSRF protection
✅ **TypeScript** - Strict mode with proper typing
✅ **Testing Ready** - Seed script with realistic demo data

---

## 🎯 Architecture Highlights

- **Clean Architecture**: Separation of concerns (routes, services, types)
- **Scalable Database**: Normalized schema with proper indexes
- **Type Safety**: 100% TypeScript coverage
- **Security First**: bcryptjs hashing, validation, CSRF protection
- **Bangladesh-First**: Currency in ৳, address system, shipping zones
- **Production Ready**: Error handling, logging structure, environment config

---

## 📚 Documentation

For detailed information, see:
- **Setup & Installation**: README.md
- **Architecture & Design**: ARCHITECTURE.md
- **Database Schema**: SCHEMA_PLAN.md
- **Routes & Features**: ROUTES_AND_FEATURES.md
- **Implementation Status**: IMPLEMENTATION_STATUS.md

---

## ✨ Demo Data Included

After `npm run db:seed`, you'll have:
- ✅ 1 Admin account
- ✅ 1 Vendor with store profile
- ✅ 3 Product categories
- ✅ 3 Product brands
- ✅ 2 Sample products with images
- ✅ 1 Customer account with address
- ✅ 1 Sample order with payment & shipment
- ✅ Site banners and settings

---

## 🔐 Security Notes

- Passwords are hashed with bcryptjs (cost factor: 12)
- Cookies are httpOnly (JavaScript cannot access)
- CSRF protection via NextAuth
- Input validation on all forms (Zod)
- Server-side validation on backend
- SQL injection protected (Prisma ORM)

---

## 💡 Development Tips

1. **Add New Feature**: Create folder in `src/features/`
2. **Add Service**: Create file in `src/server/services/`
3. **Add Validation**: Add schema in `src/lib/validations/`
4. **Add Route**: Define in `src/constants/routes.ts`
5. **Add Type**: Create in `src/types/`

---

## 🆘 Need Help?

1. Check README.md for detailed setup
2. See TROUBLESHOOTING section in README.md
3. Review ARCHITECTURE.md for system overview
4. Check SCHEMA_PLAN.md for database structure
5. Look at existing code for patterns

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Database connection successful
- [ ] Demo data seeded
- [ ] Development server running on :3000
- [ ] Can login with demo credentials
- [ ] Admin, Vendor, Customer roles work
- [ ] No TypeScript errors
- [ ] ESLint passing

---

**Status**: Ready to develop! 🚀

**Next**: Begin PHASE 3 (Homepage, Product Pages, Cart)
