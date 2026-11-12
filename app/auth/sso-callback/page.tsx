"use client";

import { useEffect } from "react";
import { HandleSSOCallback } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SSOCallbackPage() {
  const router = useRouter();

  // If the user cancels at Google, no callback fires, so return to sign in
  useEffect(() => {
    const timer = setTimeout(() => router.replace("/auth/signin"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <p className="p-8 text-center text-brand-700">Signing you in...</p>
      <HandleSSOCallback
        navigateToApp={({ decorateUrl }) => {
          const url = decorateUrl("/dashboard");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url);
          }
        }}
        navigateToSignIn={() => router.push("/auth/signin")}
        navigateToSignUp={() => router.push("/auth/signup")}
      />
    </>
  );
}
