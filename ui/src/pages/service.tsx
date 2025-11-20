import { motion } from "framer-motion";
import ContactSection from "@/components/contactsection";
import { Link } from "react-router-dom";
import {
  Code, Braces, GitBranch, Boxes, Flame, Cloud, Rocket,
} from "lucide-react";

// アニメーション
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay },
});

export default function ServicePage() {
  return (
    <main className="bg-gray-50">
      {/* Hero */}


      {/* Introduction */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.h2
            {...fadeIn(0.1)}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            CodeMentorで学べること
          </motion.h2>
          <motion.p
            {...fadeIn(0.2)}
            className="text-gray-700 leading-relaxed text-lg"
          >
            プログラミングが初めての方でも大丈夫です。<br />
            CodeMentorでは、アプリ開発の全体像を「6つの分野」で体系的に学び、<br />
            最終的に自分のWebサービスを世界に公開できるようになります。
          </motion.p>
        </div>

        {/* 学習分野カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            {
              Icon: Braces,
              title: "Python（アプリの頭脳を作る）",
              desc: "アプリの動きを決めるロジックを作ります。データ処理やログイン機能など、バックエンドの仕組みを理解します。",
            },
            {
              Icon: Code,
              title: "React（見た目と操作を作る）",
              desc: "画面デザインやボタンの動きなどを作成します。TypeScriptを使って、安全で動きのあるWebページを開発します。",
            },
            {
              Icon: GitBranch,
              title: "GitHub（コードを保存・共有）",
              desc: "書いたコードを安全に保存し、過去のバージョンに戻したり、他の人と共同開発できるようにします。",
            },
            {
              Icon: Boxes,
              title: "Docker（どこでも同じ環境で動かす）",
              desc: "アプリをパソコンでもクラウドでも同じように動かせるようにします。環境構築のトラブルを減らします。",
            },
            {
              Icon: Flame,
              title: "Firebase（ログイン・データ保存）",
              desc: "ログイン機能やデータベースを簡単に使えるサービス。作ったアプリをすぐに動かせます。",
            },
            {
              Icon: Cloud,
              title: "AWS（アプリを世界に公開）",
              desc: "アプリを本番環境に公開して、世界中の人がアクセスできるようにします。ドメインやセキュリティも学びます。",
            },
          ].map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              {...fadeIn(0.3 + i * 0.1)}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="h-7 w-7 text-sky-600" />
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 学習の流れ */}
      <section className="bg-white text-gray-800 px-6 py-24">
        <motion.div
          {...fadeIn(0.1)}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-700">
            CodeMentorの学習の流れ
          </h2>
          <p className="text-gray-700 mt-4">
            「わからない」を一つずつ解決しながら、実際に動くWebアプリを完成させます。
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-10">
          {[
            {
              step: "STEP 1",
              title: "無料相談・カウンセリング",
              desc: "目標や作りたいアプリをヒアリング。PythonやReactのどの分野を重点的に学ぶか、一人ひとりに合わせた学習プランを作ります。",
            },
            {
              step: "STEP 2",
              title: "環境構築と基礎学習",
              desc: "VSCode、GitHub、Dockerの使い方を学び、実際に自分のPCでアプリを動かせる環境を整えます。",
            },
            {
              step: "STEP 3",
              title: "アプリ開発の実践",
              desc: "Pythonでアプリの動きを作り、Reactで画面を作成。ログイン機能やデータ保存など、実際に動くWebサービスを形にします。",
            },
            {
              step: "STEP 4",
              title: "デプロイと公開",
              desc: "FirebaseやAWSを使って、インターネット上にアプリを公開。誰でもアクセスできる状態を目指します。",
            },
          ].map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border-l-4 border-sky-500 pl-6"
            >
              <h4 className="text-sky-600 font-semibold">{step}</h4>
              <p className="text-xl font-bold text-gray-900">{title}</p>
              <p className="text-gray-700 mt-2">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeIn(0.6)}
          className="text-center mt-14"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white font-semibold px-8 py-3 hover:bg-blue-700 transition-colors"
          >
            無料相談で学習プランを提案してもらう
            <Rocket className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>

      {/* Contact */}
      <div className="mt-12">
        <ContactSection />
      </div>
    </main>
  );
}




