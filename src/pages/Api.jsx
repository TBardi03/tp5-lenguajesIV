import { useEffect, useMemo, useState } from "react";
import "./api.css";

export default function Api() {
  const [countries, setCountries] = useState([]);
  const [rates, setRates] = useState({});
  const [base, setBase] = useState("EUR"); // podés dejar "USD" o "ARS" si querés
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState("");

  // Países + moneda
  useEffect(() => {
    const url =
      "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,currencies";
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Error al obtener países");
        return r.json();
      })
      .then((d) => {
        const sorted = d.sort((a, b) =>
          (a?.name?.common || "").localeCompare(b?.name?.common || "")
        );
        setCountries(sorted);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Tipos de cambio (con fallback)
  useEffect(() => {
    (async () => {
      try {
        const r1 = await fetch(
          `https://api.exchangerate.host/latest?base=${base}`
        );
        const j1 = await r1.json();
        if (j1 && j1.rates) {
          setRates(j1.rates);
          return;
        }
        throw new Error("sin rates");
      } catch {
        try {
          const r2 = await fetch(`https://open.er-api.com/v6/latest/${base}`);
          const j2 = await r2.json();
          if (j2 && j2.rates) {
            setRates(j2.rates);
            return;
          }
          setRates({});
        } catch {
          setRates({});
        }
      }
    })();
  }, [base]);

  // Filtro por texto
  const data = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return countries;
    return countries.filter(
      (c) =>
        (c?.name?.common || "").toLowerCase().includes(term) ||
        ((c?.capital?.[0] || "").toLowerCase().includes(term)) ||
        ((c?.region || "").toLowerCase().includes(term))
    );
  }, [countries, q]);

  const fmt = (x) =>
    typeof x === "number"
      ? x.toLocaleString("es-AR", { maximumFractionDigits: 3 })
      : "—";

  if (loading) return <main className="container section"><p>Cargando datos…</p></main>;
  if (err)     return <main className="container section"><p>Error: {err}</p></main>;

  return (
    <main className="container section api">
      <h1>API</h1>
      <p className="intro">
        Rest Countries (bandera, nombre, capital, región, <u>moneda</u>) + tipos de cambio
        ({base}) sin API key.
      </p>

      <div className="toolbar">
        <input
          className="input"
          placeholder="Buscar por país, capital o región…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="input base"
          value={base}
          onChange={(e) => setBase(e.target.value)}
        >
          <option value="EUR">Base: EUR</option>
          <option value="USD">Base: USD</option>
          <option value="ARS">Base: ARS</option>
        </select>
      </div>

      <div className="grid">
        {data.map((c) => {
          const name = c?.name?.common ?? "—";
          const capital = c?.capital?.[0] ?? "—";
          const region = c?.region ?? "—";
          const curEntry = c?.currencies ? Object.entries(c.currencies)[0] : null;
          const code = curEntry?.[0] ?? "—";
          const curName = curEntry?.[1]?.name ?? "—";
          const symbol = curEntry?.[1]?.symbol ?? "";
          const flag = c?.flags?.svg || c?.flags?.png;

          // 1 BASE = rate CODE (si CODE === BASE -> 1)
          let rate =
            code === base
              ? 1
              : typeof rates?.[code] === "number"
              ? rates[code]
              : undefined;

          return (
            <article key={name + code} className="card">
              {flag && <img src={flag} alt={`Bandera de ${name}`} loading="lazy" />}
              <div className="body">
                <h2>{name}</h2>

                <p className="kvs"><span>Capital:</span> {capital}</p>
                <p className="kvs"><span>Región:</span> {region}</p>
                <p className="kvs">
                  <span>Moneda:</span> {symbol ? `${symbol} ` : ""}{code} — {curName}
                </p>

                <div className="meta">
                  <span>1 {base} =</span>
                  <strong>{fmt(rate)} {code}</strong>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}