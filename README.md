# Employee Dashboard

A client-side dashboard built with AG Grid and React for the FactWise frontend assignment.

Live demo: _add link after deploying_

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

## Notes

Four fields needed more than a plain column definition. `hireDate` is a string, so it gets a
`valueGetter` returning a `Date` for correct sorting and date filtering. `skills` is an array,
so it needs a renderer plus flattened text for search and filtering. `manager` is null for
department heads. `salary` is formatted through `valueFormatter` only, so the value stays
numeric and the number filter still works.

The brief asks for large data sets but supplies 20 rows, so the toolbar has a row-count
selector (20 / 1,000 / 10,000 / 50,000). The first 20 rows are always the original records.
At 50,000 rows the grid keeps 22 row elements in the DOM and search stays at ~16ms per
keystroke — it is debounced and `cacheQuickFilter` is on, without which it cost ~140ms.
Grid config objects are module-level constants so their identity is stable across renders,
and only the AG Grid modules actually used are registered.

Row grouping, the Set Filter and Excel export are Enterprise features. They would suit this
dataset but show a watermark without a licence, so they were left out.
