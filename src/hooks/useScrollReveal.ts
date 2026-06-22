import { useEffect } from 'react';

/**
 * Reveals `.reveal`, `.rl`, `.rr` elements as they scroll into view.
 * Pass a `dep` (e.g. the current route) to re-scan the DOM after a page change.
 */
export function useScrollReveal(dep?: unknown) {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal, .rl, .rr');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
