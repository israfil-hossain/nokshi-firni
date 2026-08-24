"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group z-[9999]"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-dark group-[.toaster]:border-gold/20 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-dark-light",
          actionButton: "group-[.toast]:bg-gold group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-cream group-[.toast]:text-dark",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
