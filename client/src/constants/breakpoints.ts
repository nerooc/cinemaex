const customBreakpoint = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const breakpoints = {
  largeDesktop: customBreakpoint(1200),
  desktop: customBreakpoint(922),
  tablet: customBreakpoint(768),
  phone: customBreakpoint(576),
};

export default breakpoints;
