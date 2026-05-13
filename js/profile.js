// Profit Overview Page JS (Seller)
function renderProfit() {
  const profitContainer = document.getElementById("profitAmount");
  const breakdownContainer = document.getElementById("salesBreakdown");
  if (!profitContainer) return;

  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "seller") {
    profitContainer.innerText = "Unauthorized";
    return;
  }

  const allOrders = getAllOrders();
  // For seller profit: we need to calculate total revenue from products that belong to this seller
  // In a real app, each product has seller email. For demo, we simulate by saying all orders contribute to profit.
  // But we'll demonstrate logic by showing orders and total sales amount.
  const sellerProducts = JSON.parse(localStorage.getItem("products")) || [];
  const sellerProductIds = sellerProducts.map((p) => p.id);

  let totalProfit = 0;
  let salesBreakdownHtml = "<h3>Recent Sales</h3>";

  // Filter orders that contain at least one product from this seller (simplified)
  const relevantOrders = allOrders.filter((order) =>
    order.items.some((item) => sellerProductIds.includes(item.id)),
  );

  relevantOrders.forEach((order) => {
    const orderTotal = order.items.reduce((sum, item) => {
      if (sellerProductIds.includes(item.id)) {
        return sum + item.price * item.quantity;
      }
      return sum;
    }, 0);
    totalProfit += orderTotal;
    salesBreakdownHtml += `
      <div class="sales-item">
        <span>Order #${order.id}</span>
        <span>${new Date(order.date).toLocaleDateString()}</span>
        <span>₹${orderTotal}</span>
      </div>
    `;
  });

  profitContainer.innerText = `₹${totalProfit}`;
  if (breakdownContainer) {
    if (relevantOrders.length === 0) {
      breakdownContainer.innerHTML = "<p>No sales yet for your products.</p>";
    } else {
      breakdownContainer.innerHTML = salesBreakdownHtml;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "seller") {
    alert("Seller access required");
    window.location.href = "login.html";
    return;
  }
  renderProfit();
});
