export type ThemeMode = 'dark' | 'light';

export type ColorThemeId = 
  | 'obsidian-crimson'
  | 'emerald-mint'
  | 'cyber-violet'
  | 'electric-blue'
  | 'amber-gold'
  | 'rose-crimson'
  | 'arctic-cyan';

export interface ColorTheme {
  id: ColorThemeId;
  name: string;
  category: string;
  tagline: string;
  primary: string;
  secondary: string;
  accent: string;
  bgAtmosphere: string;
  glowColor: string;
  previewColors: [string, string, string];
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'obsidian-crimson',
    name: 'Obsidian Crimson & Pure White',
    category: 'High Impact & Power',
    tagline: 'Signature #e7040f crimson on pitch #000000 black & #141414 cards with #ffffff crisp text',
    primary: '#e7040f',
    secondary: '#ffffff',
    accent: '#e7040f',
    bgAtmosphere: 'rgba(231, 4, 15, 0.15)',
    glowColor: 'rgba(231, 4, 15, 0.45)',
    previewColors: ['#e7040f', '#000000', '#ffffff']
  },
  {
    id: 'emerald-mint',
    name: 'Emerald & Cyber Mint',
    category: 'Growth & ROI',
    tagline: 'High-converting performance green and fresh mint',
    primary: '#10b981',
    secondary: '#06b6d4',
    accent: '#34d399',
    bgAtmosphere: 'rgba(16, 185, 129, 0.12)',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    previewColors: ['#10b981', '#06b6d4', '#34d399']
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Violet & Magenta',
    category: 'AI & Futuristic',
    tagline: 'Deep neon violet with vibrant magenta glow',
    primary: '#8b5cf6',
    secondary: '#ec4899',
    accent: '#a855f7',
    bgAtmosphere: 'rgba(139, 92, 246, 0.12)',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    previewColors: ['#8b5cf6', '#d946ef', '#ec4899']
  },
  {
    id: 'electric-blue',
    name: 'Electric Blue & Azure',
    category: 'Tech Precision',
    tagline: 'Corporate tech azure, royal blue and cyan',
    primary: '#3b82f6',
    secondary: '#0ea5e9',
    accent: '#60a5fa',
    bgAtmosphere: 'rgba(59, 130, 246, 0.12)',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    previewColors: ['#2563eb', '#0ea5e9', '#38bdf8']
  },
  {
    id: 'amber-gold',
    name: 'Solar Amber & Luxury Gold',
    category: 'High Energy & Prestige',
    tagline: 'Warm champagne gold, vibrant amber and bronze',
    primary: '#f59e0b',
    secondary: '#ea580c',
    accent: '#fbbf24',
    bgAtmosphere: 'rgba(245, 158, 11, 0.12)',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    previewColors: ['#f59e0b', '#d97706', '#fbbf24']
  },
  {
    id: 'rose-crimson',
    name: 'Crimson Rose & Coral',
    category: 'Creative & Bold',
    tagline: 'Striking ruby crimson, coral and electric rose',
    primary: '#f43f5e',
    secondary: '#e11d48',
    accent: '#fb7185',
    bgAtmosphere: 'rgba(244, 63, 94, 0.12)',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    previewColors: ['#f43f5e', '#e11d48', '#fb7185']
  },
  {
    id: 'arctic-cyan',
    name: 'Arctic Teal & Glacier',
    category: 'Ultra Clean',
    tagline: 'Crisp glacier cyan, aqua marine and deep teal',
    primary: '#06b6d4',
    secondary: '#0891b2',
    accent: '#22d3ee',
    bgAtmosphere: 'rgba(6, 182, 212, 0.12)',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    previewColors: ['#06b6d4', '#0284c7', '#22d3ee']
  }
];
