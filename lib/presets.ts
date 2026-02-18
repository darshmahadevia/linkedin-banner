export type BannerPreset = {
  id: string;
  name: string;
  description: string;
  gradient: string;
  accent: string;
  text: string;
  softText: string;
  pattern: "grain" | "grid" | "rings" | "dots";
  frame: "none" | "ink" | "paper";
  layout: "stack" | "split" | "center";
};

export const presets: BannerPreset[] = [
  {
    id: "amber-ink",
    name: "Amber Ink",
    description: "Warm editorial glow with inked edges.",
    gradient:
      "radial-gradient(1200px 360px at 20% 10%, #ffe9c7 0%, #f8c89b 35%, #e7a274 60%, #b86c4b 100%)",
    accent: "#2f1b12",
    text: "#2b1c14",
    softText: "#6b4b3a",
    pattern: "grain",
    frame: "ink",
    layout: "stack",
  },
  {
    id: "paper-sage",
    name: "Paper Sage",
    description: "Soft paper tone with modern calm.",
    gradient:
      "radial-gradient(1200px 360px at 80% 0%, #eef2e7 0%, #d7e2d2 45%, #b7c9b7 100%)",
    accent: "#1f2e2a",
    text: "#1b2b27",
    softText: "#4f665c",
    pattern: "grid",
    frame: "paper",
    layout: "split",
  },
  {
    id: "midnight-brass",
    name: "Midnight Brass",
    description: "Moody blue with brass accents.",
    gradient:
      "radial-gradient(1200px 360px at 10% 20%, #1a2740 0%, #0f1a2b 45%, #0b121f 100%)",
    accent: "#d7a94b",
    text: "#f2e6c8",
    softText: "#c5b597",
    pattern: "rings",
    frame: "none",
    layout: "center",
  },
  {
    id: "sunlit-coral",
    name: "Sunlit Coral",
    description: "Citrus coral with lively energy.",
    gradient:
      "radial-gradient(1200px 360px at 30% 0%, #ffe6d1 0%, #ffc1a7 38%, #ff9e7e 70%, #f46c5a 100%)",
    accent: "#2d1d1a",
    text: "#301f1b",
    softText: "#6c4842",
    pattern: "dots",
    frame: "paper",
    layout: "stack",
  },
  {
    id: "stone-ink",
    name: "Stone Ink",
    description: "Muted stone with crisp charcoal.",
    gradient:
      "radial-gradient(1200px 360px at 70% 10%, #f1efe9 0%, #dfdbd2 45%, #c9c3b7 100%)",
    accent: "#101010",
    text: "#151515",
    softText: "#5d5a54",
    pattern: "grid",
    frame: "ink",
    layout: "split",
  },
  {
    id: "cobalt-cream",
    name: "Cobalt Cream",
    description: "Bright cobalt with creamy highlights.",
    gradient:
      "radial-gradient(1200px 360px at 20% 10%, #f7f4ec 0%, #e4ddcf 35%, #325ae6 70%, #2337b8 100%)",
    accent: "#0f1438",
    text: "#0f1438",
    softText: "#3c456b",
    pattern: "rings",
    frame: "none",
    layout: "split",
  },
  {
    id: "forest-linen",
    name: "Forest Linen",
    description: "Organic greens on linen texture.",
    gradient:
      "radial-gradient(1200px 360px at 80% 10%, #f2efe7 0%, #cfd8c4 45%, #7c8f6b 100%)",
    accent: "#243022",
    text: "#1f2a1f",
    softText: "#55624f",
    pattern: "grain",
    frame: "paper",
    layout: "stack",
  },
  {
    id: "terracotta-night",
    name: "Terracotta Night",
    description: "Deep clay glow with smoky edges.",
    gradient:
      "radial-gradient(1200px 360px at 15% 10%, #f0c9b2 0%, #c67a58 45%, #3b2b25 100%)",
    accent: "#f2d6c1",
    text: "#f6e7da",
    softText: "#d6b9a6",
    pattern: "dots",
    frame: "ink",
    layout: "center",
  },
  {
    id: "ice-graphite",
    name: "Ice Graphite",
    description: "Crisp graphite lines on cool ice.",
    gradient:
      "radial-gradient(1200px 360px at 70% 0%, #f5f7f9 0%, #d8dde2 45%, #a9b1b8 100%)",
    accent: "#1f262e",
    text: "#1b2229",
    softText: "#58626b",
    pattern: "grid",
    frame: "none",
    layout: "split",
  },
  {
    id: "velvet-plum",
    name: "Velvet Plum",
    description: "Dusty plum with soft spotlight.",
    gradient:
      "radial-gradient(1200px 360px at 30% 15%, #f2e9f1 0%, #d7c0d2 38%, #8a5b83 70%, #5a364f 100%)",
    accent: "#2f1f2b",
    text: "#2a1b26",
    softText: "#6a4c62",
    pattern: "rings",
    frame: "paper",
    layout: "stack",
  },
  {
    id: "sandstone-wave",
    name: "Sandstone Wave",
    description: "Soft sands with energetic accents.",
    gradient:
      "radial-gradient(1200px 360px at 85% 0%, #f8f1e6 0%, #edd7b4 40%, #d5a870 100%)",
    accent: "#2f2419",
    text: "#2b2118",
    softText: "#6d5742",
    pattern: "dots",
    frame: "paper",
    layout: "center",
  },
];
