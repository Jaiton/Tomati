import React from 'react';

// Specialized visual packaging artworks for the healthy brands
export const HealthyProductVisual: React.FC<{
  type: string;
  className?: string;
}> = ({ type, className = '' }) => {
  switch (type) {
    case 'hey-mu-doce-de-leite':
      return (
        <div className={`relative w-full h-full bg-[#FAF3E8] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#D47D22_1px,transparent_1px)] [background-size:18px_18px]" />
          
          {/* Glass jar of Hey! Mu Dulce de Leche */}
          <div className="relative z-10 w-36 sm:w-42 flex flex-col items-center">
            {/* White metal lid */}
            <div className="w-24 sm:w-28 h-6 bg-gradient-to-r from-stone-100 via-white to-stone-200 rounded-t-lg shadow-md border border-stone-300" />
            
            {/* Jar body with caramel glow */}
            <div className="w-32 sm:w-38 h-40 sm:h-46 bg-gradient-to-b from-[#B86B1D] via-[#CF7A23] to-[#9C5815] rounded-b-2xl shadow-xl relative overflow-hidden flex flex-col items-center justify-center p-3 border-2 border-white/50">
              <div className="absolute top-2 left-3 w-1.5 h-28 bg-white/20 rounded-full blur-[1px]" />
              
              {/* Modern Minimalist Label */}
              <div className="w-26 sm:w-30 bg-white text-stone-900 rounded-md shadow-md p-2.5 text-center border border-amber-200 z-10">
                <span className="block text-[11px] font-black uppercase tracking-tight text-[#CF7A23] font-sans">
                  HEY! MU
                </span>
                <span className="block text-[9px] font-bold text-stone-800 uppercase tracking-widest mt-0.5">
                  DOCE DE LEITE
                </span>
                <span className="inline-block mt-1 bg-amber-100 text-[#9C5815] text-[7.5px] font-bold px-1.5 py-0.5 rounded">
                  ZERO AÇÚCAR
                </span>
                <div className="mt-1 pt-1 border-t border-stone-100 text-[8px] text-stone-500 font-mono">
                  350G · PROTEICO
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-20 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#9C5815] border border-amber-200 shadow-xs">
            Zero Açúcar Adicionado
          </div>
        </div>
      );

    case 'naveia-bebida-vegetal-barista':
      return (
        <div className={`relative w-full h-full bg-[#EBF2EC] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#2D583B_1px,transparent_1px)] [background-size:18px_18px]" />
          
          {/* Naveia Milk Carton */}
          <div className="relative z-10 w-32 sm:w-36 flex flex-col items-center">
            {/* Gable top carton fold */}
            <div className="w-22 h-6 bg-[#254831] rounded-t-md shadow-md relative flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white/80 border border-stone-300" />
            </div>

            {/* Carton body */}
            <div className="w-26 sm:w-30 h-44 sm:h-50 bg-gradient-to-b from-[#2A5237] to-[#1C3A26] rounded-b-lg shadow-xl relative overflow-hidden p-3 flex flex-col justify-between text-white border-t border-white/20">
              <div className="text-center">
                <span className="block text-sm sm:text-base font-black tracking-tighter uppercase font-sans text-white">
                  NAVEIA
                </span>
                <span className="block text-[8px] tracking-widest text-[#A7D7B5] uppercase font-mono mt-0.5">
                  BARISTA
                </span>
              </div>

              {/* Minimal oat leaf artwork */}
              <div className="self-center my-1 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#A7D7B5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9Z" />
                </svg>
              </div>

              <div className="text-center bg-black/20 p-1 rounded">
                <span className="block text-[7.5px] font-mono tracking-tight text-white/90">
                  100% AVEIA · SEM GLÚTEN
                </span>
                <span className="block text-[7px] text-[#A7D7B5] font-bold">1 LITRO</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-20 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1F3E29] border border-stone-200 shadow-xs">
            100% Plant-Based
          </div>
        </div>
      );

    case 'tocca-pasta-amendoim':
      return (
        <div className={`relative w-full h-full bg-[#FAF4ED] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#C4782A_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Tocca tub container */}
          <div className="relative z-10 w-36 sm:w-42 flex flex-col items-center">
            <div className="w-30 sm:w-36 h-6 bg-[#C4782A] rounded-t-xl shadow-md border-b border-[#965515]" />
            <div className="w-28 sm:w-34 h-38 sm:h-44 bg-gradient-to-b from-[#EFE3D3] to-[#E3D1BA] rounded-b-2xl shadow-xl p-3 flex flex-col justify-between items-center border border-stone-300">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#965515]">
                100% AMENDOIM
              </span>

              {/* Bold Tocca Label */}
              <div className="w-full text-center py-2 px-1 bg-white rounded-lg shadow-xs border border-stone-200">
                <span className="block font-black text-base sm:text-lg tracking-tight text-[#783D07] font-sans">
                  TOCCA
                </span>
                <span className="block text-[8px] font-bold text-stone-600 uppercase tracking-wider">
                  PASTA DE AMENDOIM
                </span>
                <span className="inline-block mt-0.5 bg-amber-100 text-[#783D07] text-[7px] font-bold px-1.5 py-0.5 rounded">
                  CROCANTE
                </span>
              </div>

              <span className="text-[8px] font-mono text-stone-600">450G · PURA ENERGIA</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-20 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#783D07] border border-amber-200 shadow-xs">
            Zero Óleo de Palma
          </div>
        </div>
      );

    case 'yok-k-macarrao-sem-gluten':
      return (
        <div className={`relative w-full h-full bg-[#FFF8F0] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#E05B35_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Yok-k! Modern Pasta Pack */}
          <div className="relative z-10 w-34 sm:w-40 flex flex-col items-center">
            <div className="w-26 sm:w-30 h-44 sm:h-50 rounded-xl bg-gradient-to-b from-white to-[#FDF4EB] shadow-xl border-2 border-[#E05B35]/30 p-3 flex flex-col justify-between">
              <div className="text-center">
                <span className="inline-block bg-[#E05B35] text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                  GLUTEN-FREE
                </span>
                <span className="block font-black text-lg sm:text-xl tracking-tight text-stone-900 mt-1 font-sans">
                  Yok-k!
                </span>
                <span className="block text-[8px] text-stone-500 uppercase tracking-wider">
                  Macarrão Funcional
                </span>
              </div>

              {/* Window silhouette showing pasta */}
              <div className="self-center w-16 h-16 rounded-full bg-[#FCE8D5] border border-[#E05B35]/40 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-dashed border-[#E05B35] rounded-full animate-spin" style={{ animationDuration: '40s' }} />
              </div>

              <div className="text-center border-t border-stone-200 pt-1 text-[8px] text-stone-600 font-mono">
                400G · LEVE & DIGESTIVO
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-20 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#E05B35] border border-orange-200 shadow-xs">
            Sem Glúten Certificado
          </div>
        </div>
      );

    case 'fruit-titus-frutas-chocolate':
      return (
        <div className={`relative w-full h-full bg-[#F5ECE8] overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#4A2810_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Fruit-Titus stand-up pouch */}
          <div className="relative z-10 w-36 sm:w-42 flex flex-col items-center">
            {/* Pouch zip seal top */}
            <div className="w-30 sm:w-34 h-3 bg-[#381E0D] rounded-t-md shadow-xs border-b border-[#241207]" />

            {/* Pouch body */}
            <div className="w-32 sm:w-36 h-42 sm:h-48 bg-gradient-to-b from-[#3E2210] via-[#4D2B15] to-[#2B160A] rounded-b-xl shadow-xl p-3 flex flex-col justify-between text-white border-x border-white/10">
              <div className="text-center">
                <span className="block text-xs sm:text-sm font-black tracking-tight font-sans text-amber-200">
                  FRUIT-TITUS
                </span>
                <span className="block text-[8px] tracking-wider uppercase text-white/80 font-mono">
                  Frutas & Cacau 70%
                </span>
              </div>

              {/* Dried fruit & chocolate graphic */}
              <div className="self-center flex items-center justify-center gap-1.5 my-1">
                <div className="w-7 h-7 rounded-full bg-[#E23E57] border-2 border-white/60 shadow-sm" title="Morango liofilizado" />
                <div className="w-7 h-7 rounded-full bg-[#1A0D06] border-2 border-amber-300 shadow-sm flex items-center justify-center text-[7px] font-bold text-amber-200">
                  70%
                </div>
              </div>

              <div className="text-center bg-white/10 p-1 rounded">
                <span className="block text-[7.5px] font-mono text-white/90">
                  120G · LIOFILIZADO
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-20 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#3E2210] border border-stone-200 shadow-xs">
            Chocolate Nobre 70%
          </div>
        </div>
      );

    case 'combo-rotina-performance':
    default:
      return (
        <div className={`relative w-full h-full bg-gradient-to-br from-[#1F3E29] to-[#14281B] text-white overflow-hidden flex items-center justify-center p-6 ${className}`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#D44A22]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Curated Box Mockup */}
          <div className="relative z-10 w-48 sm:w-56 rounded-2xl bg-[#284E34] border border-white/20 shadow-2xl p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="font-display font-bold text-white text-sm">Box Saudabilidade</span>
              <span className="text-[9px] font-mono bg-[#D44A22] text-white px-2 py-0.5 rounded font-bold">
                5 ITENS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 my-3 text-[9px] text-white/90">
              <div className="bg-white/10 p-1.5 rounded">
                <span className="block font-bold text-white">Hey! Mu</span>
                <span className="text-[7.5px] text-white/70">Doce de Leite</span>
              </div>
              <div className="bg-white/10 p-1.5 rounded">
                <span className="block font-bold text-white">Naveia</span>
                <span className="text-[7.5px] text-white/70">Bebida Aveia 1L</span>
              </div>
              <div className="bg-white/10 p-1.5 rounded">
                <span className="block font-bold text-white">Tocca</span>
                <span className="text-[7.5px] text-white/70">Pasta Amendoim</span>
              </div>
              <div className="bg-white/10 p-1.5 rounded">
                <span className="block font-bold text-white">Yok-k! & Titus</span>
                <span className="text-[7.5px] text-white/70">Massa & Chocolate</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-[#F3EFE6]/80 font-medium">
              Equilíbrio diário para toda a semana
            </div>
          </div>
        </div>
      );
  }
};
