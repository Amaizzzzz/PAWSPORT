// User model
export interface User {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
  pets: Pet[];
  travelHistory: TravelPlan[];
}

// Pet model
export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed?: string;
  size?: 'small' | 'medium' | 'large';
  dateOfBirth?: string;
  microchipNumber?: string;
  vaccinations: Vaccination[];
  documents: Document[];
  ownerId: string;
}

// Vaccination model
export interface Vaccination {
  id: string;
  type: string;
  dateAdministered: string;
  expiryDate: string;
  vetName?: string;
  documentUrl?: string;
}

// Document model
export interface Document {
  id: string;
  name: string;
  type: 'health_certificate' | 'vaccination_record' | 'entry_permit' | 'microchip_certificate' | 'other';
  issueDate: string;
  expiryDate: string;
  issuingAuthority?: string;
  fileUrl: string;
  verified: boolean;
}

// Travel Plan model
export interface TravelPlan {
  id: string;
  originCountry: string;
  destinationCountry: string;
  departureDate: string;
  returnDate?: string;
  airline?: string;
  petIds: string[];
  userId: string;
  requirements: Requirement[];
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
}

// Requirement model
export interface Requirement {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  completedDate?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  documentIds?: string[];
  mandatory: boolean;
}

// Country Requirements
export interface CountryRequirements {
  countryCode: string;
  countryName: string;
  entryRequirements: RequirementTemplate[];
  updatedAt: string;
}

// Requirement Template
export interface RequirementTemplate {
  id: string;
  title: string;
  description: string;
  timeframe: string; // e.g., "30 days before travel"
  documentType: string;
  petTypes: string[]; // e.g., ["dog", "cat"]
  mandatory: boolean;
}

// Airline Policy
export interface AirlinePolicy {
  airlineCode: string;
  airlineName: string;
  petPolicies: PetPolicy[];
  updatedAt: string;
}

// Pet Policy
export interface PetPolicy {
  id: string;
  petType: string;
  size: string[];
  inCabin: boolean;
  inCargo: boolean;
  restrictions: string[];
  additionalFees: string;
  notes: string;
} 