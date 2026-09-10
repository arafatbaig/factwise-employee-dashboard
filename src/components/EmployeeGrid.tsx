import { useCallback, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { GetRowIdParams, GridOptions, GridReadyEvent } from 'ag-grid-community'
import { themeQuartz } from 'ag-grid-community'
import type { Employee } from '../types/employee'
import { columnDefs, defaultColDef } from '../grid/columns'

const theme = themeQuartz.withParams({
  accentColor: '#4f46e5',
  borderColor: '#e2e8f0',
  headerBackgroundColor: '#f8fafc',
  headerTextColor: '#475569',
  headerFontWeight: 600,
  fontFamily: 'inherit',
  fontSize: '13px',
  headerFontSize: '12px',
  rowHeight: 48,
  headerHeight: 44,
  oddRowBackgroundColor: '#ffffff',
  rowHoverColor: '#f8fafc',
  selectedRowBackgroundColor: '#eef2ff',
  wrapperBorderRadius: '0px',
})

const gridOptions: GridOptions<Employee> = {
  rowSelection: { mode: 'multiRow', headerCheckbox: true, enableClickSelection: false },
  selectionColumnDef: { pinned: 'left', width: 44, resizable: false, lockPosition: true },
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100],
  suppressColumnVirtualisation: false,
  animateRows: false,
  tooltipShowDelay: 300,
}

interface Props {
  rows: Employee[]
  onGridReady: (event: GridReadyEvent<Employee>) => void
  onViewChanged: () => void
}

export default function EmployeeGrid({ rows, onGridReady, onViewChanged }: Props) {
  const getRowId = useCallback((params: GetRowIdParams<Employee>) => String(params.data.id), [])

  const options = useMemo(() => gridOptions, [])

  return (
    <div className="h-full w-full">
      <AgGridReact<Employee>
        theme={theme}
        rowData={rows}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        gridOptions={options}
        getRowId={getRowId}
        onGridReady={onGridReady}
        onFilterChanged={onViewChanged}
        onRowDataUpdated={onViewChanged}
      />
    </div>
  )
}
