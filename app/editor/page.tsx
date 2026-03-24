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
  layoutOverride: "preset",
  showSafeZone: true,
};

export default function EditorPage() {
  const [selectedPreset, setSelectedPreset] = useState(presets[0].id);
  const [fields, setFields] = useState(initialFields);
  const [isExporting, setIsExporting] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const preset = useMemo(() => {
    const base = presets.find((item) => item.id === selectedPreset) ?? presets[0];
    if (fields.layoutOverride && fields.layoutOverride !== "preset") {
      return { ...base, layout: fields.layoutOverride as any };
    }
    return base;
  }, [selectedPreset, fields.layoutOverride]);

  const handleExport = async () => {
    if (!bannerRef.current) return;
    setIsExporting(true);
    // Hide safe zone before export
    const previousSafeZone = fields.showSafeZone;
    setFields(prev => ({ ...prev, showSafeZone: false }));
    
    // Give state time to update
    await new Promise(resolve => setTimeout(resolve, 50));
    
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
      setFields(prev => ({ ...prev, showSafeZone: previousSafeZone }));
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      const isMobile = window.innerWidth < 1024;
      const paddingX = isMobile ? 32 : 128;
      const paddingY = isMobile ? 32 : 128;
      
      const availableWidth = containerRef.current.offsetWidth - paddingX;
      const availableHeight = containerRef.current.offsetHeight - paddingY;
      
      const scaleX = availableWidth / targetWidth;
      const scaleY = availableHeight / targetHeight;
      
      // Take the smaller scale to ensure it fits both horizontally and vertically
      const nextScale = Math.min(1, scaleX, scaleY);
      setPreviewScale(Math.max(0.1, nextScale));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="h-[100dvh] w-screen flex flex-col bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white overflow-hidden">
      {/* Editor Navbar */}
      <nav className="h-14 border-b border-zinc-200 bg-white flex items-center justify-between px-4 sm:px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
            <div className="w-4 h-4 bg-zinc-900 rounded-sm" />
            <span className="hidden sm:inline">Banner Studio</span>
          </Link>
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

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Settings Sidebar (Left on Desktop, Bottom on Mobile) */}
        <aside className="w-full lg:w-[360px] h-1/2 lg:h-full overflow-y-auto border-t lg:border-t-0 lg:border-r border-zinc-200 bg-white shrink-0 scrollbar-hide order-2 lg:order-1 relative z-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] lg:shadow-none">
          <div className="p-5 lg:p-6 flex flex-col gap-6">
            <div className="space-y-6">
              
              {/* Core Settings */}
              <div className="space-y-4">
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
                </div>
                
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
                    Layout Override
                  </label>
                  <Select value={fields.layoutOverride} onValueChange={(val) => setFields(p => ({...p, layoutOverride: val}))}>
                    <SelectTrigger className="w-full rounded-md border-zinc-200 font-mono text-sm h-10 shadow-sm focus:ring-1 focus:ring-zinc-900">
                      <SelectValue placeholder="Default (from preset)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preset" className="font-mono text-sm">Default (Preset)</SelectItem>
                      <SelectItem value="stack" className="font-mono text-sm">Stack Left</SelectItem>
                      <SelectItem value="split" className="font-mono text-sm">Split Sides</SelectItem>
                      <SelectItem value="center" className="font-mono text-sm">Center Aligned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              
              <div className="space-y-4 pb-6">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">Show Profile Picture Safe Zone</label>
                  <Switch checked={fields.showSafeZone} onCheckedChange={(c) => setFields(p => ({...p, showSafeZone: c}))} className="scale-75 data-[state=checked]:bg-zinc-400" />
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">Show Watermark</label>
                  <Switch checked={fields.showFooter} onCheckedChange={(c) => setFields(p => ({...p, showFooter: c}))} className="scale-75 data-[state=checked]:bg-zinc-400" />
                </div>
              </div>
              
            </div>
          </div>
        </aside>

        {/* Canvas Area (Right on Desktop, Top on Mobile) */}
        <main 
          ref={containerRef}
          className="flex-1 h-1/2 lg:h-full flex flex-col relative bg-[#f9fafb] order-1 lg:order-2"
        >
          {/* subtle dot background for the canvas to look like a design tool */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative z-10 overflow-hidden">
            <div 
              className="rounded-xl overflow-hidden shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-200/50 bg-white relative"
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
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
              >
                <div ref={bannerRef} className="h-full w-full bg-white relative">
                  <BannerPreview preset={preset} fields={fields} />
                  
                  {/* LinkedIn Profile Picture Safe Zone Overlay */}
                  {fields.showSafeZone && (
                    <div className="absolute bottom-[-76px] left-[60px] w-[152px] h-[152px] rounded-full border-[6px] border-white bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center pointer-events-none shadow-2xl">
                      <span className="text-white text-xs font-mono font-bold uppercase tracking-widest text-center px-4 leading-tight opacity-90 drop-shadow-md">Profile Picture</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Canvas Status (Hidden on mobile for more canvas space) */}
          <div className="hidden lg:flex h-10 shrink-0 border-t border-zinc-200 bg-white/80 backdrop-blur items-center justify-between px-4 z-10">
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
