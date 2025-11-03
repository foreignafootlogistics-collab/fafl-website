import Link from "next/link";


export default function RatesPage() {
return (
<main className="min-h-screen bg-white text-gray-900">
<section className="border-b border-gray-100">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Rates</h1>
<p className="mt-3 text-gray-600 max-w-2xl">
Simple and transparent. These are sample placeholders—please confirm your final figures and we’ll update the table.
</p>
<div className="mt-6">
<Link href="/calculator" className="inline-flex items-center rounded-xl px-4 py-2 text-white" style={{ backgroundColor: "#4A148C" }}>
Open Calculator
</Link>
</div>
</div>
</section>


<section className="py-12">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
<table className="w-full text-left text-sm">
<thead className="bg-gray-50">
<tr className="text-gray-600">
<th className="px-4 py-3">Category</th>
<th className="px-4 py-3">Freight per lb (USD)</th>
<th className="px-4 py-3">Handling (JMD)</th>
<th className="px-4 py-3">Insurance</th>
<th className="px-4 py-3">Notes</th>
</tr>
</thead>
<tbody>
{[
{ cat: "General Merchandise", freight: "TBD", handling: "TBD", insurance: "Optional", notes: "Standard items" },
{ cat: "Clothing & Footwear", freight: "TBD", handling: "TBD", insurance: "Optional", notes: "Personal use" },
{ cat: "Laptops / Computers", freight: "TBD", handling: "TBD", insurance: "Recommended", notes: "Electronics" },
{ cat: "Phones / Electronics", freight: "TBD", handling: "TBD", insurance: "Recommended", notes: "IMEI may be required" },
].map((r) => (
<tr key={r.cat} className="border-t border-gray-100">
<td className="px-4 py-3 font-medium">{r.cat}</td>
<td className="px-4 py-3">{r.freight}</td>
<td className="px-4 py-3">{r.handling}</td>
<td className="px-4 py-3">{r.insurance}</td>
<td className="px-4 py-3 text-gray-600">{r.notes}</td>
</tr>
))}
</tbody>
</table>
</div>


<div className="mt-8 grid gap-6 sm:grid-cols-2">
<div className="rounded-2xl border border-gray-100 p-6">
<h2 className="font-semibold">What affects my final total?</h2>
<p className="mt-2 text-sm text-gray-600">
Declared value, category (for duty), weight/volume, insurance, local handling, and delivery options.
Use the calculator to preview estimates before you shop.
</p>
</div>
<div className="rounded-2xl border border-gray-100 p-6">
<h2 className="font-semibold">Need exact rates?</h2>
<p className="mt-2 text-sm text-gray-600">
We can sync this page to your internal rate tables so it updates automatically. Tell us when your final
figures are ready.
</p>
</div>
</div>
</div>
</section>
</main>
);
}