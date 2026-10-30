'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { CONSTANTS } from '@/lib/seo';

const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// STATIC DATA — module scope
// ---------------------------------------------------------------------------
const NAV_LINKS: readonly { name: string; href: string }[] = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Setup', href: '/setup' },
  { name: 'Blog', href: '/blog' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === href;
  return pathname.startsWith(href);
}

// ---------------------------------------------------------------------------
// HEADER
// ---------------------------------------------------------------------------
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Scroll detection — passive listener + bail out when value unchanged
  useEffect(() => {
    const handleScroll = () => {
      const nextVal = window.scrollY > 20;
      setScrolled((prev) => (prev === nextVal ? prev : nextVal));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock + mobile-menu-open coordination
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobile-menu-open');
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Escape to close + focus trap + restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const drawer = drawerRef.current;
        if (!drawer) return;
        const focusables = drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Move focus into the drawer when it opens
    const focusTimer = window.setTimeout(() => {
      const firstLink = drawerRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      // Restore focus to the toggle button when the drawer closes
      menuButtonRef.current?.focus();
    };
  }, [isOpen]);

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0b0914]/95 backdrop-blur-md border-b border-[#ffd000]/40 py-2.5 shadow-2xl'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 rounded"
                aria-label={`${BRAND} Home`}
              >
                <div className="h-10 flex items-center group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/img/banner-logo.png"
                    alt={`${BRAND} - Best IPTV Subscription USA Logo`}
                    width={160}
                    height={40}
                    className="object-contain h-full w-auto"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block" aria-label="Main Navigation">
              <ul className="flex items-center gap-1.5 bg-[#0a2540]/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#e5e7eb]/15 shadow-lg">
                {NAV_LINKS.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={`font-black uppercase tracking-wider text-xs xl:text-sm transition-all duration-200 px-4 py-2 rounded-full inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 ${
                          active
                            ? 'bg-[#ffd000] text-[#0b0914] shadow-md'
                            : 'text-[#e5e7eb] hover:text-[#ffd000] hover:bg-[#f4f4f6]/5'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/pricing"
                className="px-6 py-2.5 rounded-full border-2 border-[#ffd000] bg-[#ffd000] text-[#0b0914] font-black tracking-widest uppercase text-xs xl:text-sm hover:bg-[#ffdb33] hover:border-[#ffdb33] transition-all duration-200 shadow-md active:scale-95 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-[#f4f4f6] p-2.5 rounded-xl bg-[#f4f4f6]/5 border border-[#e5e7eb]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 z-50 relative active:scale-95 transition-transform"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-[#f4f4f6]" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6 text-[#f4f4f6]" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        className={`fixed inset-0 z-40 bg-[#0b0914]/98 backdrop-blur-2xl transition-all duration-300 lg:hidden flex flex-col justify-center items-center ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="w-full max-w-sm px-6 flex flex-col items-center gap-3">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeDrawer}
                aria-current={active ? 'page' : undefined}
                className={`w-full text-center py-4 rounded-2xl text-lg font-black tracking-widest uppercase transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 ${
                  active
                    ? 'text-[#0b0914] bg-[#ffd000] border-[#ffd000] shadow-lg'
                    : 'text-[#f4f4f6] bg-[#f4f4f6]/5 border-[#e5e7eb]/15 hover:bg-[#0a2540] hover:text-[#ffd000]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="w-full pt-4">
            <Link
              href="/pricing"
              onClick={closeDrawer}
              className="block w-full text-center py-4 rounded-2xl bg-[#ffd000] text-[#0b0914] border-2 border-[#ffd000] font-black text-lg tracking-widest uppercase shadow-xl transition-all duration-200 hover:bg-[#ffdb33] hover:border-[#ffdb33] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}