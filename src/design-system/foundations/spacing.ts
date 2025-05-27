
// Design System Spacing Scale
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
} as const;

export const componentSizes = {
  button: {
    sm: { height: '2rem', padding: '0.5rem 0.75rem' },
    md: { height: '2.5rem', padding: '0.625rem 1rem' },
    lg: { height: '3rem', padding: '0.75rem 1.5rem' },
  },
  input: {
    sm: { height: '2rem', padding: '0.25rem 0.5rem' },
    md: { height: '2.5rem', padding: '0.5rem 0.75rem' },
    lg: { height: '3rem', padding: '0.75rem 1rem' },
  },
} as const;

export type Spacing = typeof spacing;
