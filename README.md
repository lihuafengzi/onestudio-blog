# OneStudio｜一人造物

这是一个使用 Next.js 14、Markdown 和 Tailwind CSS 构建的个人博客。网站采用静态导出，没有自建后端或数据库；文章保存在 `content/posts/`，部署到 Vercel 后，推送新的文章即可触发重新构建和发布。

## 环境要求

- Windows PowerShell
- Node.js 18.17 或更高版本；建议使用 Node.js 20 LTS
- npm（随 Node.js 一起安装）
- 发布到 Vercel 时需要 GitHub 账号

可以先确认 Node.js 和 npm 已安装：

```powershell
node --version
npm --version
```

## 本地启动与预览

在 PowerShell 中进入网站目录并安装依赖：

```powershell
Set-Location -LiteralPath 'C:\Users\River\Documents\Project\个人官方网站-vercel'
npm install
```

启动本地开发服务器：

```powershell
npm run dev
```

打开 <http://localhost:3000> 查看网站。编辑页面或文章后，开发服务器通常会自动刷新。按 `Ctrl+C` 停止服务器。

正式构建会生成可部署的静态网站到 `out\`：

```powershell
npm run build
```

如需在本地通过 HTTP 查看这次生成的静态文件，先运行构建，再执行：

```powershell
py -m http.server 8000 --directory out
```

打开 <http://localhost:8000> 预览。若电脑没有 `py` 命令但已安装 Python，可改用：

```powershell
python -m http.server 8000 --directory out
```

按 `Ctrl+C` 停止预览服务器。`out\` 是构建产物，不要手动编辑，也不需要提交到 GitHub。

## 新增或修改博客文章

所有文章放在项目根目录的 `content/posts/` 文件夹中，每篇文章一个 `.md` 文件。例如：

```text
content/posts/my-first-note.md
```

文件名会成为文章网址中的 slug。建议使用英文小写字母、数字和连字符，且不要与其他文章重名；上例的页面地址是 `/blog/my-first-note/`。

每篇文章开头需要有以下 Frontmatter：

```markdown
---
title: 我的文章标题
date: "2026-10-22"
summary: 用一两句话介绍文章内容。
tags:
  - 随笔
  - 开发
---

从这里开始写 Markdown 正文。
```

- `title`：文章标题。
- `date`：有效日期，格式为 `YYYY-MM-DD`。建议像示例一样加引号，避免日期被 YAML 自动转换类型。
- `summary`：首页文章卡片和详情页使用的摘要。
- `tags`：可选的标签列表；不需要标签时可写 `tags: []`。

首页会按日期从新到旧排列文章。正文可以使用 Markdown 标题、列表、链接、引用和代码块；代码块注明语言（例如 ```` ```js ````）会启用语法高亮。新增或修改文件后，本地可通过开发服务器预览；发布时按下文提交并推送即可。

## 替换页脚联系方式

打开 `components/Footer.js`，把示例文字替换为你自己的联系方式：

- 邮箱：把 `mailto:hello@example.com` 中的示例邮箱替换成真实邮箱。
- GitHub：把 `https://github.com/your-username` 替换成自己的 GitHub 个人主页地址。
- 个人微信：把“微信：请替换为个人微信号”改成希望公开显示的文字。
- 微信公众号：把“公众号：名称待补充”改成公众号名称或你希望展示的文字。

请只填写愿意公开的联系方式。保存后先在本地查看页脚，再提交并推送。

## 配置 Giscus 评论

未配置时，文章页会显示“评论区正在准备中”的说明，不影响网站构建或访问。启用评论需要：

1. 为网站准备一个公开的 GitHub 仓库，并在仓库设置中启用 **Discussions**。
2. 按照 [Giscus 中文配置页](https://giscus.app/zh-CN) 安装/授权 Giscus GitHub App，选择刚才的仓库和一个 Discussions 分类。配置页会检查仓库是否满足要求，并显示下方四项配置值。
3. 在项目根目录（与 `package.json` 同级）创建 `.env.local`，填入 Giscus 配置页提供的**真实值**：

   ```dotenv
   NEXT_PUBLIC_GISCUS_REPO=你的GitHub用户名/你的仓库名
   NEXT_PUBLIC_GISCUS_REPO_ID=配置页提供的repoId
   NEXT_PUBLIC_GISCUS_CATEGORY=配置页提供的分类名称
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=配置页提供的categoryId
   ```

   不要照抄上面的示例值。四项都正确填写后，本地重启开发服务器，或重新运行 `npm run build`，再检查文章详情页。

4. 部署到 Vercel 后，在项目 **Settings → Environment Variables** 添加同名四项变量。至少为 **Production** 环境设置；如果希望预览部署也显示评论，可同时勾选 **Preview**。保存后重新部署，让新变量进入构建产物。

`.env.local` 已被 `.gitignore` 排除，不要提交它。以上 Giscus 配置由站点前端使用，不要在其中放置任何密码、访问令牌或其他私密凭据。主题切换时评论主题也会随之切换。

## 将项目提交到新的 GitHub 仓库

推荐先在 GitHub 网页创建一个**新的空仓库**，例如 `onestudio-blog`。不要勾选创建 README、`.gitignore` 或许可证，这样初次推送时不会与本地文件冲突。复制 GitHub 页面提供的仓库 HTTPS 地址，例如：

```text
https://github.com/你的用户名/onestudio-blog.git
```

接下来在 PowerShell 中进入网站目录。先检查这里是否已经有 Git 仓库：

```powershell
Set-Location -LiteralPath 'C:\Users\River\Documents\Project\个人官方网站-vercel'
if (Test-Path -LiteralPath '.git') {
    Write-Host '此目录已经有 .git。请先运行 git status 和 git remote -v 检查现有仓库，不要重新初始化或替换远程地址。'
} else {
    git init -b main
}
```

当前网站目录没有 Git 仓库，因此可以按以上步骤初始化。如果检查发现 `.git` **已经存在**，先停在这里：不要继续运行下面的 `git add`、`git commit` 或添加远程仓库的命令。先确认这个 Git 仓库是否就是你打算使用的网站仓库，以及其中已有的提交和远程地址；不要在已有仓库里面再初始化一个嵌套仓库。

仅在确认目录原本没有 `.git`、且刚才已成功执行 `git init -b main` 后，继续查看状态、添加文件并提交：

```powershell
git status
git add .
git status
git commit -m "Initial OneStudio blog"
```

提交前请在第二次 `git status` 中确认没有意外加入不应公开的文件。`node_modules\`、`.next\`、`out\`、`.env*.local` 已通过 `.gitignore` 排除。若 Git 提示尚未设置身份，可按提示设置提交用的用户名和邮箱后重试。

添加新仓库地址并推送之前，先检查是否已有远程仓库：

```powershell
git remote -v
```

- 如果输出为空，才将下面命令中的地址替换成你**刚创建的空仓库**地址，然后执行：

  ```powershell
  git remote add origin https://github.com/你的用户名/onestudio-blog.git
  git push -u origin main
  ```

- 如果已经有 `origin` 或其他远程仓库，不要运行 `git remote add origin`，也不要用 `git remote set-url` 覆盖它。先确认现有仓库归属和用途；只有确定要使用哪个仓库后，再进行对应操作。
- 如果推送提示远程分支已有提交，先停止，不要使用强制推送（例如 `git push --force`），也不要删除或覆盖远程仓库。确认远程仓库内容后再处理。

以上步骤只在本项目目录中初始化或提交 Git，不会删除其他目录或 GitHub 仓库。

## 在 Vercel 部署

1. 登录 [Vercel](https://vercel.com/)，使用 GitHub 账号授权。
2. 点击 **Add New… → Project**，选择刚才创建并推送的 GitHub 仓库，再点击 **Import**。
3. 如果这个仓库专门存放本网站，**Root Directory** 保持仓库根目录（默认值即可）。只有网站位于一个更大的仓库的 `个人官方网站-vercel` 子目录时，才在这里选择该子目录。
4. Framework Preset 选择或确认 **Next.js**。默认安装和构建命令即可：通常为 `npm install` 和 `npm run build`。项目的 `next.config.js` 已启用 `output: "export"`；Next.js 构建会在 `out\` 生成静态站点，Vercel 会据此进行静态部署。除非 Vercel 的构建日志明确要求，否则不要把输出目录改成 `.next`。
5. 如已配置 Giscus，在部署前按上文将四项环境变量添加到 **Environment Variables**，并选择需要生效的环境。
6. 点击 **Deploy**，等待构建完成。成功后打开 Vercel 提供的网站地址检查首页和 `/blog/hello/` 等文章页面。

如果构建失败，先在 Vercel 项目的 **Deployments** 中打开失败记录，查看具体构建日志。确认 Root Directory 指向包含 `package.json` 和 `next.config.js` 的目录，并检查 Giscus 变量名称和值是否正确。

## 后续更新与自动部署

完成 Vercel 与 GitHub 仓库关联后，Vercel 默认会自动部署推送到生产分支的提交（新仓库通常是 `main`）。以后新增文章、修改联系方式或调整网站文件时：

1. 在 `content/posts/` 新建或编辑 `.md` 文件，或按需修改其他项目文件。
2. 本地运行 `npm run dev` 检查修改；重要更新可以再运行 `npm run build` 确认静态构建正常。
3. 在项目目录执行：

   ```powershell
   git status
   git add .
   git status
   git commit -m "Add a new blog post"
   git push
   ```

   可以把提交说明改成实际更新内容。推送后，到 Vercel 的 **Deployments** 查看自动构建进度；完成后网站就会更新。GitHub 仓库中的提交历史也会保留每次更新记录。

如果 Vercel 项目没有关联正确的 GitHub 仓库或生产分支，推送不会触发该项目部署；可在 Vercel 项目的 **Settings → Git** 中核对关联。只改本地文件而没有提交并推送，不会更新线上网站。

## 静态导出说明

- 本项目使用 Next.js App Router 和 `output: "export"`，文章页面在构建阶段生成，发布的是静态文件。
- 每次新增文章或修改构建时读取的配置后，都必须重新构建；通过 Git 推送触发 Vercel 自动构建即可。
- 不需要也不能依赖 Next.js 服务端 API、数据库、运行时服务器功能或动态服务器渲染；此项目没有后端接口。
- 图片应使用静态文件（可放在 `public\`）或公开可访问的图片地址。Next.js 图片优化已关闭以兼容静态导出。
- `npm run build` 的最终输出目录是 `out\`。Vercel 负责构建和发布；不要把 `node_modules\`、`.next\` 或 `out\` 当作文章目录，也不要手动把这些生成目录覆盖到源码中。
- 站点主题偏好保存在访问者浏览器的本地存储中；评论由 Giscus 和 GitHub Discussions 提供。除此之外，站点不需要数据库。
