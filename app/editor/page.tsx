"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import Link from "next/link";
import BannerPreview from "@/components/banner-preview";
import { presets } from "@/lib/presets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export default function EditorPage() {
  const [selectedPreset, setSelectedPreset] = useState(presets[0].id);
  const [fields, setFields] = useState(initialFields);
  const [isExporting, setIsExporting] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
        pixelRatio: 2, // higher quality export
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
    if (!containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      // Add some padding (e.g. 64px on each side)
      const availableWidth = containerRef.current.offsetWidth - 128;
      const nextScale = Math.min(1, availableWidth / targetWidth);
      setPreviewScale(nextScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white overflow-hidden">
      {/* Editor Navbar */}
      <nav className="h-14 border-b border-zinc-200 bg-white flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
            <div className="w-4 h-4 bg-zinc-900 rounded-sm" />
            Banner Studio
          </Link>
          <div className="h-4 w-px bg-zinc-200" />
          <span className="text-xs font-mono text-zinc-500">Untitled Workspace</span>
        </div>
        
        <Button 
          size="sm" 
          className="h-8 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs shadow-md shadow-zinc-900/10 transition-all active:scale-95"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Export PNG"}
        </Button>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings Sidebar (Left) */}
        <aside className="w-[360px] h-full overflow-y-auto border-r border-zinc-200 bg-white shrink-0 scrollbar-hide custom-scrollbar">
          <div className="p-6 flex flex-col gap-6">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
                  Preset Theme
                </label>
                <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                  <SelectTrigger className="w-full rounded-md border-zinc-200 font-mono text-sm h-10 shadow-sm focus:ring-1 focus:ring-zinc-900">
                    <SelectValue placeholder="Choose preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {presets.map((item) => (
                      <SelectItem key={item.id} value={item.id} className="font-mono text-sm">
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-2 text-[11px] text-zinc-500 font-mono">{preset.description}</p>
              </div>

              <Separator className="bg-zinc-100" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 block">Name</label>
                  <Switch checked={fields.showName} onCheckedChange={(c) => setFields(p => ({...p, showName: c}))} className="scale-75 data-[state=checked]:bg-zinc-900" />
                </div>
                {fields.showName && (
                  <Input className="font-mono text-sm border-zinc-200 h-9 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-900" value={fields.name} onChange={(e) => setFields(p => ({...p, name: e.target.value}))} />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 block">Headline</label>
                  <Switch checked={fields.showHeadline} onCheckedChange={(c) => setFields(p => ({...p, showHeadline: c}))} className="scale-75 data-[state=checked]:bg-zinc-900" />
                </div>
                {fields.showHeadline && (
                  <Input className="font-mono text-sm border-zinc-200 h-9 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-900" value={fields.headline} onChange={(e) => setFields(p => ({...p, headline: e.target.value}))} />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 block">Tagline</label>
                  <Switch checked={fields.showTagline} onCheckedChange={(c) => setFields(p => ({...p, showTagline: c}))} className="scale-75 data-[state=checked]:bg-zinc-900" />
                </div>
                {fields.showTagline && (
                  <Textarea className="font-mono text-sm border-zinc-200 resize-none shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-900" rows={3} value={fields.tagline} onChange={(e) => setFields(p => ({...p, tagline: e.target.value}))} />
                )}
              </div>

              <Separator className="bg-zinc-100" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 block">Company</label>
                  <Switch checked={fields.showCompany} onCheckedChange={(c) => setFields(p => ({...p, showCompany: c}))} className="scale-75 data-[state=checked]:bg-zinc-900" />
                </div>
                {fields.showCompany && (
                  <Input className="font-mono text-sm border-zinc-200 h-9 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-900" value={fields.company} onChange={(e) => setFields(p => ({...p, company: e.target.value}))} />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 block">Location</label>
                  <Switch checked={fields.showLocation} onCheckedChange={(c) => setFields(p => ({...p, showLocation: c}))} className="scale-75 data-[state=checked]:bg-zinc-900" />
                </div>
                {fields.showLocation && (
                  <Input className="font-mono text-sm border-zinc-200 h-9 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-900" value={fields.location} onChange={(e) => setFields(p => ({...p, location: e.target.value}))} />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 block">Website</label>
                  <Switch checked={fields.showWebsite} onCheckedChange={(c) => setFields(p => ({...p, showWebsite: c}))} className="scale-75 data-[state=checked]:bg-zinc-900" />
                </div>
                {fields.showWebsite && (
                  <Input className="font-mono text-sm border-zinc-200 h-9 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-900" value={fields.website} onChange={(e) => setFields(p => ({...p, website: e.target.value}))} />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 block">Email</label>
                  <Switch checked={fields.showEmail} onCheckedChange={(c) => setFields(p => ({...p, showEmail: c}))} className="scale-75 data-[state=checked]:bg-zinc-900" />
                </div>
                {fields.showEmail && (
                  <Input className="font-mono text-sm border-zinc-200 h-9 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-900" value={fields.email} onChange={(e) => setFields(p => ({...p, email: e.target.value}))} />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 block">Phone</label>
                  <Switch checked={fields.showPhone} onCheckedChange={(c) => setFields(p => ({...p, showPhone: c}))} className="scale-75 data-[state=checked]:bg-zinc-900" />
                </div>
                {fields.showPhone && (
                  <Input className="font-mono text-sm border-zinc-200 h-9 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-900" value={fields.phone} onChange={(e) => setFields(p => ({...p, phone: e.target.value}))} />
                )}
              </div>
              
              <Separator className="bg-zinc-100" />
              
              <div className="flex items-center justify-between gap-4 pt-2 pb-6">
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">Show Watermark</label>
                <Switch checked={fields.showFooter} onCheckedChange={(c) => setFields(p => ({...p, showFooter: c}))} className="scale-75 data-[state=checked]:bg-zinc-400" />
              </div>
              
            </div>
          </div>
        </aside>

        {/* Canvas Area (Right) */}
        <main 
          ref={containerRef}
          className="flex-1 h-full flex flex-col relative bg-[#f9fafb]"
        >
          {/* subtle dot background for the canvas to look like a design tool */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="flex-1 flex items-center justify-center p-8 relative z-10">
            <div 
              className="rounded-xl overflow-hidden shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-200/50 bg-white"
              style={{
                width: targetWidth * previewScale,
                height: targetHeight * previewScale,
              }}
            >
              <div
                style={{
                  width: targetWidth,
                  height: targetHeight,
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                }}
              >
                <div ref={bannerRef} className="h-full w-full bg-white">
                  <BannerPreview preset={preset} fields={fields} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Canvas Status */}
          <div className="h-10 shrink-0 border-t border-zinc-200 bg-white/80 backdrop-blur flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Canvas Active</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              {targetWidth} × {targetHeight}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
