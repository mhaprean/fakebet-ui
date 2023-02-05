import { useEffect, useLayoutEffect } from 'react';

const ScrollToTop = ({ children }: { children?: React.ReactNode }) => {

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return <>{children}</>;
};

export default ScrollToTop;
