import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

function toneFor(rating: number) {
  if (rating >= 4.5) return 'bg-emerald-500'
  if (rating >= 4) return 'bg-sky-500'
  if (rating >= 3.5) return 'bg-amber-500'
  return 'bg-rose-500'
}

export default function RatingCell({ value }: CustomCellRendererProps<Employee, number>) {
  if (value == null) return null

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${toneFor(value)}`} style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <span className="tabular-nums text-slate-600">{value.toFixed(1)}</span>
    </div>
  )
}
