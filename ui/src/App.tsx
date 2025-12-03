// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 作成したページコンポーネントをインポート
// ※パスは実際のファイル構成に合わせて調整してください
import HomePage from './pages/home';
import ServicePage from './pages/service';
import ContactPage from './pages/contact'; // ← 追加
import BlogPost from './pages/blogpost';
import BlogPage from './pages/blog';
import PrivacyPage from './pages/privacy';
import TermsPage from './pages/terms';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* トップページ (Home) */}
        <Route path="/" element={<HomePage />} />
        
        {/* サービスページ */}
        <Route path="/services" element={<ServicePage />} />

        {/* コンタクトページ (追加) */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* 404対策（とりあえずHomeへ） */}
        <Route path="*" element={<HomePage />} />

      </Routes>
    </Router>
  );
}

export default App;