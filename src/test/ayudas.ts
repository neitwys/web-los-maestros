export function crearToken(segundosDeVida: number): string {
  const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + segundosDeVida }));
  return `cabecera.${payload}.firma`;
}
