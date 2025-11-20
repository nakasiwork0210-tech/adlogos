// TimerexEmbed.tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TimerexCalendar?: () => void;
  }
}

type Props = {
  url: string;            // TimeRex の data-url
  height?: number | string; // 必要なら高さを指定（px or '80vh' など）
};

export default function TimerexEmbed({ url, height = 900 }: Props) {
  const loadedRef = useRef(false);

  useEffect(() => {
    // すでにロード済みなら実行だけ
    const existing = document.getElementById("timerex_embed") as HTMLScriptElement | null;
    const call = () => window.TimerexCalendar?.();

    if (existing) {
      call();
      return;
    }

    // 初回ロード
    const s = document.createElement("script");
    s.id = "timerex_embed";
    s.src = "https://asset.timerex.net/js/embed.js";
    s.async = true;
    s.onload = () => {
      loadedRef.current = true;
      call();
    };
    document.body.appendChild(s);

    return () => {
      // ページ遷移で戻ってきたときも使うので script は消さない
    };
  }, []);

  return (
    <div className="w-full">
      {/* 埋め込み本体 */}
      <div
        id="timerex_calendar"
        data-url={url}
        style={{ minWidth: 320, height }}
        className="w-full"
      />

      {/* JS無効時のフォールバック（任意） */}
      <noscript>
        <a href={url} target="_blank" rel="noreferrer">
          予約ページを開く
        </a>
      </noscript>
    </div>
  );
}
