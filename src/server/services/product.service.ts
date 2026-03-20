import { db } from '@/server/db/client';

export class ProductService {
  static async getProductById(id: string) {
    return db.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        variants: true,
        category: true,
        brand: true,
        reviews: { where: { status: 'APPROVED' }, orderBy: { createdAt: 'desc' }, take: 5 },
        vendor: { include: { store: true } },
      },
    });
  }

  static async getProductBySlug(slug: string, vendorId: string) {
    return db.product.findUnique({
      where: { vendorId_slug: { vendorId, slug } },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        variants: true,
        category: true,
        brand: true,
        reviews: { where: { status: 'APPROVED' }, orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });
  }

  static async searchProducts(
    query: string,
    limit = 20,
    offset = 0,
    filters?: {
      categoryId?: string;
      brandId?: string;
      minPrice?: number;
      maxPrice?: number;
      rating?: number;
    }
  ) {
    return db.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { shortDescription: { contains: query, mode: 'insensitive' } },
            ],
          },
          { status: 'ACTIVE' },
          filters?.categoryId ? { categoryId: filters.categoryId } : {},
          filters?.brandId ? { brandId: filters.brandId } : {},
          filters?.minPrice ? { basePrice: { gte: filters.minPrice } } : {},
          filters?.maxPrice ? { basePrice: { lte: filters.maxPrice } } : {},
          filters?.rating ? { rating: { gte: filters.rating } } : {},
        ],
      },
      include: {
        images: { take: 1 },
        category: true,
        brand: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  static async getFeaturedProducts(limit = 10) {
    return db.product.findMany({
      where: { isFeatured: true, status: 'ACTIVE' },
      include: {
        images: { take: 1 },
        category: true,
        brand: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  static async getNewArrivals(limit = 10) {
    return db.product.findMany({
      where: { status: 'ACTIVE' },
      include: {
        images: { take: 1 },
        category: true,
        brand: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  static async getTopRatedProducts(limit = 10) {
    return db.product.findMany({
      where: { status: 'ACTIVE' },
      include: {
        images: { take: 1 },
        category: true,
        brand: true,
      },
      orderBy: { rating: 'desc' },
      take: limit,
    });
  }

  static async getCategoryProducts(categoryId: string, limit = 20, offset = 0) {
    return db.product.findMany({
      where: { categoryId, status: 'ACTIVE' },
      include: {
        images: { take: 1 },
        brand: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  static async getBrandProducts(brandId: string, limit = 20, offset = 0) {
    return db.product.findMany({
      where: { brandId, status: 'ACTIVE' },
      include: {
        images: { take: 1 },
        category: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  static async getVendorProducts(vendorId: string, limit = 20, offset = 0) {
    return db.product.findMany({
      where: { vendorId },
      include: {
        images: { take: 1 },
        category: true,
        brand: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  static async createProduct(data: {
    vendorId: string;
    categoryId: string;
    brandId?: string;
    name: string;
    description?: string;
    shortDescription?: string;
    basePrice: number;
    discountPrice?: number;
    sku?: string;
    images?: Array<{ imageUrl: string; altText?: string; isPrimary?: boolean }>;
  }) {
    const slug = data.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    return db.product.create({
      data: {
        vendorId: data.vendorId,
        categoryId: data.categoryId,
        brandId: data.brandId,
        name: data.name,
        slug,
        description: data.description,
        shortDescription: data.shortDescription,
        basePrice: data.basePrice,
        discountPrice: data.discountPrice,
        sku: data.sku,
        discountPercentage: data.discountPrice
          ? Math.round(((data.basePrice - data.discountPrice) / data.basePrice) * 100)
          : undefined,
        images: data.images
          ? {
              create: data.images.map((img, index) => ({
                imageUrl: img.imageUrl,
                altText: img.altText,
                isPrimary: index === 0 || img.isPrimary,
                displayOrder: index,
              })),
            }
          : undefined,
      },
      include: { images: true },
    });
  }

  static async updateProduct(
    productId: string,
    data: Partial<{
      name: string;
      description: string;
      shortDescription: string;
      basePrice: number;
      discountPrice: number;
      categoryId: string;
      brandId: string;
      status: string;
      isFeatured: boolean;
    }>
  ) {
    return db.product.update({
      where: { id: productId },
      data,
    });
  }

  static async deleteProduct(productId: string) {
    return db.product.update({
      where: { id: productId },
      data: { deletedAt: new Date() },
    });
  }
}

export class ReviewService {
  static async createReview(data: {
    productId: string;
    userId: string;
    rating: number;
    title?: string;
    comment?: string;
  }) {
    const review = await db.review.create({
      data: {
        productId: data.productId,
        userId: data.userId,
        rating: data.rating,
        title: data.title,
        comment: data.comment,
        status: 'PENDING',
      },
    });

    // Update product rating
    const reviews = await db.review.findMany({
      where: { productId: data.productId, status: 'APPROVED' },
      select: { rating: true },
    });

    const avgRating =
      reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    await db.product.update({
      where: { id: data.productId },
      data: {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length,
      },
    });

    return review;
  }

  static async getProductReviews(productId: string, limit = 10, offset = 0) {
    return db.review.findMany({
      where: { productId, status: 'APPROVED' },
      include: { user: { include: { profile: true } } },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  static async getUserReviews(userId: string) {
    return db.review.findMany({
      where: { userId },
      include: { product: { include: { images: { take: 1 } } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
