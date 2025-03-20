import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  StorageReference 
} from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';

// Upload a document
export const uploadDocument = async (
  userId: string, 
  petId: string, 
  file: Blob | Uint8Array | ArrayBuffer,
  fileName: string,
  fileType: string
): Promise<string> => {
  try {
    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `users/${userId}/pets/${petId}/documents/${uniqueFileName}`;
    const storageRef = ref(storage, filePath);
    
    const metadata = {
      contentType: fileType,
    };
    
    await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (downloadURL: string): Promise<void> => {
  try {
    // Extract storage reference from downloadURL
    const storageRef = ref(storage, getPathFromURL(downloadURL));
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Helper function to convert download URL to storage path
const getPathFromURL = (downloadURL: string): string => {
  // This is a simplistic approach - in a real app, you might need to handle this differently
  // Extracting the path part from the download URL
  const url = new URL(downloadURL);
  let path = url.pathname;
  
  // Remove any potential prefixes in the path
  const matches = path.match(/\/o\/(.+?)(\?|$)/);
  if (matches && matches[1]) {
    path = decodeURIComponent(matches[1]);
  }
  
  return path;
};

// Convert file to Base64 (useful for displaying images inline)
export const fileToBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}; 