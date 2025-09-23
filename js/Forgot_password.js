 document.getElementById("sendBtn").addEventListener("click", async () => {
    const email = document.getElementById("emailInput").value.trim();

    if (!email) {
      alert("❌ Zəhmət olmasa email daxil edin");
      return;
    }

    try {
      const response = await fetch("/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email }) // backend üçün email göndəririk
      });

      const data = await response.json();

      if (data.ok) {
        alert("✅ Kod göndərildi! Email-inizi yoxlayın.");
      } else {
        alert("❌ Kod göndərilə bilmədi!");
      }
    } catch (err) {
      alert("❌ Server xətası!");
      console.error(err);
    }
  });