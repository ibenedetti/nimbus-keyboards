"use client"

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @type {import("react").FC<HeroProps>}
 */
import { PrismicRichText } from "@prismicio/react";
import  Bounded  from "@/components/Bounded";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Loader } from "@/components/Loader";
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { checkout } from "@/checkout";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
async function handleCheckout() {
      if (button.current) button.current.disabled = true;
      await checkout();
      if (button.current) button.current.disabled = false;
    }

function LoaderWrapper () {
  const {active} = useProgress();
  const [showLoader, setShowLoader] = useState(active);

  

  const MINIMUM_DISPLAY_TIME = 1500; 

  useEffect(() => {
    let timer;

    if (active) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, MINIMUM_DISPLAY_TIME);
    }

    return () => {
      clearTimeout(timer);
    };
    
  }, [active]);

  return showLoader ? <Loader /> : null
}

const Hero = ({ slice }) => {

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      const split = SplitText.create(".hero-heading", { 
        type: "chars.lines", 
        linesClass: "lines" 
      });

      const tl = gsap.timeline({delay: 4.2});

      tl.from(split.chars, {
        opacity: 0,
        y: -120,
        ease: "back",
        duration: .4,
        stagger: .07,
      }).to(".hero-body", {
        opacity: 1,
        duration: .6,
        ease: "power2.out"  
      })

      gsap.fromTo(".hero-scene", {
        background: "linear-gradient(to bottom,#8a030a, #77298f,#0f172a, #000000)",
       
      }, {
        background:  "linear-gradient(to bottom, #000000, #000000, #000000, #000000)",
         scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "50%",
          scrub: 1,
        }
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-heading, .hero-body", {opacity: 1});
      });

    });
  })


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero text-white relative h-dvh text-shadow-black/30 text-shadow-lg motion-safe:h-[300vh]"
    >
      <div className="hero-scene sticky pointer-events-none top-0 h-dvh w-full">
        <Canvas shadows="soft">
          <Scene />
        </Canvas>
      </div>
      <LoaderWrapper />

      <div className="hero-content absolute inset-x-0 top-0 h-dvh">
        <Bounded fullWidth className="absolute top-18 inset-x-0 md:top-24 md:left-[8dvw]">
        <PrismicRichText field={slice.primary.heading} components={{
          heading1: ({children}) => (
            <h1 className="hero-heading font-black-slanted text-6xl leading-[0.8] uppercase sm:text-7xl lg:text-8xl">
              {children}
            </h1>
          )
        }} />
        </Bounded>

        <Bounded fullwidth 
        className="hero-body absolute bottom-0 inset-x-0 md:right-[8dvh] md:left-auto opacity-0"
        
        >          
          <div className="max-w-md flex flex-col gap-3">
            <PrismicRichText field={slice.primary.body} components={{
              heading2: ({children}) => (
                <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">{children}</h2>
              )
            }} />
            <button 
            
            onClick={handleCheckout}
            className="group font-bold-slanted flex w-fit cursor-pointer items-center gap-1 rounded bg-[#8C3A7D] px-3 py-1 text-2xl uppercase transition disabled:grayscale">          
              {slice.primary.buy_button_text}
              <span className="group-hover:translate-x-1 transition">{">"}</span>
            </button>
          </div>     
        </Bounded>   
      </div>
    </section>
  );
};

export default Hero;
