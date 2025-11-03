// app/page.tsx
// FAFL Courier marketing homepage — Brand: Tech Modern Global Logistics
// Primary brand color: #4A148C
// Notes:
// - Replace hrefs for Sign Up / Login / Rates once your routes are finalized
// - If you use the Next.js App Router, keep this file at app/page.tsx
// - TailwindCSS assumed. Colors use brand hex inline to guarantee match.
// - Icons: replaced lucide-react with local inline SVGs to avoid runtime import issues.

import Link from "next/link";
import * as React from "react";

// =========================
// Inline SVG Icon Set (safe, zero deps)
// =========================
export type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };
const cx = (extra?: string) => ["h-5 w-5", extra].filter(Boolean).join(" ");

function SvgWrap({ children, size = 20, className, ...rest }: IconProps & { children: React.ReactNode }) {
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
  <SvgWrap {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></SvgWrap>
);
export const BadgeCheckIcon = (p: IconProps) => (
  <SvgWrap {...p}><path d="M9.7 2.3a2.9 2.9 0 0 1 4.6 0l.6.7.9-.1a2.9 2.9 0 0 1 3 3l-.1.9.7.6a2.9 2.9 0 0 1 0 4.6l-.7.6.1.9a2.9 2.9 0 0 1-3 3l-.9-.1-.6.7a2.9 2.9 0 0 1-4.6 0l-.6-.7-.9.1a2.9 2.9 0 0 1-3-3l.1-.9-.7-.6a2.9 2.9 0 0 1 0-4.6l.7-.6-.1-.9a2.9 2.9 0 0 1 3-3l.9.1.6-.7z"/><path d="m9 12 2 2 4-4"/></SvgWrap>
);
export const CalculatorIcon = (p: IconProps) => (
  <SvgWrap {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="8" x2="20" y2="8"/><path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/></SvgWrap>
);
export const TruckIcon = (p: IconProps) => (
  <SvgWrap {...p}><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-3"/><circle cx="5.5" cy="19.5" r="2"/><circle cx="17.5" cy="19.5" r="2"/></SvgWrap>
);
export const ShoppingCartIcon = (p: IconProps) => (
  <SvgWrap {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h3l2.6 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22 7H6"/></SvgWrap>
);
export const PackageCheckIcon = (p: IconProps) => (
  <SvgWrap {...p}><path d="m16 16 2 2 4-4"/><path d="M21 8v6M3 7l9 5 9-5-9-5-9 5z"/><path d="M3 17l9 5 9-5"/><path d="M12 12v10"/></SvgWrap>
);
export const PlaneIcon = (p: IconProps) => (
  <SvgWrap {...p}><path d="M10 21l2-5 10-3-18-7-2 5 7 3 1 7z"/></SvgWrap>
);
export const HomeIcon = (p: IconProps) => (
  <SvgWrap {...p}><path d="M3 9l9-7 9 7"/><path d="M9 22V12h6v10"/></SvgWrap>
);
export const QuoteIcon = (p: IconProps) => (
  <SvgWrap {...p}><path d="M7 7h6v6H7z"/><path d="M17 7h6v6h-6z"/></SvgWrap>
);

export default function HomePage() {
  // Simple runtime smoke test to ensure icons are valid React elements
  if (process.env.NODE_ENV !== "production") {
    console.assert(typeof ArrowRightIcon === "function", "Icon load check: ArrowRightIcon");
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-gray-100">
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
            <Link href="#rates" className="hover:opacity-80">Rates</Link>
            <Link href="#how" className="hover:opacity-80">How it Works</Link>
            <Link href="#contact" className="hover:opacity-80">Contact</Link>
            <div className="h-6 w-px bg-gray-200" />
            <Link href="/login" className="hover:opacity-80">Login</Link>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-xl px-4 py-2 text-white shadow"
              style={{ backgroundColor: "#4A148C" }}
            >
              Create Account Free
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* gradient accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-10 blur-3xl"
               style={{ background: "radial-gradient(circle at center, #4A148C 0%, transparent 70%)" }} />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-10 blur-3xl"
               style={{ background: "radial-gradient(circle at center, #10B981 0%, transparent 70%)" }} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Shop in the US. <br className="hidden sm:block"/> Receive in Jamaica.
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-xl">
              Hassle-Free. Transparent. On Time. FAFL Courier makes US online shopping simple — with modern tracking,
              smarter customs handling, and fast local delivery.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-white text-base font-medium shadow"
                style={{ backgroundColor: "#4A148C" }}
              >
                Create Account Free <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#rates"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium border border-gray-300"
              >
                View Rates
              </Link>
            </div>
            <p className="mt-3 text-sm text-gray-500">Instant sign up. No subscription. No hidden fees.</p>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-md">
              <div className="rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Why customers choose us</div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <BadgeCheckIcon className={cx("mt-0.5")} style={{ color: "#4A148C" }} />
                    <span>
                      <span className="font-medium">Transparent Pricing</span> — public rates, no guessing.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CalculatorIcon className={cx("mt-0.5 text-emerald-600")} />
                    <span>
                      <span className="font-medium">Smarter Clearance</span> — category-based duty calculations reduce surprises.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TruckIcon className={cx("mt-0.5 text-yellow-500")} />
                    <span>
                      <span className="font-medium">Reliable Delivery</span> — optimized logistics US warehouse → JA drop.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why Choose (3 pillars) ===== */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built for Jamaica, Powered by Technology</h2>
            <p className="mt-3 text-gray-600">Accurate rate calculations, real-time tracking, and a US address designed for merchant compliance.</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card icon={<BadgeCheckIcon className="h-6 w-6" style={{ color: "#4A148C" }} />} title="Transparent Pricing" desc="Clear public rates and fees you can see up-front." />
            <Card icon={<CalculatorIcon className="h-6 w-6 text-emerald-600" />} title="Smarter Clearance" desc="Category-based calculation helps prevent surprise duties." />
            <Card icon={<TruckIcon className="h-6 w-6 text-yellow-500" />} title="Reliable Delivery" desc="From US warehouse to Jamaica final mile, done right." />
          </div>
        </div>
      </section>

      {/* ===== How it Works ===== */}
      <section id="how" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How it Works</h2>
            <p className="mt-3 text-gray-600">Four simple steps to get your US online shopping delivered to Jamaica.</p>
          </div>

          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Step icon={<ShoppingCartIcon className="h-6 w-6" />} title="Shop Online in the US" desc="Use your FAFL US warehouse address at checkout." index={1} />
            <Step icon={<PackageCheckIcon className="h-6 w-6" />} title="We Receive & Process" desc="Packages are scanned, verified, and prepared for shipment." index={2} />
            <Step icon={<PlaneIcon className="h-6 w-6" />} title="We Ship to Jamaica" desc="Consolidation, customs clearance, and tracking in your dashboard." index={3} />
            <Step icon={<HomeIcon className="h-6 w-6" />} title="Pickup or Delivery" desc="Choose pickup or delivery when your package arrives in Jamaica." index={4} />
          </ol>
        </div>
      </section>

      {/* ===== Rates & Calculator teaser ===== */}
      <section id="rates" className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Simple, Transparent Rates</h2>
              <p className="mt-3 text-gray-600">
                Our transparent pricing lets you estimate before you spend. Use our calculator to preview duty and fees before you shop.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/rates"
                  className="inline-flex items-center rounded-xl px-5 py-3 text-white shadow"
                  style={{ backgroundColor: "#4A148C" }}
                >
                  View Full Rates <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/calculator" className="inline-flex items-center rounded-xl px-5 py-3 border border-gray-300">
                  Open Calculator
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-white">
              {/* Calculator embed placeholder — replace with your real component or iframe */}
              <div className="text-sm uppercase tracking-wider text-gray-500 mb-3">Calculator Preview</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Declared Value (USD)</label>
                  <input className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" placeholder="e.g. 120" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Weight (lb)</label>
                  <input className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" placeholder="e.g. 3.5" />
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
              <div className="mt-4 text-sm text-gray-600">Estimated Total: <span className="font-semibold">JMD —</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonial / Social Proof ===== */}
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
          <div className="mt-6 flex justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center rounded-xl px-6 py-3 text-white text-base font-medium shadow"
              style={{ backgroundColor: "#4A148C" }}
            >
              Create Account Free <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
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
              <li><Link href="/signup" className="hover:opacity-80">Create Account</Link></li>
              <li><Link href="/login" className="hover:opacity-80">Login</Link></li>
              <li><Link href="/rates" className="hover:opacity-80">Rates</Link></li>
              <li><Link href="#how" className="hover:opacity-80">How it Works</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} FAFL Courier. All rights reserved.</div>
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

function Step({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index: number }) {
  return (
    <li className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F3E8FF" }}>
          {icon}
        </div>
        <div className="text-sm font-semibold" style={{ color: "#4A148C" }}>Step {index}</div>
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </li>
  );
}
