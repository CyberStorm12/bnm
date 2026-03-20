// Currency Configuration
export const CURRENCY = {
  symbol: '৳',
  code: 'BDT',
  name: 'Bangladeshi Taka',
};

export function formatPrice(amount: number): string {
  return `${CURRENCY.symbol}${amount.toLocaleString('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPriceAmount(amount: number): string {
  return amount.toLocaleString('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Shipping Configuration
export const SHIPPING = {
  DHAKA: {
    STANDARD: 50,
    EXPRESS: 150,
  },
  OUTSIDE_DHAKA: {
    STANDARD: 100,
    EXPRESS: 250,
  },
  FREE_THRESHOLD: 1500,
};

export const DELIVERY_TIME = {
  STANDARD: {
    min: 2,
    max: 3,
    unit: 'days',
  },
  EXPRESS: {
    min: 1,
    max: 1,
    unit: 'day',
  },
};

// Tax Configuration
export const TAX_RATE = 0.15; // 15% VAT

// Commission Configuration
export const DEFAULT_COMMISSION_RATE = 10; // 10% commission on sales

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
};

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
};

// UI
export const SKELETON_LOADING_DELAY = 200; // ms
export const TOAST_DURATION = 3000; // ms
