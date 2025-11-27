import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Folder, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/Particle';


// --- Configuration ---
const WP_API_BASE = "https://cms.ad-logos.com/blog/wp-json/wp/v2";

// --- Types ---
interface WPPostDetail {
  id: number;
  date: string;
  modified: string;
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

const stripHtml = (html: string) => {
  if (!html) return "";
  // 正規表現で <...> をすべて空文字に置換
  return html.replace(/<[^>]*>?/gm, '')
             .replace(/&hellip;/g, '...') // WordPress特有の文字化け対策
             .replace(/\n/g, ' ')         // 改行をスペースに
             .trim();
};

async function getPost(id: string): Promise<WPPostDetail | null> {
  const res = await fetch(`${WP_API_BASE}/posts/${id}?_embed`, {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) return null;
  return res.json();
}
// 1. JSON-LD を生成する関数を追加
const generateJsonLd = (post: WPPostDetail) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: stripHtml(post.title.rendered),
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
           ? [post._embedded['wp:featuredmedia'][0].source_url] 
           : [], // 画像がない場合は空配列
    datePublished: post.date,
    dateModified: post.modified || post.date, // 更新日があれば
    author: [{
        '@type': 'Person',
        name: post._embedded?.author?.[0]?.name || 'ad-logos',
        // url: '著者のプロフィールURLがあればここに入れる'
    }],
    publisher: {
        '@type': 'Organization',
        name: 'ad-logos',
        logo: {
          '@type': 'ImageObject',
          url: 'https://ad-logos.com/icon.png' // あなたのロゴURL
        }
    },
    description: stripHtml(post.excerpt.rendered).slice(0, 120) + "..."
  };
  return jsonLd;
}
// ■ 修正ポイント1: params の型を Promise<{ id: string }> に変更
type Props = {
  params: Promise<{ id: string }>;
};

// ■ 修正ポイント2: generateMetadata 内で await params する
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: '記事が見つかりません' };
  }

  // タイトルと説明文を整形
  const pageTitle = post.title.rendered; // タイトルには通常HTMLタグは入らないのでそのままでOK
  
  // 抜粋(excerpt)がある場合はそれを使い、なければ本文(content)の冒頭を使う
  const rawDescription = post.excerpt.rendered || post.content.rendered;
  
  // HTMLタグを除去して、120文字程度に丸める
  const metaDescription = stripHtml(rawDescription).slice(0, 120) + "...";

  return {
    title: `${pageTitle} | ad-logos`,
    description: metaDescription, // ★これがGoogle検索結果に出ます
    openGraph: {
      title: pageTitle,
      description: metaDescription, // ★これがSNSシェア時に出ます
      // ... 画像設定など
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDescription,
      // ...
    },
  };
}

// ■ 修正ポイント3: Pageコンポーネント内でも await params する
export default async function BlogPostPage({ params }: Props) {
  // ★ここでも await して id を取り出す
  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
  const author = post._embedded?.author?.[0]?.name || 'Editor';
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const jsonLd = generateJsonLd(post);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="fixed inset-0 z-0">
        <ParticleBackground disableInteraction={true} />
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="pt-32 pb-20 px-4 md:px-6">
          <article className="bg-white/95 backdrop-blur-sm text-gray-900 max-w-4xl mx-auto overflow-hidden shadow-2xl rounded-xl">
            {/* Header Section */}
            <div className="px-6 md:px-12 pt-12 pb-8">
              <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-8 text-sm font-medium group">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>

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

              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-gray-900 tracking-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>

            {featuredImage && (
              <div className="w-full aspect-video md:h-[400px] relative overflow-hidden bg-gray-100 mb-8">
                <img 
                  src={featuredImage} 
                  alt={stripHtml(post.title.rendered)} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

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
}