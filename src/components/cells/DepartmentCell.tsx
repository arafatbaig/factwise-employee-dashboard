import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

const DOT: Record<string, string> = {
  Engineering: 'bg-indigo-500',
  Marketing: 'bg-rose-500',
  Sales: 'bg-amber-500',
  HR: 'bg-emerald-500',
  Finance: 'bg-sky-500',
}

export default function DepartmentCell({ value }: CustomCellRendererProps<Employee, string>) {
  if (!value) return null

  return (
    <div className="flex h-full items-center gap-2">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[value] ?? 'bg-slate-400'}`} />
      <span className="truncate text-slate-700 dark:text-slate-200">{value}</span>
    </div>
  )
}
