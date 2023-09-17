import type { Paper } from "@/types";

export const PAPERS: Paper[] = [
  {
    id: 0,
    title: "Denoising Diffusion Porbabilistic Models",
    tags: ["Generative Models", "Score Models"],
    category: "Diffusion Models",
    paperLink: "https://arxiv.org/pdf/2006.11239.pdf",
    githubLink: "https://github.com/hojonathanho/diffusion",
    description:
      "high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics",
  },
  {
    id: 1,
    title: "Classifier-Free Diffusion Guidance",
    tags: ["Training"],
    category: "Diffusion Models",
    paperLink: "https://arxiv.org/pdf/2207.12598.pdf",
  },
  {
    id: 2,
    title: "Scalable Diffusion with Transformers",
    tags: ["Generative Models", "Score Models"],
    category: "Diffusion Models",
    paperLink: "https://arxiv.org/pdf/2212.09748.pdf",
    githubLink: "https://github.com/facebookresearch/DiT",
  },
  {
    id: 3,
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    tags: ["Generative Models", "Score Models"],
    category: "Diffusion Models",
    paperLink: "https://arxiv.org/pdf/2112.10752.pdf",
    githubLink: "https://github.com/CompVis/latent-diffusion",
  },
  {
    id: 4,
    title:
      "DeepSVG: A Hierarchical Generative Network for Vector Graphics Animation",
    tags: ["Latent Representations"],
    category: "Autoencoders & Transformers",
    paperLink: "https://arxiv.org/pdf/2007.11301",
    githubLink: "https://github.com/alexandre01/deepsvg",
  },
  {
    id: 5,
    title: "Im2Vec Synthesizing Vector Graphics without Vector Supervision",
    tags: ["Latent Representations", "Generative Models"],
    category: "Autoencoders & Transformers",
    paperLink: "https://arxiv.org/pdf/2102.02798.pdf",
  },
];
