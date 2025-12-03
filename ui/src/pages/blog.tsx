import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
// パーティクルコンポーネントをインポート
import ParticleBackground from '../components/Particle';

// 取得する記事数（多めに設定）
const WP_API_URL = "https://cms.ad-logos.com/blog/wp-json/wp/v2/posts?_embed&per_page=12";

// 型定義
interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

// ヘルパー関数
const stripHtml = (html: string, limit: number = 80) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const BlogPage = () => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(WP_API_URL);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white relative">
      
      {/* ★ 背景レイヤー (固定) */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground disableInteraction={true} />
        {/* 黒い布（オーバーレイ）: 記事が読みやすいよう少し濃いめ(60%)に設定 */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" /> 
      </div>

      {/* ★ コンテンツレイヤー (relative z-10) */}
      <div className="relative z-10">
        <Navbar />
        
        <main className="pt-32 pb-20 container mx-auto px-6">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-gray-400">最新の技術情報とマーケティングコラム</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                 const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Tech';
                 return (
                   <BlogCard 
                     key={post.id}
                     id={post.id}
                     date={formatDate(post.date)}
                     category={categoryName}
                     title={post.title.rendered}
                     excerpt={stripHtml(post.excerpt.rendered, 100)}
                   />
                 );
              })}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;