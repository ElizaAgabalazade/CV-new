 const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  // funksiya serverə göndərir
  const sendLogin = async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) return; // boşdursa göndərmə

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.ok) {
        alert("✅ Login uğurlu!");
        // optional: redirect
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

  // İstəyə bağlı: hər iki input dolanda avtomatik göndərmək
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener("input", () => {
      if (emailInput.value && passwordInput.value) {
        sendLogin();
      }
    });
  });