"use client";


setEstimate({ freightUsd, dutyJmd, handlingJmd, totalJmd });
}


function quick(v: { usd: number; lb: number; cat: string }) {
setUsd(String(v.usd));
setLb(String(v.lb));
setCategory(v.cat);
}


return (
<main className="min-h-screen bg-white text-gray-900">
<section className="border-b border-gray-100">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Calculator (Demo)</h1>
<p className="mt-3 text-gray-600 max-w-2xl">
This is a demo estimator to validate the UX. We’ll replace the logic with your official FAFL calculation (duty, SCF, ENVL, CAF, GCT, handling, etc.) via API from your Flask app.
</p>
</div>
</section>


<section className="py-12">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-3 items-start">
<div className="lg:col-span-2 rounded-2xl border border-gray-100 p-6 shadow-sm bg-white">
<div className="grid sm:grid-cols-2 gap-4">
<div>
<label className="text-sm text-gray-600">Declared Value (USD)</label>
<input value={usd} onChange={(e) => setUsd(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" placeholder="e.g. 120" />
</div>
<div>
<label className="text-sm text-gray-600">Weight (lb)</label>
<input value={lb} onChange={(e) => setLb(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" placeholder="e.g. 3.5" />
</div>
<div>
<label className="text-sm text-gray-600">Category</label>
<select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2">
<option>General Merchandise</option>
<option>Clothing & Footwear</option>
<option>Laptops / Computers</option>
<option>Phones / Electronics</option>
</select>
</div>
<div>
<label className="text-sm text-gray-600">USD → JMD (FX)</label>
<input value={fx} onChange={(e) => setFx(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" />
</div>
<div className="sm:col-span-2 flex items-end gap-3">
<button onClick={onEstimate} className="rounded-xl px-4 py-2 text-white" style={{ backgroundColor: "#4A148C" }}>Estimate</button>
<div className="text-sm text-gray-600">Demo only. Actual fees may differ.</div>
</div>
</div>


<div className="mt-6">
<div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Quick Tests</div>
<div className="flex flex-wrap gap-2">
<button onClick={() => quick({ usd: 50, lb: 1.5, cat: "Clothing & Footwear" })} className="rounded-xl border border-gray-300 px-3 py-1 text-sm">Clothes — $50, 1.5lb</button>
<button onClick={() => quick({ usd: 1200, lb: 5, cat: "Laptops / Computers" })} className="rounded-xl border border-gray-300 px-3 py-1 text-sm">Laptop — $1200, 5lb</button>
<button onClick={() => quick({ usd: 300, lb: 2, cat: "Phones / Electronics" })} className="rounded-xl border border-gray-300 px-3 py-1 text-sm">Phone — $300, 2lb</button>
</div>
</div>
</div>


<div className="rounded-2xl border border-gray-100 p-6 shadow-sm bg-white">
<h2 className="font-semibold">Estimate</h2>
{!estimate && (
<p className="mt-2 text-sm text-gray-600">Fill the form and click Estimate to see a demo breakdown.</p>
)}
{estimate && (
<div className="mt-4 space-y-2 text-sm">
<Row label="Freight (USD)">{estimate.freightUsd.toFixed(2)}</Row>
<Row label="Duty (JMD)">{estimate.dutyJmd.toLocaleString()}</Row>
<Row label="Handling (JMD)">{estimate.handlingJmd.toLocaleString()}</Row>
<div className="h-px bg-gray-200 my-2" />
<Row label="Estimated Total (JMD)" strong>
{estimate.totalJmd.toLocaleString()}
</Row>
<p className="mt-3 text-xs text-gray-500">This is a demo estimate only. We’ll replace with the official FAFL calculation.</p>
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