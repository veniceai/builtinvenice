import { useEffect, useRef } from 'react';
import { ArrowIcon } from '../icons';
import AgentPromptCard from '../AgentPromptCard';

// Scroll-driven parallax for the video background. A positive factor makes the
// layer drift down as the page scrolls up, so it lags behind (reads as a
// distant background) and opens depth as the hero leaves view. The video is
// oversized in CSS so the drift never reveals an edge. Honors
// prefers-reduced-motion by pausing the video and leaving it static.
const PARALLAX_FACTOR = 0.3;

export default function Hero({ onSubmit }: { onSubmit: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    // Ensure muted is set as a property too — some browsers gate autoplay on it.
    if (video) video.muted = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) {
      video?.pause();
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section || !video) return;

      // Progress through the hero's own scroll range only (0 → 1), so the
      // effect settles once the hero has left the viewport.
      const height = section.offsetHeight || 1;
      const progress = Math.min(Math.max(window.scrollY / height, 0), 1);
      const drift = progress * height * PARALLAX_FACTOR;
      video.style.transform = `translate3d(0, ${drift.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-parallax" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/hero-poster.jpg"
        >
          <source src="/hero-4k.webm" type="video/webm" />
          <source src="/hero-4k.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          Built in <span className="hero-title-name">Venice</span>
        </h1>
        <p className="hero-subtitle">
          Private, uncensored AI in the wild — SDKs, agents, on-chain
          experiments, and dashboards shipped by the Venice community.
        </p>
        <button type="button" onClick={onSubmit} className="submit-cta">
          Submit your work <ArrowIcon />
        </button>
        <AgentPromptCard />
      </div>
    </section>
  );
}
