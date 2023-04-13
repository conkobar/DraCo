const firebaseConfig = {
  apiKey: 'AIzaSyDhnBjqqa7oQ9jASQxQZLKHz8QiDcq0Daw',
  authDomain: 'holberton-draco.firebaseapp.com',
  projectId: 'holberton-draco',
  storageBucket: 'holberton-draco.appspot.com',
  messagingSenderId: '316650761146',
  appId: '1:316650761146:web:e178596d92e83e469f4b83',
  measurementId: 'G-0VG0RJPC0V'
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Get the unordered list element
var ul = document.getElementById("product-list");

// Get all documents from the Products collection
db.collection("Products").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // Create a new list item element
    var li = document.createElement("li");
    // Set the text content to the product name
    li.textContent = doc.data().name;
    // Append the list item to the unordered list
    ul.appendChild(li);
  });
});