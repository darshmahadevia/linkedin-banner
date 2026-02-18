"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import BannerPreview from "@/components/banner-preview";
import { presets } from "@/lib/presets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    const observer = new ResizeObserver(updateScale);
    observer.observe(previewRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f3ed] text-zinc-900">
      <div className="relative overflow-hidden">
        <div className="absolute -left-24 top-[-120px] h-64 w-64 rounded-full bg-[#f6d7b8] blur-[90px]" />
        <div className="absolute right-[-80px] top-12 h-72 w-72 rounded-full bg-[#f3c6a5] blur-[110px]" />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-black/10 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600">
              Banner Studio
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
                LinkedIn Banner Generator
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
                Pick a preset, fine-tune your details, and export a 1584 x 396
                banner built for the exact LinkedIn aspect ratio.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <Card className="border-black/10 bg-white/80 p-6 shadow-[0_25px_70px_-60px_rgba(15,23,42,0.45)]">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Preset
                </p>
                <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                  <SelectTrigger className="mt-3 w-full">
                    <SelectValue placeholder="Choose preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {presets.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-2 text-xs text-zinc-500">{preset.description}</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    className="mt-2"
                    value={fields.name}
                    onChange={(event) =>
                      setFields((prev) => ({ ...prev, name: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="headline"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Headline
                  </label>
                  <Input
                    id="headline"
                    className="mt-2"
                    value={fields.headline}
                    onChange={(event) =>
                      setFields((prev) => ({
                        ...prev,
                        headline: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Company
                  </label>
                  <Input
                    id="company"
                    className="mt-2"
                    value={fields.company}
                    onChange={(event) =>
                      setFields((prev) => ({
                        ...prev,
                        company: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Location
                  </label>
                  <Input
                    id="location"
                    className="mt-2"
                    value={fields.location}
                    onChange={(event) =>
                      setFields((prev) => ({
                        ...prev,
                        location: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Website
                  </label>
                  <Input
                    id="website"
                    className="mt-2"
                    value={fields.website}
                    onChange={(event) =>
                      setFields((prev) => ({
                        ...prev,
                        website: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    className="mt-2"
                    value={fields.email}
                    onChange={(event) =>
                      setFields((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    className="mt-2"
                    value={fields.phone}
                    onChange={(event) =>
                      setFields((prev) => ({
                        ...prev,
                        phone: event.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="tagline"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Tagline
                  </label>
                  <Textarea
                    id="tagline"
                    className="mt-2 min-h-[88px]"
                    value={fields.tagline}
                    onChange={(event) =>
                      setFields((prev) => ({
                        ...prev,
                        tagline: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-name"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show name
                  </label>
                  <Switch
                    id="show-name"
                    checked={fields.showName}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showName: value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-headline"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show headline
                  </label>
                  <Switch
                    id="show-headline"
                    checked={fields.showHeadline}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showHeadline: value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-company"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show company
                  </label>
                  <Switch
                    id="show-company"
                    checked={fields.showCompany}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showCompany: value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-location"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show location
                  </label>
                  <Switch
                    id="show-location"
                    checked={fields.showLocation}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showLocation: value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-website"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show website
                  </label>
                  <Switch
                    id="show-website"
                    checked={fields.showWebsite}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showWebsite: value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-email"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show email
                  </label>
                  <Switch
                    id="show-email"
                    checked={fields.showEmail}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showEmail: value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-phone"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show phone
                  </label>
                  <Switch
                    id="show-phone"
                    checked={fields.showPhone}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showPhone: value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-tagline"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show tagline
                  </label>
                  <Switch
                    id="show-tagline"
                    checked={fields.showTagline}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showTagline: value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="show-footer"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500"
                  >
                    Show footer
                  </label>
                  <Switch
                    id="show-footer"
                    checked={fields.showFooter}
                    onCheckedChange={(value) =>
                      setFields((prev) => ({ ...prev, showFooter: value }))
                    }
                  />
                </div>
              </div>

              <Button
                className="mt-2 h-11 w-full bg-zinc-900 text-white hover:bg-zinc-800"
                onClick={handleExport}
                disabled={isExporting}
              >
                {isExporting ? "Exporting..." : "Download PNG"}
              </Button>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Preview
                </p>
                <p className="text-sm text-zinc-500">
                  {targetWidth} x {targetHeight} px
                </p>
              </div>
              <Button
                variant="outline"
                className="border-black/20 bg-white/70"
                onClick={() => setFields(initialFields)}
              >
                Reset
              </Button>
            </div>

            <div className="rounded-[32px] border border-black/10 bg-white/70 p-4">
              <div
                ref={previewRef}
                className="relative overflow-hidden"
                style={{ aspectRatio: `${targetWidth} / ${targetHeight}` }}
              >
                <div
                  className="absolute left-0 top-0"
                  style={{
                    width: `${targetWidth}px`,
                    height: `${targetHeight}px`,
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <div
                    ref={bannerRef}
                    className="h-full w-full"
                    style={{ width: `${targetWidth}px`, height: `${targetHeight}px` }}
                  >
                    <BannerPreview preset={preset} fields={fields} />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.55)]" />
              </div>
            </div>

            <div className="rounded-[24px] border border-black/10 bg-white/70 p-4 text-sm text-zinc-600">
              Export tip: keep key text inside the center area. LinkedIn may
              overlay the profile photo on the left.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
