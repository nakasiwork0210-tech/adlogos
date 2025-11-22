import { 
  ArrowRight,
  Brain, BarChart3, Target, MessageSquare, Layers,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// パーティクルコンポーネントをインポート
import ParticleBackground from '../components/Particle'; 

// --- Types ---
interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

// --- Shared Components ---

// セクションコンポーネント
// 背景色は親側で制御するため、デフォルトの背景色は指定しませんが、
// 透過させたい場合は bg-transparent や bg-black/xx を className で渡します。
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
// 【変更点】背景を不透明なグラデーションから、半透明＋ぼかしに変更し、パーティクルが透けるようにしました。
const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="pt-32 pb-20  text-center px-6 border-b border-white/5">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
    <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const workflowSteps = [
  { number: '01', title: 'ヒアリング・データ診断', description: '課題感の共有と、保有データの量・質を確認。AI開発の実現可能性を初期診断します。' },
  { number: '02', title: 'ご提案・ロードマップ策定', description: '最適なAIモデルと期待される効果、実用化までの具体的なステップをご提案します。' },
  { number: '03', title: 'PoC (概念実証)', description: '小規模なデータでモデルを開発。精度やビジネスインパクトを検証し、投資判断を行います。' },
  { number: '04', title: '本開発・実装', description: '実運用に耐えうる精度までモデルを改善し、既存システムへの組み込みを行います。' },
  { number: '05', title: '運用・継続的改善', description: '導入後の効果測定を実施。データの変化に合わせてモデルを再学習させ、精度を維持します。' },
];

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
        {/* パーティクル本体 */}
        <ParticleBackground disableInteraction={true} />
        
        {/* ★ 黒い布（オーバーレイ） */}
        {/* bg-black/70 で70%の濃さの黒をかぶせています。濃すぎる場合は /50 などに調整してください */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" /> 
      </div>

      {/* ★ コンテンツレイヤー (relative z-10 で背景の上に配置) */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <PageHeader 
            title="Our Services" 
            subtitle="アカデミアの知見と最新のAI技術で、企業のマーケティング課題を解決します。" 
          />

          {/* Workflow Section */}
          {/* bg-black/20 で少しだけ背景を暗くし、文字を見やすくしつつ透けさせる */}
          <Section id="workflow" title="Workflow" subtitle="導入までの流れ" className="bg-black/20 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto mt-16">
              <div className="grid md:grid-cols-5 gap-8 md:gap-4 relative">
                {workflowSteps.map((step, index) => (
                  <div key={step.number} className="relative flex flex-col items-center text-center md:block md:text-left group">
                    <div className="mb-4 flex items-center justify-center md:justify-start">
                      <span className="text-5xl font-bold text-blue-500/30 group-hover:text-blue-500/50 transition-colors">{step.number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

                    {index < workflowSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 -right-4 text-gray-600 z-10">
                        <ChevronRight size={24} />
                      </div>
                    )}
                    {index < workflowSteps.length - 1 && (
                      <div className="md:hidden flex justify-center my-4 text-gray-600">
                          <ChevronRight size={24} className="rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
               <div className="mt-12 text-center">
                <p className="text-gray-500 text-sm">※ プロジェクトの規模や要件により、期間やステップは変動します。</p>
              </div>
            </div>
          </Section>

          {/* Models Detail Section */}
          {/* 背景は透明（大元の黒い布任せ）でも良いですし、区切りのために薄く色を入れてもOK */}
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
          {/* 下部のCTAは少し目立たせるために、うっすらグラデーションを入れる */}
          <Section id="contact-cta" title="Contact" subtitle="AI開発のご相談はこちら" className="bg-gradient-to-t from-blue-950/40 to-transparent backdrop-blur-sm">
            <div className="text-center max-w-2xl mx-auto mt-8">
              <p className="text-gray-300 mb-8 text-lg">
                貴社のデータ環境や課題に合わせて、最適なAI開発プランをご提案します。<br />
                まずはお気軽にお問い合わせください。
              </p>
              <a href="/contact" className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all inline-flex items-center gap-2">
                お問い合わせフォームへ <ArrowRight size={20} />
              </a>
            </div>
          </Section>

        </main>

        <Footer />
      </div>
    </div>
  );
}

export default ServicePage;



