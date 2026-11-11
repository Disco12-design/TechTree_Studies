'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { saveUser, validateEmail } from '@/lib/authStorage';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      setIsLoading(true);

      const user = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
      };

      saveUser(user);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12">
     

        {/* Form Section */}
        <div>
          <h1 className="text-4xl font-bold text-brand-950 mb-2">Welcome Back!</h1>
          <p className="text-brand-700 mb-8">Please choose your information</p>

          {/* Email Display Box */}
          {email && (
            <div className="mb-6 p-4 border border-brand-200 rounded-lg flex items-center justify-between bg-white hover:bg-brand-50 transition cursor-pointer">
              <div>
                <p className="text-xs text-brand-600 mb-1">Email Address</p>
                <p className="font-medium text-brand-950">{email}</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-brand-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-brand-200 text-brand-900 placeholder-brand-400 focus:border-brand-500 focus:outline-none transition"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-brand-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-brand-200 text-brand-900 placeholder-brand-400 focus:border-brand-500 focus:outline-none transition"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-950 text-white py-3 rounded-lg font-semibold transition hover:bg-brand-900 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Signing in...' : 'Continue with email'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-brand-200" />
            <span className="text-sm text-brand-600">OR</span>
            <div className="flex-1 h-px bg-brand-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 border border-brand-200 rounded-lg hover:bg-brand-50 transition font-medium text-brand-900"
            >
              <Image src="/google.png" alt="Google" width={20} height={20} />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 border border-brand-200 rounded-lg hover:bg-brand-50 transition font-medium text-brand-900"
            >
              <Image src="/apple.png" alt="Apple" width={20} height={20} />
              Apple
            </button>
          </div>

          {/* Link to Sign Up */}
          <p className="text-center text-sm text-brand-700 mt-6">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column - Promotional */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-brand-900 via-brand-800 to-brand-900 relative overflow-hidden flex-col justify-center items-center p-12">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-700 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-600 rounded-full blur-3xl opacity-20" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-md">
          <h2 className="text-5xl font-bold mb-4">Ace Your Exam</h2>
          <p className="text-xl text-brand-100 mb-8">
            Join thousands of students who have successfully passed their CompTIA Security+ certification.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-brand-300" />
              </div>
              <span className="text-brand-100">100% Pass Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-brand-300" />
              </div>
              <span className="text-brand-100">Expert Study Materials</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-brand-300" />
              </div>
              <span className="text-brand-100">Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}