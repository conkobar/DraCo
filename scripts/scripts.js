
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhnBjqqa7oQ9jASQxQZLKHz8QiDcq0Daw",
  authDomain: "holberton-draco.firebaseapp.com",
  projectId: "holberton-draco",
  storageBucket: "holberton-draco.appspot.com",
  messagingSenderId: "316650761146",
  appId: "1:316650761146:web:e178596d92e83e469f4b83",
  measurementId: "G-0VG0RJPC0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a reference to the 'Products' collection
const productsRef = collection(db, 'Products');

// Get all documents from the 'Products' collection
getDocs(productsRef).then(snapshot => {
  snapshot.forEach(doc => {
    // Get the product name from the document data
    const productName = doc.data().name;

    // Create a new list item element
    const li = document.createElement('li');
    li.textContent = productName;

    // Append the list item to the product list
    document.getElementById('product-list').appendChild(li);
  });
});