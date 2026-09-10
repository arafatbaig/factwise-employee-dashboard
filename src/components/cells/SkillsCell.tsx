import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

export default function SkillsCell({ value }: CustomCellRendererProps<Employee, string[]>) {
  if (!value?.length) return null

  return (
    <div className="flex items-center gap-1.5 overflow-hidden">
      {value.map((skill) => (
        <span
          key={skill}
          className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:ring-slate-600/50"
        >
          {skill}
        </span>
      ))}
    </div>
  )
}
