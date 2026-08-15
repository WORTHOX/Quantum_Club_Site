import * as React from "react"
import { cn } from "../../lib/utils"

const variantStyles = {
  default: "bg-blue-600 text-white shadow-md hover:bg-blue-500",
  destructive: "bg-red-600 text-white shadow-xs hover:bg-red-500",
  outline: "border border-gray-800 bg-[#060A2C] text-gray-200 shadow-xs hover:bg-blue-900/30 hover:border-blue-700/50",
  outline2: "border border-gray-800 bg-[#4670CA] text-white shadow-xs hover:bg-blue-800",
  secondary: "bg-slate-800 text-slate-100 shadow-xs hover:bg-slate-700",
  ghost: "text-gray-300 hover:bg-gray-800/50 hover:text-white",
  link: "text-blue-400 underline-offset-4 hover:underline p-0 h-auto",
  bestVariant: "border border-gray-800 bg-[#4670CA] text-white hover:bg-[#803FB9]",
}

const sizeStyles = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-11 rounded-md px-8 text-base",
  icon: "h-9 w-9 p-0 flex items-center justify-center",
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
  const classes = cn(baseClasses, variantStyles[variant] || variantStyles.default, sizeStyles[size] || sizeStyles.default, className)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    })
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
