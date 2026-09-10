import type { ColDef, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community'
import type { Employee } from '../types/employee'
import EmployeeCell from '../components/cells/EmployeeCell'
import RatingCell from '../components/cells/RatingCell'
import SkillsCell from '../components/cells/SkillsCell'
import StatusCell from '../components/cells/StatusCell'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export const defaultColDef: ColDef<Employee> = {
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 110,
  filterParams: { buttons: ['reset'] },
}

export const columnDefs: ColDef<Employee>[] = [
  {
    headerName: 'Employee',
    colId: 'employee',
    field: 'firstName',
    valueGetter: (p: ValueGetterParams<Employee>) =>
      p.data ? `${p.data.firstName} ${p.data.lastName}` : '',
    cellRenderer: EmployeeCell,
    pinned: 'left',
    lockPinned: true,
    width: 210,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Email',
    field: 'email',
    width: 230,
    filter: 'agTextColumnFilter',
    cellClass: 'text-slate-500',
  },
  {
    headerName: 'Department',
    field: 'department',
    width: 140,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Position',
    field: 'position',
    width: 200,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Manager',
    field: 'manager',
    width: 160,
    filter: 'agTextColumnFilter',
    valueFormatter: (p: ValueFormatterParams<Employee, string | null>) => p.value ?? '—',
    cellClass: (p) => (p.value ? 'text-slate-600' : 'text-slate-400'),
    tooltipValueGetter: (p) => (p.value ? null : 'Department head — reports to no one'),
  },
  {
    headerName: 'Salary',
    field: 'salary',
    width: 130,
    filter: 'agNumberColumnFilter',
    valueFormatter: (p: ValueFormatterParams<Employee, number>) =>
      p.value == null ? '' : currency.format(p.value),
    type: 'rightAligned',
    cellClass: 'tabular-nums font-medium text-slate-700',
  },
  {
    headerName: 'Hire Date',
    field: 'hireDate',
    colId: 'hireDate',
    width: 140,
    filter: 'agDateColumnFilter',
    valueGetter: (p: ValueGetterParams<Employee>) =>
      p.data?.hireDate ? new Date(`${p.data.hireDate}T00:00:00`) : null,
    valueFormatter: (p: ValueFormatterParams<Employee, Date>) =>
      p.value ? dateFormat.format(p.value) : '',
  },
  {
    headerName: 'Age',
    field: 'age',
    width: 100,
    filter: 'agNumberColumnFilter',
    type: 'rightAligned',
    cellClass: 'tabular-nums text-slate-600',
  },
  {
    headerName: 'Location',
    field: 'location',
    width: 140,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Rating',
    field: 'performanceRating',
    width: 150,
    filter: 'agNumberColumnFilter',
    cellRenderer: RatingCell,
  },
  {
    headerName: 'Projects',
    field: 'projectsCompleted',
    width: 120,
    filter: 'agNumberColumnFilter',
    type: 'rightAligned',
    cellClass: 'tabular-nums text-slate-600',
  },
  {
    headerName: 'Status',
    field: 'isActive',
    width: 130,
    filter: 'agTextColumnFilter',
    cellRenderer: StatusCell,
    valueGetter: (p: ValueGetterParams<Employee>) =>
      p.data?.isActive === undefined ? null : p.data.isActive,
    getQuickFilterText: (p) => (p.value ? 'Active' : 'Inactive'),
    filterValueGetter: (p) => (p.data?.isActive ? 'Active' : 'Inactive'),
  },
  {
    headerName: 'Skills',
    field: 'skills',
    width: 320,
    cellRenderer: SkillsCell,
    cellDataType: false,
    valueFormatter: (p: ValueFormatterParams<Employee, string[]>) => p.value?.join(', ') ?? '',
    filter: 'agTextColumnFilter',
    filterValueGetter: (p) => p.data?.skills.join(', ') ?? '',
    getQuickFilterText: (p) => (p.value as string[] | undefined)?.join(' ') ?? '',
    comparator: (a: string[] = [], b: string[] = []) => a.join(', ').localeCompare(b.join(', ')),
    tooltipValueGetter: (p) => (p.value as string[] | undefined)?.join(', ') ?? '',
  },
]
