import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  PieChart,
  Tag,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Store,
  ShoppingBag
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/Particle';

// --- Types ---
interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

// --- Shared Components ---
// ※メタデータはServer Component（page.tsx）でのみ使用可能です。
// 'use client'を使用する場合は、この部分は削除してlayout.tsx等に移動してください。
export const metadata = {
  title: 'Service | FutureCast',
};

// セクションコンポーネント
const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "" }) => (
  <section id={id} className={`py-12 md:py-24 ${className}`}>
    <div className="container mx-auto px-6">
      <div className="mb-16 text-center">
        <h2 className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">{title}</h2>
        <p className="text-3xl md:text-4xl font-bold text-white">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

// ヘッダーコンポーネント
const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="pt-32 pb-20 text-center px-6 border-b border-white/5 bg-gradient-to-b from-blue-900/10 to-transparent">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{title}</h1>
    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
  </div>
);

// ワークフローデータ
const workflowSteps = [
  { 
    number: '01', 
    title: 'ヒアリング', 
    price: '無料', 
    description: '事業課題、KPI、保有データの状況を詳しくヒアリング。AI導入の目的とゴールを明確化します。' 
  },
  { 
    number: '02', 
    title: 'データ分析', 
    price: '無料~10万円', 
    description: '受領データを解析(EDA)し、データの質・量・特徴を診断、レポートを作成。AI活用の可能性を算出します。' 
  },
  { 
    number: '03', 
    title: 'データ整備', 
    price: '無料~40万円', 
    description: '名寄せ、欠損値補完、外れ値処理などを行い、AIが学習可能な状態へデータを整備・加工します。' 
  },
  { 
    number: '04', 
    title: 'PoC (概念実証)', 
    price: '30万円〜', 
    description: 'スモールスタートで初期モデルを構築。実際のデータを用いて精度検証を行い、ROIを試算します。' 
  },
  { 
    number: '05', 
    title: 'AIモデル本開発', 
    price: '70万円〜', 
    description: '本番環境で稼働する高精度モデルを開発し、貴社システムやオペレーションへの組み込みを行います。' 
  },
  { 
    number: '06', 
    title: '保守運用・改善', 
    price: '月額 10万円〜', 
    description: '導入後の精度監視を実施。データの変化に合わせてモデルを再学習させ、精度を維持・向上させます。' 
  },
];

// --- Service Data (Retail & D2C) ---
const retailServices = [
  {
    icon: Tag,
    title: "割引・廃棄ロス最適化AI",
    description: "「いつ、いくら割引するか」をAIが判断。賞味期限や在庫状況に基づき、利益を最大化しつつ廃棄ロスを最小化する最適な割引タイミングと割引率を算出します。",
    exampleTitle: "スーパーマーケットでの活用イメージ",
    exampleContent: "従来は店員の勘で「一律半額」シールを貼っていた運用を、AIによる動的な判断へ移行。商品ごとの売れ行き予測に基づき、「在庫過多なら早めに20%OFF」「まだ売れるなら定価維持」といった指示を出し、廃棄ロスの削減と粗利額の最大化の両立を目指します。"
  },
  {
    icon: Clock,
    title: "来客予測型シフト管理",
    description: "過去の売上や天候データから高精度に来客数を予測。必要な人員を適正に配置することで、人件費の無駄を削減しつつ、機会損失も防ぐ最適なシフトを作成します。",
    exampleTitle: "多店舗展開の飲食店での活用イメージ",
    exampleContent: "店長の経験則に依存していたシフト作成をAIで自動化。天気予報や近隣イベント情報を取り込み、30分単位での必要人員数を算出します。「暇な時間の人員過多」や「繁忙時の人員不足」といったミスマッチを解消し、適正な人件費コントロールを可能にします。"
  }
];

const d2cServices = [
  {
    icon: PieChart,
    title: "広告予算配分最適化 (MMM)",
    description: "TVCM、Web広告、SNSなど、複数のチャネルにおける広告効果を統計的に分析。年商10億〜100億円規模の事業における最適な予算配分をシミュレーションします。",
    exampleTitle: "D2Cブランドでの活用イメージ",
    exampleContent: "Web広告のCPAが高騰する中、投資判断が難しいTVCMや交通広告の効果を可視化します。MMM（マーケティング・ミックス・モデリング）により、各施策の貢献度を数値化し、全体の獲得効率（CPA）が最も良くなる最適な予算ポートフォリオを導き出します。"
  },
  {
    icon: Users,
    title: "解約予測・防止CRM",
    description: "ユーザーの行動ログから解約リスクのある顧客を早期に検知。最適なタイミングでクーポン配布やフォローを行うことで、LTV（顧客生涯価値）を維持します。",
    exampleTitle: "サブスクリプションサービスでの活用イメージ",
    exampleContent: "「解約ボタン」が押される前に、ログイン頻度の低下などの予兆行動をAIが検知。解約リスクが高いユーザーに対してのみ、自動的に特別プランをオファーするなどの対策が可能になります。無駄なバラマキを防ぎつつ、顧客の定着率向上を図ります。"
  },
  {
    icon: TrendingUp,
    title: "需要予測・在庫最適化",
    description: "マーケティング施策と連動した需要予測モデルを構築。キャンペーンによる販売増を正確に予測し、在庫切れや過剰在庫のリスクを低減します。",
    exampleTitle: "アパレルECサイトでの活用イメージ",
    exampleContent: "新作発売やセール時の発注数をAIが予測し、担当者の感覚による「過剰な安全在庫」や「機会損失」を是正します。シーズン末の在庫処分セールを減らすことでプロパー消化率を高め、キャッシュフローの健全化に貢献します。"
  }
];

// サービス詳細カードコンポーネント
const ServiceDetailCard = ({ service }: { service: any }) => (
  <div className="flex flex-col gap-6 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
    <div className="flex flex-col md:flex-row items-start gap-5">
      <div className="flex-shrink-0 w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
        <service.icon size={28} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-gray-300 leading-relaxed mb-6">
          {service.description}
        </p>
      </div>
    </div>

    {/* Use Case Box */}
    <div className="mt-auto bg-black/40 border border-blue-500/20 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 text-blue-500/5 opacity-50">
        <CheckCircle2 size={80} />
      </div>
      <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2 relative z-10 text-sm uppercase tracking-wider">
        <CheckCircle2 size={16} /> Use Case
      </h4>
      <p className="text-white font-bold text-lg mb-3 relative z-10">{service.exampleTitle}</p>
      <p className="text-gray-300 text-sm leading-7 relative z-10">
        {service.exampleContent}
      </p>
    </div>
  </div>
);


// --- Main Page Component ---
const ServicePage = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white relative">
      
      {/* ★ 背景レイヤー */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground disableInteraction={true} />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>

      {/* ★ コンテンツレイヤー */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <PageHeader
            title="Our Services"
            subtitle="小売現場の最適化から、D2Cマーケティングの高度化まで。数理モデルでビジネスを加速させます。"
          />

          {/* Workflow Section */}
          <Section id="workflow" title="Workflow" subtitle="導入までの流れと費用感" className="bg-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto mt-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
                {workflowSteps.map((step, index) => (
                  <div key={step.number} className="relative flex flex-col items-center text-center group">
                    <div className="mb-4 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white/10 group-hover:text-blue-500/50 transition-colors duration-300">{step.number}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    
                    {/* 価格表示部分 */}
                    <div className="mb-4 text-blue-400 font-bold text-xs bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                      目安: {step.price}
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed text-left md:text-center">{step.description}</p>
                    
                    {/* 矢印 (Desktop) */}
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden xl:block absolute top-10 -right-1/2 w-full text-gray-700 z-0 pointer-events-none flex justify-center">
                        <ChevronRight size={24} />
                      </div>
                    )}
                    {/* 矢印 (Mobile/Tablet) */}
                    {index < workflowSteps.length - 1 && (
                      <div className="xl:hidden flex justify-center mt-6 text-gray-700 mb-6 xl:mb-0">
                          <ChevronRight size={24} className="rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center border-t border-white/5 pt-6">
                <p className="text-gray-500 text-xs">※ プロジェクトの規模やデータ量、難易度により費用は変動します。まずはお気軽にご相談ください。</p>
              </div>
            </div>
          </Section>

          {/* Retail DX Section */}
          <Section id="retail-dx" title="Retail DX" subtitle="実店舗・流通向けソリューション" className="bg-transparent">
            <div className="max-w-5xl mx-auto mt-8">
               <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/10">
                  <Store className="text-blue-500" size={32} />
                  <p className="text-gray-300">店舗オペレーションの自動化と利益最大化</p>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                 {retailServices.map((service, index) => (
                   <ServiceDetailCard key={index} service={service} />
                 ))}
               </div>
            </div>
          </Section>

          {/* D2C DX Section */}
          <Section id="d2c-dx" title="D2C DX" subtitle="EC・通販・メーカー向けソリューション" className="bg-white/5 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto mt-8">
               <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/10">
                  <ShoppingBag className="text-blue-500" size={32} />
                  <p className="text-gray-300">マーケティング投資の最適化とLTV向上</p>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {d2cServices.map((service, index) => (
                   <ServiceDetailCard key={index} service={service} />
                 ))}
               </div>
            </div>
          </Section>

          {/* CTA Section */}
          <Section id="contact-cta" title="Contact" subtitle="AI開発のご相談はこちら" className="bg-gradient-to-t from-blue-950/50 to-transparent backdrop-blur-sm">
            <div className="text-center max-w-2xl mx-auto mt-8">
              <p className="text-gray-300 mb-10 text-lg leading-relaxed">
                「自社のデータで何ができるかわからない」<br />
                「他社ツールでは解決できない課題がある」<br />
                <br />
                まずは現状の課題をお聞かせください。<br />
                東大生エンジニアチームが、貴社に最適なAI活用プランをご提案します。
              </p>
              <Link href="/contact" className="bg-white !text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all inline-flex items-center gap-2">
                お問い合わせフォームへ <ArrowRight size={20} />
              </Link>
            </div>
          </Section>

        </main>

        <Footer />
      </div>
    </div>
  );
}

export default ServicePage;


