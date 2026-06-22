import { Architecture } from '../components/Architecture/Architecture';
import { CTA }          from '../components/CTA/CTA';
import pages from './pages.module.css';

export function ArchitecturePage() {
  return (
    <div className={pages.page}>
      <Architecture />
      <CTA />
    </div>
  );
}
