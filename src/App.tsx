import { useMemo, useState } from 'react'
import type { GridApi, GridReadyEvent } from 'ag-grid-community'
import EmployeeGrid from './components/EmployeeGrid'
import { buildDataset } from './data/employees'
import type { Employee } from './types/employee'

export default function App() {
  const [size] = useState(20)
  const [, setApi] = useState<GridApi<Employee> | null>(null)

  const rows = useMemo(() => buildDataset(size), [size])

  const handleGridReady = (event: GridReadyEvent<Employee>) => {
    setApi(event.api)
  }

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold">Employee Dashboard</h1>
        <p className="text-sm text-slate-500">{rows.length} records</p>
      </header>
      <main className="min-h-0 flex-1 p-6">
        <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmployeeGrid rows={rows} onGridReady={handleGridReady} onViewChanged={() => {}} />
        </div>
      </main>
    </div>
  )
}
