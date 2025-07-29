import type { CollectionEntry } from "astro:content";

// Define the Doc type using the CollectionEntry utility
export type Doc = CollectionEntry<"docs">;

// Helper type for navigation items
export interface NavigationItem {
  title: string;
  slug: string;
  children?: NavigationItem[];
}

// Helper type for category metadata
export interface CategoryMetadata {
  title: string;
  description: string;
  color: string;
  icon: string;
}

// Helper type for navigation categories
export interface NavigationCategory {
  title: string;
  slug: string;
  items: NavigationItem[];
}
