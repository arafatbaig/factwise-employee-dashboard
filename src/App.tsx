import { useCallback, useMemo, useRef, useState } from 'react'
import type { GridApi, GridReadyEvent } from 'ag-grid-community'
import EmployeeGrid from './components/EmployeeGrid'
import Toolbar, { type ColumnToggle } from './components/Toolbar'
import { buildDataset } from './data/employees'
import type { Employee } from './types/employee'

export default function App() {
  const apiRef = useRef<GridApi<Employee> | null>(null)
  const [size, setSize] = useState(20)
  const [search, setSearch] = useState('')
  const [columns, setColumns] = useState<ColumnToggle[]>([])

  const { rows, buildMs } = useMemo(() => {
    const start = performance.now()
    const data = buildDataset(size)
    return { rows: data, buildMs: performance.now() - start }
  }, [size])

  const readColumns = useCallback((api: GridApi<Employee>) => {
    setColumns(
      api
        .getColumns()
        ?.filter((column) => !!column.getColDef().field)
        .map((column) => ({
          colId: column.getColId(),
          label: column.getColDef().headerName ?? column.getColId(),
          visible: column.isVisible(),
        })) ?? [],
    )
  }, [])

  const handleGridReady = useCallback(
    (event: GridReadyEvent<Employee>) => {
      apiRef.current = event.api
      readColumns(event.api)
    },
    [readColumns],
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    apiRef.current?.setGridOption('quickFilterText', value)
  }, [])

  const handleToggleColumn = useCallback(
    (colId: string, visible: boolean) => {
      const api = apiRef.current
      if (!api) return
      api.setColumnsVisible([colId], visible)
      readColumns(api)
    },
    [readColumns],
  )

  const handleExport = useCallback(() => {
    apiRef.current?.exportDataAsCsv({
      fileName: `employees-${new Date().toISOString().slice(0, 10)}.csv`,
      allColumns: false,
    })
  }, [])

  const handleReset = useCallback(() => {
    const api = apiRef.current
    if (!api) return
    setSearch('')
    api.setGridOption('quickFilterText', '')
    api.setFilterModel(null)
    api.resetColumnState()
    api.deselectAll()
    readColumns(api)
  }, [readColumns])

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Employee Dashboard</h1>
          <p className="text-sm text-slate-500">Workforce overview</p>
        </div>
        <p className="text-xs text-slate-400">
          {rows.length.toLocaleString()} rows built in {buildMs.toFixed(1)}ms
        </p>
      </header>

      <main className="flex min-h-0 flex-1 flex-col p-6">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
          <Toolbar
            search={search}
            onSearchChange={handleSearchChange}
            size={size}
            onSizeChange={setSize}
            columns={columns}
            onToggleColumn={handleToggleColumn}
            onExport={handleExport}
            onReset={handleReset}
          />
          <div className="min-h-0 flex-1">
            <EmployeeGrid rows={rows} onGridReady={handleGridReady} onViewChanged={() => {}} />
          </div>
        </div>
      </main>
    </div>
  )
}
