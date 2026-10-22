import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function BlogCard({ post, index }) {
  return (
    <article className="blog-card" style={{ "--card-index": index }}>
      <Link href={`/blog/${post.slug}/`} className="blog-card-link">
        <div className="blog-card-main">
          <div className="blog-card-meta">
            <time dateTime={post.date}>{format(parseISO(post.date), "yyyy.MM.dd")}</time>
            {post.tags[0] && <span className="card-tag">{post.tags[0]}</span>}
          </div>
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
        </div>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
