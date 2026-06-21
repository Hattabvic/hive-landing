import { useEffect } from 'react';

export function useScrollReveal() {
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
  }, []);
}
