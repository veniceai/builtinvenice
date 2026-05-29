// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WebsiteCard from './WebsiteCard';
import type { WebsiteProject } from '../../data';

const base: WebsiteProject = {
  type: 'Website',
  title: 'Example',
  description: 'An example site.',
  url: 'https://example.com',
  category: 'ecosystem',
  tags: ['A', 'B'],
};

describe('WebsiteCard', () => {
  it('renders title, description, and tags', () => {
    render(<WebsiteCard project={base} />);
    expect(screen.getByRole('heading', { name: 'Example' })).toBeInTheDocument();
    expect(screen.getByText('An example site.')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders a safeUrl-protected stretched link to the project URL', () => {
    render(<WebsiteCard project={base} />);
    const link = screen.getByRole('link', { name: 'Visit Example' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('rewrites an unsafe URL to #', () => {
    render(<WebsiteCard project={{ ...base, url: 'javascript:alert(1)' as never }} />);
    expect(screen.getByRole('link', { name: 'Visit Example' })).toHaveAttribute('href', '#');
  });

  it('shows the category label and badge', () => {
    render(<WebsiteCard project={{ ...base, category: 'powered-by' }} />);
    expect(screen.getByText('Powered by Venice')).toBeInTheDocument();
  });

  it('renders the thumbnail image when provided', () => {
    render(<WebsiteCard project={{ ...base, thumbnail: '/x.png' }} />);
    expect(screen.getByAltText('Example preview')).toHaveAttribute('src', '/x.png');
  });

  it('shows the featured badge only when featured is true', () => {
    const { rerender } = render(<WebsiteCard project={base} />);
    expect(screen.queryByLabelText('Featured')).toBeNull();
    rerender(<WebsiteCard project={{ ...base, featured: true }} />);
    expect(screen.getByLabelText('Featured')).toBeInTheDocument();
  });

  it('shows submittedBy attribution when present', () => {
    render(<WebsiteCard project={{ ...base, submittedBy: '@me' }} />);
    expect(screen.getByText('by @me')).toBeInTheDocument();
  });
});
