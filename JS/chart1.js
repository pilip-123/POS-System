const ctx1 = document.getElementById("chart1");

new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Earnings in $",
        data: [12, 19, 3, 5, 2, 3, 15],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: true } },
    maintainAspectRatio: true,
  },
});
