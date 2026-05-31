// Bridge between the global smooth-scroll provider and an optional scroll
// consumer (GSAP ScrollTrigger on the OpenDay landing). Lets the provider
// notify ScrollTrigger on every Lenis scroll WITHOUT statically importing GSAP
// into the main bundle — so the ~45KB GSAP chunk only loads on the route that
// actually needs it.
export const scrollBridge: { onScroll?: () => void } = {};
