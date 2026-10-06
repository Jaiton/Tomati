import React from 'react';
import { BrandPartner } from '../types';

interface BrandCarouselProps {
  brands: BrandPartner[];
}

export const BrandCarousel: React.FC<BrandCarouselProps> = ({ brands }) => {
  // Se não houver marcas cadastradas, não renderiza
  if (!brands || brands.length === 0) return null;

  // Duplica as marcas para o efeito contínuo de marquee infinito
  const displayBrands = brands.length < 5 
    ? [...brands, ...brands, ...brands, ...brands] 
    : [...brands, ...brands];

  return (
    <div className="pt-2 max-w-7xl mx-auto space-y-2">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D44A22]" />
          <span className="text-xs font-mono uppercase tracking-widest text-stone-600 font-bold">
            Marcas Parceiras
          </span>
        </div>
      </div>

      {/* Carrossel Infinito com APENAS AS LOGOS das marcas (sem nenhuma escrita adicional) */}
      <div className="relative w-full overflow-hidden py-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-stone-200 shadow-2xs group">
        {/* Sombras suaves nas laterais para fade elegante */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#FBF9F5] sm:from-white via-[#FBF9F5]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#FBF9F5] sm:from-white via-[#FBF9F5]/70 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-4 sm:gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
          {displayBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center px-4 sm:px-6 py-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs hover:shadow-xs hover:border-[#1F3E29] transition-all shrink-0 min-h-[52px] min-w-[110px]"
              title={brand.name || 'Marca Parceira'}
            >
              {/* APENAS A LOGO DA MARCA */}
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={brand.name || 'Logo Marca'}
                  className="h-8 sm:h-9 w-auto max-w-[130px] max-h-[38px] object-contain"
                  onError={(e) => {
                    // Fallback visual caso a imagem não carregue
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span
                  className="font-bold text-sm tracking-tight font-display"
                  style={{ color: brand.accentColor || '#1F3E29' }}
                >
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
