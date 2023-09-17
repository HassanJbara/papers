import type { Tag } from "@/types";

export function getTagColor(tag: Tag) {
  switch (tag) {
    case "Generative Models":
      return "badge-primary";

    case "Computer Vision":
      return "badge-neutral";

    case "Latent Representations":
      return "badge-secondary";

    case "Score Models":
      return "badge-accent";

    case "Training":
      return "badge-ghost";
  }
}
