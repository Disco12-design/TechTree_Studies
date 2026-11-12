"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { validateEmail } from "@/lib/authStorage";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): string | null => {
    if (!validateEmail(email)) return "Please enter a valid email";
    if (!password) return "Password is required";
    return null;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    setError(validationError ?? "");
    if (validationError) return;

    try {
      setIsLoading(true);
      const { error: clerkError } = await signIn.password({
        emailAddress: email,
        password,
      });
      if (clerkError) {
        setError(clerkError.longMessage ?? clerkError.message);
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ decorateUrl }) => {
            const url = decorateUrl("/dashboard");
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url);
            }
          },
        });
      } else {
        setError("Additional verification is required. Please contact support.");
      }
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    const { error: clerkError } = await signIn.sso({
      strategy: "oauth_google",
      redirectCallbackUrl: "/auth/sso-callback",
      redirectUrl: "/dashboard",
    });
    if (clerkError) setError(clerkError.longMessage ?? clerkError.message);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12">
        {/* Form Section */}
        <div>
          <h1 className="text-4xl font-bold text-brand-950 mb-2">
            Welcome Back!
          </h1>
          <p className="text-brand-700 mb-8">Please choose your information</p>

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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-brand-200 text-brand-900 placeholder-brand-400 focus:border-brand-500 focus:outline-none transition"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-500 hover:text-brand-700 transition"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
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
              {isLoading ? "Signing in..." : "Continue with email"}
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
              onClick={handleGoogle}
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
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column - Promotional */}
      <div
        className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-center items-center p-12"
        style={{
          backgroundImage: "url('/TechTree%20Studies%20Network%20Logo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-900/95 via-brand-800/90 to-brand-950/95" />

        {/* Animated Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-700 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  );
}