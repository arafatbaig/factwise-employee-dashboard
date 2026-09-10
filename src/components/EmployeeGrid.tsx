import { useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type {
  GetRowIdParams,
  GridReadyEvent,
  RowSelectionOptions,
  ColDef,
} from 'ag-grid-community'
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

const rowSelection: RowSelectionOptions<Employee> = {
  mode: 'multiRow',
  headerCheckbox: true,
  enableClickSelection: false,
}

const selectionColumnDef: ColDef<Employee> = {
  pinned: 'left',
  width: 44,
  resizable: false,
  lockPosition: true,
}

const pageSizes = [25, 50, 100]

const localeText = {
  noRowsToShow: 'No employees to show',
  noMatchingRows: 'No employees match the current filters',
}

interface Props {
  rows: Employee[]
  onGridReady: (event: GridReadyEvent<Employee>) => void
  onViewChanged: () => void
}

export default function EmployeeGrid({ rows, onGridReady, onViewChanged }: Props) {
  const getRowId = useCallback((params: GetRowIdParams<Employee>) => String(params.data.id), [])

  return (
    <div className="h-full w-full">
      <AgGridReact<Employee>
        theme={theme}
        rowData={rows}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        getRowId={getRowId}
        rowSelection={rowSelection}
        selectionColumnDef={selectionColumnDef}
        pagination
        paginationPageSize={25}
        paginationPageSizeSelector={pageSizes}
        cacheQuickFilter
        animateRows={false}
        tooltipShowDelay={300}
        localeText={localeText}
        onGridReady={onGridReady}
        onFilterChanged={onViewChanged}
        onRowDataUpdated={onViewChanged}
      />
    </div>
  )
}
