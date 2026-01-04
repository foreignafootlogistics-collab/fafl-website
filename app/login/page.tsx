import Link from "next/link";

const APP_URL =
  (process.env.NEXT_PUBLIC_APP_URL || "https://app.faflcourier.com").replace(/\/+$/, "");

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Top strip (simple + brand) */}
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* If you have a logo, swap this for <Image ... /> */}
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#4A148C" }}
            >
              FA
            </div>
            <div>
              <p className="font-semibold leading-tight">FAFL Courier</p>
              <p className="text-xs text-gray-500 leading-tight">
                Foreign A Foot Logistics Limited
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`${APP_URL}/login`}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: "#4A148C" }}
            >
              Sign In
            </Link>
            <Link
              href={`${APP_URL}/register`}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-900"
              style={{ backgroundColor: "#FACC15" }}
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left copy */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Login to your dashboard
            </h1>
            <p className="mt-3 text-gray-600 max-w-xl">
              Track packages, view invoices, and manage deliveries from your FAFL portal.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${APP_URL}/login`}
                className="rounded-xl px-5 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: "#4A148C" }}
              >
                Continue to Login
              </Link>

              <Link
                href={`${APP_URL}/register`}
                className="rounded-xl px-5 py-3 text-sm font-semibold border border-gray-200 hover:border-gray-300"
              >
                Create Free Account
              </Link>
            </div>

            <div className="mt-8 space-y-2 text-sm text-gray-600">
              <p>• Secure portal login on <span className="font-semibold">app.faflcourier.com</span></p>
              <p>• Real-time updates once packages are scanned</p>
              <p>• Faster support with your shipment history</p>
            </div>
          </div>

          {/* Right visual block (brand image placeholder) */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="rounded-xl bg-white border border-gray-100 p-5">
              <p className="font-semibold">Note</p>
              <p className="mt-2 text-sm text-gray-600">
                This website forwards you to the secure FAFL portal for authentication.
              </p>

              <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-700">Portal Base URL</p>
                <pre className="mt-2 overflow-auto rounded-lg bg-white p-3 text-xs text-gray-700 ring-1 ring-gray-100">{`NEXT_PUBLIC_APP_URL=https://app.faflcourier.com`}</pre>
              </div>
            </div>

            {/* Optional: drop in a banner image later */}
            <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
              Add a banner image here (like foreignafoot.com style)
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
