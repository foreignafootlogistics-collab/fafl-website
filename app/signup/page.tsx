import Link from "next/link";


const APP = process.env.NEXT_PUBLIC_APP_URL || "https://app.faflcourier.com"; // change via .env.local


export default function SignupPage() {
return (
<main className="min-h-screen bg-white text-gray-900">
<section className="border-b border-gray-100">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Create Account</h1>
<p className="mt-3 text-gray-600 max-w-2xl">
Sign up takes less than a minute. You’ll receive your US shipping address right after registration.
</p>
<div className="mt-6">
<Link
href={`${APP}/auth/register`}
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
<h2 className="font-semibold">Heads up</h2>
<p className="mt-2 text-sm text-gray-600">
This is a placeholder page on the marketing site. The real registration happens on the FAFL portal.
</p>
<p className="mt-2 text-sm text-gray-600">
Portal base URL: <code className="bg-gray-50 px-1 py-0.5 rounded">{APP}</code>
</p>
<p className="mt-2 text-xs text-gray-500">
To change the portal URL, create <code>.env.local</code> in the project root and set
<code> NEXT_PUBLIC_APP_URL=https://your-subdomain.example.com</code>, then restart the dev server.
</p>
</div>
</section>
</main>
);
}