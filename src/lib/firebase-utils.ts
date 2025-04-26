import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  submittedAt: string;
}

export interface Slide {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
}

export async function getAllContacts(): Promise<Contact[]> {
  try {
    const contactsRef = collection(db, 'contacts');
    const snapshot = await getDocs(contactsRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Contact[];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

export async function getSlideshow(): Promise<Slide[]> {
  try {
    const slidesRef = collection(db, 'slideshow');
    const snapshot = await getDocs(slidesRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Slide[];
  } catch (error) {
    console.error('Error fetching slideshow:', error);
    throw error;
  }
}

export async function addSlideshow(file: File, caption: string): Promise<void> {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `slideshow/${Date.now()}_${file.name}`);
    
    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Add slide to Firestore
    const slidesRef = collection(db, 'slideshow');
    await addDoc(slidesRef, {
      imageUrl: downloadURL,
      caption,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error adding slideshow:', error);
    throw error;
  }
}

export async function deleteSlideshow(id: string, imageUrl: string): Promise<void> {
  try {
    // Delete from Firestore
    const slideRef = doc(db, 'slideshow', id);
    await deleteDoc(slideRef);
    
    // Delete from Storage
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting slideshow:', error);
    throw error;
  }
} 