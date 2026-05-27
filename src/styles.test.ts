import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');

describe('styles font setup', () => {
  it('registers Aeonik weights and uses Aeonik as the sans font token', () => {
    expect(styles).toContain("font-family: 'Aeonik'");
    expect(styles).toContain("url('/fonts/Aeonik-Light.otf') format('opentype')");
    expect(styles).toContain("url('/fonts/Aeonik-Regular.otf') format('opentype')");
    expect(styles).toContain("url('/fonts/aeonik-medium.otf') format('opentype')");
    expect(styles).toContain("url('/fonts/Aeonik-Bold.otf') format('opentype')");
    expect(styles).toContain("--sans: 'Aeonik', -apple-system");
  });

  it('registers Canela and uses it only for the hero title', () => {
    expect(styles).toContain("font-family: 'Canela'");
    expect(styles).toContain("url('/fonts/Canela-Regular-Trial.otf') format('opentype')");
    expect(styles).toContain("--heading: 'Canela', 'Iowan Old Style'");
    expect(styles).not.toContain("h1, h2, h3, h4, h5, h6");
    expect(styles).toContain(".hero-title {\n  font-family: var(--heading)");
    expect(styles).toContain("font-family: var(--heading)");
    expect(styles).toContain(".hero-title-name {\n  font-family: inherit;");
  });
});
