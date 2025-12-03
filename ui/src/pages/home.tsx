import { 
  ArrowRight,
  Brain, BarChart3, Target, MessageSquare, Layers, Loader2 
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import ParticleBackground from '../components/Particle'; // ファイル名修正(Particle -> ParticleBackground)

// --- Types ---
const WP_API_URL = "https://cms.ad-logos.com/blog/wp-json/wp/v2/posts?_embed&per_page=3";
// WordPressから返ってくるデータの型定義
interface WPPost {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:term'?: Array<Array<{ name: string }>>; // カテゴリ情報
    'wp:featuredmedia'?: Array<{ source_url: string }>; // アイキャッチ画像（必要なら）
  };
}

// --- Helper Functions ---
// HTMLタグを除去し、指定した文字数で丸める関数
const stripHtml = (html: string, limit: number = 80) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};
interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}


// --- Shared Components (Navbar, Footer, Section, BlogCard) ---

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

// 汎用セクションコンポーネント
const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "" }) => (
  <section id={id} className={`pt-12 md:pt-20 ${className}`}>
    <div className="container mx-auto px-6">
      <div className="mb-16 text-center">
        <h2 className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">{title}</h2>
        <p className="text-3xl md:text-4xl font-bold text-white">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);


// --- Home Page Specific Component ---


// 2. Hero コンポーネント
const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 "
    >
      {/* pointer-events-none で背景レイヤーを透過 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10 pointer-events-none" /> 
      
      <div className="container mx-auto px-6 text-center z-20 relative pointer-events-none">
        
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pointer-events-auto">
          Marketing Science<br /> with AI
        </h1>
        
        <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10 pointer-events-auto">
          「勘と経験」のマーケティングから、「データと数理」の意思決定へ。<br className="hidden md:block" />
          データ分析に長けた東大生チームが、貴社専用のAIモデルを開発し、成長を加速します。
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pointer-events-auto">
          {/* ★変更: Primary Button (白 -> 青) */}
          {/* 無料相談ボタン */}
          <Link 
            to="/contact" 
            className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            無料相談・デモ依頼 <ArrowRight size={20} />
          </Link>

          {/* サービス詳細ボタン */}
          <Link 
            to="/services" 
            className="border border-white/20 text-white px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center justify-center hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            サービス詳細
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- Main Page Component ---
const HomePage = () => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(WP_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError('記事の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white relative">
      
      {/* 背景レイヤー */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* コンテンツレイヤー */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
        
        <main>
          <Hero />

          {/* Mission Section */}
          <Section id="mission" title="Mission" subtitle="数理モデルでマーケティングを科学する" className="bg-gray/40 backdrop-blur-sm pointer-events-auto">
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed pb-20 md:pb-32">
                <p>
                  広告運用やマーケティング施策は、いまだに担当者の「勘」や「経験」に依存する部分が多く残されています。私たちはアカデミアで培った高度な統計解析と機械学習技術を用い、このブラックボックスを解明します。
                </p>
                <p>
                  データドリブンな意思決定を支援することで、企業のマーケティングROIを最大化。持続可能な成長を実現するためのパートナーとして、最先端のAIモデリング技術を提供します。
                </p>
              </div>
            </div>
          </Section>

          {/* Services Section */}
          <Section id="models" title="Models" subtitle="開発AIモデル" className="bg-black/40 backdrop-blur-sm pointer-events-auto">
            <div className="max-w-3xl mx-auto mt-8 space-y-12">
               
               {/* Service Item 1 */}
               <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                 <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/5">
                   <BarChart3 className="text-blue-400" size={32} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Predictive LTV Analysis</h3>
                   <p className="text-gray-400 leading-relaxed text-base">
                     顧客の初期行動データから将来のLTV（顧客生涯価値）や離脱確率を高精度に予測。ROASが合わない媒体の早期停止や、VIP顧客への先行投資判断を可能にします。
                   </p>
                 </div>
               </div>
               
               <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/5">
                    <Target className="text-blue-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Hyper-Personalization</h3>
                    <p className="text-gray-400 leading-relaxed text-base">
                      ルールベースのセグメント配信ではなく、個々のユーザーの文脈（コンテキスト）をリアルタイムに解析。LLMを活用し、一人ひとりに最適化されたLPやメッセージを動的に生成します。
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/5">
                    <Brain className="text-blue-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Marketing Mix Modeling (MMM)</h3>
                    <p className="text-gray-400 leading-relaxed text-base">
                      Cookie規制により計測が困難な昨今において、テレビCMやOOHを含む全マーケティング施策の貢献度を統計的に可視化。最適な予算配分シミュレーションを提供します。
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/5">
                    <MessageSquare className="text-blue-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">CS AI Agent</h3>
                    <p className="text-gray-400 leading-relaxed text-base">
                      商品知識を学習したLLMエージェントが、Webサイト上の接客を自動化。購入前の不安を解消し、CVR（コンバージョン率）を劇的に向上させます。
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/5">
                    <Layers className="text-blue-400" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Data Infrastructure</h3>
                    <p className="text-gray-400 leading-relaxed text-base">
                      散在するマーケティングデータ（GA4, 広告媒体, CRM）を統合し、AI活用に耐えうるデータ基盤（CDP/DWH）を構築・整備します。
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 text-center pb-10">
                    {/* ★変更: 詳細ボタン (透明 -> 白) */}
                    <Link to="/services" className="text-white border border-white/20 px-8 py-3 rounded-full transition-all font-medium inline-block backdrop-blur-sm hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      詳細な活用例を見る
                    </Link>
                </div>
            </div>
          </Section>

          {/* Blog Section */}
          <Section id="blog" title="Blog" subtitle="技術ブログ" className="bg-transparent pointer-events-auto">
            {loading ? (
              <div className="flex justify-center pb-20">
                <Loader2 className="animate-spin text-blue-500" size={40} />
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-10">
                {error}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {posts.map((post) => {
                  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Tech';
                  return (
                    <BlogCard 
                      key={post.id}
                      date={formatDate(post.date)}
                      category={categoryName}
                      title={post.title.rendered}
                      excerpt={stripHtml(post.excerpt.rendered, 100)}
                      id={post.id}
                    />
                  );
                })}
              </div>
            )}
            
            <div className="mt-12 text-center pb-10">
              {/* ★変更: 記事一覧ボタン (透明 -> 白) */}
              <Link 
                to="/blog" 
                className="text-white border border-white/20 px-8 py-3 rounded-full transition-all font-medium inline-block backdrop-blur-sm hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                記事一覧を見る
              </Link>
            </div>
          </Section>

        </main>

        {/* Footer */}
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;