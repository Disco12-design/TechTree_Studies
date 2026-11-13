'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { useSignUp, useAuth } from '@clerk/nextjs';
import { validateEmail, validatePassword } from '@/lib/authStorage';

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-brand-200 text-brand-900 placeholder-brand-400 focus:border-brand-500 focus:outline-none transition';
const buttonClass =
  'w-full bg-brand-950 text-white py-3 rounded-lg font-semibold transition hover:bg-brand-900 disabled:opacity-50 disabled:cursor-not-allowed';
const socialClass =
  'flex items-center justify-center gap-2 py-3 px-4 border border-brand-200 rounded-lg hover:bg-brand-50 transition font-medium text-brand-900';

const errorMessage = (e: { longMessage?: string; message: string }) => e.longMessage ?? e.message;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-900 mb-2">{label}</label>
      {children}
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="••••••••"
        className={`${inputClass} pr-12`}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-500 hover:text-brand-700 transition"
        disabled={disabled}
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
      {message}
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { isSignedIn } = useAuth();

  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (isSignedIn) router.push('/dashboard');
  }, [isSignedIn, router]);

  if (!isClient) return null;

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (!validateEmail(email)) return 'Please enter a valid email';
    if (!validatePassword(password)) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const goToDashboard = () =>
    signUp.finalize({
      navigate: ({ decorateUrl }) => {
        const url = decorateUrl('/dashboard');
        if (url.startsWith('http')) window.location.href = url;
        else router.push(url);
      },
    });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    setError(validationError);
    if (validationError) return;

    try {
      setIsLoading(true);
      const created = await signUp.password({ emailAddress: email, password });
      if (created.error) return setError(errorMessage(created.error));

      const sent = await signUp.verifications.sendEmailCode();
      if (sent.error) return setError(errorMessage(sent.error));

      setVerifying(true);
    } catch {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsLoading(true);
      const result = await signUp.verifications.verifyEmailCode({ code });
      if (result.error) return setError(errorMessage(result.error));

      if (signUp.status === 'complete') await goToDashboard();
      else setError('Sign up is not complete. Please try again.');
    } catch {
      setError('Failed to verify the code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = async (strategy: 'oauth_google' | 'oauth_apple') => {
    setError('');
    const { error: clerkError } = await signUp.sso({
      strategy,
      redirectCallbackUrl: '/auth/sso-callback',
      redirectUrl: '/dashboard',
    });
    if (clerkError) setError(errorMessage(clerkError));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left column - form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12">
        <h1 className="text-4xl font-bold text-brand-950 mb-2">Create Account</h1>
        <p className="text-brand-700 mb-8">Start your learning journey today</p>

        {verifying ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-brand-700">
              We sent a verification code to {email}. Enter it below.
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Verification code"
              className={inputClass}
              disabled={isLoading}
            />
            <ErrorBox message={error} />
            <button type="submit" disabled={isLoading} className={buttonClass}>
              {isLoading ? 'Verifying...' : 'Verify email'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <Field label="Full Name">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className={inputClass}
                disabled={isLoading}
              />
            </Field>

            <Field label="Email Address">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
                disabled={isLoading}
              />
            </Field>

            <Field label="Password">
              <PasswordInput value={password} onChange={setPassword} disabled={isLoading} />
            </Field>

            <Field label="Confirm Password">
              <PasswordInput
                value={confirmPassword}
                onChange={setConfirmPassword}
                disabled={isLoading}
              />
            </Field>

            <ErrorBox message={error} />

            <button type="submit" disabled={isLoading} className={`${buttonClass} mt-6`}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div id="clerk-captcha" />
          </form>
        )}


        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-brand-200" />
          <span className="text-sm text-brand-600">OR</span>
          <div className="flex-1 h-px bg-brand-200" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => handleSocial('oauth_google')} className={socialClass}>
            <Image src="/google.png" alt="Google" width={20} height={20} />
            Google
          </button>
          <button type="button" onClick={() => handleSocial('oauth_apple')} className={socialClass}>
            <Image src="/apple.png" alt="Apple" width={20} height={20} />
            Apple
          </button>
        </div>

        <p className="text-center text-sm text-brand-700 mt-6">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign In
          </Link>
        </p>
      </div>

      {/* Right column - promotional */}
      <div
        className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-center items-center p-12"
        style={{
          backgroundImage: "url('/TechTree%20Studies%20Network%20Logo.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-brand-900/95 via-brand-800/90 to-brand-950/95" />
      </div>
    </div>
  );
}