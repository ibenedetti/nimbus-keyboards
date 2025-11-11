"use client";

import Bounded from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { LuChevronRight, LuLoader } from "react-icons/lu";

/**
 * @typedef {import("@prismicio/client").Content.PurchaseButtonSlice} PurchaseButtonSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PurchaseButtonSlice>} PurchaseButtonProps
 * @type {import("react").FC<PurchaseButtonProps>}
 */

gsap.registerPlugin(useGSAP);
const PurchaseButton = ({ slice }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);

  const handlePurchaseClick = async () => {
    setIsPressed(true);
    //TODO: Add your purchase logic here
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPressed(false);
  };

  useGSAP(() => {
    if (!buttonRef.current || !textRef.current) return;

    const handleMouseMove = (e) => {
      if (!buttonRef.current || !textRef.current) return;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = e.clientX - buttonRect.left;
      const buttonWidth = buttonRect.width;

      const nomrmalizeX = Math.max(0, Math.min(1, mouseX / buttonWidth));

      const newWdth = 120 - nomrmalizeX * 70; //120 thinner, 200 wider
      const newwWght = 700 - nomrmalizeX * 300; //700 lighter, 1000 bolder

      gsap.to(textRef.current, {
        "--wdth": newWdth,
        "--wght": newwWght,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(textRef.current, {
        "--wdth": 85,
        "--wght": 850,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    buttonRef.current.addEventListener("mousemove", handleMouseMove);
    buttonRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (buttonRef.current) {
        buttonRef.current?.removeEventListener("mousemove", handleMouseMove);
        buttonRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [buttonRef, textRef]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn className="relative mx-auto max-w-7xl px-4 text-center" targetChildren>
        <p className="mb-6 text-xl font-medium text-gray-700 md:text-2xl">{slice.primary.eyebrow}</p>
        <h2 className="font-bold-slanted mb-8 scroll-pt-6 text-5xl text-gray-900 uppercase md:text-7xl lg:text-8xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
        <button
          ref={buttonRef}
          onClick={handlePurchaseClick}
          disabled={isPressed}
          className={clsx("group relative w-full overflow-hidden rounded-full border-8 border-gray-900 bg-linear-to-r/oklch from-sky-300 to-sky-600 px-6 py-6 ease-out focus:ring-[24px] focus:ring-sky-500/50 focus:outline-none motion-safe:transition-all motion-safe:duratio-300 md:border-[12px] md:px-20 md:py-16",
            "hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/40",
            "active:scale-95",
            isPressed ? "scale-95 cursor-not-allowed opacity-80" : "cursor-pointer"
          )}>
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent ease-out group-hover:translate-x-full motion-safe:transition-transform motion-safe:duration-1000" />

          <div className="relative z-10 flex items-center justify-center gap-6 md:gap-8">
            <span
              ref={textRef}
              style={{ "--wdth": 85, "--wght": 850 }}
              className="font-black-slanted text-4xl tracking-wide text-gray-900 uppercase group-hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300 md:text-7xl lg:text-9xl">
              {isPressed ? (
                <span
                  className="flex items-center gap-4 md:gap-6">
                  <LuLoader className="size-12 animate-spin text-gray-900 md:size-16" />
                  Loading...
                </span>
              ) :
                (slice.primary.button_text)}
            </span>
            {!isPressed && (
              <div className="hidden group-hover:translate-x-2 group-hover:scale-125 motion-safe:transition-all motion-safe:duration-300 md:block">
                <LuChevronRight className="size-12 text-gray-900 md:size-16" />
              </div>

            )}

          </div>
        </button>
        <div className="mt-12 space-y-3 text-base text-gray-600 md:text-lg">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </FadeIn>
    </Bounded>
  );
};

export default PurchaseButton;