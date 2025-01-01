import { z } from 'zod';

export interface TableData {
  id: number;
  name: string;
  position: string;
  location: string;
  salary: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  name?: string;
  position?: string;
  location?: string;
  salaryRange?: {
    min?: number;
    max?: number;
  };
}

export const filterSchema = z.object({
  name: z.string().optional(),
  position: z.string().optional(),
  location: z.string().optional(),
  salaryRange: z.object({
    min: z.number().optional(),
    max: z.number().optional()
  }).optional()
});