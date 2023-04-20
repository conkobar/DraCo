const firebaseConfig = {
  apiKey: "AIzaSyDhnBjqqa7oQ9jASQxQZLKHz8QiDcq0Daw",
  authDomain: "holberton-draco.firebaseapp.com",
  projectId: "holberton-draco",
  storageBucket: "holberton-draco.appspot.com",
  messagingSenderId: "316650761146",
  appId: "1:316650761146:web:e178596d92e83e469f4b83",
  measurementId: "G-0VG0RJPC0V",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Get the unordered list element
let ul = $("#product-list");
let testimonials = $("#testimonials-list");

// products page content
db.collection("Products")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let li = $(`
      <div
        class="card d-flex justify-content-center m-3 shadow"
        style="width: 18rem"
        id="${doc.data().keywords.forEach((keyword) => keyword)}"
      >
        <img
          src="${doc.data().imageURL}"
          class="card-img-top"
          alt="product image"
          style="width: 100%; height: auto"
        />
        <hr style="width: 90%; margin: auto" />
        <div class="card-body d-flex flex-column text-center">
          <div class="d-flex row">
            <h2 class="livvic gold">${doc.data().name}</h2>
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
            <i class="fa-solid fa-cart-shopping" onclick="addToCart('${doc.data().name}', '${doc.data().price}')"></i>
          </div>
        </div>
      </div>
    `);
      $("#products").append(li);
    });
  });

// Testimonials Carousel`
let imagesLoaded = 0;

db.collection("Testimonials")
  .get()
  .then((querySnapshot) => {
    let first = true;
    querySnapshot.forEach((doc) => {
      let li = $(`
      <div class="carousel-item ${first ? "active" : ""}">
        <div class="container">
          <div class="row d-flex align-items-center">
            <div class="col-sm-12 col-md-4 p-3 image-container">
              <img src="../images/misc/pngegg.png" class="rotate border-image" height="150px">
              <img
                src="${doc.data().imageURL}"
                class="content-image rounded-circle mx-auto d-block"
                alt="profile pic"
                style="width: 150px; height: auto"
              />
            </div>
            <div class="col-sm-12 col-md-8 text-center text-md-left p-3 px-md-5">
              <h2 class="text-monospace livvic">${doc.data().name}</h2>
              <h6 class="fw-bold gold">${doc.data().title}</h6>
              <p class="quote">"${doc.data().comment}"</p>
            </div>
          </div>
        </div>
      </div>
    `);
      $("#testimonials").append(li);
      first = false;

      // Add event listener for the load event to the image
      li.find("img.content-image").on("load", () => {
        imagesLoaded++;
        if (imagesLoaded === querySnapshot.size) {
          // All images have finished loading
          setCarouselItemHeight();
        }
      });
    });
  });

function setCarouselItemHeight() {
  let maxHeight = 0;
  $(".carousel-item").each(function () {
    let cardHeight = $(this).height();
    if (cardHeight > maxHeight) {
      maxHeight = cardHeight;
    }
  });
  $(".carousel-item").height(maxHeight);
}

$(window).on("resize", function () {
  let maxHeight = 0;
  $(".carousel-item").height("auto"); // reset the height of all carousel items to auto
  setCarouselItemHeight();
});

// Owl carousel
// $('.owl-carousel').owlCarousel({
//   loop:true,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:1
//       },
//       600:{
//           items:3
//       },
//       1000:{
//           items:5
//       }
//   }
// });

// Cart
function getCartFromStorage() {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  return cart;
}

function addToCart(name, price, quantity = 1) {
  // retrieve current cart or create new one
  let cart = getCartFromStorage();
  // check whether item is in cart already (if so, update quantity)
  let itemIndex = cart.findIndex((item) => item.name === name);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  // save updated cart
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // update cart count
  // add cart count to button at the top and in burger
}

function removeFromCart(item) {
  let cart = getCartFromStorage();
  let itemIndex = cart.findIndex((cartItem) => cartItem.name === item);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
}

function clearCart() {
  sessionStorage.clear();
}

function showCart() {
  let cart = getCartFromStorage();
  console.log(cart);
}

// example cart usage
// $('#addToCartButton').on('click', () => {
//   let name = 'Example Product';
//   let price = 125;
//   let quantity = 1;
//   console.log('pressed');
//   addToCart(name, price, quantity);
//   showCart();
// });
