import { useEffect, useRef, useState } from 'react';

export function useInElement({
  root = document,
  rootMargin = '0px',
  threshold = 0.01,
}: IntersectionObserverInit) {
  const elementRef = useRef(null);
  const [inPage, isInPage] = useState(false);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          if (elementRef && elementRef.current && entry.isIntersecting) {
            setRatio(entry.intersectionRatio);
            isInPage(true);
            continue;
          }
          isInPage(false);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );
    observer.observe(elementRef.current as unknown as Element);
  }, [root, rootMargin, threshold]);

  return { target: elementRef, inPage, ratio };
}
