import React from 'react';

// Specialized artistic, gourmet visuals that render reliably in any sandbox environment

export const SanMarzanoHeroVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1F3E29] via-[#162C1D] to-[#0E1C13] text-white p-6 sm:p-10 shadow-2xl ${className}`}>
    {/* Subtle atmospheric glow */}
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D44A22]/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2D583B]/30 rounded-full blur-3xl pointer-events-none" />
    
    {/* Top editorial kicker bar */}
    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs uppercase tracking-wider text-white/70">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#D44A22] animate-pulse" />
        <span className="font-medium text-white/90">Atelier Tomati · Cozinha & Redução Lenta</span>
      </div>
      <span className="text-white/50 hidden sm:inline">Colheita Selecionada · Sem Conservantes</span>
    </div>

    {/* Centerpiece Composition: Artisanal Cookware & Fresh Ingredients */}
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-7 space-y-4">
        <div className="inline-block px-3 py-1 rounded bg-white/10 backdrop-blur-md text-[11px] font-semibold text-[#F3EFE6] tracking-wide border border-white/10">
          PROCESSO ARTESANAL DE 6 HORAS
        </div>
        <h3 className="font-display text-2xl sm:text-4xl text-white font-medium leading-tight">
          Tomates colhidos no sol da manhã. Reduzidos pacientemente até a doçura máxima.
        </h3>
        <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
          Cada lote da Tomati passa pelo fogo brando com azeite extravirgem prensado a frio, dentes de alho confitados e folhas frescas de manjericão genovês. O aroma que preenche a sua casa assim que você abre o pote.
        </p>

        {/* Sensory notes */}
        <div className="pt-2 flex flex-wrap gap-4 sm:gap-6 text-xs text-white/90">
          <div className="border-l-2 border-[#D44A22] pl-3">
            <span className="block text-white/50 text-[10px] uppercase tracking-wider">Acidez</span>
            <span className="font-semibold text-white">Naturalmente Suave (sem açúcar)</span>
          </div>
          <div className="border-l-2 border-[#D44A22] pl-3">
            <span className="block text-white/50 text-[10px] uppercase tracking-wider">Textura</span>
            <span className="font-semibold text-white">Aveludada & Rústica</span>
          </div>
          <div className="border-l-2 border-[#D44A22] pl-3">
            <span className="block text-white/50 text-[10px] uppercase tracking-wider">Tempo no Fogo</span>
            <span className="font-semibold text-white">360 minutos de redução</span>
          </div>
        </div>
      </div>

      {/* Visual illustration of the Gourmet Pot & Fresh Basil */}
      <div className="md:col-span-5 relative flex items-center justify-center p-4">
        <div className="w-full max-w-[320px] aspect-square rounded-2xl bg-gradient-to-b from-[#254A31] to-[#14281B] border border-white/15 p-6 flex flex-col items-center justify-between shadow-inner relative overflow-hidden group">
          {/* Steam aura */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D44A22]/25 rounded-full blur-2xl pointer-events-none" />

          {/* Badge */}
          <div className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest text-[#F3EFE6]/70">
            <span>Lote Fresco</span>
            <span className="text-[#D44A22] font-bold">100% Puro</span>
          </div>

          {/* Pot Graphic & Pure Organic Tomato Elements */}
          <div className="relative my-2 w-48 h-48 flex items-center justify-center">
            {/* The Pan */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#A63C1E] via-[#C94723] to-[#E25C34] shadow-2xl relative border-4 border-[#8C3117] flex items-center justify-center overflow-hidden">
              {/* Sauce gloss & swirls */}
              <div className="absolute inset-0 bg-radial from-transparent to-[#7D2810]/60" />
              <div className="absolute w-24 h-24 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '30s' }} />
              
              {/* Floating basil leaves & olive oil drizzle */}
              <div className="absolute top-8 left-10 w-8 h-4 bg-[#2D583B] rounded-full rotate-45 border border-white/30 shadow-md" />
              <div className="absolute bottom-10 right-10 w-10 h-5 bg-[#3B724D] rounded-full -rotate-12 border border-white/30 shadow-md" />
              <div className="absolute top-12 right-12 w-3 h-3 rounded-full bg-[#E5B537] shadow-lg" title="Azeite extravirgem" />
              
              {/* Tomato emblem */}
              <div className="text-center z-10">
                <span className="font-display italic text-white text-lg font-bold drop-shadow">tomati</span>
                <span className="block text-[9px] uppercase tracking-widest text-white/80 font-sans">San Marzano</span>
              </div>
            </div>

            {/* Fresh Tomato on side */}
            <div className="absolute -bottom-2 -left-2 w-14 h-14 rounded-full bg-gradient-to-br from-[#E24C27] to-[#A3290D] shadow-xl border-2 border-white/20 flex items-center justify-center">
              {/* stem */}
              <div className="w-3 h-3 bg-[#2D583B] rounded-t-full -mt-7 shadow" />
            </div>
            
            {/* Garlic clove on side */}
            <div className="absolute -top-1 -right-2 w-10 h-10 rounded-full bg-[#F5EEDB] shadow-md border border-[#D5CBB5] flex items-center justify-center text-[10px] font-serif text-[#655843]">
              alho
            </div>
          </div>

          {/* Footer info inside card */}
          <div className="w-full text-center">
            <span className="text-xs font-serif italic text-[#F3EFE6]">
              "Pronto para aquecer e envolver sua massa favorita."
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ProductVisualArt: React.FC<{
  type: 'pomodoro' | 'tagliolini' | 'focaccia' | 'lasagna' | 'arrabbiata' | 'box' | 'ravioli' | 'rustico';
  className?: string;
}> = ({ type, className = '' }) => {
  switch (type) {
    case 'pomodoro':
      return (
        <div className={`relative w-full h-full bg-[#F3EFE6] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          {/* Subtle paper texture pattern */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1F3E29_0.75px,transparent_0.75px)] [background-size:16px_16px]" />
          
          {/* Glass Jar Mockup */}
          <div className="relative z-10 w-36 sm:w-44 flex flex-col items-center">
            {/* Metal/Brass lid */}
            <div className="w-24 sm:w-28 h-6 bg-gradient-to-r from-[#D9A05B] via-[#F2CA85] to-[#BF8845] rounded-t-md shadow-md border-b border-[#9C6D32]" />
            <div className="w-22 h-2 bg-[#8C5E26] shadow-inner" />
            
            {/* Glass body filled with rich red pomodoro */}
            <div className="w-32 sm:w-40 h-44 sm:h-52 bg-gradient-to-b from-[#B83818] via-[#CF421F] to-[#99280E] rounded-b-2xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-3 border-2 border-white/30">
              {/* Texture seeds & herbs */}
              <div className="absolute top-4 left-6 w-2 h-2 rounded-full bg-[#7D1E08] opacity-70" />
              <div className="absolute bottom-8 right-6 w-3 h-1.5 bg-[#254A31] rounded-full rotate-45 opacity-80" />
              <div className="absolute top-16 right-8 w-2 h-2 rounded-full bg-[#E5B537] opacity-60" />
              
              {/* Paper Label */}
              <div className="w-26 sm:w-32 bg-[#FAF7F2] text-[#1F3E29] rounded shadow-md p-2.5 sm:p-3 text-center border border-[#E0D7C5] z-10">
                <div className="text-[9px] uppercase tracking-widest text-[#D44A22] font-bold">Colheita D.O.P.</div>
                <div className="font-display font-bold text-base sm:text-lg leading-none mt-0.5 text-[#1F3E29]">
                  tomati<span className="text-[#D44A22]">.</span>
                </div>
                <div className="text-[10px] font-serif italic text-stone-600 mt-1">Pomodoro San Marzano</div>
                <div className="mt-2 pt-1 border-t border-stone-200 text-[8px] text-stone-500 font-mono tracking-tighter">
                  500G · 100% ARTESANAL
                </div>
              </div>
            </div>

            {/* Reflection shine */}
            <div className="absolute top-8 left-5 w-2 h-36 bg-white/20 rounded-full blur-[1px] pointer-events-none" />
          </div>

          {/* Fresh ingredient accents on side */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-medium text-[#1F3E29] border border-stone-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D44A22]" />
            <span>Fogo brando 6h</span>
          </div>
        </div>
      );

    case 'tagliolini':
      return (
        <div className={`relative w-full h-full bg-[#F7F4EC] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C48B57_0.75px,transparent_0.75px)] [background-size:16px_16px]" />
          
          {/* Fresh Golden Pasta Nest Illustration */}
          <div className="relative z-10 w-44 sm:w-52 h-44 sm:h-52 flex items-center justify-center">
            {/* Circular wooden board */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8DAC2] to-[#D5C2A3] border-4 border-[#C7B18E] shadow-xl flex items-center justify-center">
              {/* Flour dust */}
              <div className="absolute inset-2 rounded-full border border-white/50 opacity-60" />
            </div>

            {/* Swirling pasta nest */}
            <div className="relative z-10 w-36 h-36 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F4CA64" strokeWidth="6" strokeDasharray="18 4" strokeLinecap="round" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#E5B245" strokeWidth="6" strokeDasharray="14 3" strokeLinecap="round" />
                <circle cx="50" cy="50" r="22" fill="none" stroke="#F4CA64" strokeWidth="6" strokeDasharray="10 3" strokeLinecap="round" />
                <circle cx="50" cy="50" r="14" fill="none" stroke="#E5B245" strokeWidth="5" strokeLinecap="round" />
              </svg>

              {/* Egg Yolk in center */}
              <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-[#EA7A1A] to-[#FFB703] shadow-md border-2 border-white/60" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-medium text-[#1F3E29] border border-stone-200 shadow-sm">
            <span>Semolina 100% Grano Duro</span>
          </div>
        </div>
      );

    case 'focaccia':
      return (
        <div className={`relative w-full h-full bg-[#FAF5ED] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          {/* Baking stone background */}
          <div className="relative z-10 w-48 sm:w-56 h-36 sm:h-44 rounded-2xl bg-gradient-to-br from-[#E2B97A] via-[#D3A25E] to-[#B37E3A] shadow-xl border-4 border-[#9C682B] p-4 flex flex-col justify-between overflow-hidden">
            {/* Blistered crust details */}
            <div className="absolute top-2 left-6 w-6 h-6 rounded-full bg-[#D44A22] shadow-inner border border-[#9C2809] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5C1605]" />
            </div>
            <div className="absolute bottom-4 right-8 w-7 h-7 rounded-full bg-[#D44A22] shadow-inner border border-[#9C2809]" />
            <div className="absolute top-8 right-12 w-5 h-5 rounded-full bg-[#E05B35] shadow-inner" />
            
            {/* Rosemary needles */}
            <div className="absolute top-6 left-16 w-6 h-1 bg-[#254A31] rotate-45 rounded-full" />
            <div className="absolute bottom-8 left-10 w-8 h-1 bg-[#254A31] -rotate-12 rounded-full" />
            <div className="absolute top-12 right-6 w-5 h-1 bg-[#254A31] rotate-12 rounded-full" />

            {/* Sea salt crystal flakes */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-white/90 rotate-45 shadow-sm" />
            <div className="absolute bottom-6 left-24 w-1.5 h-1.5 bg-white/90 rotate-12 shadow-sm" />
            <div className="absolute top-14 left-8 w-2 h-2 bg-white/90 rotate-45 shadow-sm" />

            {/* Dimples */}
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display italic text-[#4A2D12] text-sm font-bold bg-white/40 px-3 py-1 rounded-full backdrop-blur-xs">
                Fermentação 48h
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full text-[11px] font-medium text-[#1F3E29] border border-stone-200 shadow-sm">
            <span>Azeite & Flor de Sal</span>
          </div>
        </div>
      );

    case 'lasagna':
      return (
        <div className={`relative w-full h-full bg-[#F5EFE6] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          {/* Ceramic baking dish */}
          <div className="relative z-10 w-48 sm:w-56 h-36 sm:h-44 rounded-xl bg-white shadow-2xl border-2 border-stone-200 p-2 flex items-center justify-center">
            {/* Golden gratin layer */}
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#CF4925] via-[#E8A54D] to-[#992E12] shadow-inner p-3 relative overflow-hidden flex flex-col justify-between">
              {/* Melted cheese streaks */}
              <div className="absolute inset-0 bg-radial from-transparent to-black/20" />
              <div className="absolute top-2 left-4 w-20 h-4 bg-[#FFF1B8]/60 rounded-full rotate-6 blur-[1px]" />
              <div className="absolute bottom-4 right-4 w-28 h-5 bg-[#FFF1B8]/70 rounded-full -rotate-3 blur-[1px]" />
              
              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] uppercase font-bold text-white bg-black/30 px-2 py-0.5 rounded">
                  Gratinado
                </span>
                <span className="text-[10px] text-white/90 font-mono">850G</span>
              </div>

              <div className="text-center z-10">
                <span className="font-display text-white text-base font-bold drop-shadow">
                  Ragù & Fonduta
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full text-[11px] font-medium text-[#1F3E29] border border-stone-200 shadow-sm">
            <span>Serve 2 pessoas</span>
          </div>
        </div>
      );

    case 'box':
      return (
        <div className={`relative w-full h-full bg-gradient-to-br from-[#1F3E29] to-[#14281B] text-white overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D44A22]/20 rounded-full blur-2xl" />
          
          {/* Complete Gourmet Kit Box Graphic */}
          <div className="relative z-10 w-48 sm:w-56 h-40 sm:h-48 rounded-xl bg-[#2A4D35] border border-white/20 shadow-2xl p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="font-display font-bold text-white">Box Domenica</span>
              <span className="text-[10px] font-mono bg-[#D44A22] text-white px-2 py-0.5 rounded">
                COMPLETO
              </span>
            </div>

            {/* Content silhouettes */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-white/80 my-2">
              <div className="bg-white/10 p-1.5 rounded text-center">
                <span className="block font-bold text-white">2x Tagliolini</span>
                <span className="text-[8px] text-white/60">Massa Fresca</span>
              </div>
              <div className="bg-white/10 p-1.5 rounded text-center">
                <span className="block font-bold text-white">2x Pomodoro</span>
                <span className="text-[8px] text-white/60">San Marzano</span>
              </div>
              <div className="bg-white/10 p-1.5 rounded text-center">
                <span className="block font-bold text-white">1x Focaccia</span>
                <span className="text-[8px] text-white/60">Fermentação 48h</span>
              </div>
              <div className="bg-white/10 p-1.5 rounded text-center">
                <span className="block font-bold text-white">Parmigiano</span>
                <span className="text-[8px] text-white/60">Cunha 24 meses</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-[#F3EFE6]/70">
              Serve 4 pessoas com abundância
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`relative w-full h-full bg-[#F3EFE6] flex items-center justify-center p-6 ${className}`}>
          <div className="w-24 h-24 rounded-full bg-[#D44A22]/20 flex items-center justify-center text-[#D44A22]">
            <span className="font-display font-bold text-xl">tomati.</span>
          </div>
        </div>
      );
  }
};
