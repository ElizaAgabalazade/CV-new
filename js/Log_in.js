const baseURL = "http://localhost:5000"; // 🔑 yalnız buranı dəyişəcəksən

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn"); // login düymən varsa

// funksiya serverə göndərir
const sendLogin = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) return; // boşdursa göndərmə

  try {
    const res = await fetch(`${baseURL}/users?email=${email}&password=${password}`);
    const data = await res.json();

    if (data.length > 0) {
      const user = data[0];
      alert("✅ Login uğurlu! Xoş gəldin " + user.email);
      // window.location.href = "/dashboard";
    } else {
      alert("❌ Email və ya Password səhvdir!");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Server xətası!");
  }
};

// Enter basanda göndər
[emailInput, passwordInput].forEach(input => {
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendLogin();
  });
});

// Klik basanda göndər
if (loginBtn) {
  loginBtn.addEventListener("click", sendLogin);
}