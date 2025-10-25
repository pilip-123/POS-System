let customers = [
  {
    name: "Yom Chavy",
    phone: "0987654321",
    email: "john@example.com",
    history: [
      { date: "12/10/2025", product: "Latte", total: "$5.00" },
      { date: "13/10/2025", product: "Espresso", total: "$3.50" },
    ],
  },
  {
    name: "Yom Rida",
    phone: "0912345678",
    email: "jane@example.com",
    history: [{ date: "14/10/2025", product: "Cappuccino", total: "$4.00" }],
  },
];

function renderTable(list) {
  const tbody = document.querySelector("#customerTable tbody");
  tbody.innerHTML = "";
  list.forEach((c, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>${c.email}</td>
        <td><button class="view-btn" onclick="viewHistory('${c.name}')">View</button></td>
        <td><button class="delete-btn" onclick="deleteCustomer(${index})">Delete</button></td>`;
    tbody.appendChild(tr);
  });
}

function addCustomer() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !phone || !email) return alert("Please fill all fields");
  customers.push({ name, phone, email, history: [] });
  renderTable(customers);
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

function deleteCustomer(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this customer?"
  );
  if (confirmDelete) {
    customers.splice(index, 1);
    renderTable(customers);
    document.getElementById(
      "historyBody"
    ).innerHTML = `<tr><td>—</td><td>No customer selected</td><td>—</td></tr>`;
  }
}

function searchCustomer() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(query) || c.phone.includes(query)
  );
  renderTable(filtered);
}

function viewHistory(name) {
  const customer = customers.find((c) => c.name === name);
  const body = document.getElementById("historyBody");
  body.innerHTML = "";
  customer.history.forEach((h) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${h.date}</td><td>${h.product}</td><td>${h.total}</td>`;
    body.appendChild(row);
  });
}

// Initial load
renderTable(customers);
