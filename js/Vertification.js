ocument.getElementById("sendBtn").addEventListener("click", async () => {
  const code = generateCode(); // 4 rəqəmli kod yaradırıq

  try {
    const res = await fetch("/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: "user@example.com", code }) 
    });

    const data = await res.json();

    if (data.ok) {
      alert(`✅ Sənin təsdiq kodun: ${code}`); 
    } else {
      alert("❌ Kod göndərilmədi!");
    }
  } catch (err) {
    alert("❌ Server xətası!");
  }
});

// Kod generatoru (4 rəqəmli)
const generateCode = () => Math.floor(1000 + Math.random() * 9000);