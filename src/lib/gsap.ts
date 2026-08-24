let gsapInstance: any = null;
let ScrollTriggerInstance: any = null;

export async function initGsap() {
  if (typeof window === 'undefined') return null;

  if (!gsapInstance) {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    gsapInstance = gsapModule.gsap;
    ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
    gsapInstance.registerPlugin(ScrollTriggerInstance);
  }

  return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
}

export function getGsap() {
  return gsapInstance;
}

export function getScrollTrigger() {
  return ScrollTriggerInstance;
}
