"use client"

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);


export function FadeIn({ children, className, targetChildren, ...vars }) {

    const containerRef = useRef(null);

    useGSAP(() => {
        const target = targetChildren ? containerRef.current?.children : containerRef.current

        if(!target) return;

        gsap.set(target, {
            opacity: 0,
            y: 60,
        })

        gsap.to(target, {
            duration: .8,
            opacity: 1,
            ease: "power3.out",
            y: 0,
            stagger: .2,
            ...vars,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 50%",
            }
        })
    })

    return (
    <div ref={containerRef} className={clsx(className)}>{children}</div>
);
}