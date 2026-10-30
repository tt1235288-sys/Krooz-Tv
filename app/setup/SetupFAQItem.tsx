// components/SetupFAQItem.tsx
'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SetupFAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const headingId = useId();
  const answerId = useId();

  return (
    <div
      className={`w-full text-left bg-[#f4f4f6] border-4 ${
        isOpen ? 'border-[#0a2540]' : 'border-[#e5e7eb]/20'
      } rounded-2xl hover:border-[#0a2540]/60 transition-all duration-300 group`}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-5 sm:p-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 focus-visible:ring-offset-2"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={headingId}
        >
          <div className="flex justify-between items-center gap-4">
            <span
              className={`text-base sm:text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${
                isOpen ? 'text-[#0a2540]' : 'text-[#0b0914] group-hover:text-[#0a2540]'
              } flex items-start sm:items-center gap-3 text-left`}
            >
              <span
                className={`${isOpen ? 'text-[#0a2540]' : 'text-[#0b0914]/30'} font-black text-xl sm:text-2xl shrink-0`}
                aria-hidden="true"
              >
                Q.
              </span>
              <span>{question}</span>
            </span>
            <ChevronDown
              className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 ${
                isOpen
                  ? 'rotate-180 text-[#0a2540]'
                  : 'text-[#0b0914]/30 group-hover:text-[#0a2540]/50'
              }`}
              aria-hidden="true"
            />
          </div>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={headingId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[#0b0914]/80 font-medium leading-relaxed text-sm sm:text-base pl-9 sm:pl-12 border-l-4 border-[#0a2540] ml-1 sm:ml-2 pt-2 pb-4 mr-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}