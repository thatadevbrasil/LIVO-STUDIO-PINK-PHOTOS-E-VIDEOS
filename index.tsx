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
  Video
} from 'lucide-react';

// Tipos de conteúdo
type TabType = 'shorts' | 'photos' | 'videos';

interface PhotoItem {
  id: number;
  url: string;
  title: string;
}

interface VideoItem {
  id: number;
  title: string;
  duration: string;
  author: string;
  views: string;
  thumb: string;
  videoUrl?: string;
}

// Componente de Borboleta Flutuante para o Background
const FloatingButterfly = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute pointer-events-none butterfly-float opacity-20" style={style}>
    <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF69B4">
      <path d="M12,10c0,0-1-3-3-3s-4,2-4,4s2,4,4,4c0,0,1,3,3,3s3-3,3-3s2,1,4-1s2-4,2-4s-2-2-4-2S12,10,12,10z"/>
    </svg>
  </div>
);

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
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

      <div className="z-10 w-full max-w-sm flex flex-col items-center animate-in fade-in duration-700">
        {/* Logo Section */}
        <div className="w-24 h-24 pink-gradient rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform rotate-12">
          <Zap className="text-white w-12 h-12" fill="white" />
        </div>
        
        <h1 className="text-4xl font-bold text-pink-600 mb-2 tracking-tighter">LIVO</h1>
        <p className="text-pink-400 font-medium mb-12 text-center">Capture momentos, espalhe cores.</p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
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
                Entrar no Mundo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button className="text-pink-500 text-sm font-semibold hover:underline">Esqueceu sua senha?</button>
          <div className="flex items-center gap-2 w-full text-pink-300">
            <div className="h-[1px] bg-pink-200 flex-1"></div>
            <span className="text-xs">ou</span>
            <div className="h-[1px] bg-pink-200 flex-1"></div>
          </div>
          <button className="flex items-center gap-2 bg-white/40 border border-white px-6 py-2 rounded-full text-pink-500 text-sm font-bold shadow-sm active:scale-95 transition-all">
            <Zap size={14} fill="currentColor" /> Criar Livo ID
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

  // Initial State para Fotos
  const [photoList, setPhotoList] = useState<PhotoItem[]>([
    { id: 101, url: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=400', title: 'Sunset Glow' },
    { id: 102, url: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400', title: 'Pink Flowers' },
    { id: 103, url: 'https://images.unsplash.com/photo-1523480717984-24cba357d537?auto=format&fit=crop&q=80&w=400', title: 'Neon Aesthetic' },
    { id: 104, url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400', title: 'Soft Clouds' },
    { id: 105, url: 'https://images.unsplash.com/photo-1615184697985-c9bdf1f07ad7?auto=format&fit=crop&q=80&w=400', title: 'Abstract Pink' },
    { id: 106, url: 'https://images.unsplash.com/photo-1563281544-41bbfa4940ee?auto=format&fit=crop&q=80&w=400', title: 'Glitter' },
  ]);

  // Initial State para Vídeos
  const [videoList, setVideoList] = useState<VideoItem[]>([
    { id: 201, title: 'Tutorial de Maquiagem Butterfly', duration: '15:20', author: 'Beauty Guru', views: '1.2M views', thumb: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800' },
    { id: 202, title: 'Minha rotina matinal estética', duration: '10:45', author: 'Livo Daily', views: '850k views', thumb: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=800' },
  ]);

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
        thumb: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800', // Placeholder thumbnail
        videoUrl: url
      };
      setVideoList([newVideo, ...videoList]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerVideoUpload = () => {
    videoInputRef.current?.click();
  };

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

  // Mock Data Shorts
  const shorts = [
    { id: 1, user: '@pink_butterfly', desc: 'Vibes de hoje! ✨ #pink #aesthetic', likes: '12k', comments: '450', color: 'bg-pink-300' },
    { id: 2, user: '@dreamy_livo', desc: 'Novo filtro disponível! 🌸', likes: '8k', comments: '120', color: 'bg-purple-300' },
    { id: 3, user: '@soft_girl', desc: 'Unboxing da nova coleção!', likes: '25k', comments: '1.2k', color: 'bg-rose-200' },
  ];

  return (
    <div className="relative h-screen w-screen max-w-md mx-auto overflow-hidden bg-white shadow-2xl flex flex-col animate-in fade-in duration-1000">
      {/* Background Decor */}
      <FloatingButterfly style={{ top: '10%', left: '5%' }} />
      <FloatingButterfly style={{ top: '40%', right: '10%' }} />
      <FloatingButterfly style={{ bottom: '20%', left: '15%' }} />

      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={videoInputRef} 
        onChange={handleVideoUpload} 
        accept="video/*" 
        className="hidden" 
      />

      {/* Header */}
      <header className="px-4 py-3 flex justify-between items-center z-10">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 pink-gradient rounded-lg flex items-center justify-center shadow-md">
            <Zap className="text-white" size={18} />
          </div>
          <h1 className="text-2xl font-bold text-pink-500 tracking-tight">LIVO</h1>
        </div>
        <div className="flex gap-4 text-pink-400">
          <Search size={24} />
          <User size={24} onClick={() => setIsLoggedIn(false)} className="cursor-pointer" />
        </div>
      </header>

      {/* Tab Switcher */}
      <div className="flex px-4 gap-4 mb-2 z-10 overflow-x-auto hide-scrollbar">
        {[
          { id: 'shorts', label: 'Shorts', icon: <Film size={18} /> },
          { id: 'photos', label: 'Photos', icon: <ImageIcon size={18} /> },
          { id: 'videos', label: 'Videos', icon: <Play size={18} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === tab.id 
              ? 'pink-gradient text-white shadow-lg scale-105' 
              : 'bg-pink-50 text-pink-400'
            }`}
          >
            {tab.icon}
            <span className="font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Feed Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar z-0 relative flex flex-col">
        {activeTab === 'shorts' && (
          <div className="h-full snap-y snap-mandatory overflow-y-auto hide-scrollbar">
            {shorts.map(short => (
              <div key={short.id} className={`h-full w-full snap-start relative ${short.color} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
                
                {/* Simulated Video Placeholder */}
                <div className="flex flex-col items-center">
                  <Play className="text-white/40 mb-4" size={80} strokeWidth={1} />
                  <p className="text-white/60 font-light text-center px-8">LIVO Short Player<br/><span className="text-[10px] opacity-50 uppercase tracking-widest">Butterfly Engine v1.0</span></p>
                </div>

                {/* Overlays */}
                <div className="absolute bottom-24 left-4 right-16 text-white">
                  <h3 className="font-bold text-lg mb-1">{short.user}</h3>
                  <p className="text-sm line-clamp-2 text-white/90">{short.desc}</p>
                </div>

                {/* Side Actions */}
                <div className="absolute bottom-28 right-4 flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center">
                    <button 
                      onClick={() => toggleLike(short.id)}
                      className={`p-3 rounded-full bg-black/20 backdrop-blur-md transition-colors ${liked[short.id] ? 'text-pink-500' : 'text-white'}`}
                    >
                      <Heart size={28} fill={liked[short.id] ? 'currentColor' : 'none'} />
                    </button>
                    <span className="text-white text-xs mt-1 font-bold">{liked[short.id] ? 'Liked' : short.likes}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white">
                      <MessageCircle size={28} />
                    </button>
                    <span className="text-white text-xs mt-1 font-bold">{short.comments}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white">
                      <Share2 size={28} />
                    </button>
                    <span className="text-white text-xs mt-1 font-bold">Share</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="flex-1 flex flex-col justify-center py-4 relative">
            <h2 className="px-6 text-pink-600 font-bold text-xl mb-6">Suas Memórias ✨</h2>
            
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-10 items-center h-[70%]"
            >
              {/* Upload Action Card in Carousel */}
              <div 
                onClick={triggerUpload}
                className="flex-shrink-0 w-64 h-[85%] snap-center relative rounded-[2rem] overflow-hidden border-4 border-dashed border-pink-200 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm cursor-pointer active:scale-95 transition-transform group shadow-lg"
              >
                <div className="w-16 h-16 pink-gradient rounded-full flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform">
                  <Plus size={40} />
                </div>
                <p className="text-sm font-bold text-pink-500 mt-4 uppercase tracking-widest">Postar Nova</p>
              </div>

              {photoList.map((photo) => (
                <div 
                  key={photo.id} 
                  className="flex-shrink-0 w-72 h-full snap-center relative rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white"
                >
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Overlay Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity p-6 flex flex-col justify-end ${editingPhotoId === photo.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {editingPhotoId === photo.id ? (
                      <div className="flex flex-col gap-2">
                        <input 
                          autoFocus
                          className="bg-white/20 backdrop-blur-md border border-white/40 rounded-xl px-3 py-2 text-white text-sm outline-none focus:ring-2 ring-pink-400 transition-all"
                          value={tempTitle}
                          onChange={(e) => setTempTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveTitle(photo.id)}
                        />
                        <button 
                          onClick={() => saveTitle(photo.id)}
                          className="flex items-center justify-center gap-1 bg-pink-500 text-white py-2 rounded-xl text-xs font-bold shadow-lg shadow-pink-900/40"
                        >
                          <Check size={14} /> Salvar Título
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-white text-lg font-bold truncate max-w-[80%]">{photo.title}</h3>
                          <button 
                            onClick={(e) => { e.stopPropagation(); startEditing(photo); }}
                            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                        <div className="flex gap-4 mt-3">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleLike(photo.id); }}
                            className={`flex items-center gap-1 ${liked[photo.id] ? 'text-pink-400' : 'text-white'}`}
                          >
                            <Heart size={20} fill={liked[photo.id] ? 'currentColor' : 'none'} />
                            <span className="text-xs">Love</span>
                          </button>
                          <button className="flex items-center gap-1 text-white">
                            <Share2 size={20} />
                            <span className="text-xs">Share</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons for Carousel */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
              <button 
                onClick={() => scrollCarousel('left')}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-pink-400 active:scale-90 transition-transform border border-pink-50"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scrollCarousel('right')}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-pink-400 active:scale-90 transition-transform border border-pink-50"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="p-4 space-y-6 pb-24">
            <h2 className="text-pink-600 font-bold text-xl mb-2 px-2">Canais & Filmes 🎥</h2>
            
            {/* Upload Video Card */}
            <div 
              onClick={triggerVideoUpload}
              className="bg-pink-50 rounded-3xl border-2 border-dashed border-pink-200 p-8 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-pink-400 shadow-sm group-hover:scale-110 transition-transform">
                <Video size={28} />
              </div>
              <p className="mt-3 text-pink-500 font-bold text-sm uppercase tracking-widest">Enviar Vídeo Longo</p>
            </div>

            {videoList.map(video => (
              <div key={video.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-pink-100 group">
                <div className="relative aspect-video">
                  {video.videoUrl ? (
                    <video 
                      src={video.videoUrl} 
                      className="w-full h-full object-cover"
                      poster={video.thumb}
                      controls={false}
                    />
                  ) : (
                    <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform cursor-pointer">
                      <Play size={32} fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800 leading-tight">{video.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{video.author} • {video.views}</p>
                    </div>
                    <MoreVertical size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="glass-nav absolute bottom-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(255,105,180,0.15)]">
        <button 
          onClick={() => setActiveTab('shorts')}
          className={`flex flex-col items-center transition-colors ${activeTab === 'shorts' ? 'text-pink-600' : 'text-pink-300 opacity-60'}`}
        >
          <Film size={24} />
          <span className="text-[10px] font-bold mt-1">Livo</span>
        </button>
        <button className="text-pink-300 flex flex-col items-center opacity-60">
          <Search size={24} />
          <span className="text-[10px] font-bold mt-1">Explore</span>
        </button>
        
        {/* Create Button */}
        <div className="-translate-y-8">
          <button 
            onClick={() => {
              if (activeTab === 'photos') triggerUpload();
              else if (activeTab === 'videos') triggerVideoUpload();
              else setActiveTab('photos');
            }}
            className="w-14 h-14 pink-gradient rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-white transition-transform active:scale-90"
          >
            <PlusCircle size={32} strokeWidth={2.5} />
          </button>
        </div>

        <button className="text-pink-300 flex flex-col items-center opacity-60">
          <Camera size={24} />
          <span className="text-[10px] font-bold mt-1">Capture</span>
        </button>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className={`flex flex-col items-center transition-colors ${!isLoggedIn ? 'text-pink-600' : 'text-pink-300 opacity-60'}`}
        >
          <User size={24} />
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </button>
      </nav>

      {/* Status Bar Mock */}
      <div className="absolute top-0 left-0 right-0 h-6 px-6 py-4 flex justify-between items-center z-50 text-[10px] font-bold text-pink-400">
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