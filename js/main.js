import { db } from './firebase.js';

// Mapa
const map = L.map('map').setView([40.4168, -3.7038], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Formulario
document.getElementById('buildingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('buildingName').value;
  const technique = document.getElementById('coolingTechnique').value;
  
  // Obtener ubicación aproximada (simulada)
  const center = map.getCenter();
  const location = [center.lat, center.lng];
  
  // Guardar en Firebase
  try {
    await db.collection('buildings').add({
      name,
      technique,
      location,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("¡Edificio registrado!");
  } catch (error) {
    console.error("Error al guardar:", error);
  }
});

// Cargar edificios desde Firebase
db.collection('buildings').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      const data = change.doc.data();
      L.marker(data.location)
        .addTo(map)
        .bindPopup(`
          <b>${data.name}</b><br>
          Técnica: ${data.technique.replace('_', ' ')}
        `);
    }
  });
});

// Clima con OpenWeatherMap
fetch('https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=TU_API_KEY&lang=es')
  .then(response => response.json())
  .then(data => {
    const weatherCard = document.getElementById('weatherCard');
    const weatherText = document.getElementById('weatherText');
    
    weatherText.innerHTML = `
      Temperatura: <b>${(data.main.temp - 273.15).toFixed(1)}°C</b><br>
      Humedad: <b>${data.main.humidity}%</b><br>
      ${data.weather[0].description}
    `;
    weatherCard.classList.remove('hidden');
  });
