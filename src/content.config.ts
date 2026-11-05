import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Allowed topic tags (ACM CS taxonomy areas). Only these may be used on entries.
const TOPICS = [
  // Artificial intelligence
  'Artificial intelligence',
  'Computer vision',
  'Machine learning',
  'Natural language processing',
  'The Web & information retrieval',
  // Systems
  'Computer architecture',
  'Computer networks',
  'Computer security',
  'Databases',
  'Design automation',
  'Embedded & real-time systems',
  'High-performance computing',
  'Mobile computing',
  'Measurement & perf. analysis',
  'Operating systems',
  'Programming languages',
  'Software engineering',
  // Theory
  'Algorithms & complexity',
  'Cryptography',
  'Logic & verification',
  // Interdisciplinary
  'Comp. bio & bioinformatics',
  'Computer graphics',
  'Computer science education',
  'Economics & computation',
  'Human-computer interaction',
  'Robotics',
  'Visualization',
] as const;

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    org: z.string(),
    role: z.string(),
    kind: z.enum(['work', 'research', 'teaching']),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    tags: z.array(z.enum(TOPICS)).default([]),
    gifs: z.array(z.string()).default([]),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: z.object({
    org: z.string(),
    degree: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
  }),
});

export const collections = { work, education };