// This script changes the CSS of the Home Icons dynamically when clicked
// Select all hero_card elements
// Select all hero_card elements
const heroCards = document.querySelectorAll(".hero_card");

let lastClickedCard = null; // Variable to store the last clicked card

// Add click event listeners to each hero_card
heroCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Reset the styles of the previously clicked card
    if (lastClickedCard && lastClickedCard !== card) {
      lastClickedCard.style.backgroundColor = ""; // Reset background color
      lastClickedCard.style.color = ""; // Reset text color
      lastClickedCard.style.boxShadow = ""; // Reset box shadow
      lastClickedCard.style.borderRadius = ""; // Reset border radius
      lastClickedCard.style.transition = ""; // Reset transition
    }

    // Apply new styles to the currently clicked card
    card.style.backgroundColor = "#06605d";
    card.style.color = "white";
    card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    card.style.borderRadius = "10px";
    card.style.transition = "all 0.3s ease";

    // Update the last clicked card
    lastClickedCard = card;
  });
});



// This script handles the cart functionality
const cart = []; // Store items here
const cartContainer = document.getElementById("cartContainer");
const cartButton = document.getElementById("cartButton");
const addToCartButtons = document.querySelectorAll(".addToCartBtn");

// Add item to cart
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));
    cart.push({ name, price });

    // Create a pop-up message
    const popup = document.createElement("div");
    popup.textContent = "Item successfully added to cart!";
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.backgroundColor = "#3BAEAB";
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    popup.style.zIndex = "1000";
    document.body.appendChild(popup);

    // Remove the pop-up after 3 seconds
    setTimeout(() => {
      popup.remove();
    }, 3000);
  });
});

// Render cart on button click
cartButton.addEventListener("click", () => {
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div style="
        display: block;
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        background-color: #06605d;
        max-width: 500px;
        border-radius: 8px;
      ">
        <h2 style='color: Wheat;' >My Cart</h2>
        <p style='color: whitesmoke;'>No items added to cart yet.</p> 
      </div>
      <div id="addItemsBtn">
        <button style="
          margin-top: 15px;
          width: 100%;
          padding: 10px;
          background-color: #06605d;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        ">
          Add Items
        </button>
      </div>
    `;
    cartContainer.style.display = "block";
    const addItemsBtn = document.getElementById("addItemsBtn");
    if (addItemsBtn) {
      addItemsBtn.addEventListener("click", () => {
        const productsSection = document.getElementById("products");
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartContainer.style.display = "block"; // Show cart

  cartContainer.innerHTML = `
    <div style="
      display: block;
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      background-color: #3BAEAB;
      max-width: 500px;
      border-radius: 8px;
    ">
      <h2 style="color: wheat;" >My Cart</h2>
      <ul style="list-style: none; padding: 0;">
        ${cart
          .map(
            (item) => `
          <li style="display: flex; justify-content: space-between; padding: 8px 0;">
            <span style="color: whitesmoke;" >${item.name}</span>
            <span style="color: whitesmoke;">$${item.price.toFixed(2)}</span>
          </li>
        `
          )
          .join("")}
      </ul>
      <hr />
      <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 10px;">
        <span style="color: wheat" >Total:</span>
        <span style="color: wheat;">$${total.toFixed(2)}</span>
      </div>
      <button style="
        margin-top: 15px;
        width: 100%;
        padding: 10px;
        background-color: #e91e63;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      ">
        Checkout
      </button>
    </div>
  `;
});
