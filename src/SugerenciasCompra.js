import React, { useState } from 'react';

function SugerenciasCompra() {
  const [evento, setEvento] = useState('');
  const [sugerencia, setSugerencia] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarConsulta = async () => {
    if (!evento.trim()) {
      setSugerencia('Por favor describe tu evento para ofrecerte una sugerencia.');
      return;
    }

    setCargando(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `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`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Eres un asistente experto en organización de eventos y sugerencia de productos de conveniencia como cervezas, botanas, hielos y licores.' },
            { role: 'user', content: `¿Qué me recomiendas comprar para este evento?: ${evento}` }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();
      const respuestaAI = data.choices?.[0]?.message?.content;

      if (respuestaAI) {
        setSugerencia(respuestaAI.trim());
      } else {
        setSugerencia('No se pudo obtener una sugerencia. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al consultar OpenAI:', error);
      setSugerencia('Ocurrió un error al obtener la sugerencia.');
    }

    setCargando(false);
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
        {cargando ? 'Consultando...' : 'Obtener sugerencia'}
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
