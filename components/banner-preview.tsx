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
  layoutOverride?: string;
  showSafeZone?: boolean;
};

type BannerPreviewProps = {
  preset: BannerPreset;
  fields: BannerFields;
};

const patternStyles: Record<BannerPreset["pattern"], CSSProperties> = {
  none: {},
  grid: {
    backgroundImage:
      "linear-gradient(90deg,var(--tw-gradient-stops) 1px,transparent 1px),linear-gradient(0deg,var(--tw-gradient-stops) 1px,transparent 1px)",
    backgroundSize: "24px 24px",
    opacity: 0.1,
  },
  dots: {
    backgroundImage: "radial-gradient(var(--tw-gradient-stops) 1px,transparent 1px)",
    backgroundSize: "16px 16px",
    opacity: 0.15,
  },
  cross: {
    backgroundImage:
      "linear-gradient(45deg,var(--tw-gradient-stops) 25%,transparent 25%,transparent 75%,var(--tw-gradient-stops) 75%,var(--tw-gradient-stops)),linear-gradient(45deg,var(--tw-gradient-stops) 25%,transparent 25%,transparent 75%,var(--tw-gradient-stops) 75%,var(--tw-gradient-stops))",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 10px 10px",
    opacity: 0.05,
  }
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
    stack: "flex flex-col items-end gap-2 text-right text-[14px]",
    split: "grid grid-cols-2 gap-x-6 gap-y-2 text-[13px]",
    center: "flex flex-col items-end gap-2 text-right text-[14px]",
  };

  const metaLabelStyles: Record<BannerPreset["layout"], string> = {
    stack: "",
    split: "uppercase tracking-widest text-[10px] text-current/70 font-mono",
    center: "",
  };

  return (
    <div className="relative h-full w-full bg-white font-sans antialiased overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: preset.gradient,
          color: preset.text,
        }}
      >
        {preset.pattern !== "none" && (
          <div
            className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen"
            style={{
              ...patternStyles[preset.pattern],
              ["--tw-gradient-stops" as string]: preset.text,
            }}
          />
        )}

        <div className="absolute inset-0">
          {preset.frame === "border" && (
            <div className="pointer-events-none absolute inset-6 rounded-xl border-2 border-current/10" />
          )}
          {preset.frame === "browser" && (
            <div className="pointer-events-none absolute inset-6 rounded-xl border border-current/10 bg-current/5 shadow-2xl backdrop-blur-sm overflow-hidden flex flex-col">
              <div className="h-8 border-b border-current/10 flex items-center px-4 gap-2 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-current" />
                <div className="w-2.5 h-2.5 rounded-full bg-current" />
                <div className="w-2.5 h-2.5 rounded-full bg-current" />
              </div>
            </div>
          )}
          {preset.frame === "terminal" && (
             <div className="pointer-events-none absolute inset-6 rounded-lg border border-current/20 bg-black/40 shadow-inner flex flex-col">
               <div className="h-7 border-b border-current/10 flex items-center px-3 gap-2">
                 <span className="font-mono text-[10px] opacity-50 uppercase tracking-widest">~/banner</span>
               </div>
             </div>
          )}
        </div>

        <div
          className={`relative flex h-full flex-col justify-between ${layoutStyles[preset.layout]}`}
        >
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[320px] bg-gradient-to-r from-current/5 via-current/0 to-transparent opacity-50" />
          {isCenter ? (
            <div className="flex flex-col items-center gap-6 text-center">
              {(hasTitle || fields.showTagline) && (
                <div className="max-w-[70%]">
                  {fields.showName && (
                    <div
                      className={`font-sans ${nameStyles[preset.layout]} font-bold tracking-tight`}
                    >
                      {fields.name}
                    </div>
                  )}
                  {fields.showHeadline && (
                    <div
                      className={`mt-2 ${headlineStyles[preset.layout]} font-mono font-semibold uppercase tracking-widest`}
                      style={{ color: preset.accent }}
                    >
                      {fields.headline}
                    </div>
                  )}
                  {fields.showTagline && (
                    <div
                      className="mt-5 text-[17px] leading-relaxed font-medium"
                      style={{ color: preset.softText }}
                    >
                      {fields.tagline}
                    </div>
                  )}
                </div>
              )}
              {centerMeta.length > 0 && (
                <div
                  className="flex flex-wrap items-center justify-center gap-3 text-[12px] font-mono font-medium uppercase tracking-widest"
                  style={{ color: preset.softText }}
                >
                  {centerMeta.map((item, index) => (
                    <span key={`${item}-${index}`} className="flex items-center gap-3">
                      <span>{item}</span>
                      {index < centerMeta.length - 1 && (
                        <span className="h-1 w-1 bg-current opacity-40" />
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
                      className={`font-sans ${nameStyles[preset.layout]} font-bold tracking-tight`}
                    >
                      {fields.name}
                    </div>
                  )}
                  {fields.showHeadline && (
                    <div
                      className={`mt-3 ${headlineStyles[preset.layout]} font-mono font-semibold uppercase tracking-widest`}
                      style={{ color: preset.accent }}
                    >
                      {fields.headline}
                    </div>
                  )}
                  {fields.showTagline && (
                    <div
                      className="mt-6 max-w-[85%] text-[17px] leading-relaxed font-medium"
                      style={{ color: preset.softText }}
                    >
                      {fields.tagline}
                    </div>
                  )}
                </div>
              )}
              {hasMeta && (
                <div className={`${metaStackStyles[preset.layout]} font-mono font-medium`} style={{ color: preset.softText }}>
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
                  className="flex items-center gap-4 text-[13px] font-mono font-bold uppercase tracking-widest"
                  style={{ color: preset.accent }}
                >
                  <span className="h-px w-12 bg-current" />
                  <span>LinkedIn Banner</span>
                </div>
              )}
              {fields.showWebsite && (
                <div className="text-[15px] font-mono font-medium" style={{ color: preset.text }}>
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
