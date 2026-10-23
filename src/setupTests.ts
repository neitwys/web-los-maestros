// Agrega los "matchers" de jest-dom a Vitest: toBeInTheDocument, toBeDisabled, toHaveValue, etc.
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Desmonta lo renderizado y limpia el localStorage después de cada prueba
afterEach(() => {
  cleanup()
  localStorage.clear()
})