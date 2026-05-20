"use client"

import { useEffect, useRef } from "react"

interface AnimatedTextProps {
  text: string
  fontSize?: number
  minWeight?: number
  maxWeight?: number
  animationDuration?: number
  delayMultiplier?: number
  className?: string
}

export function AnimatedText({
  text,
  fontSize = 150,
  minWeight = 100,
  maxWeight = 800,
  animationDuration = 1.5,
  delayMultiplier = 0.25,
  className = "",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const spans = containerRef.current.querySelectorAll("span[aria-hidden]")
    const numLetters = spans.length
    spans.forEach((span, i) => {
      const mappedIndex = i - numLetters / 2
      ;(span as HTMLElement).style.animationDelay = mappedIndex * delayMultiplier + "s"
    })
  }, [text, delayMultiplier])

  return (
    <div className={`flex items-center ${className}`}>
      <p
        ref={containerRef}
        aria-label={text}
        className="font-serif m-0 leading-none tracking-tighter italic uppercase"
        style={{ fontSize: `${fontSize}px` }}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            aria-hidden="true"
            style={{
              display: "inline-block",
              animation: `breath ${animationDuration}s alternate cubic-bezier(0.37, 0, 0.63, 1) infinite`,
              animationFillMode: "both",
              fontVariationSettings: `"wght" ${minWeight}`,
              whiteSpace: char === " " ? "pre" : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  )
}
