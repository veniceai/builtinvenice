import { SocialIcon, socialLabels } from '../icons';
import type { Social } from '../../data';

export default function SocialsRow({ socials }: { socials?: Social[] }) {
  if (!socials?.length) return null;

  return (
    <div className="socials-row">
      {socials.map(s => (
        <a
          key={`${s.kind}-${s.url}`}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-chip"
          aria-label={s.label ?? socialLabels[s.kind]}
          title={s.label ?? socialLabels[s.kind]}
        >
          <SocialIcon kind={s.kind} />
        </a>
      ))}
    </div>
  );
}
