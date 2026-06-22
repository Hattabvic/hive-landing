import { Products } from '../components/Products/Products';
import { CTA }      from '../components/CTA/CTA';
import pages from './pages.module.css';

export function ProductsPage() {
  return (
    <div className={pages.page}>
      <Products />
      <CTA />
    </div>
  );
}
