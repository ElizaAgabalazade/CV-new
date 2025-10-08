const BASE_URL = "http://localhost:5000";

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

  try {
    // Mövcud istifadəçiləri çəkmək
    const checkRes = await fetch(`${BASE_URL}/users`);
    const users = await checkRes.json();
    const exists = users.some(user => user.email === email);

    if (exists) {
      alert("❌ Bu email artıq mövcuddur!");
      return;
    }

    // Yeni istifadəçi əlavə et
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const newUser = await res.json();
    console.log("⬅️ Yeni user:", newUser);

    // ✅ AI_cv.html səhifəsinə yönləndirmə
    setTimeout(() => {
      window.location.href = "AI_cv.html";
    }, 100); // 100ms gecikmə alert və fetch tamamlanması üçün kifayətdir

  } catch (err) {
    console.error("❌ Server xətası:", err);
    alert("❌ Server xətası!");
  }
};

signInBtn.addEventListener("click", sendData);