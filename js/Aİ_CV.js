
const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: callback => {
    fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then(data => callback(data.country))
      .catch(() => callback('US'));
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
});





const saveBtn = document.getElementById("saveProfile");
const profileInput = document.getElementById("profileInput");

saveBtn.addEventListener("click", async () => {
  const profileText = profileInput.value.trim();

  if (!profileText) {
    alert("⚠️ Boş buraxmaq olmaz!");
    return;
  }

  try {
    const res = await fetch("/api/saveProfile", { // backend endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: profileText })
    });

    const data = await res.json();

    if (data.ok) {
      alert("✅ Profil məlumatı uğurla saxlanıldı!");
    } else {
      alert("❌ Xəta: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Serverə qoşulmaq mümkün olmadı!");
  }
});






















const generateCVBtn = document.getElementById("generateCVBtn");
const cvContainer = document.getElementById("cvContainer");

// Arrow function ilə fetch
const generateCV = async () => {
  try {
    // Backend API çağırışı
    const res = await fetch("/api/generate-cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "user123",  // buraya real username əlavə et
        data: { /* istifadəçinin məlumatları */ }
      })
    });

    const data = await res.json();

    if (data.ok && data.link) {
      // CV linkini göstər
      cvContainer.innerHTML = `<a href="${data.link}" target="_blank" class="cvLink">View / Download Your CV</a>`;
    } else {
      alert("❌ Xəta! CV yaradıla bilmədi.");
    }

  } catch (err) {
    console.error(err);
    alert("❌ Server xətası!");
  }
};

generateCVBtn.addEventListener("click", generateCV);