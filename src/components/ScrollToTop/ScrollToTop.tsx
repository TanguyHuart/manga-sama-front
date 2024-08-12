import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('coucou scroll');
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return <div ref={scrollRef} />;
};

export default ScrollToTop;
