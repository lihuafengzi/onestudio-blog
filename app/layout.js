import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: {
    default: "OneStudio｜一人造物",
    template: "%s · OneStudio",
  },
  description: "独立开发者的个人博客，记录想法、实践与持续创作。",
  icons: {
    icon: "/favicon.ico",
  },
};

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem("onestudio-theme");
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", saved ? saved === "dark" : systemDark);
    } catch {
      document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="site-shell">
          <Header />
          <main className="main-content mx-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
