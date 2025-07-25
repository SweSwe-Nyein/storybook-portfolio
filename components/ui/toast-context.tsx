"use client"

import * as React from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  type?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
}

export interface ToastProps {
  title?: string
  description?: string
  type?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextValue>({
  toasts: [],
  toast: () => {},
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback(
    (props: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast = { ...props, id }
      setToasts((prev) => [...prev, newToast])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, props.duration || 3000)
    },
    []
  )

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-md px-4 py-3 shadow-md ${
              t.type === "error"
                ? "bg-destructive text-destructive-foreground"
                : t.type === "success"
                ? "bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-600 dark:to-red-700 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {t.title && <h3 className="font-medium">{t.title}</h3>}
            {t.description && <p className="text-sm mt-1">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
} 