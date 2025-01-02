export interface FilterConfig {
  name?: string;
  position?: string;
  location?: string;
  salaryRange?: {
    min?: number;
    max?: number;
  };
}