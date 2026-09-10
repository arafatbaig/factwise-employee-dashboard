import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

export default function StatusCell({ value }: CustomCellRendererProps<Employee, boolean>) {
  const active = value === true

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
        active
          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30'
          : 'bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:ring-slate-500/30'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}
