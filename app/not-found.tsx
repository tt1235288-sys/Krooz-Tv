'use client';

import Link from 'next/link';
import { CONSTANTS } from '@/lib/seo';
import { Home, ArrowLeft, Search, Tv, Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden justify-center items-center py-20 sm:py-24 md:py-30">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/error-404.webp"
          alt="404 error page background for the IPTV Subscription website"
          className="w-full h-full object-cover opacity-95 brightness-50"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0914]/90 via-[#0b0914]/70 to-[#0b0914]/90" />
      </div>

      {/* Animated Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0a2540]/30 rounded-full blur-[120px] animate-pulse" />

      {/* Main Container Perfectly Centered Vertically & Horizontally */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
        <div className="max-w-3xl mx-auto">

          {/* 404 Number Layout Container */}
          <div className="mb-6">
            <div className="text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter uppercase select-none">
              <span className="text-[#ffd000]">4</span>
              <span className="text-[#f4f4f6]">0</span>
              <span className="text-[#0a2540]">4</span>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] mb-4 uppercase tracking-tighter">
            Page Not Found
          </h1>

          <div className="w-24 h-1.5 bg-[#ffd000] mx-auto mb-8 rounded-full" />

          <p className="text-[#e5e7eb]/85 text-base sm:text-lg font-medium max-w-xl mx-auto mb-12 leading-relaxed">
            That page seems to have gone off the air. The link might be old or the address may have a typo. Use the shortcuts below to get back to what matters on our US IPTV service.
          </p>

          {/* Main Action Control Elements */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 shrink-0 shadow-2xl border-2 border-[#ffd000]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              Back to Home
            </Link>

            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0a2540] border-2 border-[#ffd000] text-[#f4f4f6] font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 shrink-0 shadow-2xl"
            >
              View US IPTV Plans
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}