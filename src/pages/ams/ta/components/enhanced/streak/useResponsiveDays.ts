import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to determine how many days to show in the streak legend based on the parent width.
 * @param minDays Minimum number of days to show (default: 30)
 * @param maxDays Maximum number of days to show (default: 90)
 * @returns [ref, days]
 */
export function useResponsiveDays(minDays = 90, maxDays = 270) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [days, setDays] = useState(maxDays);

  useEffect(() => {
    function calculateDays(width: number) {
      // These breakpoints can be tuned for your design
      if (width < 350) return Math.floor((minDays + maxDays) / 2);
      return maxDays;
    }

    function handleResize() {
      if (ref.current) {
        setDays(calculateDays(ref.current.offsetWidth));
      }
    }

    handleResize(); // Initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minDays, maxDays]);

  return [ref, days] as const;
}
