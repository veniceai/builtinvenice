export function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  );
}

export function GlobeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}

export function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
    </svg>
  );
}

export function ForkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
    </svg>
  );
}

export function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1L13 7M13 7L7 13M13 7H1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  );
}

export function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

export function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function FarcasterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 225 225" fill="currentColor" aria-hidden="true">
      <path d="M58.5 34.5h108v156h-24v-72h-.225a52.275 52.275 0 00-104.55 0H37.5v72h-24v-156z"/>
      <path d="M10.5 37.5l10.5 33h8.25v108H16.5v33h72v-33H75v-108h8.25L72.75 37.5zm141 0l10.5 33h8.25v108h-13.5v33h72v-33h-13.5v-108h8.25l10.5-33z"/>
    </svg>
  );
}

export function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor"/>
    </svg>
  );
}

export function TelegramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.87 3.57a1.2 1.2 0 00-1.22-.19L2.7 10.73a1.05 1.05 0 00.06 1.98l4.36 1.4 2.03 6.3a.85.85 0 001.48.24l2.43-2.9 4.63 3.37a1.1 1.1 0 001.73-.67l2.95-15.14a1.1 1.1 0 00-.5-1.13zM9.8 14.7l-.53 3.85-1.23-3.83 9.62-7.27z"/>
    </svg>
  );
}

export function DiscordIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.57A18.3 18.3 0 0015.88 3.2l-.2.35a16.9 16.9 0 00-5.37 0l-.2-.35a18.3 18.3 0 00-4.44 1.37C2.82 9.2 2 13.7 2.4 18.14a18.3 18.3 0 005.56 2.8l.45-.62a12.2 12.2 0 01-1.95-.94l.47-.37a13.1 13.1 0 0010.14 0l.47.37a12 12 0 01-1.95.94l.45.62a18.3 18.3 0 005.56-2.8c.5-5.17-.74-9.64-3.28-13.57zM9 15.34c-1.1 0-2-1.01-2-2.25s.88-2.26 2-2.26 2.01 1.02 2 2.26c0 1.24-.88 2.25-2 2.25zm6 0c-1.1 0-2-1.01-2-2.25s.88-2.26 2-2.26 2.01 1.02 2 2.26c0 1.24-.88 2.25-2 2.25z"/>
    </svg>
  );
}

export function YouTubeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.5a3 3 0 00-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 00.5 6.5 31 31 0 000 12a31 31 0 00.5 5.5 3 3 0 002.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 002.1-2.1 31 31 0 00.5-5.5 31 31 0 00-.5-5.5zM9.8 15.5v-7l6.2 3.5z"/>
    </svg>
  );
}

export function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3h-3v12a3 3 0 11-3-3v-3a6 6 0 106 6V9.3a7.8 7.8 0 004.5 1.45v-3A4.8 4.8 0 0116.5 3z"/>
    </svg>
  );
}

export function CoinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M14.5 9.5a3 3 0 00-5 2c0 3 5 2 5 5a3 3 0 01-5 2M12 6.5v11"/>
    </svg>
  );
}

export function BookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5z"/>
      <path d="M4 19.5A2.5 2.5 0 006.5 22H20v-5"/>
    </svg>
  );
}

export function PlayIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15a1 1 0 001.53.85l12-7.5a1 1 0 000-1.7l-12-7.5A1 1 0 007 4.5z"/>
    </svg>
  );
}

export function ClockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  );
}

export function TrophyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 4h10v4a5 5 0 01-10 0z"/>
      <path d="M17 6h3v2a3 3 0 01-3 3M7 6H4v2a3 3 0 003 3"/>
      <path d="M9 18h6M12 13v5M8 21h8"/>
    </svg>
  );
}

export function UsersIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}

import type { SocialKind } from '../../data';

export function SocialIcon({ kind, size = 14 }: { kind: SocialKind; size?: number }) {
  switch (kind) {
    case 'x':           return <XIcon size={size} />;
    case 'github':      return <GitHubIcon size={size} />;
    case 'website':     return <GlobeIcon size={size} />;
    case 'farcaster':
    case 'warpcast':    return <FarcasterIcon size={size} />;
    case 'instagram':   return <InstagramIcon size={size} />;
    case 'telegram':    return <TelegramIcon size={size} />;
    case 'discord':     return <DiscordIcon size={size} />;
    case 'youtube':     return <YouTubeIcon size={size} />;
    case 'tiktok':      return <TikTokIcon size={size} />;
    case 'token':       return <CoinIcon size={size} />;
  }
  // TS enforces exhaustiveness above; this never-check catches any new
  // SocialKind added to the union without a matching icon.
  const _exhaustive: never = kind;
  return _exhaustive;
}

export const socialLabels: Record<SocialKind, string> = {
  x: 'X',
  github: 'GitHub',
  website: 'Website',
  farcaster: 'Farcaster',
  warpcast: 'Warpcast',
  instagram: 'Instagram',
  telegram: 'Telegram',
  discord: 'Discord',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  token: 'Token',
};
