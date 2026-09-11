export type ColorMode = 'light' | 'dark'

const STORAGE_KEY = 'dashboard-color-mode'

export function readStoredMode(): ColorMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // storage can be unavailable in private windows
  }
  return 'light'
}

export function applyMode(mode: ColorMode) {
  document.documentElement.classList.toggle('dark', mode === 'dark')
  document.documentElement.dataset.agThemeMode = mode
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // ignore
  }
}
