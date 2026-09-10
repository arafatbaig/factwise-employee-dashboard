import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

const TONE: Record<string, string> = {
  Engineering: 'text-indigo-600 dark:text-indigo-400',
  Marketing: 'text-rose-600 dark:text-rose-400',
  Sales: 'text-amber-600 dark:text-amber-400',
  HR: 'text-emerald-600 dark:text-emerald-400',
  Finance: 'text-sky-600 dark:text-sky-400',
}

export default function RoleCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null

  return (
    <div className="flex h-full flex-col justify-center leading-tight">
      <p className="truncate text-slate-700 dark:text-slate-200">{data.position}</p>
      <p className={`truncate text-xs font-medium ${TONE[data.department] ?? 'text-slate-400'}`}>
        {data.department}
      </p>
    </div>
  )
}
