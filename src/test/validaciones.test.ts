import { describe, expect, it } from 'vitest';
import { errorClave, errorRun } from '../utils/validaciones';

describe('Validaciones del registro', () => {
  it('Acepta un RUN chileno con dígito verificador correcto y rechaza uno falso', () => {
    expect(errorRun('12.345.678-5')).toBe('');
    expect(errorRun('12345678-9')).toBe('Ingresa un RUN chileno válido (ej: 12345678-K).');
  });

  it('Exige una contraseña de 6 a 50 caracteres', () => {
    expect(errorClave('12345')).toBe('La contraseña debe tener entre 6 y 50 caracteres.');
    expect(errorClave('123456')).toBe('');
    expect(errorClave('a'.repeat(51))).toBe('La contraseña debe tener entre 6 y 50 caracteres.');
  });
});
