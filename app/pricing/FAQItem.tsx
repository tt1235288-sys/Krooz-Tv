// components/FAQItem.tsx
'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const headingId = useId();
  const answerId = useId();

  return (
    <div
      className={`w-full text-left bg-[#f4f4f6] border-4 ${
        isOpen ? 'border-[#0a2540]' : 'border-[#0b0914]/10'
      } rounded-2xl hover:border-[#0a2540]/60 transition-all duration-300 group`}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 focus-visible:ring-offset-2"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={headingId}
        >
          <div className="flex justify-between items-center gap-4">
            <span
              className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${
                isOpen ? 'text-[#0a2540]' : 'text-[#0b0914] group-hover:text-[#0a2540]'
              } flex items-center gap-3`}
            >
              <span
                className={`${isOpen ? 'text-[#0a2540]' : 'text-[#0b0914]/30'} font-black text-2xl`}
                aria-hidden="true"
              >
                Q.
              </span>
              {question}
            </span>
            <ChevronDown
              className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
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
          <p className="text-[#0b0914]/80 font-medium leading-relaxed pl-10 md:pl-12 border-l-4 border-[#0a2540] ml-2 pt-2 pb-4 mr-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}