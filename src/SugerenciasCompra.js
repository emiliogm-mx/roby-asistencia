import React, { useState, useEffect } from 'react';

function SugerenciasCompra() {
  const [evento, setEvento] = useState('');
  const [sugerencia, setSugerencia] = useState('');
  const [cargando, setCargando] = useState(false);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  // Función para obtener los productos desde el archivo JSON en src/data
  const obtenerProductos = async () => {
    try {
      // Cargar el archivo JSON desde la carpeta 'src/data'
      const response = await fetch('/data/productos.json');
      const data = await response.json(); // Suponiendo que la respuesta es un JSON
      const productos = data.map(item => item.nombre_producto); // Ajusta según la estructura del JSON
      setProductosDisponibles(productos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setProductosDisponibles([]);
    }
  };

  // Cargar los productos al cargar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

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
          'Authorization': `Bearer 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`  // Asegúrate de reemplazar con tu API Key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Eres un asistente experto en sugerir productos para eventos, reuniones, fiestas o compras de momento. Solo puedes recomendar los siguientes productos disponibles en Roby: ${productosDisponibles.join(', ')}. No puedes sugerir productos fuera de esta lista.`
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
