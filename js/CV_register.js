  const usernameInput = document.getElementById("usernameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  // Serverə göndərmə funksiyası
  const sendData = async () => {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!username || !email || !password) {
      alert("❌ Zəhmət olmasa bütün sahələri doldurun!");
      return;
    }

    try {
      const res = await fetch("/signup", { // backend endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (data.ok) {
        alert("✅ Qeydiyyat uğurlu!");
        // optional: redirect
        // window.location.href = "/dashboard";
      } else {
        alert("❌ Xəta! Email artıq mövcuddur və ya məlumat səhvdir.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server xətası!");
    }
  };

  // Enter basanda fokus keçid + Password Enter → sendData
  usernameInput.addEventListener("keypress", e => {
    if (e.key === "Enter") emailInput.focus();
  });

  emailInput.addEventListener("keypress", e => {
    if (e.key === "Enter") passwordInput.focus();
  });

  passwordInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendData();
  });