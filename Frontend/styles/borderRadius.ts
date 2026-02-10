export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 12,
  lg: 16,
  xl: 32,
} as const;

export type BorderRadius = (typeof borderRadius)[keyof typeof borderRadius];
