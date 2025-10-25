 const sales = [];
    const tableBody = document.querySelector("#salesTable tbody");
    const summary = document.getElementById("summary");
    const changeText = document.getElementById("changeText");

    function addProduct(name, price) {
      const existing = sales.find(item => item.name === name);
      if (existing) {
        existing.qty++;
        existing.total = existing.qty * existing.price;
      } else {
        sales.push({ name, price, qty: 1, total: price });
      }
      renderTable();
    }

    function renderTable() {
      tableBody.innerHTML = "";
      let subtotal = 0;
      sales.forEach(item => {
        subtotal += item.total;
        tableBody.innerHTML += `
          <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${item.total.toFixed(2)}</td>
          </tr>`;
      });
      const total = subtotal;
      summary.textContent = `Subtotal: $${subtotal.toFixed(2)} | Total: $${total.toFixed(2)}`;
      updateChange();
    }

    function updateChange() {
      const cash = parseFloat(document.getElementById("cashGiven").value || 0);
      const subtotal = sales.reduce((sum, item) => sum + item.total, 0);
      const change = cash - subtotal;
      if (cash > 0) {
        changeText.textContent = change >= 0
          ? `Change: $${change.toFixed(2)}`
          : `Need $${Math.abs(change).toFixed(2)} more`;
      } else {
        changeText.textContent = "";
      }
    }

    function confirmSale() {
      if (sales.length === 0) {
        alert("Please add products before confirming.");
        return;
      }
      const payment = document.getElementById("paymentType").value;
      alert(`✅ Sale confirmed!\nPayment: ${payment}\nItems: ${sales.length}`);
      sales.length = 0;
      renderTable();
      document.getElementById("cashGiven").value = "";
      changeText.textContent = "";
    }