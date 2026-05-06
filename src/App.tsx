import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Explore from './components/sections/Explore';
import SubmitDialog from './components/SubmitDialog';
import type { SubmissionType } from './submitSchemas';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialKey, setInitialKey] = useState<SubmissionType['key'] | undefined>();

  const open = (key?: SubmissionType['key']) => {
    setInitialKey(key);
    setDialogOpen(true);
  };
  const close = () => setDialogOpen(false);

  return (
    <div>
      <Header />
      <main className="main section-padding">
        <Hero onSubmit={() => open()} />
        <Explore openSubmit={key => open(key)} />
      </main>
      <Footer />
      {dialogOpen && (
        <SubmitDialog onClose={close} initialKey={initialKey} />
      )}
    </div>
  );
}

export default App;
