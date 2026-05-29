// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SocialsRow from './SocialsRow';
import type { Social } from '../../data';

describe('SocialsRow', () => {
  it('renders nothing when socials is undefined', () => {
    const { container } = render(<SocialsRow />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when socials is empty', () => {
    const { container } = render(<SocialsRow socials={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders one link per social with safeUrl-protected href', () => {
    const socials: Social[] = [
      { kind: 'x', url: 'https://x.com/foo' },
      { kind: 'github', url: 'https://github.com/foo' },
    ];
    render(<SocialsRow socials={socials} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://x.com/foo');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/foo');
  });

  it('replaces an unsafe URL with # via safeUrl', () => {
    const socials: Social[] = [
      { kind: 'website', url: 'javascript:alert(1)' as unknown as string },
    ];
    render(<SocialsRow socials={socials} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '#');
  });

  it('uses the custom label when provided, falling back to socialLabels otherwise', () => {
    const socials: Social[] = [
      { kind: 'x', url: 'https://x.com/foo', label: 'Custom' },
      { kind: 'github', url: 'https://github.com/foo' },
    ];
    render(<SocialsRow socials={socials} />);
    expect(screen.getByLabelText('Custom')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  });

  it('opens links in a new tab safely', () => {
    const socials: Social[] = [{ kind: 'website', url: 'https://example.com' }];
    render(<SocialsRow socials={socials} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
