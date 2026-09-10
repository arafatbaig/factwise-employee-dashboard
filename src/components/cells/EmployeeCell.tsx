import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

const PALETTE = [
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
]

export default function EmployeeCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null

  const initials = `${data.firstName[0]}${data.lastName[0]}`
  const tone = PALETTE[(data.firstName.charCodeAt(0) + data.lastName.charCodeAt(0)) % PALETTE.length]

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${tone}`}
      >
        {initials}
      </span>
      <span className="truncate font-medium text-slate-800">
        {data.firstName} {data.lastName}
      </span>
    </div>
  )
}
