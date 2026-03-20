export interface Vendor {
  id: string;
  userId: string;
  shopName: string;
  shopSlug: string;
  status: string;
  businessRegistration?: string;
  taxId?: string;
  commissionRate: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  id: string;
  vendorId: string;
  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  rating: number;
  totalOrders: number;
}

export interface VendorSetting {
  id: string;
  vendorId: string;
  shippingPolicy?: string;
  returnPolicy?: string;
  shippingZone: string;
  standardShippingFee: number;
  expressShippingFee: number;
  freeShippingThreshold: number;
}

export interface PayoutRequest {
  id: string;
  vendorId: string;
  amount: number;
  status: string;
  bankTransferId?: string;
  requestedAt: Date;
  processedAt?: Date;
}
