// Upload preview
      document.getElementById("fileInput").addEventListener("change", function (event) {
        const file = event.target.files[0];
        const preview = document.getElementById("uploadPreview");
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            preview.innerHTML = `<p>Logo Uploaded:</p><img src="${e.target.result}" alt="Preview">`;
          };
          reader.readAsDataURL(file);
        } else {
          preview.innerHTML = "";
        }
      });

      // Search Filter
      document.getElementById("searchBtn").addEventListener("click", function () {
        const product = document.getElementById("productFilter").value.toLowerCase();
        const customer = document.getElementById("customerFilter").value.toLowerCase();
        const date = document.getElementById("dateFilter").value;
        const rows = document.querySelectorAll("#salesTable tbody tr");

        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          const matches =
            (!product || cells[1].textContent.toLowerCase().includes(product)) &&
            (!customer || cells[2].textContent.toLowerCase().includes(customer)) &&
            (!date || cells[0].textContent === date);
          row.style.display = matches ? "" : "none";
        });
      });

      // Export PDF
      document.getElementById("exportPDF").addEventListener("click", async function () {
        const { jsPDF } = window.jspdf;
        const container = document.getElementById("reportContainer");
        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Sales_Report.pdf");
      });

      // Export Excel
      document.getElementById("exportExcel").addEventListener("click", function () {
        const wb = XLSX.utils.table_to_book(document.getElementById("salesTable"), { sheet: "Sales Report" });
        XLSX.writeFile(wb, "Sales_Report.xlsx");
      });

      // Edit Button
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const row = this.closest("tr");
          const cells = row.querySelectorAll("td");

          const newDate = prompt("Edit Date:", cells[0].textContent);
          const newProduct = prompt("Edit Product:", cells[1].textContent);
          const newCustomer = prompt("Edit Customer:", cells[2].textContent);
          const newQty = prompt("Edit Quantity:", cells[3].textContent);
          const newTotal = prompt("Edit Total:", cells[4].textContent);

          if (newDate !== null) cells[0].textContent = newDate;
          if (newProduct !== null) cells[1].textContent = newProduct;
          if (newCustomer !== null) cells[2].textContent = newCustomer;
          if (newQty !== null) cells[3].textContent = newQty;
          if (newTotal !== null) cells[4].textContent = newTotal;
        });
      });