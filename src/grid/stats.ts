import type { GridApi } from 'ag-grid-community'
import type { Employee } from '../types/employee'

export interface Stats {
  headcount: number
  avgSalary: number
  projects: number
  active: number
}

export const emptyStats: Stats = { headcount: 0, avgSalary: 0, projects: 0, active: 0 }

export function readStats(api: GridApi<Employee>): Stats {
  let headcount = 0
  let salary = 0
  let projects = 0
  let active = 0

  api.forEachNodeAfterFilter((node) => {
    const row = node.data
    if (!row) return
    headcount++
    salary += row.salary
    projects += row.projectsCompleted
    if (row.isActive) active++
  })

  if (!headcount) return emptyStats

  return {
    headcount,
    avgSalary: Math.round(salary / headcount),
    projects,
    active,
  }
}
