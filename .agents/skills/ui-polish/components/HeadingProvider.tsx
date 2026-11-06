/**
 * UI Polish - Dynamic Accessible Heading Level Provider
 * Prevents skipped heading levels (H1 -> H3) by automatically
 * computing the correct heading level based on DOM nest depth.
 * 
 * Usage:
 * <HeadingLevel>
 *   <Heading>Page Title (Renders H1)</Heading>
 *   <section>
 *     <HeadingLevel>
 *       <Heading>Section Title (Renders H2)</Heading>
 *       <div>
 *         <HeadingLevel>
 *           <Heading>Card Title (Renders H3)</Heading>
 *         </HeadingLevel>
 *       </div>
 *     </HeadingLevel>
 *   </section>
 * </HeadingLevel>
 */

import React, { createContext, useContext, ReactNode, HTMLAttributes } from 'react';

const HeadingLevelContext = createContext<number>(0);

export interface HeadingLevelProps {
  children: ReactNode;
}

export function HeadingLevel({ children }: HeadingLevelProps) {
  const currentLevel = useContext(HeadingLevelContext);
  const nextLevel = Math.min(currentLevel + 1, 6); // Maxes out at H6
  return (
    <HeadingLevelContext.Provider value={nextLevel}>
      {children}
    </HeadingLevelContext.Provider>
  );
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export function Heading({ children, className = '', ...props }: HeadingProps) {
  const level = useContext(HeadingLevelContext);
  const safeLevel = Math.max(1, Math.min(level || 1, 6));
  const Tag = `h${safeLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}

