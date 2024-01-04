export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Paper {
  id: number;
  title: string;
  link: string;
  tags: Tag[];
  category: Category | null;
  githubLink?: string;
  description?: string;
  citation: string;
}

export interface PaperRequest {
  title: string;
  link: string;
  category_id?: number;
  githubLink?: string;
  tags?: number[];
  description?: string;
  citation?: string;
}
