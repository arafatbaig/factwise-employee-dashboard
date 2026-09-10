import type { Stats } from '../grid/stats'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function formatSalary(value: number) {
  return value ? currency.format(value) : '—'
}

interface CardProps {
  label: string
  value: string
  caption: string
  accent: string
}

function Card({ label, value, caption, accent }: CardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${accent}`} />
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-slate-50">{value}</p>
      <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{caption}</p>
    </div>
  )
}

export default function KpiCards({ stats, total }: { stats: Stats; total: number }) {
  const filtered = stats.headcount !== total
  const scope = filtered ? `of ${total.toLocaleString()} total` : 'all records'

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card
        label="Employees"
        value={stats.headcount.toLocaleString()}
        caption={scope}
        accent="bg-indigo-500"
      />
      <Card
        label="Avg Salary"
        value={formatSalary(stats.avgSalary)}
        caption="per employee"
        accent="bg-emerald-500"
      />
      <Card
        label="Projects"
        value={stats.projects.toLocaleString()}
        caption="completed"
        accent="bg-sky-500"
      />
      <Card
        label="Active"
        value={stats.headcount ? `${stats.active.toLocaleString()} / ${stats.headcount.toLocaleString()}` : '—'}
        caption={stats.headcount ? `${Math.round((stats.active / stats.headcount) * 100)}% of shown` : 'no rows'}
        accent="bg-amber-500"
      />
    </div>
  )
}
