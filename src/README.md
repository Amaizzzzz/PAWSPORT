# PAWSPORT Backend Implementation

This directory contains the backend implementation for the PAWSPORT app, which helps pet owners manage international travel documentation requirements.

## Directory Structure

```
src/
  ├── config/            # Configuration files
  │   └── firebase.ts    # Firebase configuration
  ├── models/            # TypeScript interfaces for data models
  │   └── index.ts       # Data model definitions
  ├── services/          # Backend services
  │   ├── auth/          # Authentication services
  │   ├── database/      # Database operations
  │   └── storage/       # File storage operations
  ├── hooks/             # React hooks for using services
  │   └── useAuth.ts     # Authentication hook
  ├── screens/           # UI screens
  └── navigation/        # Navigation configuration
```

## Firebase Setup

Before using the app, you need to:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication, Firestore Database, and Storage
3. Create a web app in your Firebase project
4. Copy your Firebase configuration to `src/config/firebase.ts`

## Data Models

The app uses the following main data models:

- **User**: Stores user profile information
- **Pet**: Stores pet details including species, breed, vaccinations, etc.
- **Document**: Represents uploaded files like health certificates
- **TravelPlan**: Tracks planned trips with requirements
- **Requirement**: Individual requirements for a trip
- **CountryRequirements**: Country-specific pet entry requirements
- **AirlinePolicy**: Airline-specific pet travel policies

## Authentication Services

- User registration
- User login
- Password reset
- User profile management

## Database Services

- **petService**: CRUD operations for pets and their documentation
- **travelService**: Manage travel plans and requirements
- **airlineService**: Query airline pet travel policies

## Storage Service

- Upload and manage pet-related documents (health certificates, vaccination records, etc.)

## Usage Example

```typescript
import { useAuth } from '../hooks/useAuth';
import { addPet, getPetsByOwnerId } from '../services';

// Authentication
const { user, login, register, logout } = useAuth();

// Pet Management
const createPet = async (petData) => {
  if (user) {
    const newPet = await addPet({
      ...petData,
      ownerId: user.uid,
      vaccinations: [],
      documents: []
    });
    return newPet;
  }
};

// Get User's Pets
const getUserPets = async () => {
  if (user) {
    const pets = await getPetsByOwnerId(user.uid);
    return pets;
  }
  return [];
};
```

## Security Rules

In a production environment, you should set up security rules for Firestore and Storage. Here's a basic example:

```
// Firestore Rules
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /pets/{petId} {
      allow read, write: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }
    
    match /travelPlans/{planId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
``` 