import { z } from 'zod';
import { VALIDATION } from '@/constants/currency';

// Auth Schemas
export const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
      .max(VALIDATION.PASSWORD_MAX_LENGTH, `Password must not exceed ${VALIDATION.PASSWORD_MAX_LENGTH} characters`)
      .regex(/(?=.*[a-z])/, 'Password must contain lowercase letters')
      .regex(/(?=.*[A-Z])/, 'Password must contain uppercase letters')
      .regex(/(?=.*\d)/, 'Password must contain numbers'),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
      .regex(/(?=.*[a-z])/, 'Password must contain lowercase letters')
      .regex(/(?=.*[A-Z])/, 'Password must contain uppercase letters')
      .regex(/(?=.*\d)/, 'Password must contain numbers'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Profile Schemas
export const profileSchema = z.object({
  firstName: z.string().min(VALIDATION.NAME_MIN_LENGTH).max(VALIDATION.NAME_MAX_LENGTH).optional(),
  lastName: z.string().min(VALIDATION.NAME_MIN_LENGTH).max(VALIDATION.NAME_MAX_LENGTH).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dateOfBirth: z.date().optional(),
});

// Address Schemas
export const addressSchema = z.object({
  division: z.string().min(1, 'Division is required'),
  district: z.string().min(1, 'District is required'),
  upazila: z.string().optional(),
  area: z.string().optional(),
  postalCode: z.string().optional(),
  detailedAddress: z.string().min(10, 'Address must be at least 10 characters'),
  phone: z
    .string()
    .min(VALIDATION.PHONE_MIN_LENGTH, 'Invalid phone number')
    .max(VALIDATION.PHONE_MAX_LENGTH, 'Invalid phone number'),
  isDefault: z.boolean().optional(),
});

// Product Schemas
export const productCreateSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  brandId: z.string().optional(),
  basePrice: z.number().min(0, 'Price must be greater than 0'),
  discountPrice: z.number().optional(),
  sku: z.string().optional(),
  images: z.array(z.string()).optional(),
});

// Coupon Schemas
export const couponSchema = z.object({
  code: z.string().min(3, 'Coupon code must be at least 3 characters').toUpperCase(),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']),
  value: z.number().min(0, 'Value must be greater than 0'),
  minPurchaseAmount: z.number().optional(),
  maxDiscountAmount: z.number().optional(),
  maxUses: z.number().optional(),
  validFrom: z.date(),
  validUntil: z.date(),
  description: z.string().optional(),
});

// Order/Checkout Schemas
export const checkoutSchema = z.object({
  deliveryAddressId: z.string().min(1, 'Delivery address is required'),
  paymentMethod: z.enum(['COD', 'SSL_COMMERZ', 'BKASH', 'NAGAD', 'ROCKET']).default('COD'),
  couponCode: z.string().optional(),
  notes: z.string().optional(),
  shippingSpeed: z.enum(['STANDARD', 'EXPRESS']).default('STANDARD'),
});

// Review Schema
export const reviewSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must not exceed 5'),
  title: z.string().optional(),
  comment: z.string().max(1000, 'Comment must not exceed 1000 characters').optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
