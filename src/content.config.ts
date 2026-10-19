import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const year = z.number().int().min(2000).max(2100);

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z
    .object({
      role: z.string(),
      company: z.string(),
      mode: z.enum(["Remote", "On site", "Hybrid"]),
      location: z.string().optional(),
      start: year,
      // null means the role is current.
      end: year.nullable(),
    })
    .refine((entry) => entry.end === null || entry.end >= entry.start, {
      message: "end must be the same year as start or later",
      path: ["end"],
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.enum(["Client project", "Personal project"]).optional(),
      // Year the project shipped; omitted until confirmed.
      year: year.optional(),
      summary: z.string(),
      image: image(),
      imageAlt: z.string(),
      stack: z.array(z.string()).min(1),
      links: z.object({
        live: z.string().url().optional(),
        source: z.string().url().optional(),
      }),
      // Lower numbers come first; with an odd count the first one spans the full row on wide screens.
      order: z.number().int(),
    }),
});

export const collections = { experience, projects };
