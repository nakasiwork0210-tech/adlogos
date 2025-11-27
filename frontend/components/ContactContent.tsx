'use client'; // ★フォームがあるので必須

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/Particle';

// =================================================================
// ★設定: お問い合わせフォームの送信先
// =================================================================
const FORM_ENDPOINT = "https://formspree.io/f/xgvqkpwy"; 

// サブコンポーネント
const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="pt-32 pb-20 text-center px-6 border-b border-white/5">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
    <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ★設定がまだの場合のデモ動作
    if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
       await new Promise(resolve => setTimeout(resolve, 1500));
       console.log('デモ送信データ:', formData);
       alert("【設定が必要です】\nソースコードの `FORM_ENDPOINT` にFormspree等のURLを設定すると、実際にメールが送信されるようになります。\n（現在はデモモードで動作しています）");
       setIsSubmitting(false);
       setIsSubmitted(true);
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }

    // ★実際のメール送信処理 (FormspreeへPOST)
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // 送信成功
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          subject: '',
          message: ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // 送信失敗
        const data = await response.json();
        console.error("Form submission error:", data);
        throw new Error(data.error || '送信に失敗しました');
      }
    } catch (err) {
      setIsSubmitting(false);
      alert('送信エラーが発生しました。恐れ入りますが、時間をおいて再度お試しいただくか、直接メールにてご連絡ください。');
      console.error(err);
    }
  };

  const inputClasses = "w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white relative">
      
      <div className="fixed inset-0 z-0">
        <ParticleBackground disableInteraction={true} />
        <div className="absolute inset-0 bg-black/70 pointer-events-none" /> 
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main>
          <PageHeader 
            title="Contact Us" 
            subtitle="AI開発に関するご相談、お見積もり依頼など、お気軽にお問い合わせください。" 
          />

          <section className="py-12 md:py-20">
            <div className="container mx-auto px-6">
              
              <div className="max-w-4xl mx-auto space-y-24">
                
                <div className="bg-neutral-950/60 p-8 md:p-10 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                  
                  {isSubmitted ? (
                    <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full text-green-500 mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">お問い合わせありがとうございます</h3>
                      <p className="text-gray-400 mb-8 leading-relaxed">
                        送信が完了しました。<br />
                        担当者より通常1〜2営業日以内にご連絡させていただきます。<br />
                        自動返信メールをお送りしましたのでご確認ください。
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4 transition-colors"
                      >
                        他のお問い合わせを送る
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Mail className="text-blue-500" size={24} />
                        お問い合わせフォーム
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2">お名前 <span className="text-blue-500">*</span></label>
                            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="山田 太郎" />
                          </div>
                          <div>
                            <label htmlFor="company" className="block text-sm font-bold text-gray-300 mb-2">会社名</label>
                            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClasses} placeholder="株式会社ad-logos" />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2">メールアドレス <span className="text-blue-500">*</span></label>
                          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="taro.yamada@example.com" />
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-bold text-gray-300 mb-2">件名 <span className="text-blue-500">*</span></label>
                            <select id="subject" name="subject" required value={formData.subject} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                              <option value="" disabled className="bg-neutral-900 text-gray-500">選択してください</option>
                              <option value="AI開発の相談" className="bg-neutral-900 text-white">AI開発のご相談</option>
                              <option value="サービス詳細について" className="bg-neutral-900 text-white">サービス詳細について</option>
                              <option value="お見積もり依頼" className="bg-neutral-900 text-white">お見積もり依頼</option>
                              <option value="その他" className="bg-neutral-900 text-white">その他</option>
                            </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-2">お問い合わせ内容 <span className="text-blue-500">*</span></label>
                          <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="具体的なご相談内容をご記入ください。"></textarea>
                        </div>

                        <div>
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2 group
                              ${isSubmitting 
                                ? 'bg-blue-900/50 text-blue-200 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]'
                              }`}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="animate-spin" size={20} />
                                送信中...
                              </>
                            ) : (
                              <>
                                送信する
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                          <p className="text-xs text-gray-500 text-center mt-4">
                            ※ お客様の個人情報は、<Link href="/privacy" className="underline hover:text-white transition-colors">プライバシーポリシー</Link>に基づき適切に管理いたします。
                          </p>
                        </div>

                      </form>
                    </>
                  )}
                </div>

                <div className="md:px-8">
                  <h2 className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-4">Get in Touch</h2>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8">その他のご連絡方法</h3>
                  <p className="text-gray-400 mb-12 leading-relaxed max-w-2xl">
                    フォーム以外にも、お電話やメールでのご連絡も受け付けております。<br/>
                    お急ぎの場合や、フォームでの入力が難しい場合は下記をご利用ください。
                  </p>

                  <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="flex items-start space-x-4 group">
                      <div className="bg-blue-500/10 p-3 rounded-full text-blue-400 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-blue-400 transition-colors">Phone</h4>
                        <p className="text-gray-400 text-sm">070-9100-6625<br/><span className="text-xs text-gray-500">(平日 10:00-18:00)</span></p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 group">
                      <div className="bg-blue-500/10 p-3 rounded-full text-blue-400 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-blue-400 transition-colors">Email</h4>
                        <p className="text-gray-400 text-sm break-all">info@ad-logos.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 group">
                      <div className="bg-blue-500/10 p-3 rounded-full text-blue-400 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-blue-400 transition-colors">Address</h4>
                        <p className="text-gray-400 text-sm">〒113-0032<br/>東京都文京区弥生2-7-11-303</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ContactContent;