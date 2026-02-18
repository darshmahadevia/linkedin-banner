import type { CSSProperties } from "react";
import type { BannerPreset } from "@/lib/presets";

type BannerFields = {
  name: string;
  headline: string;
  company: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  tagline: string;
  showName: boolean;
  showHeadline: boolean;
  showCompany: boolean;
  showLocation: boolean;
  showWebsite: boolean;
  showTagline: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showFooter: boolean;
};

type BannerPreviewProps = {
  preset: BannerPreset;
  fields: BannerFields;
};

const grainSvg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.35'/></svg>";

const patternStyles: Record<BannerPreset["pattern"], CSSProperties> = {
  grain: {
    backgroundImage: `url("${grainSvg}")`,
  },
  grid: {
    backgroundImage:
      "linear-gradient(90deg,rgba(0,0,0,0.25)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.25)_1px,transparent_1px)",
    backgroundSize: "36px 36px",
  },
  rings: {
    backgroundImage:
      "radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.4)_0,rgba(255,255,255,0)_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.35)_0,rgba(255,255,255,0)_40%)",
  },
  dots: {
    backgroundImage: "radial-gradient(rgba(0,0,0,0.25)_1px,transparent_1px)",
    backgroundSize: "18px 18px",
  },
};

export default function BannerPreview({ preset, fields }: BannerPreviewProps) {
  const isCenter = preset.layout === "center";
  const isSplit = preset.layout === "split";
  const hasTitle = fields.showName || fields.showHeadline;
  const hasMeta = fields.showCompany || fields.showLocation || fields.showEmail || fields.showPhone;
  const showFooterRow = fields.showFooter || fields.showWebsite;
  const footerRowAlignment = fields.showFooter && fields.showWebsite
    ? "justify-between"
    : fields.showWebsite
      ? "justify-end"
      : "justify-start";
  const centerMeta = [
    fields.showCompany ? fields.company : "",
    fields.showLocation ? fields.location : "",
    fields.showWebsite ? fields.website : "",
    fields.showEmail ? fields.email : "",
    fields.showPhone ? fields.phone : "",
  ].filter((item): item is string => Boolean(item));

  const layoutStyles: Record<BannerPreset["layout"], string> = {
    stack: "pl-[360px] pr-16 py-10",
    split: "pl-[360px] pr-12 py-10",
    center: "pl-[360px] pr-16 py-10",
  };

  const nameStyles: Record<BannerPreset["layout"], string> = {
    stack: "text-[44px]",
    split: "text-[40px]",
    center: "text-[46px]",
  };

  const headlineStyles: Record<BannerPreset["layout"], string> = {
    stack: "text-[18px]",
    split: "text-[16px]",
    center: "text-[18px]",
  };

  const topSectionStyles: Record<BannerPreset["layout"], string> = {
    stack: "flex items-start justify-between",
    split: "flex items-start justify-between gap-10",
    center: "",
  };

  const metaStackStyles: Record<BannerPreset["layout"], string> = {
    stack: "flex flex-col items-end gap-2 text-right text-[15px] font-medium",
    split: "grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] font-semibold",
    center: "flex flex-col items-end gap-2 text-right text-[15px] font-medium",
  };

  const metaLabelStyles: Record<BannerPreset["layout"], string> = {
    stack: "",
    split: "uppercase tracking-[0.2em] text-[10px] text-current/70",
    center: "",
  };

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: preset.gradient,
          color: preset.text,
        }}
      >
        <div className="absolute inset-0 opacity-[0.12] mix-blend-soft-light">
          <div className="absolute inset-0" style={patternStyles[preset.pattern]} />
        </div>

        <div className="absolute inset-0">
          {preset.frame === "ink" && (
            <div className="pointer-events-none absolute inset-6 rounded-[22px] border border-black/40" />
          )}
          {preset.frame === "paper" && (
            <div className="pointer-events-none absolute inset-5 rounded-[22px] border border-black/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]" />
          )}
        </div>

        <div
          className={`relative flex h-full flex-col justify-between ${layoutStyles[preset.layout]}`}
        >
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[320px] bg-gradient-to-r from-black/15 via-black/0 to-transparent" />
          {isCenter ? (
            <div className="flex flex-col items-center gap-6 text-center">
              {(hasTitle || fields.showTagline) && (
                <div className="max-w-[70%]">
                  {fields.showName && (
                    <div
                      className={`font-display ${nameStyles[preset.layout]} font-semibold leading-[1.05] tracking-tight`}
                    >
                      {fields.name}
                    </div>
                  )}
                  {fields.showHeadline && (
                    <div
                      className={`mt-2 ${headlineStyles[preset.layout]} font-medium uppercase tracking-[0.24em]`}
                      style={{ color: preset.accent }}
                    >
                      {fields.headline}
                    </div>
                  )}
                  {fields.showTagline && (
                    <div
                      className="mt-5 text-[17px] leading-[1.55]"
                      style={{ color: preset.softText }}
                    >
                      {fields.tagline}
                    </div>
                  )}
                </div>
              )}
              {centerMeta.length > 0 && (
                <div
                  className="flex flex-wrap items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: preset.softText }}
                >
                  {centerMeta.map((item, index) => (
                    <span key={`${item}-${index}`} className="flex items-center gap-3">
                      <span>{item}</span>
                      {index < centerMeta.length - 1 && (
                        <span className="h-1 w-1 rounded-full bg-current" />
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={topSectionStyles[preset.layout]}>
              {(hasTitle || fields.showTagline) && (
                <div className="max-w-[65%]">
                  {fields.showName && (
                    <div
                      className={`font-display ${nameStyles[preset.layout]} font-semibold leading-[1.05] tracking-tight`}
                    >
                      {fields.name}
                    </div>
                  )}
                  {fields.showHeadline && (
                    <div
                      className={`mt-2 ${headlineStyles[preset.layout]} font-medium uppercase tracking-[0.24em]`}
                      style={{ color: preset.accent }}
                    >
                      {fields.headline}
                    </div>
                  )}
                  {fields.showTagline && (
                    <div
                      className="mt-5 max-w-[80%] text-[17px] leading-[1.55]"
                      style={{ color: preset.softText }}
                    >
                      {fields.tagline}
                    </div>
                  )}
                </div>
              )}
              {hasMeta && (
                <div className={metaStackStyles[preset.layout]} style={{ color: preset.softText }}>
                  {isSplit ? (
                    <>
                      {fields.showCompany && (
                        <>
                          <span className={metaLabelStyles[preset.layout]}>Company</span>
                          <span>{fields.company}</span>
                        </>
                      )}
                      {fields.showLocation && (
                        <>
                          <span className={metaLabelStyles[preset.layout]}>Location</span>
                          <span>{fields.location}</span>
                        </>
                      )}
                      {fields.showEmail && (
                        <>
                          <span className={metaLabelStyles[preset.layout]}>Email</span>
                          <span>{fields.email}</span>
                        </>
                      )}
                      {fields.showPhone && (
                        <>
                          <span className={metaLabelStyles[preset.layout]}>Phone</span>
                          <span>{fields.phone}</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {fields.showCompany && <span>{fields.company}</span>}
                      {fields.showLocation && <span>{fields.location}</span>}
                      {fields.showEmail && <span>{fields.email}</span>}
                      {fields.showPhone && <span>{fields.phone}</span>}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {!isCenter && showFooterRow && (
            <div className={`flex items-center ${footerRowAlignment}`}>
              {fields.showFooter && (
                <div
                  className="flex items-center gap-4 text-[14px] uppercase tracking-[0.32em]"
                  style={{ color: preset.accent }}
                >
                  <span className="h-[1px] w-20 bg-current" />
                  <span>LinkedIn Banner</span>
                </div>
              )}
              {fields.showWebsite && (
                <div className="text-[15px] font-semibold" style={{ color: preset.text }}>
                  {fields.website}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
