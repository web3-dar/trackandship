document.getElementById("trackingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the entered tracking ID
  const trackingId = document.getElementById("trackingId").value.trim();

  // Save it to localStorage
  localStorage.setItem("trackingId", trackingId);

  // Show the loading overlay
  document.getElementById("loadingOverlay").style.display = "flex";

  // Wait for 3 seconds before redirecting
  setTimeout(function () {
    // Redirect to track.html
    window.location.href = "track.html";
  }, 3000); // 3000 milliseconds = 3 seconds
});
