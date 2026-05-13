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
        </div>
      </div>
    </header>
  );
}
