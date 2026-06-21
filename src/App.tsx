import { useScrollReveal } from './hooks/useScrollReveal';

import { Nav }          from './components/Nav/Nav';
import { Hero }         from './components/Hero/Hero';
import { Stats }        from './components/Stats/Stats';
import { Products }     from './components/Products/Products';
import { SiemDemo }     from './components/SiemDemo/SiemDemo';
import { Mission }      from './components/Mission/Mission';
import { Architecture } from './components/Architecture/Architecture';
import { Team }         from './components/Team/Team';
import { CTA }          from './components/CTA/CTA';
import { Footer }       from './components/Footer/Footer';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Products />
      <SiemDemo />
      <Mission />
      <Architecture />
      <Team />
      <CTA />
      <Footer />
    </>
  );
}
