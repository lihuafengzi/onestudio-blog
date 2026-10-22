export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-mark" aria-hidden="true">✳</span>
            <div>
              <strong>OneStudio｜一人造物</strong>
              <p>保持好奇，持续造物。</p>
            </div>
          </div>
          <div className="social-links">
            <a href="mailto:hello@example.com">Email <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/your-username" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <span className="social-text">微信：请替换为个人微信号</span>
            <span className="social-text">公众号：名称待补充</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 OneStudio 一人造物 · 保持极简，持续创作</span>
          <span>MADE WITH INTENTION <span className="footer-heart">♥</span></span>
        </div>
      </div>
    </footer>
  );
}
