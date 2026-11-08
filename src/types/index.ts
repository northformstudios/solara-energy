export type ProductCategory =
  | 'Solar Panels'
  | 'Inverters'
  | 'Batteries'
  | 'Solar Generators'
  | 'Accessories'
  | 'Complete Solar Kits';

export type ProductAvailability = 'In Stock' | 'Built to Order' | 'Pre-order';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number; // in NGN
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  availability: ProductAvailability;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  specifications: ProductSpecification[];
  packageIncludes: string[];
  images: string[];
  badge?: 'Bestseller' | 'New' | 'Top Efficiency' | 'Flagship' | 'Turnkey';
  featured?: boolean;
  isBestseller?: boolean;
  warrantyIllustrative: string;
  dimensions?: string;
  weight?: string;
  efficiency?: string;
  leadTime?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface DeliveryInfo {
  state: string;
  city: string;
  address: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Simulated Paid' | 'Simulated On Delivery';
  orderStatus: 'Confirmed' | 'Processing' | 'Dispatched';
}

export interface QuoteRequestData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  state: string;
  estimatedPowerNeeds: string;
  productsOfInterest: string[];
  additionalInfo?: string;
  submittedAt?: string;
}
