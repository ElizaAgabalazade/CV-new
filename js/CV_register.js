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
    // 1) Mövcud userləri çəkirik
    const checkRes = await fetch("http://localhost:5000/users");
    const users = await checkRes.json();

    // 2) Email təkrar olub-olmadığını yoxlayırıq
    const exists = users.some(user => user.email === email);
    if (exists) {
      alert("❌ Bu email artıq mövcuddur!");
      return;
    }

    // 3) Əgər email unikal-dırsa → yeni user əlavə edirik
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    console.log("⬅️ Serverdən gələn cavab:", data);

    if (data.id) {
      alert("✅ Qeydiyyat uğurlu!");
      // Məs: window.location.href = "/dashboard";
    } else {
      alert("❌ Qeydiyyat alınmadı.");
    }
  } catch (err) {
    console.error("❌ Server xətası:", err);
    alert("❌ Server xətası!");
  }
};

signInBtn.addEventListener("click", sendData);