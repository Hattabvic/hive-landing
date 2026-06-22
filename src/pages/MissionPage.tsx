import { Mission } from '../components/Mission/Mission';
import { CTA }     from '../components/CTA/CTA';
import pages from './pages.module.css';

export function MissionPage() {
  return (
    <div className={pages.page}>
      <Mission />
      <CTA />
    </div>
  );
}
