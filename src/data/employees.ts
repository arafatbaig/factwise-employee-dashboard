import type { Employee } from '../types/employee'
import raw from './employees.json'

export const seedEmployees = raw.employees as Employee[]

export const DATASET_SIZES = [20, 1000, 10000, 50000] as const

export type DatasetSize = (typeof DATASET_SIZES)[number]

export function buildDataset(size: number): Employee[] {
  if (size <= seedEmployees.length) {
    return seedEmployees.slice(0, size)
  }

  const rows: Employee[] = new Array(size)

  for (let i = 0; i < size; i++) {
    const seed = seedEmployees[i % seedEmployees.length]

    if (i < seedEmployees.length) {
      rows[i] = seed
      continue
    }

    const copy = Math.floor(i / seedEmployees.length)

    rows[i] = {
      ...seed,
      id: i + 1,
      email: seed.email.replace('@', `${copy}@`),
      salary: seed.salary + ((i * 137) % 20) * 500 - 5000,
      age: clamp(seed.age + ((i * 31) % 13) - 6, 21, 64),
      performanceRating: round1(clamp(seed.performanceRating + (((i * 7) % 11) - 5) / 10, 2.5, 5)),
      projectsCompleted: Math.max(0, seed.projectsCompleted + ((i * 17) % 15) - 7),
      hireDate: shiftDate(seed.hireDate, ((i * 53) % 1500) - 750),
      isActive: i % 11 !== 0,
    }
  }

  return rows
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function round1(value: number) {
  return Math.round(value * 10) / 10
}

function shiftDate(date: string, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}
