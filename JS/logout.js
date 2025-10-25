const logoutBtn = document.getElementById("logoutBtn");
const cancelBtn = document.getElementById("cancelBtn");
const message = document.getElementById("logoutMessage");

logoutBtn.addEventListener("click", () => {
  message.style.display = "block";
  logoutBtn.disabled = true;
  cancelBtn.disabled = true;
  setTimeout(() => {
    window.location.href = "../pages/login.html"; // Redirect after logout
  }, 1500);
});

cancelBtn.addEventListener("click", () => {
  window.location.href = "../pages/dashboard.html"; // Back to dashboard
});
