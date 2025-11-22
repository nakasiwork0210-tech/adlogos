import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- Components ---
const PolicySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">
      {title}
    </h2>
    <div className="text-gray-300 leading-relaxed space-y-4 text-sm md:text-base">
      {children}
    </div>
  </div>
);

// --- Main Page ---

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400">利用規約</p>
        </div>

        {/* Content */}
        <div className="bg-neutral-900/30 p-8 md:p-12 rounded-2xl border border-white/5">
          
          <p className="text-gray-300 mb-12 leading-loose">
            この利用規約（以下，「本規約」といいます。）は，ad-logos（以下，「当方」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
          </p>

          <PolicySection title="第1条（適用）">
            <p>
              本規約は，ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
            </p>
          </PolicySection>

          <PolicySection title="第2条（禁止事項）">
            <p>ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
            <ul className="list-disc list-outside ml-5 space-y-2 marker:text-blue-500">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li>
              <li>当方，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
              <li>本サービスによって得られた情報を商業的に利用する行為</li>
              <li>当方のサービスの運営を妨害するおそれのある行為</li>
              <li>不正アクセスをし，またはこれを試みる行為</li>
              <li>他のユーザーに成りすます行為</li>
              <li>その他，当方が不適切と判断する行為</li>
            </ul>
          </PolicySection>

          <PolicySection title="第3条（本サービスの提供の停止等）">
            <p>
              当方は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 marker:text-blue-500">
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他，当方が本サービスの提供が困難と判断した場合</li>
            </ul>
            <p>
              当方は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
            </p>
          </PolicySection>

          <PolicySection title="第4条（利用制限および登録抹消）">
            <p>
              当方は，ユーザーが本規約のいずれかの条項に違反した場合，事前の通知なく，ユーザーに対して本サービスの利用を制限することができるものとします。当方は，本条に基づき当方が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
            </p>
          </PolicySection>

          <PolicySection title="第5条（保証の否認および免責事項）">
            <p>
              当方は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </p>
            <p>
              当方は，本サービスに起因してユーザーに生じたあらゆる損害について、当方の故意または重過失による場合を除き、一切の責任を負いません。
            </p>
          </PolicySection>

          <PolicySection title="第6条（サービス内容の変更等）">
            <p>
              当方は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
            </p>
          </PolicySection>

          <PolicySection title="第7条（利用規約の変更）">
            <p>
              当方は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
            </p>
          </PolicySection>

          <PolicySection title="第8条（準拠法・裁判管轄）">
            <p>
              本規約の解釈にあたっては，日本法を準拠法とします。
              本サービスに関して紛争が生じた場合には，当方の所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </PolicySection>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;