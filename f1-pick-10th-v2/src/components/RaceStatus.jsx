export default function RaceStatus() {
  return (
    <section className="panel race-status-panel" id="race">
      <div className="panel-header">
        <p className="eyebrow">Race Weekend</p>
        <h2>Status Center</h2>
      </div>
      <div className="status-grid">
        <div><span>Backend</span><strong>Connected-ready</strong></div>
        <div><span>Picks</span><strong>Manual lock</strong></div>
        <div><span>Scoring</span><strong>Spreadsheet live</strong></div>
      </div>
    </section>
  );
}
