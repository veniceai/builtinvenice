// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import XAccountCard from './XAccountCard';
import type { XAccountProject } from '../../data';

const base: XAccountProject = {
  type: 'X Account',
  title: 'Foo',
  description: 'd',
  url: 'https://x.com/foo',
  category: 'ecosystem',
  tags: ['Account'],
  handle: 'foo',
};

describe('XAccountCard', () => {
  it('renders the handle with @ prefix and title', () => {
    render(<XAccountCard project={base} />);
    expect(screen.getByText('@foo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Foo' })).toBeInTheDocument();
  });

  it('formats followers: <1K as raw, ≥1K as K, ≥1M as M', () => {
    const { rerender } = render(<XAccountCard project={{ ...base, followers: 950 }} />);
    expect(screen.getByText('950')).toBeInTheDocument();
    rerender(<XAccountCard project={{ ...base, followers: 4200 }} />);
    expect(screen.getByText('4.2K')).toBeInTheDocument();
    rerender(<XAccountCard project={{ ...base, followers: 2_500_000 }} />);
    expect(screen.getByText('2.5M')).toBeInTheDocument();
  });

  it('omits followers when undefined', () => {
    render(<XAccountCard project={base} />);
    expect(screen.queryByText(/^\d+(\.\d+)?[KM]?$/)).toBeNull();
  });

  it('shows bio in quotes when provided', () => {
    render(<XAccountCard project={{ ...base, bio: 'hello' }} />);
    expect(screen.getByText('"hello"')).toBeInTheDocument();
  });

  it('safeUrls the outbound link', () => {
    render(<XAccountCard project={{ ...base, url: 'http://x.com/foo' as never }} />);
    expect(screen.getByRole('link', { name: 'Open @foo on X' })).toHaveAttribute('href', '#');
  });
});
