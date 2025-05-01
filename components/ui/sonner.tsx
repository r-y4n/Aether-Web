"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group p-20 m-10"
      style={
        {
          
          "--normal-bg": "var(--success)",
          "--normal-text": "var(--popover)",
          "--normal-border": "var(--secondary)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
