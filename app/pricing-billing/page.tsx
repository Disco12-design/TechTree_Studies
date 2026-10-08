'use client';

import { Check, Lock, Zap } from 'lucide-react';
import { pricingTiers } from '../types/assets';

export default function PricingBilling() {
  return (
    <div className="w-full px-5 py-8">
      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-600">
          Choose the plan that fits your certification goals. Upgrade or downgrade anytime with no lock-in contracts.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative rounded-2xl p-8 border transition-all ${
              tier.isPopular
                ? 'border-brand-500 bg-linear-to-br from-brand-50 to-white shadow-xl ring-1 ring-brand-200'
                : 'border-gray-200 bg-white hover:shadow-lg'
            }`}
          >
            {/* Popular Badge */}
            {tier.isPopular && (
              <div className="absolute -top-4 left-8">
                <div className="bg-brand-600 text-white px-4 py-1.5 rounded-full text-xs font-bold">
                {tier.badge} • {tier.passRate}
                </div>
              </div>
            )}

            {/* Current Plan Badge */}
            {tier.isCurrentPlan && !tier.isPopular && (
              <div className="mb-4 inline-block">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                  Current Active Plan
                </span>
              </div>
            )}

            {/* Tier Info */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                {tier.tier}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h2>
              <p className="text-sm text-gray-600">{tier.description}</p>
            </div>

            {/* Pricing */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                <span className="text-gray-600">{tier.billing}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-900 mb-4">
                {tier.isPopular ? 'Everything in Free Starter, plus:' : 'Included Capabilities'}
              </p>
              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                tier.buttonAction === 'current'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-default'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
              disabled={tier.buttonAction === 'current'}
            >
              {tier.buttonAction === 'upgrade' && <Zap className="w-4 h-4" />}
              {tier.buttonLabel}
              {tier.buttonAction === 'upgrade' && <Lock className="w-4 h-4" />}
            </button>

            {/* Additional Info */}
            {tier.buttonAction === 'upgrade' && (
              <div className="mt-4 text-center text-xs text-gray-600 space-y-1">
                <p>✓ Instant Access • 256-bit Stripe Checkout</p>
                <p>✓ Cancel anytime • Instant CBT Activation</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <summary className="font-semibold text-gray-900 flex items-center justify-between">
              Can I switch plans anytime?
              <span className="group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              Yes! You can upgrade or downgrade your plan anytime. Changes take effect immediately with prorated billing.
            </p>
          </details>

          <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <summary className="font-semibold text-gray-900 flex items-center justify-between">
              Is there a free trial for Pro?
              <span className="group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              The Free plan gives you full access to 1 practice exam and all basic features. Upgrade to Pro to unlock unlimited exams.
            </p>
          </details>

          <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <summary className="font-semibold text-gray-900 flex items-center justify-between">
              What payment methods do you accept?
              <span className="group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              We accept all major credit cards, debit cards, and digital wallets through Stripe. Your payment information is secure and never stored on our servers.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
