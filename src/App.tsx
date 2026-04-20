import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Cookbooks from './components/sections/Cookbooks';
import Events from './components/sections/Events';
import Spotlights from './components/sections/Spotlights';
import { SUBMIT_URL } from './constants';

function App() {
  return (
    <div>
      <Header />
      <main className="main section-padding">
        <Hero />
        <Projects />
        <Cookbooks />
        <Events />
        <Spotlights />

        <section className="submit-callout">
          <div className="scallop-divider" />
          <p className="submit-callout-text">
            Have something to share — a project, recipe, event, or video?
          </p>
          <a
            href={SUBMIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="submit-cta"
          >
            Submit it &rarr;
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
