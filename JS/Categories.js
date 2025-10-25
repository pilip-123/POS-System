 let products = [
      { name: "Espresso", price: "3000", stock: true, img: "https://images.unsplash.com/photo-1511920170033-f8396924c348" },
      { name: "Cappuccino", price: "3500", stock: false, img: "https://images.unsplash.com/photo-1511920170033-f8396924c348" },
      { name: "Brownie Cupcake", price: "2000", stock: true, img: "https://images.unsplash.com/photo-1599785209707-c85d3f0d5a3b" },
      { name: "Lemon Cake", price: "2500", stock: true, img: "https://images.unsplash.com/photo-1599785209707-c85d3f0d5a3b" },
    ];

    const grid = document.getElementById("productGrid");
    const totalCount = document.getElementById("total-products");
    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const prodName = document.getElementById("prodName");
    const prodPrice = document.getElementById("prodPrice");
    const prodImage = document.getElementById("prodImage");
    const saveBtn = document.getElementById("saveProduct");
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");

    let editingIndex = null;

    function renderProducts(list = products) {
      grid.innerHTML = "";
      list.forEach((p, i) => {
        grid.innerHTML += `
          <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <div class="card-body">
              <h3>${p.name}</h3>
              <p>$${p.price}.00</p>
              <span class="stock ${p.stock ? "in-stock" : "out-stock"}">${p.stock ? "In Stock" : "Out of Stock"}</span>
              <div class="btns">
                <button class="view-btn" onclick="viewProduct(${i})"><i class="fa fa-eye"></i></button>
                <button class="edit-btn" onclick="editProduct(${i})"><i class="fa fa-pen"></i></button>
                <button class="delete-btn" onclick="deleteProduct(${i})"><i class="fa fa-trash"></i></button>
              </div>
            </div>
          </div>
        `;
      });
      totalCount.textContent = list.length;
    }

    document.getElementById("addProduct").onclick = () => {
      editingIndex = null;
      modalTitle.textContent = "Add Product";
      prodName.value = "";
      prodPrice.value = "";
      prodImage.value = "";
      modal.style.display = "flex";
    };

    saveBtn.onclick = () => {
      const file = prodImage.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          saveProductData(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        saveProductData("https://via.placeholder.com/200");
      }
    };

    function saveProductData(imgURL) {
      const newProduct = {
        name: prodName.value,
        price: prodPrice.value,
        stock: true,
        img: imgURL
      };
      if (editingIndex !== null) {
        products[editingIndex] = newProduct;
      } else {
        products.push(newProduct);
      }
      renderProducts();
      closeModal();
    }

    function editProduct(i) {
      editingIndex = i;
      modalTitle.textContent = "Edit Product";
      prodName.value = products[i].name;
      prodPrice.value = products[i].price;
      prodImage.value = "";
      modal.style.display = "flex";
    }

    function deleteProduct(i) {
      if (confirm("Delete this product?")) {
        products.splice(i, 1);
        renderProducts();
      }
    }

    function viewProduct(i) {
      alert(`Product: ${products[i].name}\nPrice: $${products[i].price}`);
    }

    function closeModal() {
      modal.style.display = "none";
    }

    window.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    // 🔍 Search functionality
    searchBtn.onclick = () => {
      const query = searchInput.value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(query));
      renderProducts(filtered);
    };

    searchInput.onkeyup = (e) => {
      if (e.key === "Enter") searchBtn.click();
    };

    renderProducts();