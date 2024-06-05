import { MutableRefObject, useEffect } from 'react';

interface UseInfiniteScrollOptions {
  triggerRef: MutableRefObject<HTMLDivElement>;
  wrapperRef?: MutableRefObject<HTMLDivElement>;
  callback?: () => void;
}

export const useInfiniteScroll = ({
  triggerRef,
  wrapperRef,
  callback,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    const wrapperElement = wrapperRef?.current || null;
    const triggerElement = triggerRef.current;
    console.log(triggerElement);
    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 0.1,
      };

      observer = new IntersectionObserver(([entry]) => {
        console.log(entry);
        if (entry.isIntersecting) {
          console.log('hello2');
          callback();
        }
      }, options);

      observer.observe(triggerElement);
    }

    return () => {
      if (observer && triggerElement) {
        observer?.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
};
