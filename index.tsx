import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera, 
  Film, 
  Image as ImageIcon, 
  PlusCircle, 
  User, 
  Search,
  MoreVertical,
  Zap,
  Lock,
  Mail,
  ArrowRight,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Check,
  Video,
  ArrowLeft,
  ShoppingCart,
  ExternalLink,
  Tag,
  MonitorPlay,
  Sparkles,
  Wind,
  Sun
} from 'lucide-react';

// Tipos de conteúdo
type TabType = 'shorts' | 'photos' | 'videos' | 'shop';
type VideoFilter = 'none' | 'vintage' | 'neon' | 'pastel';

interface PhotoItem {
  id: number;
  url: string;
  title: string;
  affiliateLink?: string;
}

interface VideoItem {
  id: number;
  title: string;
  duration: string;
  author: string;
  views: string;
  thumb: string;
  videoUrl?: string;
  tiktokUrl?: string;
  filter?: VideoFilter;
}

interface ShopItem {
  id: number;
  name: string;
  price: string;
  image: string;
  link: string;
  category: string;
}

// Ícone customizado do TikTok (aproximado usando SVG)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.13-.09-.27-.18-.4-.28.02 3.53.01 7.06-.01 10.58-.14 2.39-1.39 4.73-3.43 5.85-2.32 1.27-5.39 1.18-7.62-.24-2.11-1.34-3.21-3.92-2.73-6.37.38-1.92 1.69-3.63 3.49-4.38.83-.34 1.73-.51 2.63-.51v4.02c-.89.06-1.78.35-2.48.92-.81.65-1.2 1.71-1.04 2.72.13 1.01.88 1.86 1.8 2.22 1.14.45 2.5.21 3.39-.62.59-.56.88-1.35.88-2.15V.02z"/>
  </svg>
);

// Componente de Borboleta Flutuante para o Background
const FloatingButterfly = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute pointer-events-none butterfly-float opacity-20" style={style}>
    <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF69B4">
      <path d="M12,10c0,0-1-3-3-3s-4,2-4,4s2,4,4,4c0,0,1,3,3,3s3-3,3-3s2,1,4-1s2-4,2-4s-2-2-4-2S12,10,12,10z"/>
    </svg>
  </div>
);

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-8 bg-gradient-to-br from-[#FFF0F5] to-[#FFB6C1]">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingButterfly style={{ top: '15%', left: '10%' }} />
        <FloatingButterfly style={{ top: '60%', right: '5%' }} />
        <FloatingButterfly style={{ bottom: '10%', left: '20%' }} />
      </div>

      <div className="z-10 w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 pink-gradient rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform rotate-12 transition-transform hover:rotate-0 duration-500">
          <Zap className="text-white w-12 h-12" fill="white" />
        </div>
        
        <h1 className="text-4xl font-bold text-pink-600 mb-2 tracking-tighter uppercase">
          {isSignup ? 'Novo ID Livo' : 'LIVO'}
        </h1>
        <p className="text-pink-400 font-medium mb-10 text-center">
          {isSignup ? 'Crie seu perfil no mundo rosa.' : 'Capture momentos, espalhe cores.'}
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {isSignup && (
            <div className="relative animate-in slide-in-from-top duration-300">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={18} />
              <input 
                type="text" 
                placeholder="Nome Butterfly" 
                required
                className="w-full bg-white/60 backdrop-blur-md border border-pink-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-pink-400 text-pink-900 placeholder-pink-300 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={18} />
            <input 
              type="email" 
              placeholder="Seu e-mail Butterfly" 
              required
              className="w-full bg-white/60 backdrop-blur-md border border-pink-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-pink-400 text-pink-900 placeholder-pink-300 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={18} />
            <input 
              type="password" 
              placeholder="Senha mágica" 
              required
              className="w-full bg-white/60 backdrop-blur-md border border-pink-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-pink-400 text-pink-900 placeholder-pink-300 transition-all"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full pink-gradient text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-200 flex items-center justify-center gap-2 group active:scale-95 transition-all disabled:opacity-70"
          >
            {loading ? (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            ) : (
              <>
                {isSignup ? 'Começar Jornada' : 'Entrar no Mundo'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4 w-full">
          {!isSignup && (
            <button className="text-pink-500 text-sm font-semibold hover:underline">Esqueceu sua senha?</button>
          )}
          
          <div className="flex items-center gap-2 w-full text-pink-300">
            <div className="h-[1px] bg-pink-200 flex-1"></div>
            <span className="text-xs uppercase tracking-widest">OU</span>
            <div className="h-[1px] bg-pink-200 flex-1"></div>
          </div>

          <button 
            onClick={() => setIsSignup(!isSignup)}
            className="flex items-center gap-2 bg-white/40 border border-white px-8 py-3 rounded-full text-pink-500 text-sm font-bold shadow-sm active:scale-95 transition-all hover:bg-white/60"
          >
            {isSignup ? (
              <><ArrowLeft size={16} /> Já tenho conta</>
            ) : (
              <><Zap size={14} fill="currentColor" /> Criar Livo ID</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const LivoApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('shorts');
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [photoList, setPhotoList] = useState<PhotoItem[]>([
    { id: 101, url: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=400', title: 'Sunset Glow', affiliateLink: 'https://example.com/filter-pack' },
    { id: 102, url: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400', title: 'Pink Flowers' },
    { id: 103, url: 'https://images.unsplash.com/photo-1523480717984-24cba357d537?auto=format&fit=crop&q=80&w=400', title: 'Neon Aesthetic', affiliateLink: 'https://example.com/neon-lights' },
    { id: 104, url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400', title: 'Soft Clouds' },
    { id: 105, url: 'https://images.unsplash.com/photo-1615184697985-c9bdf1f07ad7?auto=format&fit=crop&q=80&w=400', title: 'Abstract Pink', affiliateLink: 'https://example.com/brush-set' },
    { id: 106, url: 'https://images.unsplash.com/photo-1563281544-41bbfa4940ee?auto=format&fit=crop&q=80&w=400', title: 'Glitter' },
  ]);

  const [videoList, setVideoList] = useState<VideoItem[]>([
    { 
      id: 201, 
      title: 'Tutorial de Maquiagem Butterfly', 
      duration: '15:20', 
      author: 'Beauty Guru', 
      views: '1.2M views', 
      thumb: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
      tiktokUrl: 'https://tiktok.com',
      filter: 'none'
    },
    { 
      id: 202, 
      title: 'Minha rotina matinal estética', 
      duration: '10:45', 
      author: 'Livo Daily', 
      views: '850k views', 
      thumb: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=800',
      tiktokUrl: 'https://tiktok.com',
      filter: 'none'
    },
  ]);

  const shopItems: ShopItem[] = [
    { id: 1, name: 'Paleta Butterfly', price: 'R$ 89,90', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400', link: '#', category: 'Make' },
    { id: 2, name: 'Luminária Neon', price: 'R$ 145,00', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400', link: '#', category: 'Decor' },
    { id: 3, name: 'Gloss Transparente', price: 'R$ 29,90', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400', link: '#', category: 'Beleza' },
    { id: 4, name: 'Case Rosa Livo', price: 'R$ 45,00', image: 'https://images.unsplash.com/photo-1586105251261-72a756657311?auto=format&fit=crop&q=80&w=400', link: '#', category: 'Acessórios' },
  ];

  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPhoto: PhotoItem = {
        id: Date.now(),
        url: url,
        title: 'Nova Memória ✨'
      };
      setPhotoList([newPhoto, ...photoList]);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newVideo: VideoItem = {
        id: Date.now(),
        title: 'Novo Vídeo Criativo ✨',
        duration: 'Recente',
        author: 'Você',
        views: '0 views',
        thumb: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
        videoUrl: url,
        tiktokUrl: '#',
        filter: 'none'
      };
      setVideoList([newVideo, ...videoList]);
    }
  };

  const setVideoFilter = (id: number, filter: VideoFilter) => {
    setVideoList(prev => prev.map(v => v.id === id ? { ...v, filter } : v));
  };

  const getFilterStyles = (filter?: VideoFilter) => {
    switch (filter) {
      case 'vintage': return { filter: 'sepia(0.6) contrast(0.9) brightness(1.1) grayscale(0.2)' };
      case 'neon': return { filter: 'saturate(2.5) hue-rotate(15deg) contrast(1.1) brightness(1.2)' };
      case 'pastel': return { filter: 'saturate(0.5) brightness(1.3) contrast(0.85)' };
      default: return {};
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();
  const triggerVideoUpload = () => videoInputRef.current?.click();

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const startEditing = (photo: PhotoItem) => {
    setEditingPhotoId(photo.id);
    setTempTitle(photo.title);
  };

  const saveTitle = (id: number) => {
    setPhotoList(prev => prev.map(p => p.id === id ? { ...p, title: tempTitle } : p));
    setEditingPhotoId(null);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const shorts = [
    { id: 1, user: '@pink_butterfly', desc: 'Vibes de hoje! ✨ #pink #aesthetic', likes: '12k', comments: '450', color: 'bg-pink-300' },
    { id: 2, user: '@dreamy_livo', desc: 'Novo filtro disponível! 🌸', likes: '8k', comments: '120', color: 'bg-purple-300' },
    { id: 3, user: '@soft_girl', desc: 'Unboxing da nova coleção!', likes: '25k', comments: '1.2k', color: 'bg-rose-200' },
  ];

  return (
    <div className="relative h-screen w-screen max-w-md mx-auto overflow-hidden bg-white shadow-2xl flex flex-col animate-in fade-in duration-1000">
      <FloatingButterfly style={{ top: '10%', left: '5%' }} />
      <FloatingButterfly style={{ top: '40%', right: '10%' }} />
      <FloatingButterfly style={{ bottom: '20%', left: '15%' }} />

      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
      <input type="file" ref={videoInputRef} onChange={handleVideoUpload} accept="video/*" className="hidden" />

      <header className="px-4 py-3 flex justify-between items-center z-10">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 pink-gradient rounded-lg flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform">
            <Zap className="text-white" size={18} />
          </div>
          <h1 className="text-2xl font-bold text-pink-500 tracking-tight select-none">LIVO</h1>
        </div>
        <div className="flex gap-4 text-pink-400">
          <Search size={24} className="cursor-pointer hover:text-pink-600 transition-colors" />
          <User size={24} onClick={() => setIsLoggedIn(false)} className="cursor-pointer hover:text-pink-600 transition-colors" />
        </div>
      </header>

      <div className="flex px-4 gap-4 mb-2 z-10 overflow-x-auto hide-scrollbar">
        {[
          { id: 'shorts', label: 'Livo', icon: <Film size={18} /> },
          { id: 'photos', label: 'Photos', icon: <ImageIcon size={18} /> },
          { id: 'videos', label: 'Videos', icon: <Play size={18} /> },
          { id: 'shop', label: 'Loja', icon: <ShoppingCart size={18} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === tab.id 
              ? 'pink-gradient text-white shadow-lg scale-105' 
              : 'bg-pink-50 text-pink-400 hover:bg-pink-100'
            }`}
          >
            {tab.icon}
            <span className="font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto hide-scrollbar z-0 relative flex flex-col">
        {activeTab === 'shorts' && (
          <div className="h-full snap-y snap-mandatory overflow-y-auto hide-scrollbar">
            {shorts.map(short => (
              <div key={short.id} className={`h-full w-full snap-start relative ${short.color} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
                <div className="flex flex-col items-center">
                  <Play className="text-white/40 mb-4 animate-pulse" size={80} strokeWidth={1} />
                  <p className="text-white/60 font-light text-center px-8 select-none">Butterfly Player<br/><span className="text-[10px] opacity-50 uppercase tracking-widest">Monetize v1.0</span></p>
                </div>
                <div className="absolute bottom-24 left-4 right-16 text-white">
                  <h3 className="font-bold text-lg mb-1">{short.user}</h3>
                  <p className="text-sm line-clamp-2 text-white/90">{short.desc}</p>
                </div>
                <div className="absolute bottom-28 right-4 flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center">
                    <button onClick={() => toggleLike(short.id)} className={`p-3 rounded-full bg-black/20 backdrop-blur-md transition-all active:scale-75 ${liked[short.id] ? 'text-pink-500' : 'text-white'}`}>
                      <Heart size={28} fill={liked[short.id] ? 'currentColor' : 'none'} />
                    </button>
                    <span className="text-white text-xs mt-1 font-bold">{liked[short.id] ? 'Liked' : short.likes}</span>
                  </div>
                  <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white"><MessageCircle size={28} /></button>
                  <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white"><Share2 size={28} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="flex-1 flex flex-col justify-center py-4 relative">
            <h2 className="px-6 text-pink-600 font-bold text-xl mb-6 select-none flex items-center gap-2">
              Suas Memórias <Tag size={16} className="text-pink-400" />
            </h2>
            <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-10 items-center h-[70%]">
              <div onClick={triggerUpload} className="flex-shrink-0 w-64 h-[85%] snap-center relative rounded-[2rem] overflow-hidden border-4 border-dashed border-pink-200 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm cursor-pointer active:scale-95 transition-transform group shadow-lg">
                <div className="w-16 h-16 pink-gradient rounded-full flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform">
                  <Plus size={40} />
                </div>
                <p className="text-sm font-bold text-pink-500 mt-4 uppercase tracking-widest">Postar Nova</p>
              </div>

              {photoList.map((photo) => (
                <div key={photo.id} className="flex-shrink-0 w-72 h-full snap-center relative rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {photo.affiliateLink && (
                    <div className="absolute top-4 right-4 z-20 animate-bounce">
                      <div className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg border border-pink-200 text-pink-500">
                        <ShoppingCart size={18} />
                      </div>
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity p-6 flex flex-col justify-end ${editingPhotoId === photo.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {editingPhotoId === photo.id ? (
                      <div className="flex flex-col gap-2">
                        <input autoFocus className="bg-white/20 backdrop-blur-md border border-white/40 rounded-xl px-3 py-2 text-white text-sm outline-none" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveTitle(photo.id)} />
                        <button onClick={() => saveTitle(photo.id)} className="bg-pink-500 text-white py-2 rounded-xl text-xs font-bold"><Check size={14} className="inline mr-1" /> Salvar</button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-white text-lg font-bold truncate max-w-[80%]">{photo.title}</h3>
                          <button onClick={(e) => { e.stopPropagation(); startEditing(photo); }} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white"><Edit2 size={16} /></button>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex gap-4">
                            <button onClick={(e) => { e.stopPropagation(); toggleLike(photo.id); }} className={`flex items-center gap-1 ${liked[photo.id] ? 'text-pink-400' : 'text-white'}`}>
                              <Heart size={20} fill={liked[photo.id] ? 'currentColor' : 'none'} />
                            </button>
                            <button className="text-white"><Share2 size={20} /></button>
                          </div>
                          
                          {photo.affiliateLink && (
                            <a href={photo.affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-white text-pink-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl transform hover:scale-105 transition-all">
                              Shop the Look <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
              <button onClick={() => scrollCarousel('left')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-pink-400 border border-pink-50"><ChevronLeft size={24} /></button>
              <button onClick={() => scrollCarousel('right')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-pink-400 border border-pink-50"><ChevronRight size={24} /></button>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="p-4 space-y-6 pb-24">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-pink-600 font-bold text-xl select-none flex items-center gap-2">
                Canais & Filmes <MonitorPlay size={20} />
              </h2>
              <button className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg shadow-black/20 active:scale-95 transition-transform hover:bg-gray-900">
                <TikTokIcon className="w-3 h-3" /> Conectar TikTok
              </button>
            </div>

            {/* Banner de Upload Longo Customizado */}
            <div 
              onClick={triggerVideoUpload}
              className="relative rounded-[2.5rem] p-8 overflow-hidden group cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="absolute inset-0 pink-gradient opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white mb-4 border border-white/30 shadow-2xl">
                  <Video size={32} />
                </div>
                <h3 className="text-white font-black text-lg uppercase tracking-wider mb-1">Crie seu Próprio Canal</h3>
                <p className="text-white/80 text-xs max-w-[200px]">Suba vídeos longos e conecte com seu TikTok oficial</p>
                <div className="mt-6 bg-white text-pink-600 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl">
                  Começar agora
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {videoList.map(video => (
                <div key={video.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-pink-100 group relative flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <div style={getFilterStyles(video.filter)} className="w-full h-full transition-all duration-500">
                      {video.videoUrl ? (
                        <video src={video.videoUrl} className="w-full h-full object-cover" poster={video.thumb} controls={false} />
                      ) : (
                        <img src={video.thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      )}
                    </div>
                    
                    {/* Botão de Redirecionamento TikTok */}
                    {video.tiktokUrl && (
                      <a 
                        href={video.tiktokUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 z-20 bg-black text-white p-2 rounded-full shadow-2xl border border-white/20 hover:scale-110 transition-transform active:scale-90"
                      >
                        <TikTokIcon className="w-4 h-4" />
                      </a>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white"><Play size={32} fill="white" /></div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10">{video.duration}</div>
                  </div>

                  {/* Filter Selector Panel */}
                  <div className="px-5 py-3 border-b border-pink-50 flex gap-2 overflow-x-auto hide-scrollbar items-center">
                    <span className="text-[9px] font-black text-pink-300 uppercase tracking-widest mr-2 whitespace-nowrap">Filtros:</span>
                    {[
                      { id: 'none', label: 'Normal', icon: <Wind size={12} /> },
                      { id: 'vintage', label: 'Vintage', icon: <Check size={12} /> },
                      { id: 'neon', label: 'Neon', icon: <Sparkles size={12} /> },
                      { id: 'pastel', label: 'Pastel', icon: <Sun size={12} /> }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setVideoFilter(video.id, f.id as VideoFilter)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all whitespace-nowrap ${
                          video.filter === f.id 
                          ? 'bg-pink-500 text-white shadow-md' 
                          : 'bg-pink-50 text-pink-400 hover:bg-pink-100'
                        }`}
                      >
                        {f.icon}
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-800 leading-tight text-base mb-1">{video.title}</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 pink-gradient rounded-full flex items-center justify-center text-white">
                          <User size={10} />
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">{video.author} • {video.views}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-pink-400 hover:bg-pink-50 rounded-full transition-colors">
                        <Share2 size={20} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="p-4 space-y-6 pb-24 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-pink-600 font-bold text-xl select-none">Boutique Livo 🛍️</h2>
              <span className="bg-pink-100 text-pink-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Afiliado Premium</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {shopItems.map(item => (
                <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-md border border-pink-50 group hover:border-pink-200 transition-colors">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-white/70 backdrop-blur-md text-pink-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col items-center">
                    <h4 className="text-xs font-bold text-gray-700 text-center mb-1 truncate w-full">{item.name}</h4>
                    <span className="text-pink-500 font-black text-sm mb-3">{item.price}</span>
                    <button className="w-full pink-gradient text-white text-[10px] font-bold py-2 rounded-xl shadow-lg shadow-pink-100 active:scale-90 transition-transform flex items-center justify-center gap-1">
                      Comprar <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-pink-600 rounded-[2.5rem] p-6 text-white text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
              <h3 className="font-black text-lg mb-2">Seja um Afiliado Livo</h3>
              <p className="text-xs text-pink-100 mb-4">Poste suas fotos, marque produtos e ganhe comissão por cada venda realizada.</p>
              <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-md active:scale-95 transition-all">
                Saber Mais
              </button>
            </div>
          </div>
        )}
      </main>

      <nav className="glass-nav absolute bottom-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(255,105,180,0.15)]">
        <button onClick={() => setActiveTab('shorts')} className={`flex flex-col items-center transition-all active:scale-75 ${activeTab === 'shorts' ? 'text-pink-600 scale-110' : 'text-pink-300 opacity-60'}`}>
          <Film size={24} /><span className="text-[10px] font-bold mt-1 uppercase">Livo</span>
        </button>
        <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center transition-all active:scale-75 ${activeTab === 'shop' ? 'text-pink-600 scale-110' : 'text-pink-300 opacity-60'}`}>
          <ShoppingCart size={24} /><span className="text-[10px] font-bold mt-1 uppercase">Loja</span>
        </button>
        <div className="-translate-y-8">
          <button onClick={() => {
            if (activeTab === 'photos') triggerUpload();
            else if (activeTab === 'videos') triggerVideoUpload();
            else setActiveTab('photos');
          }} className="w-14 h-14 pink-gradient rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-white transition-transform active:scale-90 hover:scale-105">
            <PlusCircle size={32} strokeWidth={2.5} />
          </button>
        </div>
        <button className="text-pink-300 flex flex-col items-center opacity-60 active:scale-75 transition-all">
          <Camera size={24} /><span className="text-[10px] font-bold mt-1 uppercase">Capture</span>
        </button>
        <button onClick={() => setIsLoggedIn(false)} className={`flex flex-col items-center transition-all active:scale-75 ${!isLoggedIn ? 'text-pink-600' : 'text-pink-300 opacity-60'}`}>
          <User size={24} /><span className="text-[10px] font-bold mt-1 uppercase">Profile</span>
        </button>
      </nav>

      <div className="absolute top-0 left-0 right-0 h-6 px-6 py-4 flex justify-between items-center z-50 text-[10px] font-bold text-pink-400 select-none">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-3 bg-pink-400 rounded-full opacity-20"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full opacity-40"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<LivoApp />);