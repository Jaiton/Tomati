import React from 'react';

export interface TomatiIconProps {
  className?: string;
  size?: number | string;
  variant?: 'dark' | 'light' | 'monochrome';
  customLightUrl?: string;
  customDarkUrl?: string;
}

/**
 * Ícone Oficial da Tomati (o badge circular com "t." estilizado)
 * - Se o usuário fez upload de imagem personalizada no Painel Admin, renderiza a imagem.
 * - Caso contrário, renderiza o vetor oficial com alta fidelidade.
 */
export const TomatiIcon: React.FC<TomatiIconProps> = ({
  className = '',
  size = 28,
  variant = 'dark',
  customLightUrl,
  customDarkUrl,
}) => {
  const isLight = variant === 'light';
  const numSize = typeof size === 'number' ? size : 28;

  // Imagem customizada uploaded pelo admin
  const customImg = isLight ? customDarkUrl : customLightUrl;
  if (customImg) {
    return (
      <img
        src={customImg}
        alt="Tomati"
        className={`inline-block object-contain rounded-full shrink-0 ${className}`}
        style={{ width: numSize, height: numSize }}
      />
    );
  }

  const circleBg = isLight ? '#FFFFFF' : '#1F3E29';
  const textColor = isLight ? '#1F3E29' : '#FFFFFF';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-sans font-black select-none shrink-0 shadow-2xs ${className}`}
      style={{
        width: numSize,
        height: numSize,
        backgroundColor: circleBg,
        color: textColor,
      }}
      title="Tomati Oficial"
      aria-label="Tomati"
    >
      <span
        className="font-black tracking-tighter"
        style={{
          fontSize: `${numSize * 0.58}px`,
          lineHeight: 1,
          transform: 'translateY(-1px)',
        }}
      >
        t.
      </span>
    </div>
  );
};

export interface TomatiLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIconOnly?: boolean;
  withBadge?: boolean;
  customLightBgUrl?: string;
  customDarkBgUrl?: string;
}

/**
 * Logotipo Oficial da Tomati
 * - Se o usuário fez upload de logotipo oficial no Painel Admin, exibe a imagem customizada com perfeição.
 * - Suporta arquivos PNG, SVG e fotos para fundo claro e escuro.
 */
export const TomatiLogo: React.FC<TomatiLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showIconOnly = false,
  withBadge = false,
  customLightBgUrl,
  customDarkBgUrl,
}) => {
  const isLight = variant === 'light';
  const greenColor = isLight ? '#FFFFFF' : '#1F3E29';
  const circleBg = isLight ? '#FFFFFF' : '#1F3E29';
  const circleTextColor = isLight ? '#1F3E29' : '#FFFFFF';
  const tomatoRed = variant === 'monochrome' ? greenColor : '#D44A22';

  // Mapeamento de dimensões (lg aumentado em ~40% para destaque limpo)
  const heightPx = {
    sm: 26,
    md: 34,
    lg: 48,
    xl: 58,
  }[size];

  // Se houver logo personalizada carregada no Admin
  const customLogoUrl = isLight ? customDarkBgUrl : customLightBgUrl;

  // 1. Apenas Ícone Oficial
  if (showIconOnly) {
    return <TomatiIcon size={heightPx} variant={variant} className={className} />;
  }

  // 2. Renderização da Logo
  if (customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt="Tomati Oficial"
        className={`inline-block object-contain select-none shrink-0 ${className}`}
        style={{
          height: heightPx,
          width: 'auto',
          display: 'block',
          flexShrink: 0,
          maxWidth: 'none',
        }}
        loading="eager"
        decoding="async"
      />
    );
  }

  // Sem logo na base de dados: exibe a marca em tipografia elegante e limpa
  return (
    <span
      className={`inline-flex items-center font-serif font-black tracking-tight select-none shrink-0 ${className}`}
      style={{
        fontSize: `${heightPx * 0.76}px`,
        color: isLight ? '#FFFFFF' : '#1F3E29',
        lineHeight: 1,
      }}
    >
      tomati<span style={{ color: '#FFC93C' }}>.</span>
    </span>
  );
};
