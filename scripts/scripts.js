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
  // prints all elements into list in HTML
  querySnapshot.forEach((doc) => {
    let $li = $(`<li>${doc.data().name}</li>`);
    $ul.append($li);
  });
});

// practice for the cards
db.collection("Products").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    let $li = $(`
      <div class="card d-flex justify-content-center m-3" style="width: 18rem">
        <img
          src="${doc.data().imageURL}"
          class="card-img-top"
          alt="product image"
          style="width: 100%; height: auto"
        />
        <hr style="width: 90%; margin: auto" />
        <div class="card-body d-flex flex-column text-center">
          <div class="d-flex row">
            <h2>${doc.data().name}</h2>
            <p>${doc.data().description}</p>
          </div>
        </div>
        <div class="card-footer d-flex pt-3">
          <div class="d-flex mx-2">
            <img
              src="../images/misc/galleon_black.png"
              class="pt-2 pb-3"
              style="width: 10%; height: 100%"
            />
            <h2 class="py-1">${doc.data().price}</h2>
          </div>
          <div class="pt-2 mx-2">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </div>
    `);
    $('#products').append($li);
  });
});
