import React from 'react';
import { X, Share2, PlusSquare, Smartphone, Check, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-sm bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header no Padrão Oficial Tomati */}
        <div className="py-3.5 px-4 bg-[#14201A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/pwa-192x192.png" alt="Tomati" className="w-7 h-7 rounded-lg shadow-xs" />
            <div>
              <h4 className="text-sm font-bold leading-tight">Instalar App Tomati</h4>
              <span className="text-[10px] text-white/60 font-mono">iOS & Android PWA</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Fechar"
          >
            <X size={15} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-5 space-y-4">
          {isIOS ? (
            /* Guia Passo a Passo Exclusivo para iPhone / iPad */
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold block text-emerald-900 mb-0.5">Como instalar no seu iPhone / iPad:</span>
                <p className="text-[11px] text-emerald-800">
                  Instale o Tomati diretamente na sua tela inicial sem precisar da App Store:
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-[#14201A] text-white flex items-center justify-center shrink-0">
                    <Share2 size={15} />
                  </div>
                  <div>
                    <strong className="block text-stone-900">1. Toque em Compartilhar</strong>
                    <span className="text-[11px] text-stone-500">Na barra inferior do Safari, toque no ícone de compartilhamento (quadrado com seta).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-[#14201A] text-white flex items-center justify-center shrink-0">
                    <PlusSquare size={15} />
                  </div>
                  <div>
                    <strong className="block text-stone-900">2. Adicionar à Tela de Início</strong>
                    <span className="text-[11px] text-stone-500">Role a lista para baixo e toque em "Adicionar à Tela de Início".</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-[#14201A] text-white flex items-center justify-center shrink-0">
                    <Check size={15} />
                  </div>
                  <div>
                    <strong className="block text-stone-900">3. Toque em Adicionar</strong>
                    <span className="text-[11px] text-stone-500">Confirme no canto superior direito. O ícone oficial da Tomati aparecerá como app nativo!</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Guia Android / Chrome / Desktop */
            <div className="space-y-3.5">
              <div className="text-center py-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#14201A] text-white flex items-center justify-center shadow-md mb-2.5">
                  <Smartphone size={28} />
                </div>
                <h4 className="text-base font-bold text-[#14201A]">Acesso rápido a dois toques</h4>
                <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
                  Instale o aplicativo da Tomati no seu aparelho para abrir em tela cheia com alta velocidade e suporte offline.
                </p>
              </div>

              {isInstallable ? (
                <button
                  onClick={async () => {
                    await install();
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-full bg-[#14201A] hover:bg-[#1f3e29] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <Download size={16} />
                  <span>Instalar Agora</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-center">
                  <span>Toque nos <strong>três pontinhos do navegador (⋮)</strong> e selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
