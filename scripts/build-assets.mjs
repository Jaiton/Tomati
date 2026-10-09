import fs from 'fs';
import path from 'path';

const uploads = path.join(process.cwd(), 'public', 'uploads');
const brandLogoPath = path.join(process.cwd(), 'public', 'brand-logo.png');

const productFiles = {
  heymu: 'prod-0-1791487429247-7d7abddb3e541f76.webp',
  naveia: 'prod-1-1791487449958-5a425616d53b9020.webp',
  tocca: 'prod-2-1791489729222-e1e477df9b7369a1.webp',
  yokk: 'prod-3-1791487489811-86dc0248b2ad0237.webp',
  fruittitus: 'prod-4-1791487499648-99ee1a843e164e7d.webp',
  banner: 'prod-5-1791490811727-a8f97bba15148e5b.webp',
};

const brandLogoBase64 = fs.existsSync(brandLogoPath)
  ? `data:image/png;base64,${fs.readFileSync(brandLogoPath).toString('base64')}`
  : '';

const embeddedImages = {};
for (const [key, filename] of Object.entries(productFiles)) {
  const filePath = path.join(uploads, filename);
  if (fs.existsSync(filePath)) {
    const b64 = fs.readFileSync(filePath).toString('base64');
    embeddedImages[key] = `data:image/webp;base64,${b64}`;
  }
}

const assetsContent = `/**
 * Assets embutidos para resiliência total contra falhas de rede,
 * redirecionamentos em iframes (AI Studio) e hospedagens estáticas (Vercel).
 */

export const DEFAULT_LOGO_BASE64 = ${JSON.stringify(brandLogoBase64 || 'data:image/png;base64,')};

export const EMBEDDED_PRODUCT_IMAGES: Record<string, string> = {
  heymu: ${JSON.stringify(embeddedImages.heymu || '')},
  naveia: ${JSON.stringify(embeddedImages.naveia || '')},
  tocca: ${JSON.stringify(embeddedImages.tocca || '')},
  yokk: ${JSON.stringify(embeddedImages.yokk || '')},
  fruittitus: ${JSON.stringify(embeddedImages.fruittitus || '')},
  banner: ${JSON.stringify(embeddedImages.banner || '')},
};

export const EMBEDDED_IMAGES_BY_INDEX: Record<number, string> = {
  0: EMBEDDED_PRODUCT_IMAGES.heymu,
  1: EMBEDDED_PRODUCT_IMAGES.naveia,
  2: EMBEDDED_PRODUCT_IMAGES.tocca,
  3: EMBEDDED_PRODUCT_IMAGES.yokk,
  4: EMBEDDED_PRODUCT_IMAGES.fruittitus,
  5: EMBEDDED_PRODUCT_IMAGES.banner,
};

export function getFallbackProductImage(nome: string, index?: number): string {
  const clean = (nome || '').toLowerCase();
  if (clean.includes('mu')) return EMBEDDED_PRODUCT_IMAGES.heymu;
  if (clean.includes('naveia')) return EMBEDDED_PRODUCT_IMAGES.naveia;
  if (clean.includes('tocca')) return EMBEDDED_PRODUCT_IMAGES.tocca;
  if (clean.includes('yok')) return EMBEDDED_PRODUCT_IMAGES.yokk;
  if (clean.includes('fruit') || clean.includes('titus')) return EMBEDDED_PRODUCT_IMAGES.fruittitus;
  if (clean.includes('momento') || clean.includes('campanha') || clean.includes('banner')) return EMBEDDED_PRODUCT_IMAGES.banner;
  if (index !== undefined && EMBEDDED_IMAGES_BY_INDEX[index]) {
    return EMBEDDED_IMAGES_BY_INDEX[index];
  }
  return '';
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'assets.ts'), assetsContent, 'utf-8');
console.log('✅ src/assets.ts gerado com sucesso com todas as imagens embutidas!');
