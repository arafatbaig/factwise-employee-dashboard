import { useEffect, useState } from 'react'
import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

export default function EmailCell({ value }: CustomCellRendererProps<Employee, string>) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1400)
    return () => window.clearTimeout(timer)
  }, [copied])

  if (!value) return null

  const copy = async (event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // clipboard needs a secure context; the mailto link still works
    }
  }

  return (
    <div className="group flex h-full items-center gap-1">
      <a
        href={`mailto:${value}`}
        onClick={(e) => e.stopPropagation()}
        title={value}
        className="truncate text-slate-500 hover:text-indigo-600 hover:underline dark:text-slate-400 dark:hover:text-indigo-400"
      >
        {value}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${value}`}
        title="Copy email"
        className="shrink-0 rounded p-0.5 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-700 focus:opacity-100 dark:text-slate-500 dark:hover:text-slate-200"
      >
        {copied ? (
          <svg className="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3.5 8.5 3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.6" />
            <path d="M10.5 3.5a1.6 1.6 0 0 0-1.6-1.6H4a1.6 1.6 0 0 0-1.6 1.6v5a1.6 1.6 0 0 0 1.6 1.6" />
          </svg>
        )}
      </button>
    </div>
  )
}
