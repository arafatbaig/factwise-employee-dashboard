import type { ColorMode } from '../theme'

interface Props {
  mode: ColorMode
  onToggle: () => void
}

export default function ModeToggle({ mode, onToggle }: Props) {
  const dark = mode === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
    >
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
        {dark ? (
          <path
            d="M16 11.2A6.2 6.2 0 0 1 8.8 4a6.4 6.4 0 1 0 7.2 7.2Z"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <circle cx="10" cy="10" r="3.4" />
            <path d="M10 2.2v1.6M10 16.2v1.6M17.8 10h-1.6M3.8 10H2.2M15.5 4.5l-1.1 1.1M5.6 14.4l-1.1 1.1M15.5 15.5l-1.1-1.1M5.6 5.6 4.5 4.5" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  )
}
