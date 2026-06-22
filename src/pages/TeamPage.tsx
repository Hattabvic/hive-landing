import { Team } from '../components/Team/Team';
import { CTA }  from '../components/CTA/CTA';
import pages from './pages.module.css';

export function TeamPage() {
  return (
    <div className={pages.page}>
      <Team />
      <CTA />
    </div>
  );
}
