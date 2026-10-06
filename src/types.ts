export type PageView = 'store' | 'where-to-buy';

export interface BrandPartner {
  id: string;
  name: string;
  category: string;
  logoUrl?: string; // Optional image URL or base64 data URI
  description?: string;
  websiteUrl?: string;
  accentColor?: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: 'energy-snacks' | 'beverages' | 'healthy-meals' | 'pastas-spreads' | 'combos';
  categoryLabel: string;
  tagline: string;
  description: string;
  weight: string;
  nutritionHighlight: string;
  benefits: string[];
  priceFormatted: string;
  badge?: string;
  isFeatured?: boolean;
  editorialHighlight?: string;
  portalLink: string;
  ifoodLink: string;
  accentColor: string;
  imageUrl?: string; // Optional image URL or base64 data URI uploaded in Admin
}

export interface StoreConfig {
  storeName: string;
  slogan: string;
  missionCopy: string;
  portalUrl: string; // "Loja Tomati"
  ifoodUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  tiktokUrl: string;
  tiktokHandle: string;
  whatsappUrl: string;
  whatsappNumber: string;
  deliveryRegions: string;
  workingHours: string;
  deliveryHours?: string;
  address: string;
  brands: BrandPartner[];
  communityPosts?: CommunityPost[];
  // Identidade Visual personalizada (Upload de logos pelo admin)
  logoLightBgUrl?: string;
  logoDarkBgUrl?: string;
  iconLightBgUrl?: string;
  iconDarkBgUrl?: string;
  ifoodLogoUrl?: string; // Logo customizada do iFood
  // Informações operacionais e contato
  phone?: string;
  // Segurança do painel & Domínio
  adminPassword?: string;
  adminEmail?: string;
  adminName?: string;
  customDomain?: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  tag: string;
  duration?: string;
  platform: 'instagram' | 'tiktok';
  link: string;
  coverImageUrl?: string;
  gradient?: string;
}
