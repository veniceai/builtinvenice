// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RepoCard from './RepoCard';
import type { RepoProject } from '../../data';

const base: RepoProject = {
  type: 'GitHub Repo',
  title: 'llm-venice',
  description: 'Venice plugin for llm.',
  url: 'https://github.com/ar-jan/llm-venice',
  category: 'ecosystem',
  tags: ['CLI'],
  owner: 'ar-jan',
  repo: 'llm-venice',
  thumbnail: '/repo-previews/ar-jan-llm-venice.png',
};

describe('RepoCard', () => {
  it('shows owner/repo label and title', () => {
    render(<RepoCard project={base} />);
    expect(screen.getByText('ar-jan/llm-venice')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'llm-venice' })).toBeInTheDocument();
  });

  it('renders a safeUrl-protected link to the repo URL', () => {
    render(<RepoCard project={base} />);
    const link = screen.getByRole('link', { name: 'llm-venice on GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/ar-jan/llm-venice');
  });

  it('rewrites an unsafe URL to #', () => {
    render(<RepoCard project={{ ...base, url: 'javascript:bad' as never }} />);
    expect(screen.getByRole('link', { name: 'llm-venice on GitHub' })).toHaveAttribute('href', '#');
  });

  it('falls back to the owner avatar when the thumbnail 404s', () => {
    render(<RepoCard project={base} />);
    const img = screen.getByAltText('llm-venice preview') as HTMLImageElement;
    fireEvent.error(img);
    expect(img.src).toBe('https://github.com/ar-jan.png');
  });

  it('does not retry the avatar fallback infinitely', () => {
    render(<RepoCard project={{ ...base, thumbnail: 'https://github.com/ar-jan.png' }} />);
    const img = screen.getByAltText('llm-venice preview') as HTMLImageElement;
    const original = img.src;
    fireEvent.error(img);
    expect(img.src).toBe(original);
  });

  it('omits the preview area when no thumbnail is provided', () => {
    render(<RepoCard project={{ ...base, thumbnail: undefined }} />);
    expect(screen.queryByAltText('llm-venice preview')).toBeNull();
  });
});
