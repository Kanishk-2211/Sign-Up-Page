// Matrix Background Animation
const canvas = document.getElementById("codeRain");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const char = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}
setInterval(drawMatrix, 33);

// Toggle Between Forms
function toggleForms(form) {
  document.getElementById("signInContainer").classList.add("hidden");
  document.getElementById("signUpContainer").classList.add("hidden");
  document.getElementById("forgotContainer").classList.add("hidden");

  if (form === "signup") {
    document.getElementById("signUpContainer").classList.remove("hidden");
  } else if (form === "forgot") {
    document.getElementById("forgotContainer").classList.remove("hidden");
  } else {
    document.getElementById("signInContainer").classList.remove("hidden");
  }
}

// LocalStorage for demo user save
document.getElementById("signUpForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("signUpName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;

  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Account created!");
  toggleForms("signin");
});

document.getElementById("signInForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    alert(`Welcome back, ${user.name}!`);
  } else {
    alert("Invalid credentials.");
  }
});

document.getElementById("forgotForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("A password reset link has been sent to your email (simulated).");
});
