"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white flex flex-col overflow-hidden">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="border-b border-zinc-200 bg-white/50 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="mx-auto w-full max-w-[1400px] flex items-center justify-between px-4 sm:px-6 h-14">
          <div className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-900 rounded-sm" />
            <span className="hidden sm:inline">Banner Studio</span>
          </div>
          <div className="flex gap-3 sm:gap-4 items-center">
            <a href="https://github.com/darshmahadevia/linkedin-banner" target="_blank" className="text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors">GitHub</a>
            <Link href="/editor">
              <Button size="sm" className="h-8 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs">
                Open App
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center relative bg-white">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        
        {/* Abstract Dynamic Shapes */}
        <motion.div 
          animate={{ 
            rotate: [0, 90, 0],
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] md:w-[1000px] md:h-[600px] bg-zinc-200 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            rotate: [0, -90, 0],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] md:w-[600px] md:h-[400px] bg-emerald-100 blur-[100px] rounded-full mix-blend-multiply pointer-events-none" 
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-32 text-center flex flex-col items-center">
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50/80 backdrop-blur-sm px-3 py-1 text-[10px] sm:text-[11px] font-mono font-medium text-zinc-600 mb-6 sm:mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Vercel Ready
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 leading-[1.05] mb-6 sm:mb-8 max-w-4xl px-2"
          >
            Dev&apos;s <br className="hidden sm:block"/> LinkedIn Customiser
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl text-base sm:text-lg text-zinc-500 mb-10 sm:mb-12 leading-relaxed px-4"
          >
            A developer-focused tool to generate pixel-perfect, bold, and minimal LinkedIn banners. No design skills required. Create yours in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <Link href="/editor" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-sm shadow-xl shadow-zinc-900/20 transition-all hover:scale-105 active:scale-95">
                Start Building
              </Button>
            </Link>
            <a href="https://github.com/darshmahadevia/linkedin-banner" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 rounded-md border-zinc-200 bg-white hover:bg-zinc-50 font-mono text-sm shadow-sm transition-all hover:scale-105 active:scale-95">
                View Source
              </Button>
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
