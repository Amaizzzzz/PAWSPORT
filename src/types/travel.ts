export interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  documents: string[]; // Document IDs
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TravelPlanFormData {
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
} 