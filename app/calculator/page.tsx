"use client";

import * as React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

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

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

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
        const res = await fetch(`${API}/public-api/categories`, { cache: "no-store" });
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

  const fmtJmd = (n: number) =>
    new Intl.NumberFormat("en-JM", { maximumFractionDigits: 0 }).format(n || 0);

  const fmtUsd = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n || 0);

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

      const res = await fetch(`${API}/public-api/estimate`, {
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

  // Examples (formerly Quick Tests)
  const quick = (v: { usd: number; lb: number; cat?: string }) => {
    setInvoiceUsd(String(v.usd));
    setWeight(String(v.lb));
    if (v.cat) setCategory(v.cat);
    setEstimate(null);
    setError(null);
  };

  const hasInputs = toNum(invoiceUsd) > 0 && toNum(weight) > 0 && !!category;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-28 -left-40 h-[420px] w-[420px] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle at center, #4A148C 0%, transparent 65%)" }}
          />
          <div
            className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle at center, #FACC15 0%, transparent 65%)" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <span
            className="inline-flex items-center rounded-full px-4 py-1 text-sm font-semibold mb-4"
            style={{ backgroundColor: "#F3E8FF", color: "#4A148C" }}
          >
            Shipping Cost Preview
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Shipping Cost Calculator
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Preview your total shipping cost before you buy. This uses FAFL’s official calculation logic.
              </p>

              <div className="mt-6 flex gap-3 flex-wrap">
                <Link
                  href="/rates"
                  className="inline-flex items-center rounded-xl px-5 py-3 text-white shadow"
                  style={{ backgroundColor: "#4A148C" }}
                >
                  View Freight Rates
                </Link>

                <span className="inline-flex items-center text-sm text-gray-500">
                  Values shown in JMD unless marked
                </span>
              </div>
            </div>

            {/* Small helper card */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 w-full lg:w-[420px]">
              <div className="text-xs tracking-widest text-gray-500">HOW TO USE</div>
              <div className="mt-1 font-semibold">Enter value + weight</div>
              <p className="mt-2 text-sm text-gray-600">
                Use the invoice/checkout value (USD) and the package weight (lb). Select a category that best matches your item.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-3 items-start">
          {/* FORM */}
          <div className="lg:col-span-2 rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-sm bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs tracking-widest text-gray-500">CALCULATOR</div>
                <h2 className="mt-1 text-xl font-semibold">Enter your details</h2>
                <p className="mt-1 text-sm text-gray-600">
                  We’ll estimate freight + customs using the same rules used for invoices.
                </p>
              </div>

              <span
                className="hidden sm:inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: "#4A148C" }}
              >
                Official
              </span>
            </div>

            {/* Examples (moved up) */}
            <div className="mt-6">
              <div className="text-xs tracking-widest text-gray-500 mb-3">EXAMPLES</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => quick({ usd: 50, lb: 1.5, cat: "Clothing & Footwear" })}
                  className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm bg-white hover:border-gray-400"
                >
                  Clothes — $50, 1.5lb
                </button>

                <button
                  onClick={() => quick({ usd: 1200, lb: 5, cat: "Laptops / Computers" })}
                  className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm bg-white hover:border-gray-400"
                >
                  Laptop — $1200, 5lb
                </button>

                <button
                  onClick={() => quick({ usd: 300, lb: 2, cat: "Phones / Electronics" })}
                  className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm bg-white hover:border-gray-400"
                >
                  Cellphone — $300, 2lb
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="mt-7">
              <div className="text-xs tracking-widest text-gray-500 mb-3">ITEM DETAILS</div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Declared Value (USD)</label>
                  <input
                    value={invoiceUsd}
                    onChange={(e) => setInvoiceUsd(e.target.value)}
                    inputMode="decimal"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2"
                    placeholder="e.g. 120"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Use the value shown on your invoice/checkout receipt.
                  </p>
                </div>

                <div className="sm:row-span-2">
                  <label className="text-sm text-gray-600">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Pick the closest match to reduce duty surprises.
                  </p>
                </div>

                <div>
                  <div className="text-xs tracking-widest text-gray-500 mb-3 mt-1 sm:mt-0">
                    SHIPPING DETAILS
                  </div>
                  <label className="text-sm text-gray-600">Weight (lb)</label>
                  <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    inputMode="decimal"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2"
                    placeholder="e.g. 3.5"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Use the higher of actual or dimensional weight if provided.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center gap-3 flex-wrap">
                <button
                  onClick={onEstimate}
                  disabled={loading || !hasInputs}
                  className="rounded-xl px-6 py-3 text-white font-semibold shadow"
                  style={{
                    backgroundColor: "#4A148C",
                    opacity: loading || !hasInputs ? 0.65 : 1,
                  }}
                >
                  {loading ? "Calculating..." : "Calculate Shipping"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInvoiceUsd("");
                    setWeight("");
                    setEstimate(null);
                    setError(null);
                    // keep category as-is
                  }}
                  className="rounded-xl px-4 py-2.5 border border-gray-300 hover:border-gray-400 text-sm bg-white"
                >
                  Reset
                </button>

                <span className="text-sm text-gray-600">
                  Official FAFL calculation • Same logic used for invoices
                </span>
              </div>

              {error && (
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* RESULT */}
          <div className="rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-sm bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs tracking-widest text-gray-500">RESULT</div>
                <h2 className="mt-1 text-xl font-semibold">Your estimate</h2>
              </div>

              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: "#16A34A" }}
              >
                Live
              </span>
            </div>

            {!estimate && (
              <p className="mt-3 text-sm text-gray-600">
                Enter value, weight, and category, then click{" "}
                <span className="font-medium">Calculate Shipping</span>.
              </p>
            )}

            {estimate && (
              <div className="mt-5 space-y-4">
                {/* Big Total */}
                <div
                  className="rounded-2xl p-5 border shadow-sm"
                  style={{ borderColor: "#E9D5FF", backgroundColor: "#FAF5FF" }}
                >
                  <div className="text-xs tracking-widest text-gray-500">ESTIMATED TOTAL PAYABLE</div>
                  <div className="mt-2 text-3xl sm:text-4xl font-extrabold" style={{ color: "#4A148C" }}>
                    JMD {fmtJmd(estimate.grand_total)}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Based on {fmtUsd(toNum(invoiceUsd))} • {toNum(weight)} lb • {category}
                  </div>
                </div>

                {/* Totals */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <Row label="Customs Total" strong>
                    JMD {fmtJmd(estimate.customs_total)}
                  </Row>
                  <Row label="Freight Total" strong>
                    JMD {fmtJmd(estimate.freight_total)}
                  </Row>
                </div>

                {/* Breakdown */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <div className="text-xs tracking-widest text-gray-500 mb-3">BREAKDOWN</div>

                  <Row label="Base (JMD)">JMD {fmtJmd(estimate.base_jmd)}</Row>
                  <Row label="Duty">JMD {fmtJmd(estimate.duty)}</Row>
                  <Row label="SCF">JMD {fmtJmd(estimate.scf)}</Row>
                  <Row label="ENVL">JMD {fmtJmd(estimate.envl)}</Row>
                  <Row label="CAF">JMD {fmtJmd(estimate.caf)}</Row>
                  <Row label="GCT">JMD {fmtJmd(estimate.gct)}</Row>
                  <Row label="Stamp">JMD {fmtJmd(estimate.stamp)}</Row>

                  <div className="h-px bg-gray-200 my-3" />

                  <Row label="Freight">JMD {fmtJmd(estimate.freight)}</Row>
                  <Row label="Handling">JMD {fmtJmd(estimate.handling)}</Row>
                </div>

                {/* What next */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="font-semibold">What happens next?</div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Ship your item to your FAFL US address</li>
                    <li>• We receive & process, then generate your invoice</li>
                    <li>• Track everything inside your dashboard</li>
                  </ul>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    <a
                      href={(process.env.NEXT_PUBLIC_APP_URL || "https://app.faflcourier.com").replace(/\/+$/, "") + "/register"}
                      className="inline-flex items-center rounded-xl px-4 py-2 text-white text-sm font-semibold shadow"
                      style={{ backgroundColor: "#4A148C" }}
                    >
                      Create Free Account
                    </a>

                    <a
                      href={(process.env.NEXT_PUBLIC_APP_URL || "https://app.faflcourier.com").replace(/\/+$/, "") + "/login"}
                      className="inline-flex items-center rounded-xl px-4 py-2 border border-gray-300 hover:border-gray-400 text-sm bg-white"
                    >
                      Login
                    </a>

                    <Link
                      href="/rates"
                      className="inline-flex items-center rounded-xl px-4 py-2 border border-gray-300 hover:border-gray-400 text-sm bg-white"
                    >
                      View Rates
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Row({
  label,
  children,
  strong,
}: {
  label: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-600">{label}</span>
      <span className={strong ? "font-semibold" : ""}>{children}</span>
    </div>
  );
}

