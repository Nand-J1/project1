// Stock Management Page JS (Seller)
function renderStockTable() {
  const container = document.getElementById("stockTable");
  if (!container) return;

  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "seller") {
    container.innerHTML = "<p>Unauthorized access</p>";
    return;
  }

  // Show only products added by this seller (in a real app; here we show all for demo simplicity)
  // For simplicity, we'll show all products but allow editing by seller demo.
  const allProducts = JSON.parse(localStorage.getItem("products")) || [];

  if (allProducts.length === 0) {
    container.innerHTML =
      '<p>No products found. <a href="seller-add-item.html">Add your first product</a></p>';
    return;
  }

  let html = `
    <table class="stock-table">
      <thead>
        <tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
      </thead>
      <tbody>
  `;

  allProducts.forEach((product) => {
    html += `
      <tr data-id="${product.id}">
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>₹${product.price}</td>
        <td><input type="number" class="stock-input" data-id="${product.id}" value="${product.stock}" min="0" style="width:70px"></td>
        <td>
          <button class="edit-stock-btn" data-id="${product.id}">Update</button>
          <button class="delete-product-btn" data-id="${product.id}">Delete</button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;

  // Attach update events
  document.querySelectorAll(".edit-stock-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const input = document.querySelector(`.stock-input[data-id='${id}']`);
      const newStock = parseInt(input.value);
      if (!isNaN(newStock)) {
        updateProduct(id, { stock: newStock });
        alert("Stock updated");
        renderStockTable(); // refresh
      }
    });
  });

  document.querySelectorAll(".delete-product-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("Delete this product permanently?")) {
        const id = parseInt(btn.dataset.id);
        deleteProduct(id);
        renderStockTable();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "seller") {
    alert("Seller access required");
    window.location.href = "login.html";
    return;
  }
  renderStockTable();
});

function renderStockTable() {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "seller") return;

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  // Filter products by seller email
  const sellerProducts = allProducts.filter(
    (p) => p.seller === currentUser.email,
  );

  // ... rest of rendering using sellerProducts instead of allProducts
}
