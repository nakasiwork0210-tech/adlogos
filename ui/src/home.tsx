import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ContactSection from "@/components/contactsection";
import { ArrowRight } from 'lucide-react';

// Animation variants for staggered children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};


export default function Home() {
  return (
    <main className="w-full text-white font-sans">
      {/* Hero Section */}
      <section 
        className="w-full min-h-[70vh] md:min-h-[55vh] flex flex-col items-center justify-center text-center px-4 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/header.png')"}}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // モバイルは小さめ、画面幅で自動拡大、行間を詰める
            className="font-bold mb-6 text-white tracking-tight leading-tight
                      text-[clamp(24px,6.5vw,40px)] md:text-[clamp(36px,4.5vw,56px)]
                      text-center max-w-[22ch] mx-auto"
          >
            {/* モバイルは1行、md以上で改行 */}
            <span className="block sm:inline">0から最速でアプリを作る</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline">プログラミングメンター</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto text-center"
          >
            メンターは全員
            <span className="text-blue-400 font-semibold">現役東大生エンジニア</span>
            <br />
            月額49800円で学習サービス使い放題、週1回のマンツーマン指導
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}   
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
              <Link
                to="/contact"
                // classNameを下のボタンと同じスタイルに変更しました
                className="group bg-blue-500 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                無料相談を申し込む<ArrowRight className="group-hover:translate-x-1 transition-transform" size={20}/>
              </Link>

          </motion.div>
        </div>
      </section>
      
      {/* Explain Section */}
      <section className="bg-white text-slate-800 px-6 pt-20">
        {/* 見出し */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            <span className="text-[rgba(24,74,131,1)]">Code</span>
            <span className="text-black">Mentor</span>
            について
          </h2>
        </motion.div>

        {/* 説明文 */}
        <div className="max-w-4xl mx-auto space-y-6 text-[15px] md:text-[17px] leading-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            CodeMentorは、
            <span className="font-semibold underline decoration-blue-800 decoration-4 underline-offset-4">
              0から最速でアプリが作れるようになる
            </span>
            メンター・コーチングサービスです。
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
              最速で作るために
            </span>
            言語はあえて
            <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
              pythonとtypescriptのみに絞り、
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
              InstagramやLineのようなサービスを作れる技術を得るまで
            </span>
            完全マンツーマンで指導させていただきます。
          </motion.p>
        </div>
      </section>


      {/* Reasons Section */}
      <section className="bg-white text-black px-6 pt-24 pb-5">
        {/* 見出し（ブランドカラー分割） */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            なぜ
            <span className="text-[rgba(24,74,131,1)]">Code</span>
            <span className="text-black">Mentor</span>
            なのか？
          </h2>
        </motion.div>

        {/* 冒頭説明（Technologyセクションのスタイルで） */}
        <div className="max-w-4xl mx-auto space-y-6 text-[15px] md:text-[17px] leading-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Code Mentorは
            <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
              最速でアプリを作るために
            </span>
            以下の点で他社と一線を画しています。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pt-2"
          >
            <Link
              to="/service"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white font-semibold px-7 py-3 hover:bg-blue-700 transition-colors"
              aria-label="詳しい学習内容はこちらから"
            >
              詳しい学習内容はこちらから
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* 既存の3カラム（そのまま） */}
        {/* Reasons (3つともこのカードUIで縦積み) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto mt-10 space-y-8"
        >
          {[
            {
              no: 1,
              title1: "「文法がわかる」ではなく",
              title2: "「サービスを作れる」までやる",
              desc: (
                <>
                  プログラミング学習者の多くは、文法がわからないことではなく、

                  
                  <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
                    エラー対処や、外部ツールが使えないことで挫折します。
                  </span><br />
                  <br />
                  当サービスでは、
                  <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
                    文法はもちろん、エラー対処や外部ツールの使い方まで
                  </span>
                  指導し、実際にweb上で他人が使えるサービスを作る力を養います。
                </>
              ),
              img: "/images/point1.png", // 置きたい画像パスに変更
            },
            {
              no: 2,
              title1: "Python × TypeScriptに絞った",
              title2: "集中カリキュラム",
              desc: (
                <>
                  アプリを作るために必要なことは、多くの言語が使えることではなく、
                  <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
                    バックエンド、フロントエンドの言語が1つずつ、確実に使えることです。
                  </span>
                  <br /><br />
                  当サービスでは、バックエンドをPython、フロントエンドをTypeScriptという、
                  <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
                    現代では最も汎用性の高い2言語に絞り、
                  </span>
                  徹底的に学習します。
                </>
              ),
              img: "/images/point2.png",
            },
            {
              no: 3,
              title1: "始めやすく続けやすい",
              title2: "サービス設計",
              desc: (
                <>
                  多くのプログラミングスクールでは、最初に一括の料金を支払います。
                  <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
                    しかし、プログラミングは全員が同じ速度で成長するわけではありません。
                  </span>
                  <br /><br />
                  当サービスでは、
                  <span className="font-semibold underline decoration-sky-400 decoration-4 underline-offset-4">
                    入会金無料、月額制
                  </span>
                  を採用することで、始めやすく、各々のペースで続けやすい設計にしています。
                </>
              ),
              img: "/images/point3.png",
            },
          ].map(({ no, title1, title2, desc, img }) => (
            <motion.div
              key={no}
              variants={item}
              className="bg-white rounded-2xl shadow-md ring-1 ring-slate-900/5 p-6 md:p-8"
            >
              <div className="md:grid md:grid-cols-2 md:items-center gap-6 md:gap-8">
                {/* テキスト */}
                <div className="order-2 md:order-1">
                  <p className="text-sky-700 font-semibold mb-2">point{no}</p>

                  {/* モバイル */}
                  <h3 className="md:hidden text-xl font-bold text-slate-900 leading-snug">
                    {title1} {title2}
                  </h3>

                  {/* md以上 */}
                  <h3 className="hidden md:block text-2xl font-bold text-slate-900 leading-snug">
                    {title1}
                    <br />
                    {title2}
                  </h3>

                  <p className="mt-4 text-slate-700 leading-7">{desc}</p>
                </div>

                {/* 画像：モバイル非表示、md以上で表示 */}
                <div className="order-1 md:order-2 hidden md:flex justify-center">
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-xl object-cover aspect-[16/9]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </section>
      {/* Services & Pricing Section (最下部) */}
      <section className="bg-white text-slate-800 px-6 py-20">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-sky-700 tracking-wide">
            サービス概要・受講料
          </h2>
          <div className="mx-auto mt-3 h-1.5 w-28 bg-sky-500 rounded-full" />
        </motion.div>

        {/* 枠付きカード */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-5xl mx-auto mt-8 rounded-2xl border-2 border-sky-300/70 shadow-md bg-white"
        >
          {/* 見出し */}
          <div className="px-5 md:px-8 pt-6">
            <p className="text-sky-700 font-bold text-lg">サービス概要</p>
          </div>

          {/* 定義リスト（ラベル左 / 説明右） */}
          <div className="px-5 md:px-8 pb-6 md:pb-8 mt-3">
            <div className="divide-y divide-dotted divide-slate-300">
              {/* 行 */}
              <div className="grid grid-cols-1 md:grid-cols-[11rem,1fr] gap-3 py-4">
                <dt className="font-semibold text-slate-700">指導内容</dt>
                <dd className="text-slate-700 leading-7">
                  受講生の目的に合わせて、<span className="font-semibold">Python と TypeScript（React）</span> を中心に
                  Webアプリの企画・実装・公開までをマンツーマンでサポートします。学習サービスは使い放題、質問は無制限。
                </dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[11rem,1fr] gap-3 py-4">
                <dt className="font-semibold text-slate-700">料金（税込）</dt>
                <dd className="text-slate-700 leading-7">
                  <span className="font-semibold">月額 49,800円</span>（学習サービス使い放題・週1回マンツーマン60分）
                  <br className="hidden md:block" />
                  <span className="text-slate-600">※ 入会金 0円／途中解約は翌月以降停止</span>
                </dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[11rem,1fr] gap-3 py-4">
                <dt className="font-semibold text-slate-700">対象者</dt>
                <dd className="text-slate-700 leading-7">
                  初心者〜中級者（高校生・大学生・社会人のリスキリング歓迎）。「0から最速でアプリを作りたい」方。
                </dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[11rem,1fr] gap-3 py-4">
                <dt className="font-semibold text-slate-700">受講時間・回数</dt>
                <dd className="text-slate-700 leading-7">
                  週1回（60分）を基本に、希望に応じて調整可。スケジュールは担当メンターと相談して決定します。
                </dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[11rem,1fr] gap-3 py-4">
                <dt className="font-semibold text-slate-700">受講場所</dt>
                <dd className="text-slate-700 leading-7">
                  オンライン（推奨）。対面をご希望の場合は別途ご相談ください（都内中心）。
                </dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[11rem,1fr] gap-3 py-4">
                <dt className="font-semibold text-slate-700">受講形態</dt>
                <dd className="text-slate-700 leading-7">
                  メンターによるマンツーマン指導＋無制限質問サポート（チャット）。
                </dd>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[11rem,1fr] gap-3 py-4">
                <dt className="font-semibold text-slate-700">お支払い方法</dt>
                <dd className="text-slate-700 leading-7">
                  クレジットカード / 銀行振込（法人様は請求書払いに対応可）。
                </dd>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      {/* Contact Section */}
      <ContactSection />

    </main>
  );
}