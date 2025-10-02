const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signInBtn");

const sendData = async () => {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!username || !email || !password) {
    alert("❌ Zəhmət olmasa bütün sahələri doldurun!");
    return;
  }

  console.log("➡️ Serverə göndərilir:", { username, email, password });

  try {
   const res = await fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, email, password })
});

    const data = await res.json();
    console.log("⬅️ Serverdən gələn cavab:", data);







    
    if (data.ok) {
      alert("✅ Qeydiyyat uğurlu!");
      // Məs: window.location.href = "/dashboard";
    } else {
      alert("❌ Xəta! Email artıq mövcuddur və ya məlumat səhvdir.");
    }
  } catch (err) {
    console.error("❌ Server xətası:", err);
    alert("❌ Server xətası!");
  }
};

signInBtn.addEventListener("click", sendData);