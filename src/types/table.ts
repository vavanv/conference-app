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