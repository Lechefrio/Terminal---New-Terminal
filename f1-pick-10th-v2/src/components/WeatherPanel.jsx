import { CalendarDays, CloudSun, ThermometerSun, Umbrella, Wind } from "lucide-react";

function weatherLabel(item) {
  return item.summary || item.condition || item.forecast || item.weather || "Forecast pending";
}

function temperatureLabel(item) {
  return item.temp || item.temperature || item.high || item.highLow || "Temp TBD";
}

function precipLabel(item) {
  return item.precip || item.precipitation || item.rainChance || item.chanceOfRain || "Rain TBD";
}

export default function WeatherPanel({ weather = [], dashboard = {} }) {
  const rows = Array.isArray(weather) ? weather.slice(0, 6) : [];

  return (
    <section className="panel" id="weather">
      <div className="panel-header split-header">
        <div>
          <p className="eyebrow">Race Forecast</p>
          <h2>Weather</h2>
        </div>
        <span className="soft-pill">{dashboard.nextRace || "Race weekend"}</span>
      </div>

      <div className="weather-hero">
        <CloudSun size={34} />
        <div>
          <strong>{dashboard.weatherSummary || weatherLabel(rows[0] || {})}</strong>
          <span>{dashboard.raceDate || "Race date pending"} · {dashboard.raceTime || dashboard.startTime || "Time TBD"}</span>
        </div>
      </div>

      <div className="weather-list">
        {rows.length === 0 ? (
          <div className="empty-state compact">Forecast rows will appear after the backend sends weather data.</div>
        ) : rows.map((item, index) => (
          <article className="weather-row" key={`${item.day || item.date || index}`}>
            <strong><CalendarDays size={15} /> {item.day || item.date || `Forecast ${index + 1}`}</strong>
            <span><ThermometerSun size={14} /> {temperatureLabel(item)}</span>
            <span><Umbrella size={14} /> {precipLabel(item)}</span>
            <span><Wind size={14} /> {item.wind || item.windSpeed || "Wind TBD"}</span>
            <em>{weatherLabel(item)}</em>
          </article>
        ))}
      </div>
    </section>
  );
}
