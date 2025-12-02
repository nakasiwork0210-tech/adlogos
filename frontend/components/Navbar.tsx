'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ナビゲーション定義
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
  ];

  // カレントページの判定ロジック
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 
      ${scrolled 
        ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' 
        : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* ロゴ */}
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-tighter text-white hover:text-blue-400 transition-colors relative z-50"
          onClick={() => setIsOpen(false)}
        >
          FutureCast
        </Link>
        
        {/* デスクトップメニュー */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`text-sm font-bold tracking-wide transition-colors duration-200
                ${isActive(link.path) 
                  ? 'text-blue-400' 
                  : 'text-gray-300 hover:text-white' 
                }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Contactボタン */}
          <Link 
            href="/contact" 
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-all hover:scale-105"
          >
            Contact
          </Link>
        </div>

        {/* モバイルメニューボタン */}
        {/* z-indexを上げてドロワーより手前に来るように設定 */}
        <button 
          className="md:hidden text-white p-1 relative z-50" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* モバイルメニュー用オーバーレイ (背景クリックで閉じるための幕) */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* モバイルメニュー展開部分 (右側サイドドロワー) */}
      {/* fixed top-0 right-0 h-screen w-64 で「画面右端に固定、高さ最大、幅64」に設定 */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-black/80 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* pt-28 で上部のハンバーガーボタンと重ならないように余白を空ける */}
        <div className="flex flex-col px-8 pt-28 space-y-8 text-left">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`text-xl font-bold tracking-wide transition-colors
                ${isActive(link.path) ? 'text-blue-400' : 'text-gray-200 hover:text-white'}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact" 
            className="text-white border border-white/20 py-3 rounded-full text-center hover:bg-white/10 transition-colors mt-4"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;