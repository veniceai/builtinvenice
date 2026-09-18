import { useState } from 'react';
import type { SubmissionType } from '../../submitSchemas';
import { projects, cookbooks } from '../../data';
import Projects from './Projects';
import Cookbooks from './Cookbooks';
// Media tab temporarily hidden — uncomment the lines marked "Media tab" below
// (and the matching blocks in submitSchemas.ts) to re-enable.
// import { media } from '../../data';
// import Media from './Media';

type TabKey = SubmissionType['key'];

interface TabConfig {
  key: TabKey;
  label: string;
  count: number;
  lede: string;
}

const tabs: TabConfig[] = [
  {
    key: 'project',
    label: 'Projects',
    count: projects.length,
    lede: 'Tools, SDKs, X accounts, and community projects built on Venice.',
  },
  {
    key: 'cookbook',
    label: 'Cookbooks',
    count: cookbooks.length,
    lede: 'Step-by-step recipes and tutorials for building on Venice.',
  },
  // Media tab temporarily hidden:
  // {
  //   key: 'media',
  //   label: 'Media',
  //   count: media.length,
  //   lede: 'Videos, interviews, and recaps about Venice and the projects built on it.',
  // },
];

export default function Explore() {
  const [tab, setTab] = useState<TabKey>('project');
  const config = tabs.find(t => t.key === tab)!;

  return (
    <section id="explore" className="explore-section">
      <div className="explore-tabs" role="tablist" aria-label="Browse by type">
        {tabs.map(t => (
          <button
            key={t.key}
            id={`tab-${t.key}`}
            role="tab"
            type="button"
            aria-selected={tab === t.key}
            aria-controls={`panel-${t.key}`}
            className={`explore-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <span className="explore-tab-label">{t.label}</span>
            <span className="explore-tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      <p className="explore-lede">{config.lede}</p>

      <div
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="explore-content"
      >
        {tab === 'project' && <Projects />}
        {tab === 'cookbook' && <Cookbooks />}
        {/* Media tab temporarily hidden: {tab === 'media' && <Media />} */}
      </div>
    </section>
  );
}
