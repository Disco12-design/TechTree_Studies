import Image from "next/image";
import Link from "next/link";
import { images } from "./types/assets";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-brand-50 px-4 py-10">
      <section className="w-full max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src={images.smallLogo}
            alt="TechTree Studies"
            width={120}
            height={120}
            priority
            className="h-28 w-28 object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            TechTree Studies
          </p>
          <h1 className="mt-4 text-4xl font-bold text-brand-950">
            Master Cybersecurity Knowledge
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Build your expertise with structured study notes, practice exams, and progress tracking.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand-600 px-8 py-3 font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/study-notes"
            className="rounded-lg border border-brand-200 px-8 py-3 font-semibold text-brand-900 transition hover:border-brand-400 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
          >
            Browse Study Notes
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Jump into your learning journey and start building your cybersecurity expertise today.
        </p>
      </section>
    </div>
  );
}
