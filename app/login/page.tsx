import Link from "next/link";


const APP_LOGIN = process.env.NEXT_PUBLIC_APP_URL || "https://app.faflcourier.com"; // change via .env.local


export default function LoginPage() {
return (
<main className="min-h-screen bg-white text-gray-900">
<section className="border-b border-gray-100">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Login</h1>
<p className="mt-3 text-gray-600 max-w-2xl">
Access your dashboard to track packages, invoices, and deliveries.
</p>
<div className="mt-6">
<Link
href={`${APP_LOGIN}/auth/login`}
className="inline-flex items-center rounded-xl px-4 py-2 text-white"
style={{ backgroundColor: "#4A148C" }}
>
Continue to Portal
</Link>
</div>
</div>
</section>


<section className="py-12">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-2xl border border-gray-100 p-6 shadow-sm">
<h2 className="font-semibold">Note</h2>
<p className="mt-2 text-sm text-gray-600">
This marketing site forwards you to the secure FAFL portal for authentication.
</p>
<p className="mt-2 text-xs text-gray-500">
Configure the portal base URL via <code>.env.local</code>:
</p>
<pre className="mt-2 bg-gray-50 p-3 rounded text-xs overflow-auto">{`NEXT_PUBLIC_APP_URL=https://app.faflcourier.com`}</pre>
</div>
</section>
</main>
);
}