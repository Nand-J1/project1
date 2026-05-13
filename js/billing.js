// Billing page JS
function renderBillingItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("billingItems");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML =
      '<p>No items in cart. <a href="../index.html">Shop now</a></p>';
    document.getElementById("billingTotal").innerText = "0";
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="billing-item">
      <span>${item.name} x ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
    </div>
  `,
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("billingTotal").innerText = total;
}

document.addEventListener("DOMContentLoaded", () => {
  renderBillingItems();

  const form = document.getElementById("billingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser();
      if (!currentUser) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
      }
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      // Place order
      const order = placeOrder();
      if (order) {
        alert(`Payment successful! Order #${order.id} placed.`);
        window.location.href = "dashboard.html";
      } else {
        alert("Order failed. Please try again.");
      }
    });
  }
});
