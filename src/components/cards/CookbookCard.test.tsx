// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CookbookCard from './CookbookCard';
import type { Cookbook } from '../../data';

const base: Cookbook = {
  title: 'Quickstart',
  description: 'Learn the basics.',
  url: 'https://example.com/quickstart',
  author: 'venice',
  difficulty: 'beginner',
  readTime: '10 min',
  tags: ['API'],
  publishedAt: '2026-04-01',
};

describe('CookbookCard', () => {
  it('renders title, description, author byline, and read time', () => {
    render(<CookbookCard cookbook={base} />);
    expect(screen.getByRole('heading', { name: 'Quickstart' })).toBeInTheDocument();
    expect(screen.getByText('Learn the basics.')).toBeInTheDocument();
    expect(screen.getByText('by venice')).toBeInTheDocument();
    expect(screen.getByText('10 min')).toBeInTheDocument();
  });

  it('renders the difficulty label', () => {
    const { rerender } = render(<CookbookCard cookbook={base} />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    rerender(<CookbookCard cookbook={{ ...base, difficulty: 'advanced' }} />);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('renders the language chip only when language is set', () => {
    const { rerender } = render(<CookbookCard cookbook={base} />);
    expect(screen.queryByText('TypeScript')).toBeNull();
    rerender(<CookbookCard cookbook={{ ...base, language: 'TypeScript' }} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('safeUrls the outbound link', () => {
    render(<CookbookCard cookbook={{ ...base, url: 'javascript:bad' as never }} />);
    expect(screen.getByRole('link', { name: 'Read Quickstart' })).toHaveAttribute('href', '#');
  });

  it('renders the placeholder when no thumbnail is set', () => {
    render(<CookbookCard cookbook={base} />);
    expect(screen.queryByAltText('Quickstart preview')).toBeNull();
  });
});
