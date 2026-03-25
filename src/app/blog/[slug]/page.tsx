import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Syed Ali Hasan`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="text-xs text-text-muted hover:text-accent mb-8 inline-block transition-colors font-light"
        >
          ← Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <time className="text-xs text-text-dim font-light">{post.date}</time>
            <span className="text-text-dim">·</span>
            <span className="text-xs text-text-dim font-light">{post.readTime}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-text">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full border border-border text-text-dim font-light">
                {tag}
              </span>
            ))}
          </div>

          <div className="w-full h-px bg-border mt-6" />
        </header>

        <div>
          {post.content.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={i} />;
            if (trimmed.startsWith("### "))
              return <h3 key={i} className="text-base font-semibold text-text mt-8 mb-2">{trimmed.slice(4)}</h3>;
            if (trimmed.startsWith("## "))
              return <h2 key={i} className="text-lg font-bold text-text mt-10 mb-3">{trimmed.slice(3)}</h2>;
            if (trimmed.startsWith("**") && trimmed.endsWith("**"))
              return <p key={i} className="font-semibold text-text mt-5 mb-1.5 text-sm">{trimmed.slice(2, -2)}</p>;
            if (trimmed.startsWith("- "))
              return <li key={i} className="text-sm text-text-muted leading-relaxed ml-4 list-disc font-light">{trimmed.slice(2)}</li>;
            return <p key={i} className="text-sm text-text-muted leading-relaxed mb-3 font-light">{trimmed}</p>;
          })}
        </div>

        <div className="mt-14 pt-6 border-t border-border">
          <Link href="/blog" className="text-xs text-text-muted hover:text-accent transition-colors font-medium">
            ← More Posts
          </Link>
        </div>
      </div>
    </article>
  );
}
