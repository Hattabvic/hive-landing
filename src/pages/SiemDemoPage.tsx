import { SiemDemo } from '../components/SiemDemo/SiemDemo';
import { CTA }      from '../components/CTA/CTA';
import pages from './pages.module.css';

export function SiemDemoPage() {
  return (
    <div className={pages.page}>
      <SiemDemo />
      <CTA />
    </div>
  );
}
