// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import EventCard from './EventCard';
import type { VeniceEvent } from '../../data';

const base: VeniceEvent = {
  title: 'Hack',
  description: 'A hackathon.',
  url: 'https://lu.ma/hack',
  kind: 'hackathon',
  status: 'upcoming',
  startDate: '2026-07-04',
  location: 'San Francisco, CA',
  host: 'Venice',
  tags: ['Hackathon'],
};

describe('EventCard', () => {
  it('renders title, description, location, and host', () => {
    render(<EventCard event={base} />);
    expect(screen.getByRole('heading', { name: 'Hack' })).toBeInTheDocument();
    expect(screen.getByText('A hackathon.')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('hosted by Venice')).toBeInTheDocument();
  });

  it('formats a single-day event as a single date', () => {
    render(<EventCard event={base} />);
    expect(screen.getByText('Jul 4, 2026')).toBeInTheDocument();
  });

  it('formats a same-month range as "Mon D – D, YYYY"', () => {
    render(<EventCard event={{ ...base, endDate: '2026-07-06' }} />);
    expect(screen.getByText('Jul 4 – 6, 2026')).toBeInTheDocument();
  });

  it('formats a cross-month range as two full dates', () => {
    render(<EventCard event={{ ...base, startDate: '2026-07-30', endDate: '2026-08-02' }} />);
    expect(screen.getByText('Jul 30, 2026 – Aug 2, 2026')).toBeInTheDocument();
  });

  it('renders prize only when present', () => {
    const { rerender } = render(<EventCard event={base} />);
    expect(screen.queryByText(/\$/)).toBeNull();
    rerender(<EventCard event={{ ...base, prize: '$15K in credits' }} />);
    expect(screen.getByText('$15K in credits')).toBeInTheDocument();
  });

  it('shows the kind and status labels', () => {
    render(<EventCard event={{ ...base, status: 'live', kind: 'meetup' }} />);
    expect(screen.getByText('Meetup')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('safeUrls the outbound link', () => {
    render(<EventCard event={{ ...base, url: 'javascript:bad' as never }} />);
    const link = screen.getByRole('link', { name: 'Hack — Hackathon' });
    expect(link).toHaveAttribute('href', '#');
  });
});
