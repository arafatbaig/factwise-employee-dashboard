import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  CellStyleModule,
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColumnApiModule,
  ColumnAutoSizeModule,
  CsvExportModule,
  LocaleModule,
  DateFilterModule,
  ModuleRegistry,
  NumberFilterModule,
  PaginationModule,
  QuickFilterModule,
  RenderApiModule,
  RowApiModule,
  RowSelectionModule,
  TextFilterModule,
  TooltipModule,
  ValidationModule,
} from 'ag-grid-community'
import './index.css'
import App from './App.tsx'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ClientSideRowModelApiModule,
  CellStyleModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  QuickFilterModule,
  PaginationModule,
  RowSelectionModule,
  CsvExportModule,
  ColumnApiModule,
  ColumnAutoSizeModule,
  LocaleModule,
  RowApiModule,
  RenderApiModule,
  TooltipModule,
  ...(import.meta.env.DEV ? [ValidationModule] : []),
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
