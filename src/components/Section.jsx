import React, { forwardRef } from 'react';

/**
 * Simple Section Component
 * 
 * A clean, reusable section component with essential props for common use cases.
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - HTML id attribute
 * @param {string} props.className - CSS class names
 * @param {Object} props.style - Inline styles
 * @param {React.ReactNode} props.children - Child elements
 * @param {Object} ref - Ref to forward to the section element
 * @returns {JSX.Element} Section element
 */
const Section = forwardRef(({
  id,
  className = '',
  style = {},
  children,
  ...rest
}, ref) => {
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;