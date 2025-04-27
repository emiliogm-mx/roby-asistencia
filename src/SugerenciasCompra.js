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
      console.log('Consultando OpenAI con evento:', evento);  // Log de la consulta

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`  // Reemplaza con tu API Key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',  // O 'gpt-4' si prefieres el modelo GPT-4
          messages: [
            { role: 'system', content: 'Eres un asistente experto en organización de eventos y sugerencia de productos de conveniencia como cervezas, botanas, hielos y licores.' },
            { role: 'user', content: `Sugerir productos para: ${evento}` }
          ],
          temperature: 0.7
        })
      });

      console.log('Response status:', response.status);  // Log del estado de la respuesta

      const data = await response.json();
      console.log('Respuesta de OpenAI:', data);  // Log de la respuesta completa

      if (data.choices?.[0]?.message?.content) {
        setSugerencia(data.choices[0].message.content.trim());
      } else {
        setSugerencia('No se pudo obtener una sugerencia. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al consultar OpenAI:', error);  // Log del error
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
