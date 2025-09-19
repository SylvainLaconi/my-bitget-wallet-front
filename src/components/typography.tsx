import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'small'
    | 'xsmall';
}

export default function Typography({ children, variant }: TypographyProps) {
  return React.createElement(
    variant,
    { className: `typography-${variant}` },
    children
  );
}
