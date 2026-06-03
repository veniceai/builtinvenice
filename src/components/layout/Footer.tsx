import { REPO_URL } from '../../constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <a href="https://venice.ai" aria-label="Venice AI">
          <img src="/builtinvenice-wordmark.svg" alt="Built in Venice" className="footer-logo" />
        </a>
      </div>
      <div className="footer-columns">
        <div className="footer-links-group">
          <span className="footer-links-heading">Venice</span>
          <a href="https://venice.ai">Home</a>
          <a href="https://venice.ai/about">About</a>
          <a href="https://venice.ai/features">Features</a>
          <a href="https://venice.ai/pricing">Pricing</a>
          <a href="https://venice.ai/brand">Brand Kit</a>
        </div>
        <div className="footer-links-group">
          <span className="footer-links-heading">Resources</span>
          <a href="/submission-guidelines">Submission Guidelines</a>
          <a href="https://docs.venice.ai">API Docs</a>
          <a href="https://venice.ai/blog">Blog</a>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="footer-links-group">
          <span className="footer-links-heading">Community</span>
          <a href="https://discord.gg/askvenice" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="https://x.com/AskVenice" target="_blank" rel="noopener noreferrer">X / Twitter</a>
          <a href="https://www.reddit.com/r/VeniceAI" target="_blank" rel="noopener noreferrer">Reddit</a>
        </div>
      </div>
      <p className="footer-disclaimer">
        Listing does not imply endorsement by Venice AI, Inc.
      </p>
    </footer>
  );
}
