// Seller Add Item Page JS
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "seller") {
    alert("Access denied. Please login as seller.");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("addProductForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("prodName").value;
      const category = document.getElementById("prodCategory").value;
      const price = parseFloat(document.getElementById("prodPrice").value);
      const stock = parseInt(document.getElementById("prodStock").value);
      const description = document.getElementById("prodDesc").value;
      const image =
        document.getElementById("prodImage").value ||
        "https://via.placeholder.com/150";

      if (!name || !price || !stock) {
        alert("Please fill all required fields");
        return;
      }

      const newProduct = {
        name,
        category,
        price,
        stock,
        description,
        image,
        seller: currentUser.email,
      };

      addProduct(newProduct);
      alert("Product added successfully!");
      form.reset();
    });
  }
});
