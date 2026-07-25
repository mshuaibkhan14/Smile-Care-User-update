import { useState, useEffect } from 'react';

// Tracks whether the page has been scrolled past `threshold`.
// Used by the Navbar to add a shadow/solid background once scrolled.
export function useScrollPosition(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    // Cleanup: remove listener on unmount to avoid leaks between route changes
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
