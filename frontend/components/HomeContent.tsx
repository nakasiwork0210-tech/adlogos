'use client'; // ★ここはクライアントコンポーネント

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  BarChart3, 
  PieChart, 
  Tag, 
  Clock, 
  Users, 
  TrendingUp,
  Store,
  ShoppingBag,
  Loader2 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import ParticleBackground from '@/components/Particle';

// --- Types & Constants ---
const WP_API_URL = "https://cms.futurecast.jp/blog/wp-json/wp/v2/posts?_embed&per_page=3";

interface WPPost {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:term'?: Array<Array<{ name: string }>>;
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

// --- Helper Functions ---
const stripHtml = (html: string, limit: number = 80) => {
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]*>?/gm, '').substring(0, limit) + "...";
  }
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

// --- Sub Components ---
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

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10 pointer-events-none" />
      <div className="container mx-auto px-6 text-center z-20 relative pointer-events-auto">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Predict the Future,<br /> Optimize the Now.
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
          <span className="font-bold text-white">FutureCast</span> は、小売・D2C領域に特化したAIソリューションパートナーです。<br className="hidden md:block" />
            データ分析に長けた東大生エンジニアが、貴社専用の数理モデルを構築。<br className="hidden md:block" />
            「需要予測」と「最適化」の力で、不確実なビジネスに確かな成長をもたらします。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/contact" 
            className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            無料相談・デモ依頼 <ArrowRight size={20} />
          </Link>
          <Link 
            href="/services" 
            className="border border-white/20 text-white px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center justify-center hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            サービス詳細
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- Service Card Component (New) ---
const ServiceCard = ({ icon: Icon, title, subtitle, description }: { icon: any, title: string, subtitle: string, description: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-xs text-blue-400 font-mono mb-3 uppercase tracking-wider">{subtitle}</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const HomeContent = () => {
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
      <div className="fixed inset-0 z-0">
        <ParticleBackground disableInteraction={true} />
        {/* Background can be added here if needed */}
      </div>

      
      <div className="relative z-10">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
        <main>
          <Hero />

          <Section id="mission" title="Mission" subtitle="数理モデルでビジネスを最適化する" className="bg-gray/40 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed pb-20 md:pb-32">
                <p>
                  小売・流通の実店舗運営から、D2C・ECのデジタルマーケティングまで、<br />
                  私たちは、現場に眠る膨大なデータを「収益を生む資産」に変えます。
                </p>
                <p>
                  需要予測、シフト管理、広告予算配分など、複雑な変数が絡み合うビジネスの課題を、<br />
                  数理モデルとAIの力でシンプルに解き明かし、利益最大化を実現します。
                </p>
              </div>
            </div>
          </Section>

          <Section id="models" title="Services" subtitle="提供ソリューション" className="bg-black/40 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto space-y-20">
              
              {/* --- Retail DX Section --- */}
              <div>
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <Store className="text-blue-500" size={32} />
                  <h3 className="text-2xl md:text-3xl font-bold">Retail DX</h3>
                  <span className="text-gray-500 text-sm md:text-base ml-auto">実店舗・流通向け</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <ServiceCard 
                    icon={Tag}
                    title="割引・廃棄ロス最適化AI"
                    subtitle="Discount Optimization"
                    description="「いつ、いくら割引するか」をAIが判断。賞味期限や在庫状況に基づき、利益を最大化しつつ廃棄ロスを最小化する最適な割引タイミングと割引率を算出します。"
                  />
                  <ServiceCard 
                    icon={Clock}
                    title="来客予測型シフト管理"
                    subtitle="Shift Optimization"
                    description="過去の売上や天候データから高精度に来客数を予測。必要な人員を適正に配置することで、人件費の無駄を削減しつつ、機会損失も防ぐ最適なシフトを作成します。"
                  />
                </div>
              </div>

              {/* --- D2C DX Section --- */}
              <div>
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <ShoppingBag className="text-blue-500" size={32} />
                  <h3 className="text-2xl md:text-3xl font-bold">D2C DX</h3>
                  <span className="text-gray-500 text-sm md:text-base ml-auto">EC・通販・メーカー向け</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ServiceCard 
                    icon={PieChart}
                    title="広告予算配分最適化 (MMM)"
                    subtitle="Marketing Mix Modeling"
                    description="TVCM、Web広告、SNSなど、複数のチャネルにおける広告効果を統計的に分析。年商10億〜100億円規模の事業における最適な予算配分をシミュレーションします。"
                  />
                  <ServiceCard 
                    icon={Users}
                    title="解約予測・防止CRM"
                    subtitle="Churn Prediction"
                    description="ユーザーの行動ログから解約リスクのある顧客を早期に検知。最適なタイミングでクーポン配布やフォローを行うことで、LTV（顧客生涯価値）を維持します。"
                  />
                  <ServiceCard 
                    icon={TrendingUp}
                    title="需要予測・在庫最適化"
                    subtitle="Demand Forecasting"
                    description="マーケティング施策（MMM）と連動した需要予測モデルを構築。キャンペーンによる販売増を正確に予測し、在庫切れや過剰在庫のリスクを低減します。"
                  />
                </div>
              </div>

              <div className="mt-12 text-center pb-10">
                  <Link href="/services" className="text-white border border-white/20 px-8 py-3 rounded-full transition-all font-medium inline-block backdrop-blur-sm hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    すべてのサービスを見る
                  </Link>
              </div>

            </div>
          </Section>

          <Section id="blog" title="Blog" subtitle="技術ブログ" className="bg-transparent">
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
              <Link 
                href="/blog" 
                className="text-white border border-white/20 px-8 py-3 rounded-full transition-all font-medium inline-block backdrop-blur-sm hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                記事一覧を見る
              </Link>
            </div>
          </Section>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default HomeContent;