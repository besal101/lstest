import { useEffect, useState } from "react";

export function useActiveScroll<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  topOffset: number = 40
) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const listener = () => {
      setIsScrolling(window.scrollY > topOffset);
    };

    document.addEventListener("scroll", listener);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [topOffset]);

  return isScrolling;
}
