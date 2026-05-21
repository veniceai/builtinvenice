import { describe, it, expect } from 'vitest';
import { safeUrl } from './safeUrl';

describe('safeUrl', () => {
  it('passes https:// URLs through unchanged', () => {
    expect(safeUrl('https://example.com')).toBe('https://example.com');
    expect(safeUrl('https://github.com/owner/repo')).toBe('https://github.com/owner/repo');
    expect(safeUrl('HTTPS://example.com')).toBe('HTTPS://example.com');
  });

  it('returns # for http:// URLs', () => {
    expect(safeUrl('http://example.com')).toBe('#');
  });

  it('returns # for javascript: URLs', () => {
    expect(safeUrl('javascript:alert(1)')).toBe('#');
    expect(safeUrl('javascript:void(0)')).toBe('#');
    expect(safeUrl('JAVASCRIPT:alert(1)')).toBe('#');
  });

  it('returns # for data: URLs', () => {
    expect(safeUrl('data:text/html,<script>alert(1)</script>')).toBe('#');
  });

  it('returns # for protocol-relative URLs', () => {
    expect(safeUrl('//evil.com')).toBe('#');
  });

  it('returns # for empty string', () => {
    expect(safeUrl('')).toBe('#');
  });

  it('returns # for bare paths', () => {
    expect(safeUrl('/some/path')).toBe('#');
    expect(safeUrl('some/path')).toBe('#');
  });

  it('returns # for vbscript: URLs', () => {
    expect(safeUrl('vbscript:msgbox(1)')).toBe('#');
  });
});
