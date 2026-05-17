import { CloudSun, ThermometerSun, Wind } from "lucide-react";

function weatherLabel(item) {
  return item.summary || item.condition || item.forecast || item.weather || "Forecast pending";
}

export default function WeatherPanel({ weather = [], dashboard = {} }) {
  const rows = Array.isArray(weather) ? weather.slice(0, 4) : [];

  return (
    <section className="panel" id="weather">
      <div className="panel-header">
        <p className="eyebrow">Race Forecast</p>
        <h2>Weather</h2>
      </div>

      <div className="weather-hero">
        <CloudSun size={34} />
        <div>
          <strong>{dashboard.weatherSummary || weatherLabel(rows[0] || {})}</strong>
          <span>Live forecast panel</span>
        </div>
      </div>

      <div className="weather-list">
        {rows.length === 0 ? (
          <div className="empty-state compact">Forecast rows will appear after the backend sends weather data.</div>
        ) : rows.map((item, index) => (
          <article className="weather-row" key={`${item.day || item.date || index}`}>
            <strong>{item.day || item.date || `Forecast ${index + 1}`}</strong>
            <span><ThermometerSun size={14} /> {item.temp || item.temperature || item.high || "TBD"}</span>
            <span><Wind size={14} /> {item.wind || item.windSpeed || "Wind TBD"}</span>
            <em>{weatherLabel(item)}</em>
          </article>
        ))}
      </div>
    </section>
  );
}
