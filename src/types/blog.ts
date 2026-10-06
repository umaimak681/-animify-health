export type Category = 
  | 'All' 
  | 'Longevity & Biohacking' 
  | 'Nutrition & Gut Health' 
  | 'Mental Health & Neuroscience' 
  | 'Sleep Science & Recovery' 
  | 'Fitness & Metabolic Health' 
  | 'Preventative Medicine';

export interface Author {
  name: string;
  role: string;
  avatarInitials: string;
  bio: string;
  location?: string; // e.g. 'Boston, US' or 'London, UK'
  credentials?: string; // e.g. 'M.D., Harvard Medical School' or 'Ph.D., Oxford'
  twitter?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BacklinkItem {
  anchorText: string;
  url: string;
  sourceName: string;
  context: string;
  isExternal: boolean;
}

export interface VerdictScore {
  animation?: number;
  storytelling?: number;
  soundtrack?: number;
  direction?: number;
  overall: number;
  verdictQuote: string;
  pros: string[];
  cons: string[];
}

export interface ArticleSection {
  id: string;
  title: string;
  body: string[];
  pullQuote?: string;
  highlightBox?: {
    title: string;
    content: string;
  };
  keyTakeaways?: string[];
  citationLinks?: BacklinkItem[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  kicker: string;
  excerpt: string;
  category: Category;
  tags: string[];
  author: Author;
  medicalReviewer?: {
    name: string;
    credentials: string;
    institution: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  featuredTier: 'lead' | 'secondary' | 'regular';
  seoKeywords: string[]; // Targeted for US & UK ranking
  targetRegion: 'US' | 'UK' | 'US & UK' | 'Global';
  backlinks: BacklinkItem[];
  faqs?: FAQItem[];
  theme: {
    accent: string;      // e.g. 'emerald', 'teal', 'rose', 'sky', 'indigo', 'amber'
    accentHex: string;   // e.g. '#10b981'
    kanji?: string;
    motif: string;       // e.g. '🧬 Autophagy', '🧠 Neuro', '🫀 Cardio', '🌙 Sleep'
    gradientClass: string;
  };
  tableOfContents: { id: string; label: string }[];
  content: {
    intro: string;
    sections: ArticleSection[];
    verdict?: VerdictScore;
  };
  claps: number;
  viewsCount: number;
}

export interface CommentItem {
  id: string;
  authorName: string;
  avatarColor: string;
  createdAt: string;
  text: string;
  upvotes: number;
}

export interface SeasonalAnime {
  id: string;
  title: string;
  japaneseTitle: string;
  studio: string;
  airingDay: string;
  genre: string[];
  score: number;
  status: 'Airing' | 'Upcoming' | 'Completed';
  synopsis: string;
  episodes: string;
}
