import { useState, useEffect } from 'react';

// Delays updating the returned value until the user stops typing for `delay`ms.
// Used on the Services search input so we don't filter on every keystroke.
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // Cleanup: clear the pending timer if value changes again before it fires
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
