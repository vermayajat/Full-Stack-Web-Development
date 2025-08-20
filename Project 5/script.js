// Set the launch date (YYYY, MM (0-11), DD, HH, MM, SS)
const launchDate = new Date("2025-12-31T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = launchDate - now;

  if (timeLeft <= 0) {
    document.getElementById("countdown").innerHTML = "<h2>We’re Live! 🎉</h2>";
    clearInterval(timer);
    return;
  }

  // Calculate time components
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update UI
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Update every second
const timer = setInterval(updateCountdown, 1000);
updateCountdown();
