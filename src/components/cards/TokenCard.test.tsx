// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TokenCard from './TokenCard';
import type { TokenProject } from '../../data';

const base: TokenProject = {
  type: 'Token',
  title: 'Venice Token',
  description: 'd',
  url: 'https://dexscreener.example/vvv',
  category: 'powered-by',
  tags: ['Token'],
  ticker: 'VVV',
  address: '0xabcdef1234567890abcdef1234567890abcdef12',
  chain: 'base',
};

describe('TokenCard', () => {
  it('renders ticker with $ prefix and chain label', () => {
    render(<TokenCard project={base} />);
    expect(screen.getByText('$VVV')).toBeInTheDocument();
    expect(screen.getByText('Base')).toBeInTheDocument();
  });

  it('truncates long addresses in the visible code element', () => {
    render(<TokenCard project={base} />);
    expect(screen.getByText('0xabcd…ef12')).toBeInTheDocument();
  });

  it('does not truncate short addresses', () => {
    render(<TokenCard project={{ ...base, address: '0xabc' }} />);
    expect(screen.getByText('0xabc')).toBeInTheDocument();
  });

  it('formats market cap: K, M, B thresholds', () => {
    const { rerender } = render(<TokenCard project={{ ...base, marketCap: 950 }} />);
    expect(screen.getByText(/\$950 mcap/)).toBeInTheDocument();
    rerender(<TokenCard project={{ ...base, marketCap: 4_200 }} />);
    expect(screen.getByText(/\$4\.2K mcap/)).toBeInTheDocument();
    rerender(<TokenCard project={{ ...base, marketCap: 7_500_000 }} />);
    expect(screen.getByText(/\$7\.5M mcap/)).toBeInTheDocument();
    rerender(<TokenCard project={{ ...base, marketCap: 2_400_000_000 }} />);
    expect(screen.getByText(/\$2\.40B mcap/)).toBeInTheDocument();
  });

  it('shows holders with locale formatting', () => {
    render(<TokenCard project={{ ...base, holders: 12345 }} />);
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  it('safeUrls the outbound link', () => {
    render(<TokenCard project={{ ...base, url: 'javascript:bad' as never }} />);
    expect(screen.getByRole('link', { name: 'View VVV token' })).toHaveAttribute('href', '#');
  });
});
