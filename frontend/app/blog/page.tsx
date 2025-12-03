import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import ParticleBackground from '@/components/Particle';

// 取得する記事数
const WP_API_URL = "https://cms.futurecast.jp/blog/wp-json/wp/v2/posts?_embed&per_page=12";

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
// ★修正: サーバー側では document が使えないため、正規表現でタグを除去します
const stripHtml = (html: string, limit: number = 80) => {
  // HTMLタグを除去する正規表現
  const text = html.replace(/<[^>]*>?/gm, '');
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

// データの取得関数 (Server Side)
// データの取得関数 (Server Side)
async function getPosts(): Promise<WPPost[]> {
  // ISR: 3600秒（1時間）ごとにデータを再取得
  const res = await fetch(WP_API_URL, {
    method: 'GET',
    headers: {
      // サーバーからのアクセスでもブラウザからのアクセスに見せる
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    next: { revalidate: 3600 } 
  });

  if (!res.ok) {
    // サーバーサイドでのデバッグ用にステータスを出力
    console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    return [];
  }

  return res.json();
}

// ページのメタデータ（SEO用）
export const metadata: Metadata = {
  title: 'Blog | 最新の技術情報とマーケティングコラム',
  description: 'futurecastのブログ一覧ページです。AI、マーケティング、技術に関する最新情報を発信しています。',
};

// ★ Main Component (Server Component)
// async をつけて、直接 await でデータ待ちができるのがServer Componentの強みです
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white relative">
      
      {/* 背景レイヤー */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground disableInteraction={true} />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" /> 
      </div>

      {/* コンテンツレイヤー */}
      <div className="relative z-10">
        <Navbar />
        
        <main className="pt-32 pb-20 container mx-auto px-6">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-gray-400">最新の技術情報とマーケティングコラム</p>
          </div>

          {/* ローディング判定不要：データ取得が終わってからこのHTMLがブラウザに届きます */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => {
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
              })
            ) : (
              <p className="text-center col-span-full text-gray-500">記事が見つかりませんでした。</p>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}