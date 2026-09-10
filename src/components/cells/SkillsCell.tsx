import type { CustomCellRendererProps } from 'ag-grid-react'
import type { Employee } from '../../types/employee'

const VISIBLE = 2

export default function SkillsCell({ value }: CustomCellRendererProps<Employee, string[]>) {
  if (!value?.length) return null

  const shown = value.slice(0, VISIBLE)
  const hidden = value.length - shown.length

  return (
    <div className="flex h-full items-center gap-1.5 overflow-hidden">
      {shown.map((skill) => (
        <span
          key={skill}
          className="max-w-[150px] shrink truncate rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:ring-slate-600/50"
        >
          {skill}
        </span>
      ))}
      {hidden > 0 && (
        <span className="shrink-0 text-xs font-medium text-slate-400 dark:text-slate-500">
          +{hidden}
        </span>
      )}
    </div>
  )
}
