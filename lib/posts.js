import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { compareDesc, parseISO } from "date-fns";

const postsDirectory = path.join(process.cwd(), "content", "posts");

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(code, language) {
    if (language && hljs.getLanguage(language)) {
      return `<pre class="hljs"><code>${hljs.highlight(code, { language }).value}</code></pre>`;
    }
    return `<pre class="hljs"><code>${hljs.highlightAuto(code).value}</code></pre>`;
  },
});

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const { data, content } = matter(source);

      if (!data.title || !data.date || !data.summary) {
        throw new Error(`文章 ${fileName} 缺少 title、date 或 summary frontmatter。`);
      }
      const date = data.date instanceof Date && !Number.isNaN(data.date.getTime())
        ? data.date.toISOString().slice(0, 10)
        : data.date;
      if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parseISO(date).getTime())) {
        throw new Error(`文章 ${fileName} 的 date 必须使用有效的 YYYY-MM-DD 日期。`);
      }

      return {
        slug,
        title: data.title,
        date,
        summary: data.summary,
        tags: Array.isArray(data.tags) ? data.tags : [],
        content,
      };
    })
    .sort((first, second) => compareDesc(parseISO(first.date), parseISO(second.date)));
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function renderMarkdown(content) {
  return markdown.render(content);
}
