// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSutRTgi3qTQTCo0bXU_tfgqTEBUIfdhgBYYsGG-33NPn9BDd0vUYhUHQNNwM-4hqrLJ43GFzSg5LEK2lV5Bq_jlMphAl2E3nqLap8C14o",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699.99,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSytcvnw3XI0T44zv42_OHM9RGNKHU-yzZtfblo37oWPHgeOM0XZqkI64LVnCnPQ0bXXsCgMrTz2rEgLWPiW53RPGks_Lx7JkJKQpchvWpU",
  },
  {
    id: 3,
    name: "Laptop",
    price: 1299.99,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRVeWextMtbk0uO7F1puw5NESg2qfziRM4hUmOCfnAeK2QrLNUnwrJYJHQJyiAgw4gapzHG8tNMwzG50lXEdWlVdppX3VdJsCKvChOLuPU",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249.99,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRqedanYUgXKqzHiuzqc_NpnaxdEP6hYkEDA5ovH5ql4Ul8njvUi9eCOz93HGT-MlhMm3CNW896bweaenxW0Djho-4xs7DlkwoFBHXx1QljXbpYBnx5Ijp4Uw",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 89.99,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTYQb6NOK6WaBpuaXF_OUDAVkfy2zlxceEP_7Lj5Yyoy1hynodUSRW6UjieIFDsyWC2ewWgBfD2cV4_2cc_xowFjt-jes9HdBgjqWKJ3y4",
  },
  {
    id: 6,
    name: "Tablet",
    price: 449.99,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQjLz1YWdIsMbNyNCySJ9M2Vad_2mgCeAORrTMX17MonmglBA7_JXjat_ln55C0QxxCnJTgEiK0m5ObBhzUDykDJnOJyQ59t3Wwnktmdn7KoDS5b6x3E8BFsiI",
  },
  {
    id: 7,
    name: "Camera",
    price: 599.99,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYGDsx97BY59r_zyRjT6sg8eeyySt-r4GYLOGc0ePfUAjIEvpjifb8_TSJJ3oARJy875p5cPG6TpQGTwW-gur_RzRb9TDjys6N1Yv8bKXHl2JU_WtixWny",
  },
  {
    id: 8,
    name: "Gaming Console",
    price: 399.99,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRCv-G_ZGhtFPnC2hc7nr06Udo1rDa4Bt8o7q9C_jRe-FtK6sNm6ODCEuwdC6DzfjTEkNCxwI4FANN_keYcjBrojuP1cYvB4Ve1o2g9c4uq8iwmRvAN1FG5",
  },
];

// Cart state
let cart = [];

// DOM elements
const productsGrid = document.getElementById("products-grid");
const cartContainer = document.getElementById("cart-container");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const overlay = document.getElementById("overlay");
const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout-btn");

// Display products
function displayProducts() {
  productsGrid.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <img class="product-image" src="${product.image}"/>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${
                  product.id
                }">Add to Cart</button>
            </div>
        `;
    productsGrid.appendChild(productCard);
  });

  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Add to cart function
function addToCart(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  const product = products.find((p) => p.id === productId);

  // Check if product is already in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  updateCart();
  openCart();
}

// Update cart display
function updateCart() {
  // Update cart items
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <img class="product-image" src="${item.image}"/>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-quantity" data-id="${
                          item.id
                        }">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-quantity" data-id="${
                          item.id
                        }">+</button>
                        <button class="remove-item" data-id="${
                          item.id
                        }">Remove</button>
                    </div>
                </div>
            `;
      cartItems.appendChild(cartItem);
    });

    // Add event listeners for quantity buttons and remove buttons
    const decreaseButtons = document.querySelectorAll(".decrease-quantity");
    const increaseButtons = document.querySelectorAll(".increase-quantity");
    const removeButtons = document.querySelectorAll(".remove-item");

    decreaseButtons.forEach((button) => {
      button.addEventListener("click", decreaseQuantity);
    });

    increaseButtons.forEach((button) => {
      button.addEventListener("click", increaseQuantity);
    });

    removeButtons.forEach((button) => {
      button.addEventListener("click", removeItem);
    });
  }

  // Update cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;

  // Update cart count
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

// Decrease quantity
function decreaseQuantity(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  const item = cart.find((item) => item.id === productId);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    removeItem(e);
    return;
  }

  updateCart();
}

// Increase quantity
function increaseQuantity(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  const item = cart.find((item) => item.id === productId);
  item.quantity += 1;
  updateCart();
}

// Remove item
function removeItem(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

// Open cart
function openCart() {
  cartContainer.classList.add("active");
  overlay.classList.add("active");
}

// Close cart
function closeCart() {
  cartContainer.classList.remove("active");
  overlay.classList.remove("active");
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
  closeCart();
}

// Event listeners
openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", checkout);

// Initialize
displayProducts();
updateCart();
