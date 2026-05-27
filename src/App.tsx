import { useState } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Explore from './components/sections/Explore';
import SubmitDialog from './components/SubmitDialog';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openSubmit = () => setDialogOpen(true);

  return (
    <div className="page-frame">
      <Header onSubmit={openSubmit} />
      <main className="main section-padding">
        <Hero onSubmit={openSubmit} />
        <Explore />
      </main>
      <Footer />
      {dialogOpen && <SubmitDialog onClose={() => setDialogOpen(false)} />}
    </div>
  );
}

export default App;
