import { useEffect, useRef, useState } from 'react'
import { DATASET_SIZES } from '../data/employees'

export interface ColumnToggle {
  colId: string
  label: string
  visible: boolean
}

interface Props {
  search: string
  onSearchChange: (value: string) => void
  size: number
  onSizeChange: (size: number) => void
  columns: ColumnToggle[]
  onToggleColumn: (colId: string, visible: boolean) => void
  onExport: () => void
  onReset: () => void
}

export default function Toolbar({
  search,
  onSearchChange,
  size,
  onSizeChange,
  columns,
  onToggleColumn,
  onExport,
  onReset,
}: Props) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  const hidden = columns.filter((c) => !c.visible).length

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="relative min-w-[220px] flex-1">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="9" cy="9" r="6" />
          <path d="m13.5 13.5 3.5 3.5" strokeLinecap="round" />
        </svg>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search employees, skills, departments…"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span className="hidden sm:inline">Rows</span>
        <select
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
        >
          {DATASET_SIZES.map((option) => (
            <option key={option} value={option}>
              {option.toLocaleString()}
            </option>
          ))}
        </select>
      </label>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Columns{hidden > 0 && <span className="ml-1 text-slate-400 dark:text-slate-500">({columns.length - hidden})</span>}
        </button>
        {open && (
          <div className="absolute right-0 z-20 mt-1 max-h-80 w-56 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            {columns.map((column) => (
              <label
                key={column.colId}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <input
                  type="checkbox"
                  checked={column.visible}
                  onChange={(e) => onToggleColumn(column.colId, e.target.checked)}
                  className="h-3.5 w-3.5 accent-indigo-600"
                />
                {column.label}
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        Reset
      </button>

      <button
        type="button"
        onClick={onExport}
        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Export CSV
      </button>
    </div>
  )
}
