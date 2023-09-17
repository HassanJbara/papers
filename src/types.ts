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
  tags: Tag[];
  category: Category;
  paperLink: string;
  githubLink?: string;
  description?: string;
}
