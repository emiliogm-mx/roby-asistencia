import React, { useState } from 'react';

function SugerenciasCompra() {
  const [evento, setEvento] = useState('');
  const [sugerencia, setSugerencia] = useState('');

  const manejarConsulta = () => {
    // Aquí más adelante conectaremos con OpenAI
    if (evento.toLowerCase().includes('cumpleaños')) {
      setSugerencia('Para un cumpleaños, te recomendamos: cerveza variada, hielos, botanas saladas y algunos vinos espumosos.');
    } else if (evento.toLowerCase().includes('playa')) {
      setSugerencia('Para un evento en la playa, considera cervezas ligeras, hielos extra y bebidas refrescantes como vodka y agua mineral.');
    } else {
      setSugerencia('Por favor proporciona más detalles sobre tu evento para ofrecerte una mejor sugerencia.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Sugerencias de Compra</h1>
      <p>Describe brevemente tu evento:</p>
      <input
        type="text"
        value={evento}
        onChange={(e) => setEvento(e.target.value)}
        placeholder="Ejemplo: Fiesta de cumpleaños, evento en la playa, etc."
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
      />
      <br /><br />
      <button onClick={manejarConsulta} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Obtener sugerencia
      </button>
      <br /><br />
      {sugerencia && (
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
          <strong>Recomendación:</strong> <br /> {sugerencia}
        </div>
      )}
    </div>
  );
}

export default SugerenciasCompra;
