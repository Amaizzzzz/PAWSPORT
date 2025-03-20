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
  orderBy
} from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { TravelPlan, Requirement, CountryRequirements } from '../../models';
import { v4 as uuidv4 } from 'uuid';

// Collection references
const travelPlansCollection = collection(firestore, 'travelPlans');
const countryRequirementsCollection = collection(firestore, 'countryRequirements');

// Add a new travel plan
export const addTravelPlan = async (travelData: Omit<TravelPlan, 'id'>): Promise<TravelPlan> => {
  try {
    const travelId = uuidv4();
    const newTravelPlan: TravelPlan = {
      ...travelData,
      id: travelId,
      requirements: travelData.requirements || [],
      status: travelData.status || 'planned'
    };

    await setDoc(doc(firestore, 'travelPlans', travelId), newTravelPlan);
    return newTravelPlan;
  } catch (error) {
    console.error('Error adding travel plan:', error);
    throw error;
  }
};

// Update a travel plan
export const updateTravelPlan = async (id: string, travelData: Partial<TravelPlan>): Promise<void> => {
  try {
    await updateDoc(doc(firestore, 'travelPlans', id), travelData);
  } catch (error) {
    console.error('Error updating travel plan:', error);
    throw error;
  }
};

// Delete a travel plan
export const deleteTravelPlan = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(firestore, 'travelPlans', id));
  } catch (error) {
    console.error('Error deleting travel plan:', error);
    throw error;
  }
};

// Get a travel plan by ID
export const getTravelPlanById = async (id: string): Promise<TravelPlan | null> => {
  try {
    const travelDoc = await getDoc(doc(firestore, 'travelPlans', id));
    if (travelDoc.exists()) {
      return travelDoc.data() as TravelPlan;
    }
    return null;
  } catch (error) {
    console.error('Error getting travel plan:', error);
    throw error;
  }
};

// Get all travel plans for a user
export const getTravelPlansByUserId = async (userId: string): Promise<TravelPlan[]> => {
  try {
    const q = query(
      travelPlansCollection, 
      where('userId', '==', userId),
      orderBy('departureDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const travelPlans: TravelPlan[] = [];
    querySnapshot.forEach((doc) => {
      travelPlans.push(doc.data() as TravelPlan);
    });
    
    return travelPlans;
  } catch (error) {
    console.error('Error getting travel plans:', error);
    throw error;
  }
};

// Add or update a requirement in a travel plan
export const updateRequirement = async (travelPlanId: string, requirement: Requirement): Promise<void> => {
  try {
    const travelRef = doc(firestore, 'travelPlans', travelPlanId);
    const travelDoc = await getDoc(travelRef);
    
    if (!travelDoc.exists()) {
      throw new Error('Travel plan not found');
    }
    
    const travelPlan = travelDoc.data() as TravelPlan;
    let requirements = [...travelPlan.requirements];
    
    const existingReqIndex = requirements.findIndex(req => req.id === requirement.id);
    if (existingReqIndex >= 0) {
      // Update existing requirement
      requirements[existingReqIndex] = requirement;
    } else {
      // Add new requirement
      requirements.push(requirement);
    }
    
    await updateDoc(travelRef, { requirements });
  } catch (error) {
    console.error('Error updating requirement:', error);
    throw error;
  }
};

// Get country requirements
export const getCountryRequirements = async (countryCode: string): Promise<CountryRequirements | null> => {
  try {
    const q = query(countryRequirementsCollection, where('countryCode', '==', countryCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return querySnapshot.docs[0].data() as CountryRequirements;
  } catch (error) {
    console.error('Error getting country requirements:', error);
    throw error;
  }
};

// Generate requirements based on country and pet type
export const generateRequirementsForTravel = async (
  originCountry: string, 
  destinationCountry: string, 
  petTypes: string[]
): Promise<Requirement[]> => {
  try {
    // Get destination country requirements
    const countryReqs = await getCountryRequirements(destinationCountry);
    if (!countryReqs) {
      throw new Error('Country requirements not found');
    }
    
    // Filter requirements based on pet types
    const filteredReqs = countryReqs.entryRequirements.filter(req => {
      // Check if any of the pet types match
      return req.petTypes.some(type => petTypes.includes(type));
    });
    
    // Map to Requirement format
    const requirements: Requirement[] = filteredReqs.map(template => ({
      id: uuidv4(),
      title: template.title,
      description: template.description,
      status: 'not_started',
      mandatory: template.mandatory
    }));
    
    return requirements;
  } catch (error) {
    console.error('Error generating requirements:', error);
    throw error;
  }
}; 