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
  if (customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt="Tomati"
        className={`inline-block object-contain select-none shrink-0 ${className}`}
        style={{ height: heightPx, width: 'auto' }}
      />
    );
  }

  // 1. Apenas Ícone Oficial
  if (showIconOnly) {
    return <TomatiIcon size={heightPx} variant={variant} className={className} />;
  }

  // 2. Composição Oficial com Ícone + Tipografia
  if (withBadge) {
    const logoWidth = heightPx * 4.3;
    return (
      <div className={`inline-flex items-center select-none shrink-0 ${className}`} style={{ height: heightPx, width: logoWidth, flexShrink: 0, minWidth: logoWidth }}>
        <svg
          viewBox="0 0 520 120"
          preserveAspectRatio="xMidYMid meet"
          style={{ height: heightPx, width: logoWidth, flexShrink: 0 }}
          className="h-full overflow-visible"
          aria-label="Tomati Oficial"
        >
          <circle cx="60" cy="60" r="56" fill={circleBg} />
          <text
            x="58"
            y="81"
            fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="76"
            fill={circleTextColor}
            textAnchor="middle"
            letterSpacing="-2px"
          >
            t.
          </text>
          <text
            x="142"
            y="82"
            fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="78"
            fill={greenColor}
            letterSpacing="-3px"
          >
            tomati<tspan fill={tomatoRed}>.</tspan>
          </text>
        </svg>
      </div>
    );
  }

  // 3. Tipografia Pura Oficial (Default - tomati.)
  const pureWidth = Math.round(heightPx * 3.46);
  return (
    <div
      className={`inline-flex items-center select-none group shrink-0 ${className}`}
      style={{ height: heightPx, width: pureWidth, flexShrink: 0, minWidth: pureWidth }}
    >
      <svg
        viewBox="0 0 380 110"
        preserveAspectRatio="xMidYMid meet"
        style={{ height: heightPx, width: pureWidth, flexShrink: 0, display: 'block' }}
        className="h-full overflow-visible transition-transform duration-200 group-hover:scale-[1.01]"
        aria-label="Tomati Oficial"
      >
        <text
          x="2"
          y="86"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="96"
          fill={greenColor}
          letterSpacing="-3.5px"
        >
          tomati<tspan fill={tomatoRed}>.</tspan>
        </text>
      </svg>
    </div>
  );
};
