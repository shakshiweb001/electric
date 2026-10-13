// GSAP, ScrollTrigger and Lenis in one lazily loaded chunk (see scrollKit.js).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, Lenis };
