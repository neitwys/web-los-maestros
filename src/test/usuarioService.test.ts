import { describe, it, expect, beforeEach } from 'vitest';
import {
  normalizarRun,
  obtenerUsuarios,
  obtenerUsuarioPorRun,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  reiniciarUsuarios,
} from '../services/usuarioService';
import type { Usuario } from '../data/usuariosData';

describe('Pruebas unitarias para usuarioService', () => {
  beforeEach(() => {
    reiniciarUsuarios();
  });

  describe('normalizarRun', () => {
    it('Limpia puntos, guiones y convierte la K a mayúscula', () => {
      expect(normalizarRun('12.345.678-k')).toBe('12345678K');
      expect(normalizarRun('11.111.111-1')).toBe('111111111');
      expect(normalizarRun('  9.876.543-K ')).toBe('9876543K');
    });
  });


  describe('obtenerUsuarios', () => {
    it('Devuelve la lista inicial de usuarios', () => {
      const lista = obtenerUsuarios();
      expect(Array.isArray(lista)).toBe(true);
      expect(lista.length).toBeGreaterThan(0);
      expect(lista[0].run).toBe('111111111');
    });

    it('Devuelve una copia sin permitir mutación directa del arreglo interno', () => {
      const copia1 = obtenerUsuarios();
      copia1.pop();
      const copia2 = obtenerUsuarios();
      expect(copia2.length).toBeGreaterThan(copia1.length);
    });
  });


  describe('obtenerUsuarioPorRun', () => {
    it('Encuentra un usuario por su RUN con o sin formato', () => {
      const u1 = obtenerUsuarioPorRun('111111111');
      expect(u1).toBeDefined();
      expect(u1?.nombre).toBe('Admin');

      const u2 = obtenerUsuarioPorRun('12.345.678-5');
      expect(u2).toBeDefined();
      expect(u2?.nombre).toBe('Juan');
    });

    it('Devuelve undefined si el RUN no existe', () => {
      const resultado = obtenerUsuarioPorRun('99.999.999-9');
      expect(resultado).toBeUndefined();
    });
  });


  describe('crearUsuario', () => {
    const nuevoUsuario: Usuario = {
      run: '18.765.432-1',
      nombre: 'Carlos',
      apellidos: 'Gómez',
      correo: 'carlos@ejemplo.cl',
      rol: 'Cliente',
      region: 'Región de Valparaíso',
      comuna: 'Viña del Mar',
      direccion: 'Av. Libertad 456',
    };

    it('Crea un usuario correctamente guardando el RUN normalizado', () => {
      const creado = crearUsuario(nuevoUsuario);

      expect(creado.run).toBe('187654321');
      expect(creado.nombre).toBe('Carlos');

      const buscado = obtenerUsuarioPorRun('18.765.432-1');
      expect(buscado).toBeDefined();
      expect(buscado?.correo).toBe('carlos@ejemplo.cl');
    });

    it('Lanza un error si se intenta registrar un usuario con un RUN existente', () => {
      expect(() => {
        crearUsuario({
          ...nuevoUsuario,
          run: '11.111.111-1', 
        });
      }).toThrow('Ya existe un usuario con ese RUN.');
    });
  });

  
  describe('actualizarUsuario', () => {
    it('Actualiza correctamente los campos de un usuario existente', () => {
      const actualizado = actualizarUsuario('123456785', {
        nombre: 'Juan Carlos',
        direccion: 'Nueva Dirección 789',
      });

      expect(actualizado).toBeDefined();
      expect(actualizado?.nombre).toBe('Juan Carlos');
      expect(actualizado?.direccion).toBe('Nueva Dirección 789');

      const guardado = obtenerUsuarioPorRun('123456785');
      expect(guardado?.nombre).toBe('Juan Carlos');
    });

    it('Devuelve undefined si el usuario a actualizar no existe', () => {
      const resultado = actualizarUsuario('999999999', { nombre: 'Nadie' });
      expect(resultado).toBeUndefined();
    });
  });

  
  describe('eliminarUsuario', () => {
    it('Elimina un usuario existente y devuelve true', () => {
      const exito = eliminarUsuario('12.345.678-5');
      expect(exito).toBe(true);

      expect(obtenerUsuarioPorRun('123456785')).toBeUndefined();
    });

    it('Devuelve false si se intenta eliminar un RUN que no existe', () => {
      const exito = eliminarUsuario('99.999.999-9');
      expect(exito).toBe(false);
    });
  });

 
  describe('reiniciarUsuarios', () => {
    it('Restaura los usuarios a su estado original', () => {
      eliminarUsuario('111111111');
      expect(obtenerUsuarioPorRun('111111111')).toBeUndefined();

      reiniciarUsuarios();
      expect(obtenerUsuarioPorRun('111111111')).toBeDefined();
    });
  });
});