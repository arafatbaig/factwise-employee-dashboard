import { useEffect, useState } from 'react'
import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

const PALETTE = [
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
  'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
]

export default function EmployeeCell({ data }: CustomCellRendererProps<Employee>) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1400)
    return () => window.clearTimeout(timer)
  }, [copied])

  if (!data) return null

  const initials = `${data.firstName[0]}${data.lastName[0]}`
  const tone = PALETTE[(data.firstName.charCodeAt(0) + data.lastName.charCodeAt(0)) % PALETTE.length]

  const copyEmail = async (event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(data.email)
      setCopied(true)
    } catch {
      // clipboard needs a secure context; the mailto link still works
    }
  }

  return (
    <div className="group flex h-full items-center gap-3">
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold leading-none ${tone}`}
      >
        {initials}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-slate-800 dark:text-slate-100">
          {data.firstName} {data.lastName}
        </p>
        <div className="flex items-center gap-1">
          <a
            href={`mailto:${data.email}`}
            onClick={(e) => e.stopPropagation()}
            title={data.email}
            className="truncate text-xs text-slate-500 hover:text-indigo-600 hover:underline dark:text-slate-400 dark:hover:text-indigo-400"
          >
            {data.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={`Copy ${data.email}`}
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
      </div>
    </div>
  )
}
