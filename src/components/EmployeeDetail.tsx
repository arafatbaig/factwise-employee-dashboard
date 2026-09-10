import { useEffect } from 'react'
import type { Employee } from '../types/employee'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

function tenure(hireDate: string) {
  const start = new Date(`${hireDate}T00:00:00`)
  const months = Math.max(0, Math.round((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)))
  const years = Math.floor(months / 12)
  const rest = months % 12
  if (!years) return `${rest} month${rest === 1 ? '' : 's'}`
  return `${years} yr${years === 1 ? '' : 's'}${rest ? ` ${rest} mo` : ''}`
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-slate-100 py-2.5 last:border-0 dark:border-slate-800">
      <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-slate-800 dark:text-slate-100">{children}</dd>
    </div>
  )
}

interface Props {
  employee: Employee | null
  onClose: () => void
}

export default function EmployeeDetail({ employee, onClose }: Props) {
  useEffect(() => {
    if (!employee) return
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [employee, onClose])

  if (!employee) return null

  return (
    <div className="fixed inset-0 z-30 flex justify-end">
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="flex-1 bg-slate-900/20 dark:bg-slate-950/50"
      />
      <aside className="flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-slate-900 dark:text-slate-50">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">{employee.position}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <dl className="px-5 py-2">
          <Field label="Employee ID">#{employee.id}</Field>
          <Field label="Email">
            <a
              href={`mailto:${employee.email}`}
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {employee.email}
            </a>
          </Field>
          <Field label="Department">{employee.department}</Field>
          <Field label="Location">{employee.location}</Field>
          <Field label="Manager">
            {employee.manager ?? (
              <span className="text-slate-400 dark:text-slate-500">— department head</span>
            )}
          </Field>
          <Field label="Salary">{currency.format(employee.salary)}</Field>
          <Field label="Hire date">
            {dateFormat.format(new Date(`${employee.hireDate}T00:00:00`))}
            <span className="text-slate-400 dark:text-slate-500"> · {tenure(employee.hireDate)}</span>
          </Field>
          <Field label="Age">{employee.age}</Field>
          <Field label="Performance rating">{employee.performanceRating.toFixed(1)} / 5.0</Field>
          <Field label="Projects completed">{employee.projectsCompleted}</Field>
          <Field label="Status">{employee.isActive ? 'Active' : 'Inactive'}</Field>
          <Field label="Skills">
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {employee.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Field>
        </dl>
      </aside>
    </div>
  )
}
