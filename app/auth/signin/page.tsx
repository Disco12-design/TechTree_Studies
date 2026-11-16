"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { validateEmail } from "@/lib/authStorage";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-brand-200 text-brand-900 placeholder-brand-400 focus:border-brand-500 focus:outline-none transition";

const socials = [
  { strategy: "oauth_google", name: "Google", icon: "/google.png" },
  { strategy: "oauth_apple", name: "Apple", icon: "/apple.png" },
] as const;

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { isLoaded, isSignedIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Clerk keeps the session in a cookie, so signed-in users skip this page
  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace("/dashboard");
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) return null;

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (!validateEmail(email)) return setError("Please enter a valid email");
    if (!password) return setError("Password is required");

    setError("");
    setIsLoading(true);
    try {
      const { error: clerkError } = await signIn.password({
        emailAddress: email,
        password,
      });
      if (clerkError) return setError(clerkError.longMessage ?? clerkError.message);

      if (signIn.status !== "complete") {
        return setError("Additional verification is required. Please contact support.");
      }

      // Finalizing creates the Clerk session (stored in a cookie)
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/dashboard");
          if (url.startsWith("http")) window.location.href = url;
          else router.push(url);
        },
      });
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = async (strategy: (typeof socials)[number]["strategy"]) => {
    setError("");
    const { error: clerkError } = await signIn.sso({
      strategy,
      redirectCallbackUrl: "/auth/sso-callback",
      redirectUrl: "/dashboard",
    });
    if (clerkError) setError(clerkError.longMessage ?? clerkError.message);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12">
        <h1 className="text-4xl font-bold text-brand-950 mb-2">Welcome Back!</h1>
        <p className="text-brand-700 mb-8">Please choose your information</p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-900 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className={`${inputClass} pr-12`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-500 hover:text-brand-700 transition"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-950 text-white py-3 rounded-lg font-semibold transition hover:bg-brand-900 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? "Signing in..." : "Continue with email"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-brand-200" />
          <span className="text-sm text-brand-600">OR</span>
          <div className="flex-1 h-px bg-brand-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {socials.map(({ strategy, name, icon }) => (
            <button
              key={strategy}
              type="button"
              onClick={() => handleSocial(strategy)}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-brand-200 rounded-lg hover:bg-brand-50 transition font-medium text-brand-900"
            >
              <Image src={icon} alt={name} width={20} height={20} />
              {name}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-brand-700 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right - Promotional */}
      <div
        className="hidden lg:block w-1/2 relative overflow-hidden"
        style={{
          backgroundImage: "url('/TechTree%20Studies%20Network%20Logo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-brand-900/95 via-brand-800/90 to-brand-950/95" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-700 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  );
}