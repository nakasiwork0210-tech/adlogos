// src/components/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  id: number;
  date: string;
  category: string;
  title: string;
  excerpt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, date, category, title, excerpt }) => (
  <Link href={`/blog/${id}`} className="block h-full bg-black/90">
    <article className="flex flex-col p-6 border border-white/10 rounded-xl bg-neutral-900/50 hover:bg-white/5 transition-colors cursor-pointer group h-full">
      <div className="flex items-center gap-3 mb-4 text-xs">
        <span className="text-gray-500 font-mono">{date}</span>
        <span className="text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">{category}</span>
      </div>
      <h3 
        className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
        {excerpt}
      </p>
      <div className="flex items-center text-blue-400 text-sm font-bold mt-auto">
        Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </article>
  </Link>
);

export default BlogCard;