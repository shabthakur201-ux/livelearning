import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6">
      {/* Subtle gradient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        {/* Avatar placeholder */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
          R
        </div>

        {/* Greeting */}
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Rohit
          </span>
        </h1>

        <p className="mt-3 text-lg text-slate-400">
          Ready to build something great today?
        </p>

        {/* Simple action buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/Register">
          <button  className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors">
            Open Dashboard
          </button>
          </Link>
          <button className="rounded-full border border-slate-700 bg-transparent px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            View Projects
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-slate-600">
          Personal Project · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}