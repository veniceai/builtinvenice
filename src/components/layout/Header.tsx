import { ArrowIcon } from '../icons';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <div className="ask-anything-wrapper">
            <input type="text" className="ask-anything" placeholder="Ask Anything" />
            <button className="venice-icon" aria-label="Ask Anything">
              <ArrowIcon />
            </button>
          </div>
          <nav className="nav-links">
            <a href="https://venice.ai">Home</a>
            <a href="https://venice.ai/about">About</a>
            <a href="https://venice.ai/features">Features</a>
            <a href="https://venice.ai/pricing">Pricing</a>
            <a href="https://venice.ai/sign-in" className="sign-in">Sign in</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
