"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="OneStudio 首页">
          <span className="brand-symbol" aria-hidden="true">✳</span>
          <span>OneStudio<span className="brand-divider">｜</span>一人造物</span>
        </Link>
        <nav className="header-nav" aria-label="主导航">
          <Link className="nav-blog" href="/#blog">博客</Link>
          {/* 作品集导航入口：作品板块上线后可在此启用。 */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
