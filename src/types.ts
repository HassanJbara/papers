import type { IHighlight, ScaledPosition } from "react-pdf-highlighter";

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Category {
  id: number;
  name: string;
  user_id: number | null;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  user_id: number | null;
}

export interface HighlightRequest {
  text: string;
  image: string;
  comment: string;
  comment_emoji: string;
  position: ScaledPosition;
  pdf_id: number;
}

export interface Paper {
  id: number;
  title: string;
  link: string;
  tags: Tag[];
  highlights: IHighlight[];
  category: Category | null;
  githubLink?: string;
  description?: string;
  citation: string;
  user_id: number | null;
}

export interface PaperRequest {
  title: string;
  link: string;
  category_id?: number;
  githubLink?: string;
  tags?: number[];
  description?: string;
  citation?: string;
  user_id: number | null;
}
