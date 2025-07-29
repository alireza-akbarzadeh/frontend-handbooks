import type { CollectionEntry, InferEntrySchema } from "astro:content";

export type Doc = CollectionEntry<"docs">;

export interface NavigationItem {
  title: string;
  slug: string;
  children?: NavigationItem[];
}

export interface NavigationCategory {
  title: string;
  slug: string;
  items: NavigationItem[];
}

interface RenderedContent {
  html: string;
}

interface Render {
  ".md": RenderedContent;
}

export interface RelatedDoc {
  id: string;
  render(): Render[".md"];
  slug: string;
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">;
  rendered?: RenderedContent;
  filePath?: string;
}

export interface CategoryMetadata {
  [key: string]: {
    title: string;
    color: string;
    icon: string;
  };
}

export interface RelatedDocsProps {
  relatedDocs: RelatedDoc[];
  categoryMetadata: CategoryMetadata;
}
