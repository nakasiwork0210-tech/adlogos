import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { label: "ホーム", to: "/" },
    { label: "学習内容", to: "/service" },
    { label: "ブログ", to: "/blog" },
  ];
  const contactLink = { label: "無料相談を申し込む", to: "/contact" };

  return (
    // ▼ motion.header にして背景レイヤー&中身のopacityを同期
    <motion.header
      className="w-full fixed top-0 left-0 z-50 h-12 lg:h-20"
      initial={false}
    >
      {/* 背景レイヤー（白＋ぼかし） */}
      <motion.div
        className="absolute inset-0 bg-white supports-[backdrop-filter]:backdrop-blur-lg"
        animate={{ opacity: scrolled ? 1 : 0.0 }}
        transition={{ duration: 0.25 }}
      />
      {/* 影も別レイヤーで同期（好みで） */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ boxShadow: scrolled ? "0 6px 24px rgba(0,0,0,0.08)" : "0 0 0 rgba(0,0,0,0)" }}
        transition={{ duration: 0.25 }}
      />

      {/* コンテンツ（ロゴ/リンク/ボタン） */}
      <motion.div
        className="relative w-full h-full px-4 sm:px-6 py-0 flex items-center justify-between"
        // 中身も少しだけフェードさせる（透け感を揃える）
        animate={{ opacity: scrolled ? 1 : 0.88 }}
        transition={{ duration: 0.25 }}
      >
        <Link to="/" className="flex items-center gap-2" aria-label="CodeMentor home">
          <img
            src="/logo.png"
            alt="CodeMentor"
            width={920}
            height={480}
            className="h-6 lg:h-8 w-auto block"
            loading="eager"
            decoding="async"
          />
          <span className="sr-only">CodeMentor</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="text-black hover:text-gray-700 transition-colors duration-300 relative group"
          >
            ホーム
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
          <Link
            to="/service"
            className="text-black hover:text-gray-700 transition-colors duration-300 relative group"
          >
            学習内容
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>

          {/* ▼ ブログはフルリロードで /blog に遷移させるため <a> を使用 */}
          <a
            href="/blog"
            className="text-black hover:text-gray-700 transition-colors duration-300 relative group"
          >
            ブログ
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </a>
          <Link
            to={contactLink.to}
            className="group bg-blue-600 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            {contactLink.label}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </nav>

        {/* Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black"
            aria-label="メニューを開く"
          >
            <Menu className="w-5 h-5 lg:w-7 lg:h-7" />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white supports-[backdrop-filter]:backdrop-blur-md absolute top-0 left-0 w-full h-screen"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsOpen(false)} className="text-black" aria-label="メニューを閉じる">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center h-[calc(100vh-64px)] -mt-6 space-y-7">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-gray-900 text-2xl hover:text-blue-600 transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                to={contactLink.to}
                className="group bg-blue-500 border border-white/30 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {contactLink.label}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}



