"use client";

// components/SiteHeader.tsx
import * as React from "react";
import Link from "next/link";
import Image from "next/image";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.faflcourier.com").replace(/\/+$/, "");

export default function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  // Close on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when menu open (mobile)
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-[#4A148C] text-white border-b border-white/10 relative">
        {/* Top Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <Link href="/" className="flex items-center gap-3" onClick={close}>
            <div className="relative h-11 w-11 sm:h-12 sm:w-12">
              <Image
                src="/images/logo.png"
                alt="Foreign A Foot Logistics logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-white text-lg sm:text-xl">
                Foreign A Foot Logistics
              </div>
              <div className="text-xs sm:text-sm italic text-white/90 -mt-0.5">
                “delivering the world to you”
              </div>
            </div>
          </Link>

          {/* Right: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-white">
            <Link href="/" className="hover:opacity-90">
              Home
            </Link>
            <Link href="/#services" className="hover:opacity-90">
              Our Services
            </Link>
            <Link href="/rates" className="hover:opacity-90">
              Rates
            </Link>
            <Link href="/#how" className="hover:opacity-90">
              How it Works
            </Link>
            <Link href="/#contact" className="hover:opacity-90">
              Contact
            </Link>

            <div className="h-6 w-px bg-white/20" />

            <Link href={`${APP_URL}/login`} className="hover:opacity-90">
              Login
            </Link>

            <Link
              href={`${APP_URL}/register`}
              className="inline-flex items-center rounded-xl px-4 py-2 font-semibold text-gray-900 shadow-sm"
              style={{ backgroundColor: "#FACC15" }}
            >
              Create Account Free
            </Link>
          </nav>

          {/* Right: Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href={`${APP_URL}/login`}
              className="rounded-lg px-3 py-2 text-sm bg-white/10 hover:bg-white/15"
              onClick={close}
            >
              Login
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={toggle}
              className="rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/10"
            >
              {open ? (
                // X icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              ) : (
                // hamburger icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Overlay (mobile only) */}
        {open && (
          <button
            aria-label="Close menu overlay"
            onClick={close}
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-[1px]"
            style={{ top: "4rem" }} // start below the header height (h-16)
          />
        )}

        {/* Mobile Dropdown Panel */}
        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height] duration-300 ease-out border-t border-white/10",
            open ? "max-h-[520px]" : "max-h-0",
          ].join(" ")}
        >
          <div className="bg-[#4A148C]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 space-y-2">
              <Link
                href="/"
                onClick={close}
                className="block rounded-xl px-4 py-3 bg-white/10 hover:bg-white/15"
              >
                Home
              </Link>
              <Link
                href="/#services"
                onClick={close}
                className="block rounded-xl px-4 py-3 bg-white/10 hover:bg-white/15"
              >
                Our Services
              </Link>
              <Link
                href="/rates"
                onClick={close}
                className="block rounded-xl px-4 py-3 bg-white/10 hover:bg-white/15"
              >
                Rates
              </Link>
              <Link
                href="/#how"
                onClick={close}
                className="block rounded-xl px-4 py-3 bg-white/10 hover:bg-white/15"
              >
                How it Works
              </Link>
              <Link
                href="/#contact"
                onClick={close}
                className="block rounded-xl px-4 py-3 bg-white/10 hover:bg-white/15"
              >
                Contact
              </Link>

              <div className="h-px bg-white/10 my-2" />

              <Link
                href={`${APP_URL}/login`}
                onClick={close}
                className="block rounded-xl px-4 py-3 bg-white/10 hover:bg-white/15"
              >
                Login
              </Link>

              <Link
                href={`${APP_URL}/register`}
                onClick={close}
                className="block rounded-xl px-4 py-3 font-semibold text-gray-900 shadow-sm"
                style={{ backgroundColor: "#FACC15" }}
              >
                Create Account Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


