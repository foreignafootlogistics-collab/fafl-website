"use client";
import * as React from "react";

type EstimateResult = { grand_total: number };

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
if (!API) throw new Error("NEXT_PUBLIC_API_URL is not set");

export default function CalculatorPreview() {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState("");
  const [invoiceUsd, setInvoiceUsd] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [total, setTotal] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setError(null);
        const res = await fetch(`${API}/public-api/categories`, { cache: "no-store" });
        if (!res.ok) throw new Error((await res.text()).slice(0, 160));
        const data = await res.json();
        if (data?.ok && Array.isArray(data.categories)) {
          setCategories(data.categories);
          setCategory(data.categories[0] || "");
        } else {
          throw new Error(data?.error || "Failed to load categories");
        }
      } catch (e: any) {
        setError(String(e?.message || e));
      }
    })();
  }, []);

  const toNum = (s: string) => {
    const v = Number((s || "").replace(/,/g, ""));
    return Number.isFinite(v) ? v : 0;
  };

  const onEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTotal(null);
    setLoading(true);

    try {
      const res = await fetch(`${API}/public-api/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          invoice_usd: toNum(invoiceUsd),
          weight: toNum(weight),
        }),
      });

      const ct = res.headers.get("content-type") || "";
      if (!res.ok) throw new Error((await res.text()).slice(0, 160));
      if (!ct.includes("application/json")) throw new Error(`Expected JSON, got ${ct}`);

      const data = await res.json();
      if (!data?.ok) throw new Error(data?.error || "Estimate failed");

      setTotal(Number(data.result?.grand_total ?? 0));
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onEstimate} className="rounded-2xl border border-gray-100 p-6 shadow-sm bg-white">
      <div className="text-xs tracking-widest text-gray-500 mb-4">CALCULATOR PREVIEW</div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Declared Value (USD)</label>
          <input
            value={invoiceUsd}
            onChange={(e) => setInvoiceUsd(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
            placeholder="e.g. 120"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Weight (lb)</label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
            placeholder="e.g. 3.5"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-gray-600">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl px-4 py-2 text-white"
            style={{ backgroundColor: "#4A148C", opacity: loading ? 0.85 : 1 }}
          >
            {loading ? "Estimating..." : "Estimate"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        Estimated Total: <strong>{total == null ? "JMD —" : `JMD ${total.toLocaleString()}`}</strong>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
