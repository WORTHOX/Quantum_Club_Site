import * as React from "react"
import { cn } from "../../lib/utils"

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-[#060A2C] text-gray-100 flex flex-col rounded-xl border border-gray-800 shadow-md",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-6 border-b border-gray-800/50",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-xl font-semibold leading-none tracking-tight font-title text-white", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-gray-400 font-display", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    />
  )
}

// Alias for Next.js / HeroUI compatibility
const CardBody = CardContent

function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardBody,
}
