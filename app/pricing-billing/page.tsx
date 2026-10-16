'use client';

import {
  Check,
  Sparkles,
  Users,
  Building2,
} from 'lucide-react';
import { pricingTiers } from '../types/assets';

const tierIcons = {
  PERSONAL: Sparkles,
  TEAM: Users,
  CORPORATE: Building2,
} as const;

export default function PricingBilling() {
  return (
    <section className="flex min-h-screen w-full flex-col bg-brand-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-brand-600">
            Pricing
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-brand-900 sm:text-4xl">
            Simple plans for every stage
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-800/80">
            Choose the plan that fits your team. You can upgrade, downgrade, or
            cancel at any time.
          </p>
        </div>

        {/* Pricing columns */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-4">
          {pricingTiers.map((tier, index) => {
            const isFeatured = index === 1;
            const Icon =
              tierIcons[tier.tier as keyof typeof tierIcons] ?? Sparkles;

            return (
              <div
                key={tier.id}
                className={`flex flex-col rounded-2xl border p-6 sm:p-8 ${
                  isFeatured
                    ? 'border-brand-600 bg-brand-600 text-white shadow-xl lg:-my-4 lg:py-12'
                    : 'border-brand-200 bg-white text-brand-900'
                }`}
              >
                {/* Plan header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isFeatured
                          ? 'bg-white/15 text-white'
                          : 'bg-brand-100 text-brand-600'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <h3
                      className={`text-sm font-semibold uppercase tracking-widest ${
                        isFeatured ? 'text-brand-100' : 'text-brand-600'
                      }`}
                    >
                      {tier.tier}
                    </h3>
                  </div>

                  {isFeatured && (
                    <span className="hidden rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white sm:inline-block">
                      Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-6 sm:mt-7">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold sm:text-4xl">
                      {tier.price}
                    </span>
                    <span
                      className={`text-sm ${
                        isFeatured ? 'text-brand-100' : 'text-brand-700/70'
                      }`}
                    >
                      {tier.billing}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className={`my-6 h-px w-full sm:my-8 ${
                    isFeatured ? 'bg-white/20' : 'bg-brand-200'
                  }`}
                />

                {/* Features */}
                <ul className="flex-1 space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          isFeatured ? 'text-brand-100' : 'text-brand-500'
                        }`}
                      />
                      <span
                        className={
                          isFeatured ? 'text-brand-50' : 'text-brand-800'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  type="button"
                  className={`mt-8 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors sm:mt-10 ${
                    isFeatured
                      ? 'bg-white text-brand-700 hover:bg-brand-100'
                      : 'border border-brand-300 text-brand-700 hover:border-brand-500 hover:bg-brand-50'
                  }`}
                >
                  {tier.buttonLabel}
                </button>
              </div>
            );
          })}
        </div>

        {/* Trust note */}
        <p className="mt-10 text-center text-sm text-brand-800/70">
          All plans include secure hosting, regular updates, and email support.
        </p>
      </div>
    </section>
  );
}