'use client' //

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const UsuarioFormulario = () => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [otroGenero, setOtroGenero] = useState('');
  const [showOtroGeneroInput, setShowOtroGeneroInput] = useState(false);
  const router = useRouter();

  const handleSexoChange = (e) => {
    const selectedSexo = e.target.value;
    setSexo(selectedSexo);

    if (selectedSexo === 'Otro') {
      setShowOtroGeneroInput(true);
    } else {
      setShowOtroGeneroInput(false);
      setOtroGenero('');
    }
  };

  const handleGuardar = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, fechaNacimiento, sexo, otroGenero }),
      });

      if (response.ok) {
        console.log('Usuario creado exitosamente');
        setNombre('');
        setFechaNacimiento('');
        setSexo('');
        setOtroGenero('');
      } else {
        console.error('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleNavigation = () => {
    router.push('/UsuarioConsulta');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#abcdef', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Formulario de Usuario</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="nombre" style={{ display: 'block' }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
            />
          </div>
          <div>
            <label htmlFor="fechaNacimiento" style={{ display: 'block' }}>Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
            />
          </div>
          <div>
            <label htmlFor="sexo" style={{ display: 'block' }}>Sexo:</label>
            <select
              id="sexo"
              value={sexo}
              onChange={handleSexoChange}
              style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
            >
              <option value="">Selecciona</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          {showOtroGeneroInput && (
            <div>
              <label htmlFor="otroGenero" style={{ display: 'block' }}>Otro Género:</label>
              <input
                type="text"
                id="otroGenero"
                value={otroGenero}
                onChange={(e) => setOtroGenero(e.target.value)}
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
              />
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={handleGuardar}
              style={{ backgroundColor: '#007bff', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', border: 'none' }}
            >
              Agregar
            </button>
            <button
              onClick={handleNavigation}
              style={{ backgroundColor: '#007bff', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', border: 'none' }}
            >
              Registros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuarioFormulario;
