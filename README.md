# Employee Dashboard

A client-side dashboard built with AG Grid and React for the FactWise frontend assignment.

Live demo: https://factwise-employee-dashboard-mu.vercel.app/

## Running it

```bash
npm install
npm run dev
```

## Stack

React 19, TypeScript, Vite, AG Grid Community 36 (client-side row model), Tailwind CSS 4.

No component library and no state management library — the grid API is the source of truth
for anything derived from the table.

## Features

The supplied 20-row dataset loads unchanged from `src/data/employees.json` into 13 columns.

- Sorting and per-column filters (text, number, date depending on the field)
- Quick search across all columns, including inside the skills array
- Column resize, reorder, pin and show/hide
- Pagination, row selection, CSV export that respects active filters
- Four KPI cards that recalculate from the filtered rows, not the raw data


