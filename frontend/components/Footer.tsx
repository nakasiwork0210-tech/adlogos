import Link from 'next/link';

const Footer = () => (
  // 【修正箇所】 bg-black を bg-black/80 に変更し、backdrop-blur-md を追加
  <footer className="bg-black/10 backdrop-blur-md border-t border-white/10 py-16 text-white relative z-10">
    <div className="container mx-auto px-6">
      {/* 変更点: grid-cols-3 に変更し、バランスを調整 */}
      <div className="grid md:grid-cols-3 gap-16 mb-16 items-start">
        
        {/* --- 左側エリア: 会社情報 (2カラム分使用) --- */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-6">FutureCast</h2>
          <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
            合同会社 FutureCast<br />
            〒106-0032 東京都港区六本木3丁目16番12号六本木KSビル5F
          </p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            データサイエンスとAI技術で、マーケティングの不確実性を排除し、企業の成長を加速させるパートナーです。
          </p>
        </div>
        
        {/* --- 右側エリア: メニューリンク (1カラム分使用) --- */}
        {/* md:justify-self-end で右寄せにしてバランスを取る */}
        <div className="md:justify-self-end">
          <h4 className="font-bold mb-4 text-white">Company</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

      </div>

      {/* コピーライトバー (変更なし) */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-xs text-gray-500">
        <p>© 2025 FutureCast. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;