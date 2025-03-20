import { 
  collection, 
  getDocs, 
  getDoc, 
  query, 
  where,
  doc,
  limit
} from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { AirlinePolicy } from '../../models';

// Collection reference
const airlinePoliciesCollection = collection(firestore, 'airlinePolicies');

// Get airline policy by code
export const getAirlinePolicyByCode = async (airlineCode: string): Promise<AirlinePolicy | null> => {
  try {
    const q = query(airlinePoliciesCollection, where('airlineCode', '==', airlineCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return querySnapshot.docs[0].data() as AirlinePolicy;
  } catch (error) {
    console.error('Error getting airline policy:', error);
    throw error;
  }
};

// Get all airline policies
export const getAllAirlinePolicies = async (): Promise<AirlinePolicy[]> => {
  try {
    const querySnapshot = await getDocs(airlinePoliciesCollection);
    
    const policies: AirlinePolicy[] = [];
    querySnapshot.forEach((doc) => {
      policies.push(doc.data() as AirlinePolicy);
    });
    
    return policies;
  } catch (error) {
    console.error('Error getting airline policies:', error);
    throw error;
  }
};

// Search airline policies by name
export const searchAirlinePolicies = async (searchTerm: string): Promise<AirlinePolicy[]> => {
  try {
    // Get all policies
    const policies = await getAllAirlinePolicies();
    
    // Filter by name (client-side filtering since Firestore doesn't support LIKE queries)
    const searchTermLower = searchTerm.toLowerCase();
    return policies.filter((policy) => 
      policy.airlineName.toLowerCase().includes(searchTermLower) || 
      policy.airlineCode.toLowerCase().includes(searchTermLower)
    );
  } catch (error) {
    console.error('Error searching airline policies:', error);
    throw error;
  }
};

// Get airline policies for specific pet type and size
export const getAirlinePoliciesForPet = async (
  petType: string, 
  size?: string
): Promise<AirlinePolicy[]> => {
  try {
    // Get all policies
    const policies = await getAllAirlinePolicies();
    
    // Filter by pet type and size
    return policies.filter((policy) => {
      const matchingPolicies = policy.petPolicies.filter(petPolicy => {
        const typeMatch = petPolicy.petType.toLowerCase() === petType.toLowerCase();
        const sizeMatch = !size || petPolicy.size.some(s => s.toLowerCase() === size.toLowerCase());
        return typeMatch && sizeMatch;
      });
      
      return matchingPolicies.length > 0;
    });
  } catch (error) {
    console.error('Error getting airline policies for pet:', error);
    throw error;
  }
}; 