import { useCallback, useEffect, useRef, useState } from 'react'
import type { GridApi, GridReadyEvent } from 'ag-grid-community'
import EmployeeGrid from './components/EmployeeGrid'
import KpiCards from './components/KpiCards'
import ModeToggle from './components/ModeToggle'
import Toolbar, { type ColumnToggle } from './components/Toolbar'
import { buildDataset, seedEmployees } from './data/employees'
import { emptyStats, readStats, type Stats } from './grid/stats'
import type { Employee } from './types/employee'
import { applyMode, readStoredMode, type ColorMode } from './theme'

export default function App() {
  const apiRef = useRef<GridApi<Employee> | null>(null)
  const [size, setSize] = useState(seedEmployees.length)
  const [rows, setRows] = useState<Employee[]>(seedEmployees)
  const [buildMs, setBuildMs] = useState(0)
  const [search, setSearch] = useState('')
  const [columns, setColumns] = useState<ColumnToggle[]>([])
  const [stats, setStats] = useState<Stats>(emptyStats)
  const [mode, setMode] = useState<ColorMode>(readStoredMode)

  const refreshStats = useCallback(() => {
    const api = apiRef.current
    if (api && !api.isDestroyed()) setStats(readStats(api))
  }, [])

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
      setStats(readStats(event.api))
    },
    [readColumns],
  )

  const handleSizeChange = useCallback((next: number) => {
    const start = performance.now()
    const data = buildDataset(next)
    setBuildMs(performance.now() - start)
    setSize(next)
    setRows(data)
  }, [])

  const searchTimer = useRef<number>(0)

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    window.clearTimeout(searchTimer.current)
    searchTimer.current = window.setTimeout(() => {
      apiRef.current?.setGridOption('quickFilterText', value)
    }, 180)
  }, [])

  useEffect(() => () => window.clearTimeout(searchTimer.current), [])

  useEffect(() => {
    applyMode(mode)
  }, [mode])

  const toggleMode = useCallback(() => {
    setMode((current) => (current === 'dark' ? 'light' : 'dark'))
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
    window.clearTimeout(searchTimer.current)
    api.setGridOption('quickFilterText', '')
    api.setFilterModel(null)
    api.resetColumnState()
    api.deselectAll()
    readColumns(api)
  }, [readColumns])

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Employee Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Workforce overview</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-slate-400 sm:block dark:text-slate-500">
            {rows.length.toLocaleString()} rows built in {buildMs.toFixed(1)}ms
          </p>
          <ModeToggle mode={mode} onToggle={toggleMode} />
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col gap-4 p-6">
        <KpiCards stats={stats} total={rows.length} />

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <Toolbar
            search={search}
            onSearchChange={handleSearchChange}
            size={size}
            onSizeChange={handleSizeChange}
            columns={columns}
            onToggleColumn={handleToggleColumn}
            onExport={handleExport}
            onReset={handleReset}
          />
          <div className="min-h-0 flex-1">
            <EmployeeGrid rows={rows} onGridReady={handleGridReady} onViewChanged={refreshStats} />
          </div>
        </div>
      </main>
    </div>
  )
}
