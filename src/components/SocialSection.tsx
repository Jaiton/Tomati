import React from 'react';
import { StoreConfig, CommunityPost } from '../types';
import { Instagram, Play, ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';

interface SocialSectionProps {
  config: StoreConfig;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ config }) => {
  const defaultSocialPosts: CommunityPost[] = [
    {
      id: 'post-1',
      title: 'Panqueca proteica com Hey! Mu doce de leite zero açúcar pronta em 5 minutos.',
      tag: 'Receita Saudável',
      duration: '0:38',
      gradient: 'from-[#CF7A23] to-[#7D400A]',
      platform: 'instagram',
      link: config.instagramUrl,
    },
    {
      id: 'post-2',
      title: 'A espuma cremosa perfeita para seu café ou matcha usando Naveia Barista.',
      tag: 'Café & Bebidas',
      duration: '0:29',
      gradient: 'from-[#2D583B] to-[#142C1D]',
      platform: 'tiktok',
      link: config.tiktokUrl,
    },
    {
      id: 'post-3',
      title: 'Crocância pura: por que a pasta de amendoim Tocca é tão densa e sem óleo de palma.',
      tag: 'Nutrição & Energia',
      duration: '0:42',
      gradient: 'from-[#C4782A] to-[#6E3C0B]',
      platform: 'instagram',
      link: config.instagramUrl,
    },
    {
      id: 'post-4',
      title: 'Snack inteligente para a tarde: o crocante da fruta Fruit-Titus com chocolate 70%.',
      tag: 'Snacks & Treino',
      duration: '0:34',
      gradient: 'from-[#4A2810] to-[#211105]',
      platform: 'tiktok',
      link: config.tiktokUrl,
    },
  ];

  const socialPosts = config.communityPosts && config.communityPosts.length > 0
    ? config.communityPosts
    : defaultSocialPosts;

  return (
    <section id="comunidade" className="py-10 sm:py-14 bg-[#F5F1E8] border-t border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header com Apenas os Ícones das Redes (como solicitado) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-300/80">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D44A22] font-semibold">
              <Sparkles size={14} />
              <span>Rotina & Comunidade</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#1F3E29] tracking-tight">
              Acompanhe a comunidade Tomati
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Dicas práticas de receitas saudáveis, novidades das marcas parceiras e lifestyle de alta nutrição.
            </p>
          </div>

          {/* APENAS OS ÍCONES DAS REDES (sem escrita, exatamente como no cabeçalho e rodapé) */}
          <div className="flex items-center gap-2">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#1F3E29] text-stone-700 hover:text-white border border-stone-300 flex items-center justify-center shadow-2xs transition-all hover:-translate-y-0.5 cursor-pointer"
              title="Instagram Oficial"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href={config.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#1F3E29] text-stone-700 hover:text-white border border-stone-300 flex items-center justify-center shadow-2xs transition-all hover:-translate-y-0.5 cursor-pointer"
              title="TikTok Oficial"
              aria-label="TikTok"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.71a8.21 8.21 0 0 0 4.9 1.6v-3.5a4.85 4.85 0 0 1-1-.12z" />
              </svg>
            </a>

            <a
              href={config.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#25D366] text-stone-700 hover:text-white border border-stone-300 flex items-center justify-center shadow-2xs transition-all hover:-translate-y-0.5 cursor-pointer"
              title="WhatsApp Oficial"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Editorial Story / Reels Grid com suporte a fotos de capa personalizadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {socialPosts.map((post, idx) => (
            <a
              key={post.id || idx}
              href={post.link || config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-white border border-stone-300/80 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Media card visual header */}
              <div
                className={`relative h-44 ${post.gradient || 'from-[#1F3E29] to-[#0E1F13]'} text-white p-4 flex flex-col justify-between overflow-hidden bg-cover bg-center`}
                style={post.coverImageUrl ? { backgroundImage: `url(${post.coverImageUrl})` } : undefined}
              >
                {post.coverImageUrl && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                )}

                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] uppercase font-mono tracking-wider bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-white/90">
                    {post.tag}
                  </span>
                  {post.duration && (
                    <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded">
                      {post.duration}
                    </span>
                  )}
                </div>

                {/* Central Play Indicator */}
                <div className="self-center z-10 w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play size={16} className="text-white fill-white translate-x-0.5" />
                </div>

                <div className="flex justify-between items-end z-10 text-[11px] text-white/90">
                  <span className="font-semibold">{post.platform === 'instagram' ? 'Reels' : 'TikTok'}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                    Assistir <ArrowUpRight size={11} />
                  </span>
                </div>

                {/* Ambient glow */}
                {!post.coverImageUrl && (
                  <div className="absolute inset-0 bg-radial from-transparent to-black/40" />
                )}
              </div>

              {/* Title & Caption snippet */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <p className="text-xs font-medium text-stone-800 leading-snug group-hover:text-[#1F3E29] transition-colors">
                  "{post.title}"
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>{post.platform === 'instagram' ? '@tomati.oficial' : '@tomati.br'}</span>
                  <span className="text-[#D44A22] font-semibold flex items-center gap-1">
                    Ver post <ArrowUpRight size={10} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
