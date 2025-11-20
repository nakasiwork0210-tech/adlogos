import { motion } from "framer-motion";
import { ArrowRight, Mail, Calendar } from "lucide-react";
import TimerexEmbed from "@/components/timerexEmbed";

const TIMEREX_URL = "https://timerex.net/s/nakasiwork0210_09f0/0515939c";

export default function ContactPage() {
  return (
    <footer className="text-gray-400 text-sm text-center">
      <section
        id="contact"
        className="relative overflow-hidden px-6 py-24"
        style={{
          backgroundImage: "url('/images/header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* 見出し・リード */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-sky-700 tracking-wide">
              まずは30分の無料カウンセリング
            </h2>
            <div className="mx-auto mt-3 h-1.5 w-28 bg-sky-500 rounded-full" />
            <p className="mt-6 text-slate-700 text-base md:text-lg">
              現在地（経験・学習時間）と作りたいアプリのイメージをヒアリングし、
              <span className="font-semibold">必要な技術・学習順序・公開までの目安</span>
              をその場でご提案します。まだ具体的でなくても大丈夫。ゼロから一緒に設計します。
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                icon: <Mail className="size-6 text-sky-600" />,
                title: "STEP 1：お申し込み",
                desc:
                  "カレンダーから日程をお選びください。現在のご状況・目標・希望スケジュールを記入いただきます。",
              },
              {
                icon: <Calendar className="size-6 text-sky-600" />,
                title: "STEP 2：無料相談（30分）",
                desc:
                  "オンラインでヒアリングし、Python×TypeScriptの最短ルートとスケジュール案をお渡しします。",
              },
              {
                icon: <ArrowRight className="size-6 text-sky-600" />,
                title: "STEP 3：学習開始",
                desc:
                  "あなた専用カリキュラムで、企画→実装→公開までを最短サイクルで伴走します。",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow-md ring-1 ring-slate-900/5 p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  {icon}
                  <h3 className="text-slate-900 font-semibold">{title}</h3>
                </div>
                <p className="mt-3 text-slate-700 leading-7">{desc}</p>
              </div>
            ))}
          </motion.div>

          <p className="mt-10 mb-10 text-slate-500 text-xs">
            ※ 無料相談のみのご利用でも構いません。しつこい営業は行いません。入会金は0円です。
          </p>

          {/* TimeRex の埋め込み（リンクではなく実体表示） */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-md ring-1 ring-slate-900/5 p-4 md:p-6">
              <TimerexEmbed url={TIMEREX_URL} height={900} />
            </div>
            <p className="text-xs text-slate-500 mt-3">
              うまく表示されない場合は、ブラウザの拡張機能を一時的に無効化するか、別ブラウザでお試しください。
            </p>
          </motion.div>

          {/* 3ステップ（そのまま） */}
          
        </div>
      </section>
    </footer>
  );
}