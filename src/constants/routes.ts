// Role-based route access
export const ROLE_ROUTES = {
  PUBLIC: ['/', '/shop', '/product', '/vendor', '/login', '/register', '/about', '/contact'],
  CUSTOMER: ['/customer', '/checkout', '/cart', '/track-order'],
  VENDOR: ['/vendor'],
  ADMIN: ['/admin'],
};

// Route segments
export const ROUTES = {
  // Public
  HOME: '/',
  SHOP: '/shop',
  PRODUCT: (slug: string) => `/product/${slug}`,
  VENDORS: '/vendors',
  VENDOR_STORE: (slug: string) => `/vendor/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  TRACK_ORDER: '/track-order',
  ABOUT: '/about',
  CONTACT: '/contact',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: (token: string) => `/reset-password/${token}`,

  // Customer
  CUSTOMER_DASHBOARD: '/customer/account',
  CUSTOMER_PROFILE: '/customer/profile',
  CUSTOMER_ORDERS: '/customer/orders',
  CUSTOMER_ORDER_DETAIL: (id: string) => `/customer/orders/${id}`,
  CUSTOMER_ADDRESSES: '/customer/addresses',
  CUSTOMER_WISHLIST: '/customer/wishlist',
  CUSTOMER_REVIEWS: '/customer/reviews',
  CUSTOMER_NOTIFICATIONS: '/customer/notifications',

  // Vendor
  VENDOR_DASHBOARD: '/vendor/dashboard',
  VENDOR_PRODUCTS: '/vendor/products',
  VENDOR_PRODUCT_NEW: '/vendor/products/new',
  VENDOR_PRODUCT_EDIT: (id: string) => `/vendor/products/${id}/edit`,
  VENDOR_ORDERS: '/vendor/orders',
  VENDOR_ORDER_DETAIL: (id: string) => `/vendor/orders/${id}`,
  VENDOR_COUPONS: '/vendor/coupons',
  VENDOR_EARNINGS: '/vendor/earnings',
  VENDOR_PAYOUTS: '/vendor/earnings/payouts',
  VENDOR_SETTINGS: '/vendor/settings',
  VENDOR_ANALYTICS: '/vendor/analytics',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_DETAIL: (id: string) => `/admin/users/${id}`,
  ADMIN_VENDORS: '/admin/vendors',
  ADMIN_VENDOR_DETAIL: (id: string) => `/admin/vendors/${id}`,
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_DETAIL: (id: string) => `/admin/products/${id}`,
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_BRANDS: '/admin/brands',
  ADMIN_BANNERS: '/admin/banners',
  ADMIN_COUPONS: '/admin/coupons',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER_DETAIL: (id: string) => `/admin/orders/${id}`,
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_REPORTS: '/admin/reports',
};
