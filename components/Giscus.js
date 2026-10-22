"use client";

import { useEffect, useRef } from "react";

const discussionConfig = {
  // 在 GitHub Discussions 启用 Giscus 后，填写 NEXT_PUBLIC_GISCUS_* 环境变量。
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
};

export default function Giscus() {
  const containerRef = useRef(null);
  const configured = Object.values(discussionConfig).every(Boolean);

  useEffect(() => {
    if (!configured || !containerRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.repo = discussionConfig.repo;
    script.dataset.repoId = discussionConfig.repoId;
    script.dataset.category = discussionConfig.category;
    script.dataset.categoryId = discussionConfig.categoryId;
    script.dataset.mapping = "pathname";
    script.dataset.strict = "0";
    script.dataset.reactionsEnabled = "1";
    script.dataset.emitMetadata = "0";
    script.dataset.inputPosition = "top";
    script.dataset.theme = isDark ? "dark" : "light";
    script.dataset.lang = "zh-CN";
    containerRef.current.replaceChildren(script);

    const observer = new MutationObserver(() => {
      const frame = containerRef.current?.querySelector("iframe");
      if (frame) {
        frame.contentWindow?.postMessage(
          { giscus: { setConfig: { theme: document.documentElement.classList.contains("dark") ? "dark" : "light" } } },
          "https://giscus.app",
        );
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    observer.observe(containerRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [configured]);

  return (
    <section className="comments-section" aria-label="文章评论">
      <div className="comments-heading">
        <div>
          <p className="eyebrow section-eyebrow">LET’S TALK</p>
          <h2>留个言吧</h2>
        </div>
      </div>
      {configured ? (
        <div className="giscus-container" ref={containerRef} />
      ) : (
        <div className="comments-placeholder">
          <span className="comment-bubble" aria-hidden="true">↗</span>
          <div>
            <strong>评论区正在准备中</strong>
            <p>
              在 GitHub 仓库启用 Discussions 与 Giscus 后，设置
              <code>NEXT_PUBLIC_GISCUS_REPO</code>、<code>NEXT_PUBLIC_GISCUS_REPO_ID</code>、
              <code>NEXT_PUBLIC_GISCUS_CATEGORY</code> 和
              <code>NEXT_PUBLIC_GISCUS_CATEGORY_ID</code> 即可启用评论。
              配置说明：<a href="https://giscus.app/zh-CN" target="_blank" rel="noreferrer">giscus.app</a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
