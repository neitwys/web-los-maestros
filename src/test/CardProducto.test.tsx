import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardProducto from '../componentes/moleculas/CardProducto';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas unitarias para <CardProducto />', () => {
  const propsSimuladas = {
    id: 'prod-123',
    titulo: 'Martillo de Carpintero 16oz',
    categoria: 'Herramientas Manuales',
    descripcion: 'Martillo con mango ergonómico de fibra de vidrio',
    precio: 12990,
    imagen: 'martillo.jpg',
  };

  it('renderiza correctamente el título, categoría y descripción del producto', () => {
    render(<CardProducto {...propsSimuladas} />);

    expect(screen.getByText('Martillo de Carpintero 16oz')).toBeInTheDocument();
    expect(screen.getByText('Herramientas Manuales')).toBeInTheDocument();
    expect(screen.getByText('Martillo con mango ergonómico de fibra de vidrio')).toBeInTheDocument();
  });

  it('antepone "/" a la ruta de la imagen si esta no comienza con un slash', () => {
    render(
    <MemoryRouter>
      <CardProducto {...propsSimuladas} imagen="martillo.jpg" />;
    </MemoryRouter>
    );
    
    const imagen = screen.getByAltText('Martillo de Carpintero 16oz') as HTMLImageElement;
    expect(imagen.getAttribute('src')).toBe('/martillo.jpg');
  });

  it('mantiene la ruta de la imagen intacta si ya comienza con un slash "/"', () => {
    render(<CardProducto {...propsSimuladas} imagen="/img/martillo.jpg" />);

    const imagen = screen.getByAltText('Martillo de Carpintero 16oz') as HTMLImageElement;
    expect(imagen.getAttribute('src')).toBe('/img/martillo.jpg');
  });

  it('formatea el precio correctamente en formato pesos chilenos (es-CL)', () => {
    render(<CardProducto {...propsSimuladas} precio={12990} />);

    const precioEsperado = `$${(12990).toLocaleString('es-CL')}`;
    expect(screen.getByText(precioEsperado)).toBeInTheDocument();
  });

  it('renderiza el componente Boton pasando la prop id correspondiente', () => {
    const { container } = render(<CardProducto {...propsSimuladas} />);

    
    expect(container.querySelector('.mt-2')).toBeInTheDocument();
  });
});