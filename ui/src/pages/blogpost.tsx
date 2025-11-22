import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Folder, User, Loader2, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// パーティクルコンポーネントをインポート
import ParticleBackground from '../components/Particle'; 

// --- Configuration ---
const WP_API_BASE = "https://cms.ad-logos.com/blog/wp-json/wp/v2";

// --- Types ---
interface WPPostDetail {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:term'?: Array<Array<{ name: string }>>;
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<{ name: string }>;
  };
}

// --- Helper Functions ---
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<WPPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`${WP_API_BASE}/posts/${id}?_embed`);
        
        if (!response.ok) {
          throw new Error('記事が見つかりませんでした');
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('記事の読み込みに失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // ローディング表示
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white relative">
        {/* ローディング中も背景を表示 */}
        <div className="fixed inset-0 z-0">
          <ParticleBackground disableInteraction={true} />
          <div className="absolute inset-0 bg-black/70 pointer-events-none" />
        </div>
        <div className="relative z-10">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      </div>
    );
  }

  // エラー表示
  if (error || !post) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white gap-4 relative">
        <div className="fixed inset-0 z-0">
           <ParticleBackground disableInteraction={true} />
           <div className="absolute inset-0 bg-black/70 pointer-events-none" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <AlertCircle className="text-red-500" size={48} />
          <h1 className="text-2xl font-bold">{error || "記事が見つかりません"}</h1>
          <Link to="/" className="text-blue-400 hover:underline flex items-center gap-2">
            <ArrowLeft size={16} /> ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  // データ抽出
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
  const author = post._embedded?.author?.[0]?.name || 'Editor';
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    // メインコンテナ
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white relative">
      
      {/* ★ 背景レイヤー (固定) */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground disableInteraction={true} />
        
        {/* ★ 黒い布（オーバーレイ） */}
        {/* 記事を読む邪魔にならないよう、他のページより少し濃いめ(70%)に設定しています */}
        <div className="absolute inset-0 bg-black/70 pointer-events-none" /> 
      </div>

      {/* ★ コンテンツレイヤー (relative z-10) */}
      <div className="relative z-10">
        <Navbar />

        {/* Main Content Area */}
        <main className="pt-32 pb-20 px-4 md:px-6">
          
          {/* 記事カード */}
          {/* backdrop-blur-sm bg-white/95: 
              ほんの少しだけ透けさせる(95%)ことで、背景との馴染みを良くしています。
              完全に不透明が良い場合は bg-white に戻してください。
          */}
          <article className="bg-white/95 backdrop-blur-sm text-gray-900 max-w-4xl mx-auto overflow-hidden shadow-2xl rounded-xl">

              {/* Header Section */}
              <div className="px-6 md:px-12 pt-12 pb-8">
                  {/* Back Button */}
                  <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-8 text-sm font-medium group">
                      <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                      Back to Blog
                  </Link>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 font-mono">
                      <span className="flex items-center gap-2">
                          <Clock size={14} /> {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-2 text-blue-600 font-medium">
                          <Folder size={14} /> {category}
                      </span>
                      <span className="flex items-center gap-2">
                          <User size={14} /> {author}
                      </span>
                  </div>

                  {/* Title */}
                  <h1 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-gray-900 tracking-tight"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
              </div>

              {/* Featured Image */}
              {featuredImage && (
                  <div className="w-full aspect-video md:h-[400px] relative overflow-hidden bg-gray-100 mb-8">
                      <img 
                          src={featuredImage} 
                          alt={post.title.rendered} 
                          className="w-full h-full object-cover object-center"
                      />
                  </div>
              )}

              {/* Content Body */}
              <div className="px-6 md:px-12 pb-16">
                  <div 
                      className="prose prose-lg md:prose-xl max-w-none
                                 prose-headings:font-bold prose-headings:text-gray-900 
                                 prose-p:text-gray-700 prose-p:leading-loose
                                 prose-li:text-gray-700
                                 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                 prose-strong:text-gray-900 
                                 prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded
                                 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-600 prose-blockquote:rounded-r"
                      dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  />
              </div>
          </article>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;