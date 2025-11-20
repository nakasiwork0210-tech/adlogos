import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ページが変わるたびにスクロールをトップに戻す
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
