"use client";
import * as React from "react";

type EstimateResult = {
  base_jmd: number;
  duty: number;
  scf: number;
  envl: number;
  caf: number;
  gct: number;
  stamp: number;
  customs_total: number;
  freight: number;
  handling: number;
  freight_total: number;
  grand_total: number;
};

const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}



export default function CalculatorPage() {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string>("");
  const [invoiceUsd, setInvoiceUsd] = React.useState<string>("");
  const [weight, setWeight] = React.useState<string>("");
  const [estimate, setEstimate] = React.useState<EstimateResult | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      setError(null);
      try {
        const res = await fetch(`${API}/api/categories`, { cache: "no-store" });
        const contentType = res.headers.get("content-type") || "";

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error ${res.status}: ${text.slice(0, 160)}`);
        }

        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Expected JSON but got ${contentType}. Body: ${text.slice(0, 160)}`);
        }

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

  const onEstimate = async () => {
    setError(null);
    setEstimate(null);
    setLoading(true);

    try {
      const payload = {
        category,
        invoice_usd: toNum(invoiceUsd),
        weight: toNum(weight),
      };

      const res = await fetch(`${API}/api/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text.slice(0, 160)}`);
      }

      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Expected JSON but got ${contentType}. Body: ${text.slice(0, 160)}`);
      }

      const data = await res.json();

      if (!data?.ok) throw new Error(data?.error || "Estimate failed");
      setEstimate(data.result as EstimateResult);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  };


  // Quick test buttons (smoke tests)
  const quick = (v: { usd: number; lb: number; cat?: string }) => {
    setInvoiceUsd(String(v.usd));
    setWeight(String(v.lb));
    if (v.cat) setCategory(v.cat);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Calculator</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Live estimate using FAFL’s official calculation. Values shown are in JMD unless marked.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 p-6 shadow-sm bg-white">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Declared Value (USD)</label>
                <input value={invoiceUsd} onChange={(e) => setInvoiceUsd(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" placeholder="e.g. 120" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Weight (lb)</label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" placeholder="e.g. 3.5" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2">
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2 flex items-end gap-3">
                <button onClick={onEstimate} disabled={loading} className="rounded-xl px-4 py-2 text-white" style={{ backgroundColor: "#4A148C", opacity: loading ? 0.8 : 1 }}>
                  {loading ? "Estimating..." : "Estimate"}
                </button>
                <div className="text-sm text-gray-600">Powered by FAFL engine</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Quick Tests</div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => quick({ usd: 50, lb: 1.5, cat: "Clothing & Footwear" })} className="rounded-xl border border-gray-300 px-3 py-1 text-sm">Clothes — $50, 1.5lb</button>
                <button onClick={() => quick({ usd: 1200, lb: 5, cat: "Laptops/Computers" })} className="rounded-xl border border-gray-300 px-3 py-1 text-sm">Laptop — $1200, 5lb</button>
                <button onClick={() => quick({ usd: 300, lb: 2, cat: "Cellphone" })} className="rounded-xl border border-gray-300 px-3 py-1 text-sm">Cellphone — $300, 2lb</button>
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          </div>

          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm bg-white">
            <h2 className="font-semibold">Estimate</h2>
            {!estimate && <p className="mt-2 text-sm text-gray-600">Fill the form and click Estimate.</p>}
            {estimate && (
              <div className="mt-4 space-y-2 text-sm">
                <Row label="Base (JMD)">{estimate.base_jmd.toLocaleString()}</Row>
                <Row label="Duty">{estimate.duty.toLocaleString()}</Row>
                <Row label="SCF">{estimate.scf.toLocaleString()}</Row>
                <Row label="ENVL">{estimate.envl.toLocaleString()}</Row>
                <Row label="CAF">{estimate.caf.toLocaleString()}</Row>
                <Row label="GCT">{estimate.gct.toLocaleString()}</Row>
                <Row label="Stamp">{estimate.stamp.toLocaleString()}</Row>
                <div className="h-px bg-gray-200 my-2" />
                <Row label="Customs Total" strong>{estimate.customs_total.toLocaleString()}</Row>
                <Row label="Freight">{estimate.freight.toLocaleString()}</Row>
                <Row label="Handling">{estimate.handling.toLocaleString()}</Row>
                <Row label="Freight Total" strong>{estimate.freight_total.toLocaleString()}</Row>
                <div className="h-px bg-gray-200 my-2" />
                <Row label="Grand Total" strong>{estimate.grand_total.toLocaleString()}</Row>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Row({ label, children, strong }: { label: string; children: React.ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={strong ? "font-semibold" : ""}>{children}</span>
    </div>
  );
}
