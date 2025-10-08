import { useEffect, useMemo, useState } from "react";
import "./api.css";

export default function Api() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags";
    fetch(url)
      .then(r => { if (!r.ok) throw new Error("Error al obtener países"); return r.json(); })
      .then(d => {
        const sorted = d.sort((a, b) => (a?.name?.common || "").localeCompare(b?.name?.common || ""));
        setData(sorted);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter(c =>
      (c?.name?.common || "").toLowerCase().includes(term) ||
      ((c?.capital?.[0] || "").toLowerCase().includes(term)) ||
      ((c?.region || "").toLowerCase().includes(term))
    );
  }, [data, q]);

  if (loading) return <main className="container section"><p>Cargando datos…</p></main>;
  if (error)   return <main className="container section"><p>Error: {error}</p></main>;

  return (
    <main className="container section api">
      <h1>API</h1>
      <p className="intro">Datos obtenidos de una API pública (Rest Countries): bandera (imagen), nombre, capital, región y población.</p>

      <div className="toolbar">
        <input
          className="input"
          placeholder="Buscar por país, capital o región…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="grid">
        {filtered.map(c => {
          const name = c?.name?.common ?? "—";
          const capital = c?.capital?.[0] ?? "—";
          const region = c?.region ?? "—";
          const population = typeof c?.population === "number" ? c.population.toLocaleString("es-AR") : "—";
          const flag = c?.flags?.svg || c?.flags?.png;

          return (
            <article key={name} className="card">
              {flag && <img src={flag} alt={"Bandera de " + name} loading="lazy" />}
              <div className="body">
                <h2>{name}</h2>
                <p className="kvs"><span>Capital:</span> {capital}</p>
                <p className="kvs"><span>Región:</span> {region}</p>
                <div className="meta">
                  <span>Población</span>
                  <strong>{population}</strong>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
