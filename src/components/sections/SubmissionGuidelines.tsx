const GUIDELINES = [
  {
    title: 'Be clearly connected to Venice',
    body: 'It should use Venice, integrate with Venice, teach people how to use Venice, or support the Venice ecosystem.',
  },
  {
    title: 'Be publicly accessible',
    body: 'Please include a working link, such as a live demo, GitHub repo, package page, documentation page, video, or event page.',
  },
  {
    title: 'Be useful or interesting to the community',
    body: "We're looking for projects that show real builder value, creative use cases, helpful integrations, educational content, or strong ecosystem signal.",
  },
  {
    title: 'Be easy to understand',
    body: 'Include a clear title, short description, relevant tags, and any setup or usage instructions someone would need.',
  },
  {
    title: 'Be accurate',
    body: 'Please avoid unsupported claims about privacy, compliance, security, performance, partnerships, or official Venice endorsement.',
  },
  {
    title: 'Keep tokens secondary',
    body: 'Token-related projects are welcome when there is a real product, protocol, integration, or educational resource behind them.',
  },
  {
    title: 'Be safe for users',
    body: 'Projects that involve wallets, payments, browser extensions, sensitive data, or automation should clearly explain what permissions they require and how user data or funds are handled.',
  },
];

export default function SubmissionGuidelines() {
  return (
    <section className="hero-section guidelines-section">
      <h1 className="hero-title">Submission Guidelines</h1>
      <div className="guidelines-body">
        <p className="hero-subtitle">
          Built on Venice is for projects, tools, guides, and experiments that help people discover what can be built with Venice.
        </p>
        <p className="hero-subtitle">A good submission should:</p>
        <ol className="guidelines-list">
          {GUIDELINES.map((g, i) => (
            <li key={g.title} className="guidelines-list-item">
              <span className="guidelines-list-number">{i + 1}.</span>
              <div className="guidelines-list-content">
                <p className="hero-subtitle guidelines-list-title">{g.title}</p>
                <p className="hero-subtitle">{g.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="hero-subtitle">
          All submissions are reviewed before publishing. Listing on Built on Venice does not imply endorsement by Venice AI.
        </p>
      </div>
    </section>
  );
}
