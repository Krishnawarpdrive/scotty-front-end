
import { useState, useEffect } from 'react';
import { ToastPosition } from '../types/ToastTypes';

interface UseSmartPositioningProps {
  defaultPosition?: ToastPosition;
  adaptToViewport?: boolean;
  avoidOverlap?: boolean;
}

export const useSmartPositioning = ({
  defaultPosition = 'top-right',
  adaptToViewport = true,
  avoidOverlap = true
}: UseSmartPositioningProps = {}) => {
  const [position, setPosition] = useState<ToastPosition>(defaultPosition);
  const [viewportInfo, setViewportInfo] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768
  });

  useEffect(() => {
    const handleResize = () => {
      const newViewportInfo = {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768
      };
      
      setViewportInfo(newViewportInfo);

      if (adaptToViewport) {
        // Auto-adjust position based on viewport
        if (newViewportInfo.isMobile) {
          // On mobile, prefer center positions for better visibility
          if (defaultPosition.includes('top')) {
            setPosition('top-center');
          } else {
            setPosition('bottom-center');
          }
        } else {
          setPosition(defaultPosition);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, [defaultPosition, adaptToViewport]);

  const getOptimalPosition = (existingPositions: ToastPosition[] = []): ToastPosition => {
    if (!avoidOverlap || existingPositions.length === 0) {
      return position;
    }

    // Find an available position that doesn't overlap
    const allPositions: ToastPosition[] = [
      'top-right', 'top-left', 'top-center',
      'bottom-right', 'bottom-left', 'bottom-center'
    ];

    const availablePosition = allPositions.find(pos => !existingPositions.includes(pos));
    return availablePosition || position;
  };

  const getMaxToastsForPosition = (): number => {
    if (viewportInfo.isMobile) {
      return 3; // Fewer toasts on mobile
    }

    switch (position) {
      case 'top-center':
      case 'bottom-center':
        return 4; // Center positions can handle fewer due to width constraints
      default:
        return 5;
    }
  };

  const getSpacingForPosition = (): number => {
    if (viewportInfo.isMobile) {
      return 6; // Tighter spacing on mobile
    }

    return 8; // Default spacing
  };

  return {
    position,
    setPosition,
    viewportInfo,
    getOptimalPosition,
    getMaxToastsForPosition,
    getSpacingForPosition,
  };
};
