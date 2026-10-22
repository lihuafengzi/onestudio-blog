import { notFound } from "next/navigation";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getAllPosts, getPostBySlug, renderMarkdown } from "../../../lib/posts";
import Giscus from "../../../components/Giscus";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);
  const date = format(parseISO(post.date), "yyyy年MM月dd日");

  return (
    <article className="article-page">
      <Link className="back-link" href="/">
        <span aria-hidden="true">←</span> 返回首页
      </Link>

      <header className="article-header">
        <p className="article-kicker">ONE STUDIO · BLOG</p>
        <h1>{post.title}</h1>
        <div className="article-meta">
          <time dateTime={post.date}>{date}</time>
          {post.tags.length > 0 && (
            <>
              <span className="meta-separator" aria-hidden="true">·</span>
              <div className="tag-list" aria-label="文章标签">
                {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </>
          )}
        </div>
        <p className="article-summary">{post.summary}</p>
      </header>

      <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="article-end" aria-hidden="true"><span>✳</span></div>
      <Giscus />
      <div className="article-bottom-link">
        <Link href="/"><span aria-hidden="true">←</span> 回到所有文章</Link>
      </div>
    </article>
  );
}
