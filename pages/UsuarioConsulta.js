import { useState, useEffect } from 'react';

const UsuarioConsulta = () => {
  
  const [usuarios, setUsuarios] = useState([]);
  const [modifyingUserId, setModifyingUserId] = useState(null);
  const [modifiedUserData, setModifiedUserData] = useState({
    id: null,
    nombre: '',
    fechaNacimiento: '',
    sexo: '',
  });

  // Consultar Usuarios
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleModificar = (id) => {
    setModifyingUserId(id);
    const userToModify = usuarios.find((user) => user.id === id);
    setModifiedUserData({
      id: userToModify.id,
      nombre: userToModify.nombre,
      fechaNacimiento: userToModify.fechaNacimiento,
      sexo: userToModify.sexo,
    });
  };

  const handleEliminar = (id) => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert(`Usuario con ID ${id} eliminado`);
          setUsuarios(usuarios.filter((user) => user.id !== id));
        } else {
          alert('Error al eliminar el usuario');
        }
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleUpdateUser = () => {
    // Validación de campos vacíos
    if (!modifiedUserData.nombre || !modifiedUserData.fechaNacimiento || !modifiedUserData.sexo) {
      alert('Por favor completa todos los campos');
      return;
    }

    fetch(`http://localhost:3001/users/${modifiedUserData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedUserData),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        alert(`Usuario modificado`);
        setUsuarios(usuarios.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setModifyingUserId(null);
        setModifiedUserData({
          id: null,
          nombre: '',
          fechaNacimiento: '',
          sexo: '',
        });
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#abcdef', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {modifyingUserId ? (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Modificar Usuario</h2>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                value={modifiedUserData.nombre}
                onChange={(e) => setModifiedUserData({ ...modifiedUserData, nombre: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fechaNacimiento"
                value={modifiedUserData.fechaNacimiento}
                onChange={(e) => setModifiedUserData({ ...modifiedUserData, fechaNacimiento: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="sexo">Sexo:</label>
              <select
                id="sexo"
                value={modifiedUserData.sexo}
                onChange={(e) => setModifiedUserData({ ...modifiedUserData, sexo: e.target.value })}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <button onClick={handleUpdateUser}>Guardar cambios</button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Registros</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
                  <tr>
                    <th style={{ padding: '0.75rem', textTransform: 'uppercase', fontSize: '0.75rem', color: '#777', textAlign: 'left' }}>Nombre</th>
                    <th style={{ padding: '0.75rem', textTransform: 'uppercase', fontSize: '0.75rem', color: '#777', textAlign: 'left' }}>Fecha de Nacimiento</th>
                    <th style={{ padding: '0.75rem', textTransform: 'uppercase', fontSize: '0.75rem', color: '#777', textAlign: 'left' }}>Sexo</th>
                    <th style={{ padding: '0.75rem', textTransform: 'uppercase', fontSize: '0.75rem', color: '#777', textAlign: 'left' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff' }}>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>{usuario.nombre}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>{usuario.fechaNacimiento}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>{usuario.sexo}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>
                        <button onClick={() => handleModificar(usuario.id)} style={{ backgroundColor: '#007bff', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', border: 'none', marginRight: '0.5rem' }}>
                          Modificar
                        </button>
                        <button onClick={() => handleEliminar(usuario.id)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', border: 'none' }}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsuarioConsulta;
