export type BannerPreset = {
  id: string;
  name: string;
  description: string;
  gradient: string;
  accent: string;
  text: string;
  softText: string;
  pattern: "none" | "grid" | "dots" | "cross";
  frame: "none" | "border" | "browser" | "terminal";
  layout: "stack" | "split" | "center";
};

export const presets: BannerPreset[] = [
  {
    id: "vercel-stark",
    name: "Vercel Stark",
    description: "Ultra-minimal high contrast white.",
    gradient: "linear-gradient(180deg, #ffffff 0%, #fcfcfc 100%)",
    accent: "#000000",
    text: "#000000",
    softText: "#666666",
    pattern: "grid",
    frame: "border",
    layout: "split",
  },
  {
    id: "linear-noir",
    name: "Linear Noir",
    description: "Deep dark mode with subtle glowing accents.",
    gradient: "radial-gradient(ellipse at 50% -20%, #202020, #0a0a0a 80%)",
    accent: "#5e6ad2",
    text: "#ffffff",
    softText: "#888888",
    pattern: "none",
    frame: "browser",
    layout: "stack",
  },
  {
    id: "supabase-emerald",
    name: "Supabase Emerald",
    description: "Dark gray with striking neon green.",
    gradient: "linear-gradient(145deg, #1c1c1c 0%, #111111 100%)",
    accent: "#3ecf8e",
    text: "#ffffff",
    softText: "#878787",
    pattern: "dots",
    frame: "none",
    layout: "split",
  },
  {
    id: "stripe-mesh",
    name: "Stripe Mesh",
    description: "Clean white with a vibrant mesh blur.",
    gradient: "radial-gradient(ellipse at top left, #f3ebff, transparent 50%), radial-gradient(ellipse at bottom right, #e0f2fe, transparent 50%), #ffffff",
    accent: "#635bff",
    text: "#0a2540",
    softText: "#425466",
    pattern: "cross",
    frame: "browser",
    layout: "center",
  },
  {
    id: "raycast-red",
    name: "Raycast Red",
    description: "Sharp focus, deep red highlights on dark.",
    gradient: "linear-gradient(180deg, #111111 0%, #000000 100%)",
    accent: "#ff6363",
    text: "#f5f5f5",
    softText: "#999999",
    pattern: "cross",
    frame: "terminal",
    layout: "stack",
  },
  {
    id: "geist-mono",
    name: "Geist Mono",
    description: "Brutalist grayscale.",
    gradient: "linear-gradient(90deg, #fafafa 0%, #ebebeb 100%)",
    accent: "#111111",
    text: "#000000",
    softText: "#777777",
    pattern: "grid",
    frame: "none",
    layout: "center",
  }
];
