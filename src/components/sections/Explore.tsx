import { useState } from 'react';
import type { SubmissionType } from '../../submitSchemas';
import { projects, cookbooks, events, demos } from '../../data';
import Projects from './Projects';
import Cookbooks from './Cookbooks';
import Events from './Events';
import Demos from './Demos';

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
    lede: 'Tools, SDKs, X accounts, and community tokens built on Venice.',
  },
  {
    key: 'cookbook',
    label: 'Cookbooks',
    count: cookbooks.length,
    lede: 'Step-by-step recipes and tutorials for building on Venice.',
  },
  {
    key: 'event',
    label: 'Events',
    count: events.length,
    lede: 'Hackathons, meetups, workshops, and conferences for the Venice ecosystem.',
  },
  {
    key: 'demo',
    label: 'Watch',
    count: demos.length,
    lede: 'Videos, interviews, and recaps about Venice and the projects built on it.',
  },
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
            role="tab"
            type="button"
            aria-selected={tab === t.key}
            className={`explore-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <span className="explore-tab-label">{t.label}</span>
            <span className="explore-tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      <p className="explore-lede">{config.lede}</p>

      <div className="explore-content" role="tabpanel">
        {tab === 'project' && <Projects />}
        {tab === 'cookbook' && <Cookbooks />}
        {tab === 'event' && <Events />}
        {tab === 'demo' && <Demos />}
      </div>
    </section>
  );
}
