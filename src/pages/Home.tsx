import { Hero }         from '../components/Hero/Hero';
import { Stats }        from '../components/Stats/Stats';
import { Products }     from '../components/Products/Products';
import { SiemDemo }     from '../components/SiemDemo/SiemDemo';
import { Mission }      from '../components/Mission/Mission';
import { Architecture } from '../components/Architecture/Architecture';
import { Team }         from '../components/Team/Team';
import { CTA }          from '../components/CTA/CTA';

export function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Products />
      <SiemDemo />
      <Mission />
      <Architecture />
      <Team />
      <CTA />
    </>
  );
}
