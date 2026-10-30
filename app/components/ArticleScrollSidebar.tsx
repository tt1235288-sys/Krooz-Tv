'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Sparkles,
  Zap,
  MessageCircle,
  Flame,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { CONSTANTS } from '@/lib/seo';

const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function getCategoryLabel(post: any): string {
  if (post.category) {
    const map: Record<string, string> = {
      setup: 'Setup Guide',
      review: 'Review',
      sports: 'Live Sports',
      tips: 'Tips & Tricks',
      news: 'News',
    };
    return map[post.category] || post.category;
  }
  if (post.keywords && post.keywords.length > 0) return post.keywords[0];
  return 'IPTV Subscription Guide';
}

function getReadTime(post: any): number {
  if (post.readTime) {
    const match = String(post.readTime).match(/(\d+)/);
    if (match) return parseInt(match[1]);
  }
  const words = (post.content || '')
    .replace(/<[^>]*>/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 200));
}

function formatDateShort(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ---------------------------------------------------------------------------
// SIDEBAR
// ---------------------------------------------------------------------------
export default function ArticleScrollSidebar({
  relatedPosts,
  whatsappIboMsg,
  whatsappSubMsg,
}: {
  relatedPosts: any[];
  whatsappIboMsg: string;
  whatsappSubMsg: string;
}) {
  return (
    <aside className="lg:col-span-4 order-2 lg:order-2 lg:self-start lg:sticky lg:top-24">
      <div className="space-y-6">
        {/* =====================================================
            Card 1 — IPTV Smarters Pro (recommended player)
        ===================================================== */}
        <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0a2540]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 bg-[#0a2540] text-[#ffd000] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5" /> Recommended Player
          </div>

          <h2 className="text-lg sm:text-xl font-black text-[#0b0914] uppercase tracking-tight mb-2">
            Get IPTV Smarters Pro Access
          </h2>
          <p className="text-[#0b0914]/80 text-xs sm:text-sm font-bold leading-relaxed mb-3">
            IPTV Smarters Pro is one of our top picks for fast, secure playback with minimal buffering. Our team helps you get set up on chat and stays on hand throughout your whole subscription.
          </p>
          <p className="text-[#0b0914]/70 text-[11px] font-bold uppercase tracking-wider mb-6">
            Included with every IPTV Subscription plan · Works alongside IBO Player Pro
          </p>

          <a
            href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${whatsappIboMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-xs uppercase tracking-wider hover:bg-[#ffdb33] transition-all shadow-lg hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Get IPTV Smarters Pro</span>
          </a>
        </div>

        {/* =====================================================
            Card 2 — Official Plans (US Navy + Cobalt + Amber)
        ===================================================== */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] via-[#0b0914] to-[#0a2540]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,208,0,0.15),_transparent_60%)] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 p-6">
            <div className="inline-flex items-center gap-1.5 bg-[#ffd000] text-[#0b0914] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 shadow-md">
              <Crown className="w-3.5 h-3.5" /> Official Plans
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#f4f4f6] uppercase tracking-tight mb-2 drop-shadow-md">
              {BRAND} <br />
              <span className="text-[#ffd000]">Subscriptions</span>
            </h2>
            <p className="text-[#e5e7eb]/85 text-xs sm:text-sm font-bold leading-relaxed mb-6">
              36,000+ live channels · 120,000+ movies &amp; TV shows · 4K Ultra HD · Anti freeze servers.
            </p>

            <div className="space-y-3">
              {/* Standard */}
              <div className="group bg-[#f4f4f6] border-2 border-[#e5e7eb] rounded-2xl p-4 hover:border-[#ffd000] hover:-translate-y-0.5 transition-all shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0a2540]/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#0a2540]" />
                    </div>
                    <span className="text-[#0b0914] font-black text-sm uppercase tracking-tight">
                      Standard
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#0a2540] font-black text-xl leading-none">
                      $39
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-[#0b0914]/50 mt-0.5">
                      3 Months
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-[#0b0914]/70">
                  <CheckCircle2 className="w-3 h-3 text-[#0a2540]" />
                  <span>Set up on chat in minutes</span>
                </div>
                <a
                  href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${whatsappSubMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-full bg-[#ffd000] text-[#0b0914] hover:bg-[#ffdb33] transition-all font-black text-[10px] uppercase tracking-widest block border-2 border-[#ffd000] hover:border-[#ffdb33]"
                >
                  Order on Chat
                </a>
              </div>

              {/* VIP */}
              <div className="group relative bg-[#0b0914] border-2 border-[#ffd000] rounded-2xl p-4 hover:border-[#ffdb33] hover:-translate-y-0.5 transition-all shadow-2xl">
                <div className="absolute -top-3 right-4 bg-[#ffd000] text-[#0b0914] px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">
                  ⭐ Best Value
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#ffd000]/20 flex items-center justify-center">
                      <Crown className="w-4 h-4 text-[#ffd000]" />
                    </div>
                    <span className="text-[#f4f4f6] font-black text-sm uppercase tracking-tight">
                      12 Months VIP
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#ffd000] font-black text-xl leading-none">
                      $69
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-[#e5e7eb]/60 mt-0.5">
                      Save 50%
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#e5e7eb]/85">
                    <CheckCircle2 className="w-3 h-3 text-[#ffd000]" />
                    <span>4K Anti Freeze Servers</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#e5e7eb]/85">
                    <CheckCircle2 className="w-3 h-3 text-[#ffd000]" />
                    <span>Free 24 hour trial before you pay</span>
                  </div>
                </div>

                <a
                  href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${whatsappSubMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-full bg-[#ffd000] text-[#0b0914] hover:bg-[#ffdb33] transition-all font-black text-[10px] uppercase tracking-widest block shadow-lg hover:scale-105"
                >
                  Order VIP on Chat
                </a>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#e5e7eb]/20 text-center">
              <Link
                href="/pricing"
                className="text-xs font-black text-[#f4f4f6] uppercase tracking-wider hover:underline inline-flex items-center gap-1 group"
              >
                View all US IPTV plans
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#ffd000]" />
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================
            Card 3 — Related Articles
        ===================================================== */}
        {relatedPosts.length > 0 && (
          <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-5 shadow-xl">
            <h2 className="text-lg font-black text-[#0b0914] uppercase tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0a2540]" /> Related Articles
            </h2>

            <div className="space-y-4">
              {relatedPosts.map((relPost) => {
                const relCategory = getCategoryLabel(relPost);
                const relReadTime = getReadTime(relPost);
                const relDate = formatDateShort(relPost.date);

                return (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}`}
                    className="group block bg-[#f4f4f6] rounded-2xl overflow-hidden border-2 border-[#0a2540]/20 hover:border-[#0a2540] hover:shadow-[0_15px_35px_rgba(10,37,64,0.25)] hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0914]">
                      <Image
                        src={relPost.image}
                        alt={relPost.title}
                        width={400}
                        height={250}
                        loading="lazy"
                        sizes="(max-width: 1024px) 100vw, 350px"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0914] via-[#0b0914]/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0a2540] text-[#f4f4f6] text-[9px] font-black uppercase tracking-wider shadow-lg">
                          <Tag className="w-2.5 h-2.5" />
                          {relCategory}
                        </span>
                      </div>

                      <div className="absolute top-2 right-2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0b0914]/80 backdrop-blur-md text-[#f4f4f6] text-[9px] font-black uppercase tracking-wider border border-[#e5e7eb]/15">
                          <Clock className="w-2.5 h-2.5" />
                          {relReadTime} min
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#0b0914]/60 mb-2">
                        <Calendar className="w-3 h-3 text-[#0a2540]" />
                        <span>{relDate}</span>
                      </div>

                      <h3 className="text-sm font-black text-[#0b0914] uppercase tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-[#0a2540] transition-colors">
                        {relPost.title}
                      </h3>

                      <p className="text-[#0b0914]/70 text-xs font-medium leading-relaxed line-clamp-2 mb-3">
                        {relPost.description || relPost.excerpt}
                      </p>

                      <div className="pt-3 border-t border-[#0b0914]/10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[#0a2540] font-black text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all">
                          Read
                          <ArrowRight className="w-3 h-3" />
                        </span>
                        <div className="w-6 h-6 rounded-lg bg-[#0a2540]/10 border border-[#0a2540]/30 flex items-center justify-center text-[#0a2540] group-hover:bg-[#ffd000] group-hover:text-[#0b0914] group-hover:border-[#ffd000] transition-all duration-300">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}