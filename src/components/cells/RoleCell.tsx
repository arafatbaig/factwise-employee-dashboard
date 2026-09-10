import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

const DOT: Record<string, string> = {
  Engineering: 'bg-indigo-500',
  Marketing: 'bg-rose-500',
  Sales: 'bg-amber-500',
  HR: 'bg-emerald-500',
  Finance: 'bg-sky-500',
}

export default function RoleCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null

  return (
    <div className="flex h-full flex-col justify-center gap-0.5 leading-tight">
      <p className="truncate text-slate-800 dark:text-slate-100">{data.position}</p>
      <p className="flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[data.department] ?? 'bg-slate-400'}`} />
        {data.department}
      </p>
    </div>
  )
}
