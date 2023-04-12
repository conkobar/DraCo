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
let $ul = $("#product-list");

// Get all documents from the Products collection
db.collection("Products").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    let $li = $(`<li>${doc.data().name}</li>`);
    $ul.append($li);
  });
});