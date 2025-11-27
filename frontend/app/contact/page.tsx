import { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

// ▼ SEO設定 (Server Component)
export const metadata: Metadata = {
  title: 'Contact | ad-logos',
  description: 'ad-logosへのご依頼、ご相談はこちらから。AI開発やマーケティング支援に関するお問い合わせをお待ちしております。',
};

// ▼ 中身のコンポーネントを呼び出すだけ
export default function ContactPage() {
  return <ContactContent />;
}