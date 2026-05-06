import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Explore from './components/sections/Explore';
import SubmitDialog from './components/SubmitDialog';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <Header />
      <main className="main section-padding">
        <Hero onSubmit={() => setDialogOpen(true)} />
        <Explore />
      </main>
      <Footer />
      {dialogOpen && <SubmitDialog onClose={() => setDialogOpen(false)} />}
    </div>
  );
}

export default App;
