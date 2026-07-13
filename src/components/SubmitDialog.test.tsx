// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubmitDialog from './SubmitDialog';

describe('SubmitDialog — type picker', () => {
  it('shows the three submission types when no initialKey is provided', () => {
    render(<SubmitDialog onClose={() => {}} />);
    expect(screen.getByRole('heading', { name: /What are you submitting/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Project/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cookbook/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Event/ })).toBeInTheDocument();
    // Media temporarily hidden — restore this assertion to re-enable:
    // expect(screen.getByRole('button', { name: /Media/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Media/ })).toBeNull();
  });

  it('skips the picker when initialKey is provided', () => {
    render(<SubmitDialog onClose={() => {}} initialKey="cookbook" />);
    expect(screen.getByRole('heading', { name: 'Submit a Cookbook' })).toBeInTheDocument();
  });

  it('clicking a type advances to its form', async () => {
    const user = userEvent.setup();
    render(<SubmitDialog onClose={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Project/ }));
    expect(screen.getByRole('heading', { name: 'Submit a Project' })).toBeInTheDocument();
  });

  it('back button returns to the picker', async () => {
    const user = userEvent.setup();
    render(<SubmitDialog onClose={() => {}} initialKey="project" />);
    await user.click(screen.getByLabelText('Back to submission types'));
    expect(screen.getByRole('heading', { name: /What are you submitting/ })).toBeInTheDocument();
  });
});

describe('SubmitDialog — close behaviour', () => {
  it('Esc fires onClose', () => {
    const onClose = vi.fn();
    render(<SubmitDialog onClose={onClose} />);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('the × button fires onClose', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<SubmitDialog onClose={onClose} />);
    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('clicking the backdrop fires onClose', () => {
    const onClose = vi.fn();
    render(<SubmitDialog onClose={onClose} />);
    const backdrop = document.querySelector('.dialog-backdrop')!;
    backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('SubmitDialog — validation', () => {
  it('blocks submission when required fields are empty', async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    render(<SubmitDialog onClose={() => {}} initialKey="cookbook" />);
    await user.click(screen.getByRole('button', { name: /Open prefilled issue/ }));
    expect(openSpy).not.toHaveBeenCalled();
    const errors = screen.getAllByText('Required');
    expect(errors.length).toBeGreaterThan(0);
    openSpy.mockRestore();
  });

  it('clears a field error when the user types into the field', async () => {
    const user = userEvent.setup();
    render(<SubmitDialog onClose={() => {}} initialKey="cookbook" />);
    await user.click(screen.getByRole('button', { name: /Open prefilled issue/ }));
    expect(screen.getAllByText('Required').length).toBeGreaterThan(0);
    await user.type(screen.getByLabelText(/^Title/), 'Quickstart');
    const titleField = document.getElementById('field-cookbook-title')!.closest('.form-field')!;
    expect(within(titleField as HTMLElement).queryByText('Required')).toBeNull();
  });
});

describe('SubmitDialog — submission without image', () => {
  let openSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
  });
  afterEach(() => {
    openSpy.mockRestore();
  });

  // This test used the Media type before it was temporarily hidden. The
  // original media version is preserved below — swap back to re-enable.
  it('opens a prefilled GitHub issue URL on successful submit', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<SubmitDialog onClose={onClose} initialKey="cookbook" />);
    await user.type(screen.getByLabelText(/^Title/), 'Quickstart');
    await user.type(screen.getByLabelText(/^URL/), 'https://github.com/o/r/blob/main/recipe.md');
    await user.type(screen.getByLabelText(/^Description/), 'A short guide.');
    await user.type(screen.getByLabelText(/^Author handle/), 'me');
    await user.selectOptions(screen.getByLabelText(/^Difficulty/), 'beginner');
    await user.type(screen.getByLabelText(/^Read time/), '10 min');
    await user.type(screen.getByLabelText(/^Tags/), 'Guide');
    await user.type(screen.getByLabelText(/^Published date/), '2026-05-29');
    await user.click(screen.getByRole('button', { name: /Open prefilled issue/ }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target, features] = openSpy.mock.calls[0];
    expect(String(url)).toContain('/issues/new?');
    expect(new URL(String(url)).searchParams.get('title')).toBe('[Cookbook] Quickstart');
    expect(new URL(String(url)).searchParams.get('template')).toBe('submit-cookbook.yml');
    expect(target).toBe('_blank');
    expect(features).toBe('noopener,noreferrer');
    expect(onClose).toHaveBeenCalled();
  });

  // Media temporarily hidden — original media version of the test above:
  // it('opens a prefilled GitHub issue URL on successful submit', async () => {
  //   const user = userEvent.setup();
  //   const onClose = vi.fn();
  //   render(<SubmitDialog onClose={onClose} initialKey="media" />);
  //   await user.type(screen.getByLabelText(/^Title/), 'Demo video');
  //   await user.type(screen.getByLabelText(/^Media URL/), 'https://x.com/me/status/1');
  //   await user.type(screen.getByLabelText(/^Description/), 'A short demo.');
  //   await user.type(screen.getByLabelText(/^Your handle/), 'me');
  //   await user.type(screen.getByLabelText(/^Published date/), '2026-05-29');
  //   await user.type(screen.getByLabelText(/^Tags/), 'Demo');
  //   await user.click(screen.getByRole('button', { name: /Open prefilled issue/ }));
  //
  //   expect(openSpy).toHaveBeenCalledTimes(1);
  //   const [url, target, features] = openSpy.mock.calls[0];
  //   expect(String(url)).toContain('/issues/new?');
  //   expect(new URL(String(url)).searchParams.get('title')).toBe('[Media] Demo video');
  //   expect(new URL(String(url)).searchParams.get('template')).toBe('submit-media.yml');
  //   expect(target).toBe('_blank');
  //   expect(features).toBe('noopener,noreferrer');
  //   expect(onClose).toHaveBeenCalled();
  // });
});

describe('SubmitDialog — Ecosystem Venice fields', () => {
  it('reveals the Venice-relationship fields when Ecosystem is selected', async () => {
    const user = userEvent.setup();
    render(<SubmitDialog onClose={() => {}} initialKey="project" />);
    expect(screen.queryByLabelText(/^Venice relationship/)).toBeNull();
    expect(screen.queryByLabelText(/How is this built for Venice/)).toBeNull();
    await user.selectOptions(
      screen.getByLabelText(/^Category/),
      'Ecosystem (built for the Venice community)',
    );
    expect(screen.getByLabelText(/^Venice relationship/)).toBeInTheDocument();
    expect(screen.getByLabelText(/How is this built for Venice/)).toBeInTheDocument();
  });

  it('keeps the Venice-relationship fields hidden for Powered by Venice', async () => {
    const user = userEvent.setup();
    render(<SubmitDialog onClose={() => {}} initialKey="project" />);
    await user.selectOptions(
      screen.getByLabelText(/^Category/),
      'Powered by Venice (uses the Venice API)',
    );
    expect(screen.queryByLabelText(/^Venice relationship/)).toBeNull();
    expect(screen.queryByLabelText(/How is this built for Venice/)).toBeNull();
  });

  it('blocks submission until the Ecosystem fields are filled', async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    render(<SubmitDialog onClose={() => {}} initialKey="project" />);
    await user.type(screen.getByLabelText(/^Project name/), 'Foo');
    await user.selectOptions(screen.getByLabelText(/^Project type/), 'Website');
    await user.type(screen.getByLabelText(/^Project URL/), 'https://foo.dev');
    await user.selectOptions(
      screen.getByLabelText(/^Category/),
      'Ecosystem (built for the Venice community)',
    );
    await user.type(screen.getByLabelText(/^Description/), 'Does a thing.');
    await user.type(screen.getByLabelText(/^Tags/), 'SDK');
    // venice-relationship + venice-connection left blank
    await user.click(screen.getByRole('button', { name: /Open prefilled issue/ }));
    expect(openSpy).not.toHaveBeenCalled();
    expect(screen.getAllByText('Required').length).toBeGreaterThan(0);
    openSpy.mockRestore();
  });
});
