import React from 'react';

interface IfoodIconProps {
  className?: string;
  size?: number | string;
  variant?: 'mark' | 'full' | 'badge';
  customLogoUrl?: string;
}

/**
 * Ícone Oficial do iFood
 * Renderiza a marca oficial do iFood em vetor SVG de alta fidelidade,
 * ou a imagem personalizada enviada pelo usuário no Painel Administrativo.
 */
export const IfoodIcon: React.FC<IfoodIconProps> = ({
  className = '',
  size = 20,
  variant = 'mark',
  customLogoUrl,
}) => {
  const numSize = typeof size === 'number' ? size : 20;

  // Se houver logo customizada enviada pelo usuário
  if (customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt="iFood"
        className={`inline-block object-contain shrink-0 ${className}`}
        style={{ height: numSize, width: 'auto', maxHeight: numSize }}
      />
    );
  }

  // 1. Marca símbolo oficial: O emblemático sorriso e pontos do iFood
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-[#EA1D2C] text-white shrink-0 shadow-xs ${className}`}
        style={{ width: numSize, height: numSize }}
        title="iFood"
      >
        <svg
          viewBox="0 0 100 60"
          className="w-4/5 h-auto fill-white"
          aria-label="iFood Oficial"
        >
          {/* Logo iFood vetor oficial */}
          <path d="M12 8a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0 8c-3.3 0-6 2.7-6 6v36c0 3.3 2.7 6 6 6s6-2.7 6-6V22c0-3.3-2.7-6-6-6zm23.6-2.4c-4.4 0-8 3.6-8 8v3.4h-5.4c-2.2 0-4 1.8-4 4s1.8 4 4 4H27v25c0 3.3 2.7 6 6 6s6-2.7 6-6V31h6.5c2.2 0 4-1.8 4-4s-1.8-4-4-4H39v-3.4c0-2.2 1.8-4 4-4 1.5 0 2.9.8 3.6 2.1 1 1.8 3.2 2.5 5 1.5s2.5-3.2 1.5-5c-2.2-3.8-6.3-6.1-10.7-6.1z" />
          <path d="M60 21c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm34-24c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
          {/* Curva do Sorriso característico iFood */}
          <path d="M52 56c8 4 20 4 28 0 1.9-1 4.3-.2 5.2 1.7.9 1.9.2 4.3-1.7 5.2-11.4 5.7-28.5 5.7-39.9 0-1.9-.9-2.6-3.3-1.7-5.2 1-1.9 3.3-2.6 5.2-1.7z" />
        </svg>
      </div>
    );
  }

  if (variant === 'full') {
    const width = typeof size === 'number' ? size * 2.1 : size;
    return (
      <svg
        viewBox="0 0 115 52"
        style={{ width, height: numSize }}
        className={`inline-block overflow-visible ${className}`}
        aria-label="iFood"
      >
        <g fill="#EA1D2C">
          {/* Letra i */}
          <circle cx="9" cy="8" r="5" />
          <rect x="5" y="18" width="8" height="26" rx="4" />

          {/* Letra f */}
          <path d="M29 18v-3c0-3.3 2.7-6 6-6 1.8 0 3.5.8 4.6 2.2 1.3 1.7 3.8 2 5.5.7 1.7-1.3 2-3.8.7-5.5C42.8 2.6 38.6 1 34 1c-7.7 0-14 6.3-14 14v3h-4c-2.2 0-4 1.8-4 4s1.8 4 4 4h4v14c0 2.2 1.8 4 4 4s4-1.8 4-4V26h7c2.2 0 4-1.8 4-4s-1.8-4-4-4h-7z" />

          {/* Letra o 1 */}
          <path fillRule="evenodd" d="M56 16c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm0 21c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />

          {/* Letra o 2 */}
          <path fillRule="evenodd" d="M84 16c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm0 21c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />

          {/* Letra d */}
          <path d="M106 3c-2.2 0-4 1.8-4 4v9.5C100 15 97.6 14 95 14c-8 0-14 6.3-14 14s6 14 14 14c2.6 0 5-1 7-2.5V41c0 2.2 1.8 4 4 4s4-1.8 4-4V7c0-2.2-1.8-4-4-4zm-11 32c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />

          {/* Sorriso oficial iFood abaixo de 'oo' */}
          <path d="M52 46c7.5 4 19 4 26.5 0 1.9-1 4.3-.2 5.3 1.7 1 1.9.2 4.3-1.7 5.3-10.8 5.7-27 5.7-37.8 0-1.9-1-2.7-3.4-1.7-5.3 1-1.9 3.4-2.7 5.4-1.7z" />
        </g>
      </svg>
    );
  }

  // Padrão: Marca compacta vetorizada oficial
  return (
    <svg
      viewBox="0 0 95 44"
      style={{ width: numSize * 1.8, height: numSize }}
      className={`inline-block overflow-visible shrink-0 ${className}`}
      aria-label="iFood Oficial"
    >
      <g fill="#EA1D2C">
        {/* 'i' */}
        <circle cx="7" cy="6" r="4.5" />
        <rect x="3.5" y="15" width="7" height="23" rx="3.5" />

        {/* 'f' */}
        <path d="M25 15v-3c0-2.8 2.2-5 5-5 1.5 0 2.9.7 3.8 1.8 1.1 1.4 3.2 1.7 4.6.6s1.7-3.2.6-4.6C36.8 2.1 33.5 1 30 1c-6.6 0-12 5.4-12 12v2h-3.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5H18v12c0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5V22h6c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5H25z" />

        {/* 'oo' */}
        <path fillRule="evenodd" d="M47 13c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
        <path fillRule="evenodd" d="M71 13c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />

        {/* 'd' */}
        <path d="M89 3c-1.9 0-3.5 1.6-3.5 3.5V14.5c-1.5-1-3.4-1.5-5.5-1.5-6.6 0-12 5.4-12 12s5.4 12 12 12c2.1 0 4-.5 5.5-1.5V37c0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5V6.5c0-1.9-1.6-3.5-3.5-3.5zm-8 28c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />

        {/* Sorriso característico iFood abaixo de 'oo' */}
        <path d="M44 38c6 3.5 15 3.5 21 0 1.5-.9 3.5-.3 4.4 1.2.9 1.5.3 3.5-1.2 4.4-8.8 4.8-21.2 4.8-30 0-1.5-.9-2.1-2.9-1.2-4.4.9-1.5 2.9-2.1 4.4-1.2z" />
      </g>
    </svg>
  );
};
