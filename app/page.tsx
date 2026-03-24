import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-zinc-200 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto w-full max-w-[1400px] flex items-center justify-between px-6 h-14">
          <div className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-900 rounded-sm" />
            Banner Studio
          </div>
          <div className="flex gap-4 items-center">
            <a href="https://github.com/darshmahadevia/linkedin-banner" target="_blank" className="text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors">GitHub</a>
            <Link href="/editor">
              <Button size="sm" className="h-8 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs">
                Open App
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Abstract shapes for high-end aesthetic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-zinc-100 blur-[120px] rounded-full opacity-60 mix-blend-multiply pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50/80 backdrop-blur-sm px-3 py-1 text-[11px] font-mono font-medium text-zinc-600 mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Vercel Ready
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 leading-[1.05] mb-8 max-w-4xl">
            SaaS Aesthetic <br className="hidden md:block"/> LinkedIn Banners.
          </h1>
          
          <p className="max-w-xl text-lg text-zinc-500 mb-12 leading-relaxed">
            A developer-focused tool to generate pixel-perfect, bold, and minimal LinkedIn banners. No design skills required. Create yours in seconds.
          </p>
          
          <div className="flex items-center gap-4">
            <Link href="/editor">
              <Button size="lg" className="h-12 px-8 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-sm shadow-xl shadow-zinc-900/20 transition-all hover:scale-105 active:scale-95">
                Start Building
              </Button>
            </Link>
            <a href="https://github.com/darshmahadevia/linkedin-banner" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg" className="h-12 px-8 rounded-md border-zinc-200 bg-white hover:bg-zinc-50 font-mono text-sm shadow-sm transition-all hover:scale-105 active:scale-95">
                View Source
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
