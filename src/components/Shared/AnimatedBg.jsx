import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedBG = () => {
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 0.1,
          opacity: 0.6,
          clipPath: 'polygon(0 50%, 50% 0, 100% 50%, 50% 100%)', // diamond
        },
        {
          scale: 1,
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // full rectangle
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top center',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    }, imageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="absolute inset-0 h-screen w-screen flex items-center justify-center">
      <div
        ref={imageRef}
        className="w-full h-[120vh] bg-center bg-cover"
        style={{ backgroundImage: `url('/ghost_bg.png')` }}
      />
    </div>
  )
}

export default AnimatedBG
