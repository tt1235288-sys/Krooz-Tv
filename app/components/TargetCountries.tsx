'use client';

import Image from 'next/image';

export default function CountryFlagsBar() {
  const countries = [
    { name: 'United States', code: 'US', flagSrc: '/img/country/usa.png' },
    { name: 'Canada', code: 'CA', flagSrc: '/img/country/ca.png' },
    { name: 'United Kingdom', code: 'UK', flagSrc: '/img/country/uk.png' },
    { name: 'Australia', code: 'AU', flagSrc: '/img/country/aus.png' },
  ];

  return (
    <section className="w-full bg-[#f4f4f6] py-6 my-6 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFD000] border border-[#e5e7eb] rounded-2xl md:rounded-full py-4 px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 shadow-lg transition-colors duration-300 hover:border-[#0a2540]">

          {/* Status Label */}
          <div className="flex items-center gap-2.5 shrink-0 lg:pr-6 lg:border-r border-[#e5e7eb] w-full lg:w-auto justify-center lg:justify-start">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0a2540] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0a2540]" />
            </span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0b0914] whitespace-nowrap">
              Popular Channels:
            </span>
          </div>

          {/* 4 Symmetric Columns with Local PNG Flags */}
          <div className="w-full lg:w-auto flex-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 items-center justify-items-center">
              {countries.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center justify-center gap-2.5 group cursor-default transition-transform duration-300 hover:scale-105 w-full"
                >
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-[#e5e7eb] group-hover:ring-[#0a2540] transition-all duration-300">
                    <Image
                      src={c.flagSrc}
                      alt={`${c.name} flag`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 640px) 28px, (max-width: 768px) 32px, 36px"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#0b0914]/85 group-hover:text-[#0a2540] transition-colors whitespace-nowrap flex items-center gap-1">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}