// Datos de ejemplo (luego se reemplazarán con Firebase)
const ctx = document.getElementById('savingsChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Ventilación cruzada', 'Persianas', 'Techos verdes'],
    datasets: [{
      label: '% Reducción de AC',
      data: [25, 35, 50],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ]
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Porcentaje de ahorro'
        }
      }
    }
  }
});
