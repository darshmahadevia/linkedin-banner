"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import BannerPreview from "@/components/banner-preview";
import { presets } from "@/lib/presets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const targetWidth = 1584;
const targetHeight = 396;

const initialFields = {
  name: "Jordan Kim",
  headline: "Product Strategist",
  company: "Northwind Labs",
  location: "Seattle, WA",
  website: "jordankim.com",
  email: "hello@jordankim.com",
  phone: "+1 (415) 555-0132",
  tagline: "Designing calm, human-first product journeys that compound over time.",
  showName: true,
  showHeadline: true,
  showCompany: true,
  showLocation: true,
  showWebsite: true,
  showTagline: true,
  showEmail: true,
  showPhone: false,
  showFooter: true,
};

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState(presets[0].id);
  const [fields, setFields] = useState(initialFields);
  const [isExporting, setIsExporting] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const preset = useMemo(
    () => presets.find((item) => item.id === selectedPreset) ?? presets[0],
    [selectedPreset]
  );

  const handleExport = async () => {
    if (!bannerRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(bannerRef.current, {
        cacheBust: true,
        width: targetWidth,
        height: targetHeight,
        pixelRatio: 1,
      });
      const link = document.createElement("a");
      link.download = `linkedin-banner-${preset.id}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (!previewRef.current) return;
    const updateScale = () => {
      const availableWidth = previewRef.current?.offsetWidth || targetWidth;
      const nextScale = Math.min(1, availableWidth / targetWidth);
      setPreviewScale(nextScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 pb-32 transition-colors duration-300">
      {/* Navbar */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 h-14">
          <div className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-900 dark:bg-zinc-100 rounded-sm" />
            Banner Studio
          </div>
          <div className="flex gap-4 items-center">
            <a href="https://github.com/darshmahadevia/linkedin-banner" target="_blank" className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">GitHub</a>
            <ThemeToggle />
            <Button size="sm" className="h-8 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 font-mono text-xs" onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}>
              Start Generating
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-[11px] font-mono font-medium text-zinc-600 dark:text-zinc-300 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Vercel Ready
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-6 max-w-4xl">
            Create your SaaS aesthetic <br className="hidden md:block"/> LinkedIn banner in seconds.
          </h1>
          <p className="max-w-xl text-lg text-zinc-500 dark:text-zinc-400 mb-10">
            A developer-focused tool to generate pixel-perfect, bold, and minimal LinkedIn banners. No design skills required.
          </p>
          <Button size="lg" className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 font-mono text-sm px-8" onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}>
            Build Your Banner
          </Button>
        </div>
      </section>

      {/* Generator Workspace */}
      <section id="generator" className="mx-auto max-w-[1400px] px-6 pt-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
          
          {/* Preview Panel - Sticky */}
          <div className="sticky top-20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Preview</h2>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">1584 x 396</div>
            </div>
            
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-sm">
              <div className="rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 relative">
                <div ref={previewRef} className="w-full relative bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center overflow-hidden" style={{ aspectRatio: `${targetWidth}/${targetHeight}` }}>
                  <div
                    style={{
                      width: targetWidth,
                      height: targetHeight,
                      transform: `scale(${previewScale})`,
                      transformOrigin: "top left",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >
                    {/* Ensure BannerRef has a neutral background that isn't dependent on dark mode class itself for export, 
                        Wait, html-to-image might capture dark mode background, but presets handle their own background anyway */}
                    <div ref={bannerRef} className="h-full w-full bg-white dark:bg-zinc-950">
                      <BannerPreview preset={preset} fields={fields} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 font-mono"
              size="lg"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Export to PNG"}
            </Button>
          </div>

          {/* Settings Panel */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6 transition-colors duration-300">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">Configuration</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2 block">
                    Preset Theme
                  </label>
                  <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                    <SelectTrigger className="w-full rounded-md border-zinc-200 dark:border-zinc-700 bg-transparent font-mono text-sm dark:text-zinc-100">
                      <SelectValue placeholder="Choose preset" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                      {presets.map((item) => (
                        <SelectItem key={item.id} value={item.id} className="font-mono text-sm dark:focus:bg-zinc-800 dark:text-zinc-100">
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500 font-mono">{preset.description}</p>
                </div>

                <Separator className="bg-zinc-100 dark:bg-zinc-800" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Name</label>
                    <Switch checked={fields.showName} onCheckedChange={(c) => setFields(p => ({...p, showName: c}))} className="scale-75" />
                  </div>
                  {fields.showName && (
                    <Input className="font-mono text-sm border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-zinc-100" value={fields.name} onChange={(e) => setFields(p => ({...p, name: e.target.value}))} />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Headline</label>
                    <Switch checked={fields.showHeadline} onCheckedChange={(c) => setFields(p => ({...p, showHeadline: c}))} className="scale-75" />
                  </div>
                  {fields.showHeadline && (
                    <Input className="font-mono text-sm border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-zinc-100" value={fields.headline} onChange={(e) => setFields(p => ({...p, headline: e.target.value}))} />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Tagline</label>
                    <Switch checked={fields.showTagline} onCheckedChange={(c) => setFields(p => ({...p, showTagline: c}))} className="scale-75" />
                  </div>
                  {fields.showTagline && (
                    <Textarea className="font-mono text-sm border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-zinc-100 resize-none" rows={3} value={fields.tagline} onChange={(e) => setFields(p => ({...p, tagline: e.target.value}))} />
                  )}
                </div>

                <Separator className="bg-zinc-100 dark:bg-zinc-800" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Company</label>
                    <Switch checked={fields.showCompany} onCheckedChange={(c) => setFields(p => ({...p, showCompany: c}))} className="scale-75" />
                  </div>
                  {fields.showCompany && (
                    <Input className="font-mono text-sm border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-zinc-100" value={fields.company} onChange={(e) => setFields(p => ({...p, company: e.target.value}))} />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Location</label>
                    <Switch checked={fields.showLocation} onCheckedChange={(c) => setFields(p => ({...p, showLocation: c}))} className="scale-75" />
                  </div>
                  {fields.showLocation && (
                    <Input className="font-mono text-sm border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-zinc-100" value={fields.location} onChange={(e) => setFields(p => ({...p, location: e.target.value}))} />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Website</label>
                    <Switch checked={fields.showWebsite} onCheckedChange={(c) => setFields(p => ({...p, showWebsite: c}))} className="scale-75" />
                  </div>
                  {fields.showWebsite && (
                    <Input className="font-mono text-sm border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-zinc-100" value={fields.website} onChange={(e) => setFields(p => ({...p, website: e.target.value}))} />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Email</label>
                    <Switch checked={fields.showEmail} onCheckedChange={(c) => setFields(p => ({...p, showEmail: c}))} className="scale-75" />
                  </div>
                  {fields.showEmail && (
                    <Input className="font-mono text-sm border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-zinc-100" value={fields.email} onChange={(e) => setFields(p => ({...p, email: e.target.value}))} />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Phone</label>
                    <Switch checked={fields.showPhone} onCheckedChange={(c) => setFields(p => ({...p, showPhone: c}))} className="scale-75" />
                  </div>
                  {fields.showPhone && (
                    <Input className="font-mono text-sm border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-zinc-100" value={fields.phone} onChange={(e) => setFields(p => ({...p, phone: e.target.value}))} />
                  )}
                </div>
                
                <Separator className="bg-zinc-100 dark:bg-zinc-800" />
                
                <div className="flex items-center justify-between gap-4 pt-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">Show Watermark</label>
                  <Switch checked={fields.showFooter} onCheckedChange={(c) => setFields(p => ({...p, showFooter: c}))} className="scale-75" />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
