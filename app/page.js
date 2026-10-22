import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import BlogCard from "../components/BlogCard";

export const metadata = {
  title: "独立开发者的创作记录",
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="home-page">
      <section className="intro-section">
        <p className="eyebrow"><span className="status-dot" /> 独立开发者 · 一人公司</p>
        <h1>你好，我是 <span>OneStudio</span>。</h1>
        <p className="intro-copy">
          这里是「一人造物」的个人博客。我独立构思、设计并开发产品，
          在这里记录过程、分享经验，也把每一点小小的进展认真留下。
        </p>
        <div className="intro-meta">
          <span>持续创作中</span>
          <span className="meta-separator" aria-hidden="true">·</span>
          <span>独立开发者 / 一人公司</span>
        </div>
      </section>

      <section className="projects-note" aria-label="作品板块预告">
        <div className="projects-mark" aria-hidden="true">✳</div>
        <div>
          <h2>作品集，正在路上</h2>
          <p>作品展示板块暂时留白。等下一个值得分享的作品完成，我们再在这里见。</p>
        </div>
        <span className="coming-soon">COMING SOON</span>
      </section>

      <section className="posts-section" id="blog">
        <div className="section-heading">
          <div>
            <p className="eyebrow section-eyebrow">NOTES & IDEAS</p>
            <h2>最近写下的</h2>
          </div>
          <span className="post-count">{String(posts.length).padStart(2, "0")} 篇文章</span>
        </div>

        {posts.length > 0 ? (
          <div className="post-list">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✎</span>
            <h3>第一篇文章还在路上</h3>
            <p>每一段创作都从一个想法开始，稍后再来看看吧。</p>
          </div>
        )}
      </section>

      <div className="home-signoff">
        <span>想法不必很大，开始就好。</span>
        <Link href="#blog" aria-label="查看博客文章">↓</Link>
      </div>
    </div>
  );
}
