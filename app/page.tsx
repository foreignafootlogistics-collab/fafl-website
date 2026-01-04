// app/page.tsx
// FAFL Courier marketing homepage — Brand: Foreignafoot-style (clean + vibrant)
// Primary brand color: #4A148C
// Accent: #FACC15 (yellow)

import Link from "next/link";
import * as React from "react";
import Image from "next/image";

// ===== Portal URL (Render App) =====
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.faflcourier.com").replace(/\/+$/, "");

// =========================
// Inline SVG Icon Set (safe, zero deps)
// =========================
export type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function SvgWrap({
  children,
  size = 20,
  className,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </SvgWrap>
);

export const BadgeCheckIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <path d="M9.7 2.3a2.9 2.9 0 0 1 4.6 0l.6.7.9-.1a2.9 2.9 0 0 1 3 3l-.1.9.7.6a2.9 2.9 0 0 1 0 4.6l-.7.6.1.9a2.9 2.9 0 0 1-3 3l-.9-.1-.6.7a2.9 2.9 0 0 1-4.6 0l-.6-.7-.9.1a2.9 2.9 0 0 1-3-3l.1-.9-.7-.6a2.9 2.9 0 0 1 0-4.6l.7-.6-.1-.9a2.9 2.9 0 0 1 3-3l.9.1.6-.7z" />
    <path d="m9 12 2 2 4-4" />
  </SvgWrap>
);

export const CalculatorIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="4" y1="8" x2="20" y2="8" />
    <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
  </SvgWrap>
);

export const TruckIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h4l3 3v5h-3" />
    <circle cx="5.5" cy="19.5" r="2" />
    <circle cx="17.5" cy="19.5" r="2" />
  </SvgWrap>
);

export const ShoppingCartIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h3l2.6 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22 7H6" />
  </SvgWrap>
);

export const PackageCheckIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <path d="m16 16 2 2 4-4" />
    <path d="M21 8v6M3 7l9 5 9-5-9-5-9 5z" />
    <path d="M3 17l9 5 9-5" />
    <path d="M12 12v10" />
  </SvgWrap>
);

export const PlaneIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <path d="M10 21l2-5 10-3-18-7-2 5 7 3 1 7z" />
  </SvgWrap>
);

export const HomeIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <path d="M3 9l9-7 9 7" />
    <path d="M9 22V12h6v10" />
  </SvgWrap>
);

export const QuoteIcon = (p: IconProps) => (
  <SvgWrap {...p}>
    <path d="M7 7h6v6H7z" />
    <path d="M17 7h6v6h-6z" />
  </SvgWrap>
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center text-white shadow"
              style={{ backgroundColor: "#4A148C" }}
            >
              FA
            </div>
            <span className="font-semibold tracking-tight">FAFL Courier</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#rates" className="hover:opacity-80">
              Rates
            </Link>
            <Link href="#how" className="hover:opacity-80">
              How it Works
            </Link>
            <Link href="#contact" className="hover:opacity-80">
              Contact
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <Link href={`${APP_URL}/login`} className="hover:opacity-80">
              Login
            </Link>
            <Link
              href={`${APP_URL}/register`}
              className="inline-flex items-center rounded-xl px-4 py-2 text-gray-900 shadow-sm font-semibold"
              style={{ backgroundColor: "#FACC15" }}
            >
              Create Account Free
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-white">
        {/* soft brand accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle at center, #4A148C 0%, transparent 65%)" }}
          />
          <div
            className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle at center, #FACC15 0%, transparent 65%)" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#4A148C" }} />
                US → Jamaica Shipping Made Simple
              </div>

              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Shop in the US. <br className="hidden sm:block" />
                Receive in Jamaica.
              </h1>

              <p className="mt-4 text-lg text-gray-700 max-w-xl">
                Transparent pricing, faster processing, and real-time updates inside your FAFL portal. No subscriptions.
                No hidden fees.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-gray-900 text-base font-semibold shadow-sm"
                  style={{ backgroundColor: "#FACC15" }}
                >
                  Create Free Account <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href={`${APP_URL}/login`}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold border border-gray-300 hover:border-gray-400"
                >
                  Login to Dashboard
                </Link>
              </div>

              {/* Trust/Stats row */}
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="text-lg font-extrabold" style={{ color: "#4A148C" }}>
                    Fast
                  </div>
                  <div className="text-xs text-gray-600">Warehouse → JA flow</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="text-lg font-extrabold" style={{ color: "#4A148C" }}>
                    Clear
                  </div>
                  <div className="text-xs text-gray-600">Transparent public rates</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="text-lg font-extrabold" style={{ color: "#4A148C" }}>
                    Live
                  </div>
                  <div className="text-xs text-gray-600">Tracking & invoices</div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative lg:justify-self-end w-full">
              <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <div className="font-semibold">FAFL Portal Preview</div>
                  <div className="text-xs text-gray-500">app.faflcourier.com</div>
                </div>

                <div className="p-6 bg-gray-50">
                  <div className="relative rounded-2xl bg-white border border-gray-100 p-3 shadow-sm">
                    <Image
                      src="/images/dashboard-preview.png"
                      alt="FAFL customer dashboard showing packages, invoices, and tracking"
                      width={1200}
                      height={800}
                      priority
                      className="rounded-xl"
                    />

                    <div
                      className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
                      style={{ backgroundColor: "#4A148C" }}
                    >
                      Live FAFL Dashboard
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-gray-100 bg-white p-4">
                        <div className="text-xs text-gray-500">Overseas</div>
                        <div className="text-2xl font-extrabold" style={{ color: "#4A148C" }}>
                          9
                        </div>
                      </div>
                      <div className="rounded-xl border border-gray-100 bg-white p-4">
                        <div className="text-xs text-gray-500">Ready to Pick Up</div>
                        <div className="text-2xl font-extrabold" style={{ color: "#4A148C" }}>
                          2
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2 flex-wrap">
                      <div
                        className="rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-sm"
                        style={{ backgroundColor: "#4A148C" }}
                      >
                        Transparent Rates
                      </div>
                      <div className="rounded-xl px-3 py-2 text-xs font-semibold bg-yellow-100 text-yellow-900">
                        No Hidden Fees
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`${APP_URL}/login`}
                        className="inline-flex items-center justify-center w-full rounded-xl px-4 py-2 text-white font-semibold"
                        style={{ backgroundColor: "#4A148C" }}
                      >
                        Open Portal <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow"
                style={{ backgroundColor: "#4A148C" }}
              >
                Free US Address • Easy Tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Brand Story Image ===== */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* LEFT: Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
              <Image
                src="/images/foreignafoot-hero.png"
                alt="FAFL Courier shipping from the US to Jamaica"
                fill
                priority
                className="rounded-3xl object-cover object-center"
              />

              {/* subtle label */}
              <div
                className="absolute bottom-4 left-4 rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow"
                style={{ backgroundColor: "#4A148C" }}
              >
                US → Jamaica Shipping
              </div>
            </div>

            {/* RIGHT: Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The Foreign A Foot Journey — Reimagined</h2>

              <p className="mt-4 text-gray-700 text-lg">
                From online checkout in the United States to delivery in Jamaica, FAFL Courier connects every step with
                transparency, speed, and control.
              </p>

              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#4A148C]" />
                  Shop from US stores using your free FAFL address
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#4A148C]" />
                  Track packages and invoices inside your dashboard
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#4A148C]" />
                  Pickup or delivery once your shipment arrives in Jamaica
                </li>
              </ul>

              <div className="mt-7 flex gap-3 flex-wrap">
                <Link
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center rounded-xl px-6 py-3 text-gray-900 font-semibold shadow-sm"
                  style={{ backgroundColor: "#FACC15" }}
                >
                  Get Started Free <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href={`${APP_URL}/login`}
                  className="inline-flex items-center rounded-xl px-6 py-3 font-semibold border border-gray-300 hover:border-gray-400"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why Choose ===== */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built for Jamaica, Powered by Service</h2>
            <p className="mt-3 text-gray-600">
              Accurate estimates, real-time updates, and a US address designed for smooth shopping.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              icon={<BadgeCheckIcon className="h-6 w-6" style={{ color: "#4A148C" }} />}
              title="Transparent Pricing"
              desc="Clear public rates and fees you can see up-front."
            />
            <Card
              icon={<CalculatorIcon className="h-6 w-6 text-emerald-600" />}
              title="Smarter Clearance"
              desc="Category-based calculation helps prevent surprise duties."
            />
            <Card
              icon={<TruckIcon className="h-6 w-6 text-yellow-500" />}
              title="Reliable Delivery"
              desc="From US warehouse to Jamaica final mile, done right."
            />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS (Polished) ===== */}
      <section id="how" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How FAFL Courier Works</h2>
            <p className="mt-4 text-gray-600">
              Four simple steps to get your US online shopping delivered safely to Jamaica.
            </p>
          </div>

          {/* Image + Steps */}
          <div className="mt-14 grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: IMAGE WITH STEP BADGES */}
            <div className="relative">
              <Image
                src="/images/how-it-works.png"
                alt="How FAFL Courier works"
                width={1200}
                height={700}
                className="rounded-3xl shadow-lg"
              />

              {/* Step badges */}
              {[
                { step: 1, label: "Shop Online", top: "10%", left: "8%" },
                { step: 2, label: "We Receive", top: "45%", left: "5%" },
                { step: 3, label: "We Ship", top: "20%", right: "8%" },
                { step: 4, label: "Pickup / Delivery", bottom: "10%", right: "6%" },
              ].map((s) => (
                <div
                  key={s.step}
                  className="absolute hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                  style={{
                    backgroundColor: "#FACC15",
                    ...(Object.prototype.hasOwnProperty.call(s, "top") ? { top: (s as any).top } : {}),
                    ...(Object.prototype.hasOwnProperty.call(s, "bottom") ? { bottom: (s as any).bottom } : {}),
                    ...(Object.prototype.hasOwnProperty.call(s, "left") ? { left: (s as any).left } : {}),
                    ...(Object.prototype.hasOwnProperty.call(s, "right") ? { right: (s as any).right } : {}),
                  }}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs">
                    {s.step}
                  </span>
                  {s.label}
                </div>
              ))}
            </div>

            {/* RIGHT: STEPS LIST */}
            <div className="space-y-6">
              {[
                {
                  title: "Shop Online in the US",
                  desc: "Use your FAFL US warehouse address at checkout on Amazon, SHEIN, Walmart & more.",
                  icon: <ShoppingCartIcon className="h-5 w-5" />,
                },
                {
                  title: "We Receive & Process",
                  desc: "Your package is scanned, verified, and added to your dashboard.",
                  icon: <PackageCheckIcon className="h-5 w-5" />,
                },
                {
                  title: "We Ship to Jamaica",
                  desc: "Packages are consolidated, cleared, and shipped with live tracking.",
                  icon: <PlaneIcon className="h-5 w-5" />,
                },
                {
                  title: "Pickup or Delivery",
                  desc: "Collect in-store or schedule delivery when it arrives in Jamaica.",
                  icon: <HomeIcon className="h-5 w-5" />,
                  isLast: true,
                },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm
                             opacity-0 translate-y-6 animate-[fadeUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex gap-4 items-start">
                    {/* Step number */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl font-extrabold text-white shrink-0"
                      style={{ backgroundColor: "#4A148C" }}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {/* micro-icon */}
                        <div
                          className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "#F3E8FF", color: "#4A148C" }}
                          aria-hidden="true"
                        >
                          {step.icon}
                        </div>

                        <h3 className="font-semibold text-lg">{step.title}</h3>
                      </div>

                      <p className="mt-2 text-gray-600 text-sm">{step.desc}</p>

                      {/* CTA under Step 4 */}
                      {(step as any).isLast && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Link
                            href={`${APP_URL}/register`}
                            className="inline-flex items-center rounded-xl px-5 py-3 text-gray-900 font-semibold shadow-sm"
                            style={{ backgroundColor: "#FACC15" }}
                          >
                            Get Started Free <ArrowRightIcon className="ml-2 h-5 w-5" />
                          </Link>

                          <Link
                            href={`${APP_URL}/login`}
                            className="inline-flex items-center rounded-xl px-5 py-3 font-semibold border border-gray-300 hover:border-gray-400"
                          >
                            Login
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>       

      </section>

      {/* ===== Rates ===== */}
      <section id="rates" className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Simple, Transparent Rates</h2>
              <p className="mt-3 text-gray-600">
                Estimate before you spend. Use our calculator to preview duty and fees before you shop.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link
                  href="/rates"
                  className="inline-flex items-center rounded-xl px-5 py-3 text-white shadow"
                  style={{ backgroundColor: "#4A148C" }}
                >
                  View Full Rates <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center rounded-xl px-5 py-3 border border-gray-300 hover:border-gray-400"
                >
                  Open Calculator
                </Link>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Tip: Create your free account to see tracking updates and invoices in the portal.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-white">
              <div className="text-sm uppercase tracking-wider text-gray-500 mb-3">Calculator Preview</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Declared Value (USD)</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                    placeholder="e.g. 120"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Weight (lb)</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                    placeholder="e.g. 3.5"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Category</label>
                  <select className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2">
                    <option>Clothing & Footwear</option>
                    <option>Laptops / Computers</option>
                    <option>Phones / Electronics</option>
                    <option>General Merchandise</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    className="w-full rounded-xl px-4 py-2 text-white"
                    style={{ backgroundColor: "#4A148C" }}
                  >
                    Estimate
                  </button>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Estimated Total: <span className="font-semibold">JMD —</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonial ===== */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <figure className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <QuoteIcon className="h-5 w-5" />
              Verified Customer Review
            </div>
            <blockquote className="mt-3 text-xl font-medium leading-relaxed">
              “The most reliable courier I’ve ever used. No stress. Transparent fees and on-time delivery.”
            </blockquote>
            <figcaption className="mt-2 text-sm text-gray-500">— Kingston, JA</figcaption>
          </figure>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to ship smarter with FAFL Courier?</h2>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link
              href={`${APP_URL}/register`}
              className="inline-flex items-center rounded-xl px-6 py-3 text-gray-900 text-base font-semibold shadow-sm"
              style={{ backgroundColor: "#FACC15" }}
            >
              Create Account Free <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href={`${APP_URL}/login`}
              className="inline-flex items-center rounded-xl px-6 py-3 text-base font-semibold border border-gray-300 hover:border-gray-400"
            >
              Login
            </Link>
          </div>

          {/* Trusted stores */}
          <div className="mt-10">
            <p className="text-sm font-medium text-gray-500 mb-4">Shop from your favorite online stores</p>

            <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
              {[
                { src: "/images/brands/amazon.png", alt: "Amazon" },
                { src: "/images/brands/ebay.png", alt: "eBay" },
                { src: "/images/brands/walmart.png", alt: "Walmart" },
                { src: "/images/brands/shein.png", alt: "SHEIN" },
                { src: "/images/brands/temu.png", alt: "Temu" },
              ].map((brand) => (
                <Image
                  key={brand.alt}
                  src={brand.src}
                  alt={brand.alt}
                  width={90}
                  height={40}
                  className="object-contain hover:scale-105 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer id="contact" className="border-t border-gray-100 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center text-white shadow"
                style={{ backgroundColor: "#4A148C" }}
              >
                FA
              </div>
              <span className="font-semibold tracking-tight">FAFL Courier</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">Foreign A Foot Logistics Limited</p>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              <li>WhatsApp / Phone: 876-210-4291</li>
              <li>Email: foreignafootlogistics@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <Link href={`${APP_URL}/register`} className="hover:opacity-80">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href={`${APP_URL}/login`} className="hover:opacity-80">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/rates" className="hover:opacity-80">
                  Rates
                </Link>
              </li>
              <li>
                <Link href="#how" className="hover:opacity-80">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} FAFL Courier. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F3E8FF" }}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

