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
      console.log('Consultando OpenAI con evento:', evento);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `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`  // Reemplaza con tu API Key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',  // Usamos el modelo GPT-3.5-turbo, o 'gpt-4' si prefieres GPT-4
          messages: [
            {
              role: 'system',
              content: `Eres un asistente experto en sugerir productos para eventos. Debes sugerir productos de conveniencia como cervezas, licores, hielos, y botanas para eventos.`
            },
            { role: 'user', content: `Sugerir productos para el siguiente evento: ${evento}` }
          ],
          temperature: 0.7
        })
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Respuesta de OpenAI:', data);

      if (data.choices?.[0]?.message?.content) {
        setSugerencia(data.choices[0].message.content.trim());
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