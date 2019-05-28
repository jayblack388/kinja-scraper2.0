import { useEffect } from 'react';

// Needs a ref and a handler -> for optimization, pass handler to a useCallback hook
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Clicking inside
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Clicking outside
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
