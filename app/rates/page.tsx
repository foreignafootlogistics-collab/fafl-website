"use client";

import * as React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

type RateBracket = {
  max_weight?: number;
  max_weight_lbs?: number;
  rate_jmd?: number;
  rate?: number;
};

type TabKey = "1-15" | "16-30" | "31-50";

export default function RatesPage() {
  const [brackets, setBrackets] = React.useState<RateBracket[]>([]);
  const [activeTab, setActiveTab] = React.useState<TabKey>("1-15");

  React.useEffect(() => {
    if (!API) return;

    fetch(`${API}/public-api/rates`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setBrackets(data?.rates?.brackets || []);
      });
  }, []);

  const getMaxWeight = (b: RateBracket) =>
    Number(b.max_weight ?? b.max_weight_lbs ?? 0);

  const getRate = (b: RateBracket) =>
    Number(b.rate_jmd ?? b.rate ?? 0);

  const filtered = brackets.filter((b) => {
    const w = getMaxWeight(b);
    if (activeTab === "1-15") return w >= 1 && w <= 15;
    if (activeTab === "16-30") return w >= 16 && w <= 30;
    return w >= 31 && w <= 50;
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <span
            className="inline-flex rounded-full px-4 py-1 text-sm font-semibold mb-4"
            style={{ backgroundColor: "#F3E8FF", color: "#4A148C" }}
          >
            Transparent Pricing
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Freight Rates
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Official FAFL air-freight pricing used for customer invoices.
          </p>

          <div className="mt-7 flex gap-4 flex-wrap">
            <Link
              href="/calculator"
              className="inline-flex items-center rounded-xl px-6 py-3 text-white font-semibold shadow-md"
              style={{ backgroundColor: "#4A148C" }}
            >
              Estimate Your Shipment
            </Link>
            <span className="text-sm text-gray-500">
              Prices in JMD • Weight in lbs
            </span>
          </div>
        </div>
      </section>

      {/* ===== RATES ===== */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Tabs */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white">
            {[
              { key: "1-15", label: "Weight 1 - 15 lbs" },
              { key: "16-30", label: "Weight 16 - 30 lbs" },
              { key: "31-50", label: "Weight 31 - 50 lbs" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key as TabKey)}
                className={`flex-1 px-4 py-3 text-sm font-semibold transition
                  ${
                    activeTab === t.key
                      ? "text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                style={
                  activeTab === t.key
                    ? { backgroundColor: "#16A34A" } // green like screenshot
                    : {}
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Table Card */}
          <div className="rounded-3xl border border-gray-100 shadow-sm bg-white overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr className="text-gray-600">
                  <th className="px-6 py-3">Pounds</th>
                  <th className="px-6 py-3">Amount (JMD)</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((b, idx) => {
                  const w = getMaxWeight(b);
                  const r = getRate(b);

                  return (
                    <tr
                      key={`${w}-${idx}`}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3 font-medium">{w}</td>
                      <td className="px-6 py-3 font-semibold">
                        {r.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}

                {!filtered.length && (
                  <tr>
                    <td colSpan={2} className="px-6 py-10 text-gray-500">
                      No rates found for this range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Helper cards */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Per Package",
                desc: "Each package is charged individually.",
              },
              {
                title: "Rounded Weight",
                desc: "Weight is rounded up to the nearest pound.",
              },
              {
                title: "Freight Only",
                desc: "Customs & duties calculated separately.",
              },
            ].map((i) => (
              <div
                key={i.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-[#4A148C]">{i.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


