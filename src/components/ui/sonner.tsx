"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-slate-950 group-[.toaster]:text-slate-50 group-[.toaster]:border-slate-800 group-[.toaster]:shadow-lg rounded-lg",
          description: "group-[.toast]:text-slate-400",
          actionButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-900 group-[.toast]:border group-[.toast]:border-slate-200 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-slate-200",
          cancelButton:
            "group-[.toast]:bg-slate-800 group-[.toast]:text-slate-300 group-[.toast]:border group-[.toast]:border-slate-700 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-slate-700",
          closeButton: "group-[.toast]:bg-slate-950 group-[.toast]:text-slate-400 group-[.toast]:border-slate-800",
          success: "group-[.toaster]:bg-slate-950 group-[.toaster]:text-slate-50 group-[.toaster]:border-slate-800",
          error: "group-[.toaster]:bg-red-950 group-[.toaster]:text-red-50 group-[.toaster]:border-red-800",
          warning: "group-[.toaster]:bg-yellow-950 group-[.toaster]:text-yellow-50 group-[.toaster]:border-yellow-800",
          info: "group-[.toaster]:bg-blue-950 group-[.toaster]:text-blue-50 group-[.toaster]:border-blue-800",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }