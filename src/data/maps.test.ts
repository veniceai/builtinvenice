import { describe, expect, it } from 'vitest';
import {
  categoryLabels, langColors, chainLabels, chainColors,
  socialLabels, difficultyLabels,
} from './maps';
import { socialKinds } from './schema';

describe('maps', () => {
  it('categoryLabels covers both project categories', () => {
    expect(categoryLabels).toEqual({
      ecosystem: 'Ecosystem',
      'powered-by': 'Powered by Venice',
    });
  });

  it('chainLabels and chainColors cover the same chains', () => {
    expect(Object.keys(chainLabels).sort()).toEqual(Object.keys(chainColors).sort());
    expect(Object.keys(chainLabels).sort()).toEqual(['base', 'ethereum', 'solana']);
  });

  it('chainColors are valid hex strings', () => {
    for (const color of Object.values(chainColors)) {
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it('socialLabels has an entry for every SocialKind', () => {
    for (const kind of socialKinds) {
      expect(socialLabels[kind]).toBeTruthy();
    }
    expect(Object.keys(socialLabels).length).toBe(socialKinds.length);
  });

  it('difficultyLabels covers all three difficulty levels', () => {
    expect(difficultyLabels).toEqual({
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    });
  });

  it('langColors are valid hex strings', () => {
    for (const color of Object.values(langColors)) {
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});
