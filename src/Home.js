import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Roby Asistencia 1.0</h1>
      <h2>¿En qué te podemos ayudar hoy?</h2>

      <div style={{ marginTop: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        
        {/* Botón normal (sin navegación aún) */}
        <button style={{ width: '250px', padding: '10px', fontSize: '18px' }}>
          Productos
        </button>

        {/* Botón normal */}
        <button style={{ width: '250px', padding: '10px', fontSize: '18px' }}>
          Promociones activas
        </button>

        {/* Botón normal */}
        <button style={{ width: '250px', padding: '10px', fontSize: '18px' }}>
          Políticas y procedimientos
        </button>

        {/* BOTÓN CON NAVEGACIÓN A SUGERENCIAS */}
        <Link to="/sugerencias" style={{ textDecoration: 'none' }}>
          <button style={{ width: '250px', padding: '10px', fontSize: '18px' }}>
            Sugerencias de compra
          </button>
        </Link>

        {/* Botón normal */}
        <button style={{ width: '250px', padding: '10px', fontSize: '18px' }}>
          Resolución de problemas
        </button>

      </div>
    </div>
  );
}

export default Home;
