# How to Build a Shopping Cart with HTML, CSS, and JavaScript

![Shopping cart illustration](https://source.unsplash.com/random/1200x600/?ecommerce)

## Introduction

Creating a functional shopping cart is a fantastic project for web developers looking to strengthen their frontend skills. In this blog post, I'll walk you through building a complete shopping cart system from scratch using only HTML, CSS, and vanilla JavaScript—no frameworks or libraries required!

Whether you're a beginner looking to expand your portfolio or an experienced developer brushing up on fundamentals, this project offers valuable practice with DOM manipulation, event handling, and state management.

## What We'll Build

Our shopping cart will include:

- A responsive product display grid
- Add-to-cart functionality
- A slide-out cart panel
- Ability to increase/decrease quantities
- Remove items from cart
- Real-time total calculation
- A simple checkout process

Let's get started!

## Step 1: Setting Up the HTML Structure

First, we need to create the basic structure of our shopping application. We'll need a header with a logo and cart icon, a product display area, and a slide-out cart panel.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Shopping Cart</title>
  </head>
  <body>
    <div class="container">
      <header>
        <div class="logo">ShopEasy</div>
        <div class="cart-icon" id="open-cart">
          🛒 <span class="cart-count" id="cart-count">0</span>
        </div>
      </header>

      <main>
        <div class="products-grid" id="products-grid">
          <!-- Products will be dynamically added here -->
        </div>
      </main>
    </div>

    <div class="overlay" id="overlay"></div>

    <div class="cart-container" id="cart-container">
      <div class="cart-header">
        <h2>Your Cart</h2>
        <button class="close-cart" id="close-cart">✕</button>
      </div>
      <div class="cart-items" id="cart-items">
        <!-- Cart items will be dynamically added here -->
      </div>
      <div class="cart-total">
        <span>Total:</span>
        <span id="cart-total">$0.00</span>
      </div>
      <button class="checkout-btn" id="checkout-btn">Checkout</button>
    </div>
  </body>
</html>
```

This creates the skeleton of our application. I've added IDs to elements that we'll need to interact with using JavaScript.

## Step 2: Adding CSS Styles

Now, let's make our shopping cart look good with some CSS. We'll create a modern, clean design with subtle hover effects and smooth transitions.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f8f9fa;
  color: #212529;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 30px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #0d6efd;
}

.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

/* Product Grid Styles */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  width: 100%;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c757d;
}

.product-info {
  padding: 15px;
}

.product-title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
}

.product-price {
  color: #0d6efd;
  font-weight: bold;
  margin-bottom: 15px;
}

.add-to-cart {
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.add-to-cart:hover {
  background-color: #0b5ed7;
}

/* Cart Styles */
.cart-container {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
}

.cart-container.active {
  right: 0;
}

.cart-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
}

.close-cart {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.cart-items {
  padding: 20px;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dee2e6;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  margin-right: 15px;
  border-radius: 4px;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-title {
  font-weight: 600;
  margin-bottom: 5px;
}

.cart-item-price {
  color: #0d6efd;
  margin-bottom: 10px;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
}

.quantity-btn {
  background-color: #e9ecef;
  border: none;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.quantity {
  margin: 0 10px;
}

.remove-item {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
}

.cart-total {
  padding: 20px;
  border-top: 1px solid #dee2e6;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}

.checkout-btn {
  display: block;
  width: calc(100% - 40px);
  margin: 0 20px 20px;
  padding: 12px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #0b5ed7;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 999;
}

.overlay.active {
  display: block;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .cart-container {
    width: 100%;
    right: -100%;
  }
}
```

Our CSS includes:

- A responsive product grid using CSS Grid
- Card-style product displays with hover effects
- A slide-out cart panel with smooth transitions
- Mobile-responsive design
- Clean, modern styling for buttons and interactive elements

## Step 3: Adding JavaScript Functionality

Now for the fun part—making our shopping cart actually work! We'll use JavaScript to:

- Display products dynamically
- Manage the cart state
- Handle user interactions
- Calculate totals

```javascript
// Sample product data
const products = [
  { id: 1, name: "Wireless Headphones", price: 149.99, image: "🎧" },
  { id: 2, name: "Smartphone", price: 699.99, image: "📱" },
  { id: 3, name: "Laptop", price: 1299.99, image: "💻" },
  { id: 4, name: "Smart Watch", price: 249.99, image: "⌚" },
  { id: 5, name: "Bluetooth Speaker", price: 89.99, image: "🔊" },
  { id: 6, name: "Tablet", price: 449.99, image: "📱" },
  { id: 7, name: "Camera", price: 599.99, image: "📷" },
  { id: 8, name: "Gaming Console", price: 399.99, image: "🎮" },
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
            <div class="product-image">${product.image}</div>
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
                <div class="cart-item-image">${item.image}</div>
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
```

## Breaking Down the JavaScript

Our JavaScript implementation follows these key principles:

### 1. Data Management

We start with some sample product data and a cart array to track what the user has selected. In a real application, you'd likely fetch this data from an API.

### 2. Dynamic Content Generation

The `displayProducts()` function populates our grid with product cards based on the data. This approach keeps our HTML clean and makes it easy to update the UI when data changes.

### 3. Event Handling

We attach event listeners to various elements to handle user interactions like adding items to cart, changing quantities, and checking out.

### 4. State Management

Whenever the cart state changes, we call `updateCart()` to sync the UI with the current data. This ensures the displayed content always reflects the actual state.

### 5. Cart Operations

We've implemented all standard cart operations:

- Adding items
- Increasing/decreasing quantities
- Removing items
- Calculating totals

## Testing and Enhancement Ideas

Once you've implemented the code above, you'll have a fully functional shopping cart! Test it out to see how it works.

Here are some ideas for enhancing this project:

- Persist the cart in localStorage so it remains when the page refreshes
- Add product categories and filtering
- Implement a search function
- Add product details pages
- Create a wishlist feature
- Add animations for adding items to cart
- Implement a more realistic checkout process

## Conclusion

Building a shopping cart from scratch is an excellent way to practice your frontend skills. This project demonstrates how to create a complete interactive feature using just the core web technologies: HTML, CSS, and JavaScript.

The finished product is not only functional but also visually appealing and responsive. You can use this as a foundation for more complex e-commerce projects or as a portfolio piece to showcase your skills.

---

I hope you enjoyed this tutorial! Feel free to modify and expand on this code to create your own unique shopping experience. Happy coding!
