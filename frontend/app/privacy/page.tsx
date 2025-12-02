'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400">プライバシーポリシー（個人情報保護方針）</p>
        </div>

        {/* Content */}
        <div className="bg-neutral-900/30 p-8 md:p-12 rounded-2xl border border-white/5">
          
          <p className="text-gray-300 mb-12 leading-loose">
            futurecast（以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </p>

          <PolicySection title="第1条（個人情報）">
            <p>
              「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
            </p>
          </PolicySection>

          <PolicySection title="第2条（個人情報の収集方法）">
            <p>
              当方は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当方の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。
            </p>
          </PolicySection>

          <PolicySection title="第3条（個人情報を収集・利用する目的）">
            <p>当方が個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ul className="list-disc list-outside ml-5 space-y-2 marker:text-blue-500">
              <li>当方サービスの提供・運営のため</li>
              <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
              <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当方が提供する他のサービスの案内のメールを送付するため</li>
              <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
              <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
              <li>上記の利用目的に付随する目的</li>
            </ul>
          </PolicySection>

          <PolicySection title="第4条（利用目的の変更）">
            <p>
              当方は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
              利用目的の変更を行った場合には、変更後の目的について、当方所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
            </p>
          </PolicySection>

          <PolicySection title="第5条（個人情報の第三者提供）">
            <p>
              当方は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 marker:text-blue-500">
              <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
            </ul>
          </PolicySection>

          <PolicySection title="第6条（個人情報の開示・訂正・削除）">
            <p>
              当方は、本人から個人情報の開示、訂正、追加または削除、利用停止などを求められたときは、本人確認を行った上で、法令の規定に基づき遅滞なくこれに対応します。
            </p>
          </PolicySection>

          <PolicySection title="第7条（お問い合わせ窓口）">
            <p>
              本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
            </p>
            <div className="mt-6 p-6 bg-black border border-white/10 rounded-lg space-y-3">
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="text-blue-400 font-bold w-24">屋号</span>
                <span>FutureCast</span>
              </div>
              {/* 住所は必須でなければ削除、あるいは「東京都」のみでも可 */}
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="text-blue-400 font-bold w-24">所在地</span>
                <span>東京都港区六本木3丁目16番12号六本木KSビル5F</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="text-blue-400 font-bold w-24">E-mail</span>
                <span>info@futurecast.com</span> 
                {/* ↑ 実際のメールアドレスに変更してください */}
              </div>
            </div>
          </PolicySection>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;