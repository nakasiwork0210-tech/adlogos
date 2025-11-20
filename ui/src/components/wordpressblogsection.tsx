import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
}

export default function WordPressBlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://neuroledger.jp/blog/wp-json/wp/v2/posts?per_page=3")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("WordPress記事取得エラー:", err));
  }, []);

  return (
    <section
      id="blog"
      className="bg-white text-gray-800 px-6 py-24"
      style={{
        backgroundImage: "url('/images/header.png')",
        backgroundColor: "rgba(255,255,255,0.8)",
        backgroundBlendMode: "lighten",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          WordPressで更新される最新のブログ記事をご紹介します。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {posts.map(post => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div
              className="text-gray-600 text-sm mb-4"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              記事を読む →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
