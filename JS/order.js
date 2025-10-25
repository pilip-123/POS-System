const products = [
  { name: "Espresso", price: 3, image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=600" },
  { name: "Latte", price: 3.5, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600" },
  { name: "Cappuccino", price: 4, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600" },
  { name: "Brownie", price: 2.5, image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600" },
  { name: "Croissant", price: 2, image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=600" },
  { name: "Cheesecake", price: 3.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600" }
];

const productList = document.getElementById("productList");
const cartTable = document.querySelector("#cartTable tbody");
const subtotalDisplay = document.getElementById("subtotal");
const viewModal = document.getElementById("viewModal");
const receiptModal = document.getElementById("receiptModal");
const receiptDetails = document.getElementById("receiptDetails");
let subtotal = 0;

// Display products
products.forEach(prod => {
  const div = document.createElement("div");
  div.classList.add("product-card");
  div.innerHTML = `
    <img src="${prod.image}" alt="${prod.name}">
    <h4>${prod.name}</h4>
    <p>$${prod.price.toFixed(2)}</p>
    <button class="btn view-btn">View</button>
    <button class="btn add-btn">Add to Cart</button>
  `;
  productList.appendChild(div);

  div.querySelector(".view-btn").addEventListener("click", () => {
    document.getElementById("viewName").textContent = prod.name;
    document.getElementById("viewImage").src = prod.image;
    document.getElementById("viewPrice").textContent = `Price: $${prod.price.toFixed(2)}`;
    viewModal.style.display = "flex";
  });

  div.querySelector(".add-btn").addEventListener("click", () => addToCart(prod.name, prod.price));
});

document.getElementById("closeView").addEventListener("click", () => viewModal.style.display = "none");

function addToCart(name, price) {
  let existingRow = [...cartTable.children].find(row => row.children[0].textContent === name);
  if (existingRow) {
    let qty = parseInt(existingRow.children[1].textContent);
    qty++;
    existingRow.children[1].textContent = qty;
    existingRow.children[3].textContent = (qty * price).toFixed(2);
  } else {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>1</td>
      <td>${price.toFixed(2)}</td>
      <td>${price.toFixed(2)}</td>
      <td>
        <button class="action-btn edit-btn">Edit</button>
        <button class="action-btn delete-btn">Delete</button>
      </td>
    `;
    cartTable.appendChild(row);

    row.querySelector(".edit-btn").addEventListener("click", () => {
      const newQty = prompt("Enter new quantity:", row.children[1].textContent);
      if (newQty && newQty > 0) {
        row.children[1].textContent = newQty;
        row.children[3].textContent = (newQty * price).toFixed(2);
        updateSubtotal();
      }
    });

    row.querySelector(".delete-btn").addEventListener("click", () => {
      row.remove();
      updateSubtotal();
    });
  }
  updateSubtotal();
}

function updateSubtotal() {
  subtotal = 0;
  cartTable.querySelectorAll("tr").forEach(row => subtotal += parseFloat(row.children[3].textContent));
  subtotalDisplay.textContent = subtotal.toFixed(2);
}

// Confirm Order with QR Code
document.getElementById("confirmOrder").addEventListener("click", () => {
  const customerName = document.getElementById("customerName").value.trim();
  if (!customerName) return alert("⚠️ Please enter customer name!");
  if (subtotal === 0) return alert("⚠️ Your cart is empty!");

  const dateTime = new Date().toLocaleString();
  const qrData = `Customer: ${customerName}\nTotal: $${subtotal.toFixed(2)}\nDate: ${dateTime}`;
  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`;

  let html = `<p><b>Customer:</b> ${customerName}</p>`;
  html += "<table style='width:100%; text-align:center; border-collapse:collapse;'>";
  html += "<tr><th>Product</th><th>Qty</th><th>Total</th></tr>";
  cartTable.querySelectorAll("tr").forEach(row => {
    html += `<tr><td>${row.children[0].textContent}</td><td>${row.children[1].textContent}</td><td>$${row.children[3].textContent}</td></tr>`;
  });
  html += `</table><hr><p><b>Total:</b> $${subtotal.toFixed(2)}</p>`;
  html += `<p>🕒 ${dateTime}</p>`;
  html += `<div style="text-align:center; margin-top:15px;">
            <img src="${qrURL}" alt="QR Code" style="width:120px; height:120px;">
            <p style="font-size:13px; color:#555;">Scan for Order Info</p>
          </div>`;

  receiptDetails.innerHTML = html;
  receiptModal.style.display = "flex";
});

// ✅ Close Button for Receipt
document.addEventListener("DOMContentLoaded", () => {
  const closeReceiptBtn = document.getElementById("closeReceipt");
  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener("click", () => {
      receiptModal.style.display = "none";
      cartTable.innerHTML = "";
      subtotal = 0;
      updateSubtotal();
    });
  }
});

// Print receipt
document.getElementById("printReceipt").addEventListener("click", () => {
  const printWindow = window.open("", "", "width=400,height=600");
  printWindow.document.write("<h3>🧾 Customer Receipt</h3>");
  printWindow.document.write(receiptDetails.innerHTML);
  printWindow.print();
  printWindow.close();
});
