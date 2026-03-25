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

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2 mb-4 ml-1">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-text-muted leading-[1.8] font-[var(--font-body)] font-light">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
    inList = false;
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={i} className="font-[var(--font-display)] text-xl text-text mt-10 mb-4">
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={i} className="font-[var(--font-display)] text-2xl text-text mt-12 mb-5">
          {trimmed.slice(3)}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(trimmed.slice(2));
      return;
    }

    if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.slice(2, -2).includes("**")) {
      flushList();
      elements.push(
        <p key={i} className="font-semibold text-text mt-6 mb-2 text-[15px] font-[var(--font-body)]">
          {trimmed.slice(2, -2)}
        </p>
      );
      return;
    }

    if (trimmed.startsWith("`") && trimmed.endsWith("`")) {
      flushList();
      elements.push(
        <code key={i} className="inline-block px-2 py-0.5 rounded bg-black/5 text-accent text-[13px] font-[var(--font-mono)]">
          {trimmed.slice(1, -1)}
        </code>
      );
      return;
    }

    flushList();
    elements.push(
      <p key={i} className="text-[15px] text-text-muted leading-[1.9] mb-4 font-[var(--font-body)] font-light">
        {trimmed}
      </p>
    );
  });

  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const contentElements = renderContent(post.content);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="min-h-screen">
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] text-text-dim hover:text-accent mb-12 transition-colors duration-200 font-[var(--font-mono)] uppercase tracking-wide"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All Posts
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-[10px] px-3 py-1.5 rounded-full border border-border text-text-dim font-[var(--font-mono)] uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl tracking-tight text-text leading-[1.15] mb-6">
              {post.title}
            </h1>
            
            <p className="text-base text-text-muted font-[var(--font-body)] font-light leading-relaxed max-w-2xl mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-4">
              <time className="text-[12px] text-text-dim font-[var(--font-mono)]">{post.date}</time>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[12px] text-text-dim font-[var(--font-mono)]">{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="w-full h-px bg-border mb-16" />
          
          <div className="prose">
            {contentElements}
          </div>
          
          <div className="w-12 h-px bg-accent mt-20 mb-16" />
          
          <div className="flex items-center justify-between py-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[11px] text-text-dim hover:text-accent transition-colors duration-200 font-[var(--font-mono)] uppercase tracking-wide"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="font-[var(--font-display)] text-lg text-text mb-8">More Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link 
                    key={related.slug} 
                    href={`/blog/${related.slug}`}
                    className="group block p-6 rounded-2xl border border-border bg-bg-card hover:border-accent/25 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {related.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[9px] px-2 py-1 rounded-full border border-border text-text-dim font-[var(--font-mono)] uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-[var(--font-display)] text-base text-text group-hover:text-accent transition-colors duration-200 mb-2 leading-snug">
                      {related.title}
                    </h4>
                    <p className="text-xs text-text-dim font-[var(--font-body)] font-light line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
