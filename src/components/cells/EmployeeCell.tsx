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
  if (!data) return null

  const initials = `${data.firstName[0]}${data.lastName[0]}`
  const tone = PALETTE[(data.firstName.charCodeAt(0) + data.lastName.charCodeAt(0)) % PALETTE.length]

  return (
    <div className="flex h-full items-center gap-2.5">
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold leading-none ${tone}`}
      >
        {initials}
      </span>
      <span className="truncate font-medium text-slate-800 dark:text-slate-100">
        {data.firstName} {data.lastName}
      </span>
    </div>
  )
}
