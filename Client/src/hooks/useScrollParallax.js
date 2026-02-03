import { useEffect, useState } from "react";

export default function useScrollParallax(multiplier = 0.08) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.scrollY * multiplier);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [multiplier]);

  return offset;
}
