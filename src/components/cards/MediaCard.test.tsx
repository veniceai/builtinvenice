// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MediaCard from './MediaCard';
import type { Media } from '../../data';

const base: Media = {
  title: 'Walkthrough',
  builder: 'venice',
  description: 'A demo.',
  url: 'https://x.com/venice/status/123',
  publishedAt: '2024-09-03',
  tags: ['Demo'],
};

describe('MediaCard', () => {
  it('renders title, description, tags, and builder byline', () => {
    render(<MediaCard item={base} />);
    expect(screen.getByRole('heading', { name: 'Walkthrough' })).toBeInTheDocument();
    expect(screen.getByText('A demo.')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
    expect(screen.getByText('by venice')).toBeInTheDocument();
  });

  it('shows initial placeholder when no thumbnail', () => {
    render(<MediaCard item={base} />);
    expect(screen.queryByAltText('Walkthrough preview')).toBeNull();
    expect(screen.getByText('V')).toBeInTheDocument();
  });

  it('shows the thumbnail when provided', () => {
    render(<MediaCard item={{ ...base, thumbnail: '/m.png' }} />);
    expect(screen.getByAltText('Walkthrough preview')).toHaveAttribute('src', '/m.png');
  });

  it('safeUrls the outbound link', () => {
    render(<MediaCard item={{ ...base, url: 'javascript:bad' as never }} />);
    expect(screen.getByRole('link', { name: 'View Walkthrough' })).toHaveAttribute('href', '#');
  });

  it('shows the featured badge when featured is true', () => {
    render(<MediaCard item={{ ...base, featured: true }} />);
    expect(screen.getByLabelText('Featured')).toBeInTheDocument();
  });
});
