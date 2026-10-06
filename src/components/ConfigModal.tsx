import React, { useState } from 'react';
import { StoreConfig } from '../types';
import { X, Save, RefreshCw, Check, Link2, MapPin, Clock } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  onSave: (newConfig: StoreConfig) => void;
  onReset: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<StoreConfig>({ ...config });
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 size={18} className="text-[#D44A22]" />
            <h3 className="font-display font-bold text-lg text-[#1F3E29]">
              Configurar Links & Canais da Tomati
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <p className="text-xs text-stone-600">
            Personalize os destinos dos botões de compra, redes sociais e informações de entrega para as campanhas da loja. Os dados são salvos no navegador.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Link do Portal de Pedidos Oficial
              </label>
              <input
                type="url"
                required
                value={formData.portalUrl}
                onChange={(e) => setFormData({ ...formData, portalUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29]"
                placeholder="https://pedido.tomati.com.br"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Link da Loja no iFood
              </label>
              <input
                type="url"
                required
                value={formData.ifoodUrl}
                onChange={(e) => setFormData({ ...formData, ifoodUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-[#1F3E29] focus:ring-1 focus:ring-[#1F3E29]"
                placeholder="https://www.ifood.com.br/delivery/..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Link do Instagram
                </label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#1F3E29]"
                  placeholder="https://instagram.com/tomati.oficial"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Link do TikTok
                </label>
                <input
                  type="url"
                  value={formData.tiktokUrl}
                  onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#1F3E29]"
                  placeholder="https://tiktok.com/@tomati.br"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <MapPin size={13} /> Região Atendida
              </label>
              <input
                type="text"
                value={formData.deliveryRegions}
                onChange={(e) => setFormData({ ...formData, deliveryRegions: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#1F3E29]"
                placeholder="São Paulo e principais bairros"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Clock size={13} /> Horário de Atendimento
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#1F3E29]"
                placeholder="Terça a Domingo: 11h às 22h30"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Restaurar Padrão</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1F3E29] hover:bg-[#14281B] text-white text-xs font-semibold transition-colors shadow-sm"
              >
                {savedNotice ? <Check size={14} /> : <Save size={14} />}
                <span>{savedNotice ? 'Salvo!' : 'Salvar Alterações'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
