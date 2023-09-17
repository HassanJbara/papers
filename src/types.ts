export const tags = [
  "Score Models",
  "Generative Models",
  "Computer Vision",
  "Training",
  "Latent Representations",
] as const;
export const categories = [
  "Diffusion Models",
  "Autoencoders & Transformers",
] as const;

export type Tag = (typeof tags)[number];

export type Category = (typeof categories)[number];

export interface Paper {
  id: number;
  title: string;
  tags: Tag[];
  category: Category;
  paperLink: string;
  githubLink?: string;
  description?: string;
}
