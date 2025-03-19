import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where,
  addDoc,
  Timestamp 
} from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { Pet, Vaccination, Document as PetDocument } from '../../models';
import { v4 as uuidv4 } from 'uuid';

// Collection references
const petsCollection = collection(firestore, 'pets');

// Add a new pet
export const addPet = async (petData: Omit<Pet, 'id'>): Promise<Pet> => {
  try {
    const petId = uuidv4();
    const newPet: Pet = {
      ...petData,
      id: petId,
      vaccinations: petData.vaccinations || [],
      documents: petData.documents || []
    };

    await setDoc(doc(firestore, 'pets', petId), newPet);
    return newPet;
  } catch (error) {
    console.error('Error adding pet:', error);
    throw error;
  }
};

// Update a pet
export const updatePet = async (id: string, petData: Partial<Pet>): Promise<void> => {
  try {
    await updateDoc(doc(firestore, 'pets', id), petData);
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};

// Delete a pet
export const deletePet = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(firestore, 'pets', id));
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
};

// Get a pet by ID
export const getPetById = async (id: string): Promise<Pet | null> => {
  try {
    const petDoc = await getDoc(doc(firestore, 'pets', id));
    if (petDoc.exists()) {
      return petDoc.data() as Pet;
    }
    return null;
  } catch (error) {
    console.error('Error getting pet:', error);
    throw error;
  }
};

// Get all pets for a user
export const getPetsByOwnerId = async (ownerId: string): Promise<Pet[]> => {
  try {
    const q = query(petsCollection, where('ownerId', '==', ownerId));
    const querySnapshot = await getDocs(q);
    
    const pets: Pet[] = [];
    querySnapshot.forEach((doc) => {
      pets.push(doc.data() as Pet);
    });
    
    return pets;
  } catch (error) {
    console.error('Error getting pets:', error);
    throw error;
  }
};

// Add a vaccination to a pet
export const addVaccination = async (petId: string, vaccination: Omit<Vaccination, 'id'>): Promise<Vaccination> => {
  try {
    const petRef = doc(firestore, 'pets', petId);
    const petDoc = await getDoc(petRef);
    
    if (!petDoc.exists()) {
      throw new Error('Pet not found');
    }
    
    const pet = petDoc.data() as Pet;
    const vaccinationId = uuidv4();
    const newVaccination: Vaccination = {
      ...vaccination,
      id: vaccinationId
    };
    
    const updatedVaccinations = [...pet.vaccinations, newVaccination];
    await updateDoc(petRef, { vaccinations: updatedVaccinations });
    
    return newVaccination;
  } catch (error) {
    console.error('Error adding vaccination:', error);
    throw error;
  }
};

// Add a document to a pet
export const addDocument = async (petId: string, document: Omit<PetDocument, 'id'>): Promise<PetDocument> => {
  try {
    const petRef = doc(firestore, 'pets', petId);
    const petDoc = await getDoc(petRef);
    
    if (!petDoc.exists()) {
      throw new Error('Pet not found');
    }
    
    const pet = petDoc.data() as Pet;
    const documentId = uuidv4();
    const newDocument: PetDocument = {
      ...document,
      id: documentId
    };
    
    const updatedDocuments = [...pet.documents, newDocument];
    await updateDoc(petRef, { documents: updatedDocuments });
    
    return newDocument;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}; 