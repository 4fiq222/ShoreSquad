// 1. Weather Forecast Fetch
async function fetchWeatherForecast() {
  const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=1.381497&longitude=103.955574&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FSingapore');
  const data = await res.json();
  const daily = data.daily;

  const container = document.getElementById('weather-container');
  container.innerHTML = ''; // Clear existing

  for (let i = 0; i < 4; i++) {
    const day = document.createElement('div');
    day.className = 'weather-card';
    day.innerHTML = `
      <h4>${daily.time[i]}</h4>
      <p>Max: ${daily.temperature_2m_max[i]}°C</p>
      <p>Min: ${daily.temperature_2m_min[i]}°C</p>
      <p>Rain: ${daily.precipitation_sum[i]} mm</p>
    `;
    container.appendChild(day);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherForecast();

  // 2. Event Filter Logic
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.cleanup-card');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.textContent.trim();

      cards.forEach(card => {
        card.style.display = 'block'; // Show all by default

        const tag = card.querySelector('.tag')?.textContent.trim().toLowerCase();
        const cardText = card.textContent;
        const dateMatch = cardText.match(/\d+\s+Jun/);

        if (filter === 'This Weekend') {
          if (!dateMatch || !['08 Jun', '09 Jun'].includes(dateMatch[0])) {
            card.style.display = 'none';
          }
        } else if (filter === 'Beginner Friendly') {
          if (tag !== 'beginner') {
            card.style.display = 'none';
          }
        } else if (filter === 'Near Me') {
          if (!cardText.includes('Santa Monica')) {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});


