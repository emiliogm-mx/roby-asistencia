import React, { useState } from 'react';

function SugerenciasCompra() {
  const [evento, setEvento] = useState('');
  const [sugerencia, setSugerencia] = useState('');
  const [cargando, setCargando] = useState(false);

  // Lista de productos disponibles en Roby
  const productosDisponibles = [
    'Cerveza Heineken',
    'Cerveza Corona',
    'Tequila José Cuervo',
    'Ron Bacardi',
    'Vino Tinto',
    'Vodka Absolut',
    'Refrescos Coca-Cola',
    'Hielos',
    'Botanas saladas',
    'Papas fritas',
    'Nachos',
    'Frutos secos'
  ];

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
          'Authorization': `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`  // Asegúrate de reemplazar con tu API Key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Eres un asistente experto en sugerir productos para eventos. Solo puedes recomendar los siguientes productos disponibles en Roby: ${productosDisponibles.join(', ')}. No puedes sugerir productos fuera de esta lista.`
            },
            { role: 'user', content: `Sugerir productos para el siguiente evento: ${evento}` }
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