import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useScrollReveal } from './hooks/useScrollReveal';

import { Nav }    from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';

import { Home }             from './pages/Home';
import { ProductsPage }     from './pages/ProductsPage';
import { SiemDemoPage }     from './pages/SiemDemoPage';
import { MissionPage }      from './pages/MissionPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { TeamPage }         from './pages/TeamPage';

export default function App() {
  const location = useLocation();

  // Re-scan reveal targets + jump to top on every route change.
  useScrollReveal(location.pathname);
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/products"     element={<ProductsPage />} />
        <Route path="/siem-demo"    element={<SiemDemoPage />} />
        <Route path="/mission"      element={<MissionPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/team"         element={<TeamPage />} />
        <Route path="*"             element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
