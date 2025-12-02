import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

// ▼ SEO設定 (サーバーコンポーネントのみ可能)
export const metadata: Metadata = {
  title: 'futurecast | AIとマーケティングの未来を創る',
  description: 'futurecastは、最新のAI技術を活用して企業のマーケティング課題を解決するパートナーです。データ分析、AIモデル開発、戦略立案まで一気通貫でサポートします。',
  openGraph: {
    title: 'futurecast | AIとマーケティングの未来を創る',
    description: 'AI技術でマーケティングを進化させる。futurecastの公式サイトです。',
    images: ['https://futurecast.com/og-image.png'],
  },
};

// ▼ 中身のコンポーネントを呼び出すだけ
export default function Page() {
  return <HomeContent />;
}