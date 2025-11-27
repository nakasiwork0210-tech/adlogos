import {
  ArrowRight,
  Brain, BarChart3, Target, MessageSquare, Layers,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// パーティクルコンポーネントをインポート
import ParticleBackground from '@/components/Particle';
import Link from 'next/link';
// --- Types ---
interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

// --- Shared Components ---
export const metadata = {
  title: 'Service | ad-logos', // ← これだけでOK！説明文はトップページのが使い回されます
};
// セクションコンポーネント
const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "" }) => (
  <section id={id} className={`py-12 md:py-20 ${className}`}>
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
  <div className="pt-32 pb-20  text-center px-6 border-b border-white/5">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
    <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

// 【変更】ワークフローを6ステップに変更
// ... (imports)

// 【修正】ワークフローのデータに price を追加
const workflowSteps = [
  { 
    number: '01', 
    title: 'ヒアリング', 
    price: '無料', // 追加
    description: '事業課題、KPI、保有データの状況を詳しくヒアリング。AI導入の目的とゴールを明確化します。' 
  },
  { 
    number: '02', 
    title: 'データ分析', 
    price: '無料~10万円', // 追加
    description: '受領データを解析(EDA)し、データの質・量・特徴を診断、レポートを作成。AI活用の可能性と期待値を算出します。' 
  },
  { 
    number: '03', 
    title: 'データクレンジング', 
    price: '無料~40万円', // 追加
    description: '名寄せ、欠損値補完、外れ値処理などを行い、AIが学習可能な状態へデータを整備・加工します。' 
  },
  { 
    number: '04', 
    title: 'PoC (概念実証) 開発', 
    price: '30万円〜40万円', // 追加
    description: 'スモールスタートで初期モデルを構築。実際のデータを用いて精度検証を行い、ROIを試算します。' 
  },
  { 
    number: '05', 
    title: 'AIモデル本開発', 
    price: '70万円〜200万円', // 追加
    description: '本番環境で稼働する高精度モデルを開発し、貴社システムやオペレーションへの組み込みを行います。' 
  },
  { 
    number: '06', 
    title: '保守運用・改善', 
    price: '月額 10万円〜', // 追加
    description: '導入後の精度監視を実施。データの変化に合わせてモデルを再学習させ、精度を維持・向上させます。' 
  },
];

// 【削除】const pricingPlans = [ ... ] は不要になるので削除してください

const modelDetails = [
  {
    icon: BarChart3,
    title: "Predictive LTV Analysis",
    description: "顧客の初期行動データから将来のLTV（顧客生涯価値）や離脱確率を高精度に予測。ROASが合わない媒体の早期停止や、VIP顧客への先行投資判断を可能にします。",
    exampleTitle: "ECサイトでの活用シナリオ",
    exampleContent: "初回購入から7日間の行動ログ（閲覧ページ、セッション時間など）を解析し、1年後のLTVを予測するモデルを構築します。「LTV予測が低い」と判定された広告流入元への出稿を抑制し、逆に「VIP候補」と予測された顧客には特別なクーポンを自動送付するなどの施策により、広告ROASの向上が期待できます。"
  },
  {
    icon: Target,
    title: "Hyper-Personalization",
    description: "ルールベースのセグメント配信ではなく、個々のユーザーの文脈（コンテキスト）をリアルタイムに解析。LLMを活用し、一人ひとりに最適化されたLPやメッセージを動的に生成します。",
    exampleTitle: "不動産ポータルでの活用シナリオ",
    exampleContent: "ユーザーが過去に閲覧した物件の条件（広さ、築年数、エリアのこだわり）をAIが理解し、次にアクセスした際、トップページのバナー画像とキャッチコピーをそのユーザーの好みに合わせて動的に生成・表示します。画一的な表示と比較して、クリック率や回遊率の大幅な改善が見込めます。"
  },
  {
    icon: Brain,
    title: "Marketing Mix Modeling (MMM)",
    description: "Cookie規制により計測が困難な昨今において、テレビCMやOOHを含む全マーケティング施策の貢献度を統計的に可視化。最適な予算配分シミュレーションを提供します。",
    exampleTitle: "消費財メーカーでの活用シナリオ",
    exampleContent: "テレビCM、タクシー広告、デジタル広告の出稿データと、POS売上データを統合してモデリングを行います。これにより、これまで「認知獲得」目的とされていたテレビCMが、実は特定の層の「指名検索」に強く寄与している、といった隠れた関係性を特定。CM放映時間帯を最適化し、広告予算全体の効率化と売上維持の両立を目指します。"
  },
  {
    icon: MessageSquare,
    title: "CS AI Agent",
    description: "商品知識を学習したLLMエージェントが、Webサイト上の接客を自動化。購入前の不安を解消し、CVR（コンバージョン率）を劇的に向上させます。",
    exampleTitle: "SaaS製品サイトでの活用シナリオ",
    exampleContent: "膨大な製品マニュアルとFAQを学習したAIチャットボットを導入します。料金プランの違いや、特定の機能に関する技術的な質問に対して、24時間365日、即座に正確な回答を提供可能になります。これにより、有人対応の工数を削減しつつ、導入検討者の離脱を防ぎ、CVR向上に寄与します。"
  },
  {
    icon: Layers,
    title: "Data Infrastructure",
    description: "散在するマーケティングデータ（GA4, 広告媒体, CRM）を統合し、AI活用に耐えうるデータ基盤（CDP/DWH）を構築・整備します。",
    exampleTitle: "小売チェーンでの活用シナリオ",
    exampleContent: "実店舗の会員アプリデータと、ECサイトの購買データが分断されていた状態を解消するため、BigQuery上に統合データ基盤を構築します。これにより、オンライン・オフラインを横断した顧客分析が可能になり、店舗で商品を見た後にECで購入する「ショールーミング行動」などを可視化し、新たな施策立案に繋げます。"
  },
];



// --- Main Page Component ---
const ServicePage = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white relative">
      
      {/* ★ 背景レイヤー (固定) */}
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
            subtitle="アカデミアの知見と最新のAI技術で、企業のマーケティング課題を解決します。"
          />

          {/* Workflow Section */}
          {/* Workflow Section */}
          <Section id="workflow" title="Workflow" subtitle="導入までの流れと費用感" className="bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto mt-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 relative">
                {workflowSteps.map((step, index) => (
                  <div key={step.number} className="relative flex flex-col items-center text-center group">
                    <div className="mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-blue-500  transition-colors">{step.number}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-center">{step.title}</h3>
                    
                    {/* 【追加】価格表示部分 */}
                    <div className="mb-3 text-blue-400 font-bold text-sm bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                      目安: {step.price}
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed text-left md:text-center">{step.description}</p>
                    
                    {/* デスクトップ向けの矢印 */}
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden xl:block absolute top-8 -right-1/2 w-full text-gray-600/50 z-0 pointer-events-none flex justify-center">
                        <ChevronRight size={24} />
                      </div>
                    )}
                    {/* モバイル・タブレット向けの矢印 */}
                    {index < workflowSteps.length - 1 && (
                      <div className="xl:hidden flex justify-center mt-6 text-gray-600/50">
                          <ChevronRight size={24} className="rotate-90 md:rotate-0 lg:rotate-0" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center border-t border-white/5 pt-8">
                <p className="text-gray-500 text-sm">※ プロジェクトの規模や要件により、期間や費用は変動します。</p>
              </div>
            </div>
          </Section>

          {/* Models Detail Section */}
          <Section id="models-detail" title="Our Models & Examples" subtitle="開発モデルと活用例" className="bg-black/20 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto mt-12 space-y-20">
              
              {modelDetails.map((model, index) => (
                <div key={index} className="flex flex-col gap-8">
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm">
                      <model.icon className="text-blue-400" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{model.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-base">
                        {model.description}
                      </p>
                    </div>
                  </div>

                  <div className="ml-0 md:ml-24 bg-neutral-900/60 border border-blue-500/20 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 text-blue-500/10">
                      <CheckCircle2 size={100} />
                    </div>
                    
                    <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2 relative z-10">
                      <CheckCircle2 size={18} />
                      Use Case: {model.exampleTitle}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed relative z-10">
                      {model.exampleContent}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </Section>

          {/* CTA Section */}
          <Section id="contact-cta" title="Contact" subtitle="AI開発のご相談はこちら" className="bg-gradient-to-t from-blue-950/40 to-transparent backdrop-blur-sm">
            <div className="text-center max-w-2xl mx-auto mt-8">
              <p className="text-gray-300 mb-8 text-lg">
                貴社のデータ環境や課題に合わせて、最適なAI開発プランをご提案します。<br />
                まずはお気軽にお問い合わせください。
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


