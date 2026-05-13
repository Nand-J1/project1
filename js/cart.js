// Cart page specific JS
function renderCart() {
  const container = document.getElementById("cartItemsList");
  if (!container) return;
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length === 0) {
    container.innerHTML =
      '<p>Your cart is empty. <a href="../index.html">Continue shopping</a></p>';
    document.getElementById("cartTotal").innerText = "0";
    return;
  }
  container.innerHTML = cartItems
    .map(
      (item) => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-minus" data-id="${item.id}">-</button>
        <input type="number" min="1" value="${item.quantity}" class="qty-input" data-id="${item.id}">
        <button class="qty-plus" data-id="${item.id}">+</button>
      </div>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    </div>
  `,
    )
    .join("");

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  document.getElementById("cartTotal").innerText = total;

  // Event listeners
  document.querySelectorAll(".qty-minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const input = document.querySelector(`.qty-input[data-id='${id}']`);
      let val = parseInt(input.value);
      if (val > 1) {
        input.value = val - 1;
        updateCartQuantity(id, val - 1);
        renderCart();
      }
    });
  });
  document.querySelectorAll(".qty-plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const input = document.querySelector(`.qty-input[data-id='${id}']`);
      let val = parseInt(input.value);
      input.value = val + 1;
      updateCartQuantity(id, val + 1);
      renderCart();
    });
  });
  document.querySelectorAll(".qty-input").forEach((inp) => {
    inp.addEventListener("change", () => {
      const id = parseInt(inp.dataset.id);
      let val = parseInt(inp.value);
      if (isNaN(val) || val < 1) val = 1;
      inp.value = val;
      updateCartQuantity(id, val);
      renderCart();
    });
  });
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      removeFromCart(id);
      renderCart();
      updateCartCountDisplay();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      if (cartItems.length === 0) {
        alert("Cart is empty");
      } else {
        window.location.href = "billing.html";
      }
    });
  }
  const continueBtn = document.getElementById("continueShopping");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }
});
