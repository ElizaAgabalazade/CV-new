// ==================== BASE URL ====================
const baseURL = "http://localhost:5000"; // buraya real server gələcək

// ==================== PHONE INPUT ====================
const phoneInput = document.querySelector("#phone input");
if (phoneInput) {
  window.intlTelInput(phoneInput, {
    initialCountry: "auto",
    geoIpLookup: callback => {
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(data => callback(data.country))
        .catch(() => callback('US'));
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
  });
}

// ==================== GENERATE / VIEW CV ====================
const generateCVBtn = document.getElementById("generateCVBtn");
const cvContainer = document.getElementById("cvContainer");

generateCVBtn.addEventListener("click", async () => {
  // Textarea-ların və input-ların dəyərlərini toplayırıq
  const userData = {
    name: document.querySelector(".profile input[type=text]").value.trim(),
    email: document.querySelector(".profile input[type=email]").value.trim(),
    phone: phoneInput ? phoneInput.value.trim() : "",
    address: document.querySelector(".adress input").value.trim(),
    profile: document.getElementById("profileInput1").value.trim(),
    experience: [
      document.getElementById("profileInput2").value.trim(),
      document.getElementById("profileInput3").value.trim(),
      document.getElementById("profileInput4").value.trim()
    ],
    certificates: document.getElementById("profileInput5").value.trim()
  };

  // ==================== VALIDATION ====================
  if (!userData.name || !userData.email) {
    alert("⚠️ Ad və Email boş ola bilməz!");
    return;
  }

  try {
    const res = await fetch(`${baseURL}/api/generate-cv`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userData.name, data: userData })
    });

    const data = await res.json();

    if (data.ok && data.link) {
      cvContainer.innerHTML = `<a href="${data.link}" target="_blank" class="cvLink">View / Download Your CV</a>`;
    } else {
      alert("❌ CV yaradıla bilmədi.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Server xətası!");
  }
});