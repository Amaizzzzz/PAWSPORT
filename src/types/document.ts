export interface Document {
  id: string;
  name: string;
  type: string;
  uri: string;
  size: number;
  uploadDate: Date;
  status: 'uploaded' | 'processing' | 'error';
} 