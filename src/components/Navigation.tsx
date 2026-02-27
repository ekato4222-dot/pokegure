"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? "rgba(255, 255, 255, 0.97)" : "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: isScrolled ? "0 2px 12px rgba(0, 0, 0, 0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
              style={{
                background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.35)",
              }}
            >
              G
            </div>
            <div>
              <div className="font-black text-lg leading-none gradient-text">ポケグレ</div>
              <div className="text-xs leading-none" style={{ color: "#9ca3af" }}>ポケカ鑑定代行</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="nav-link text-sm">鑑定機関</Link>
            <Link href="/how-it-works" className="nav-link text-sm">申込方法</Link>
            <Link href="/pricing" className="nav-link text-sm">料金プラン</Link>
            <Link href="/faq" className="nav-link text-sm">よくある質問</Link>
            <Link href="/contact" className="btn-primary text-sm py-2 px-6">
              今すぐ申し込む
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            style={{ color: "#374151" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-0.5 mb-1.5 transition-all" style={{ background: "#374151", transform: mobileMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <div className="w-6 h-0.5 mb-1.5 transition-all" style={{ background: "#374151", opacity: mobileMenuOpen ? 0 : 1 }} />
            <div className="w-6 h-0.5 transition-all" style={{ background: "#374151", transform: mobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: "#e5e7eb" }}>
            <div className="flex flex-col gap-4">
              <Link href="/services" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>鑑定機関</Link>
              <Link href="/how-it-works" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>申込方法</Link>
              <Link href="/pricing" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>料金プラン</Link>
              <Link href="/faq" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>よくある質問</Link>
              <Link href="/contact" className="btn-primary text-sm text-center" onClick={() => setMobileMenuOpen(false)}>
                今すぐ申し込む
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
