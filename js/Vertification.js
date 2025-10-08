const baseURL = "http://localhost:5000"; // json-server port

const sendBtn = document.getElementById("sendBtn");
const inputs = document.querySelectorAll(".section__right_2 input");

// Email artıq məlum
const userEmail = localStorage.getItem("resetEmail") || "test@mail.com";

// === OTP göndərmə (send) ===
sendBtn.addEventListener("click", async () => {
  if (!userEmail) return;

  // 4 rəqəmli OTP
  const otpCode = Math.floor(1000 + Math.random() * 9000);
  localStorage.setItem("resetOtp", otpCode);

  // json-server mock POST (opsional)
  try {
    const res = await fetch(`${baseURL}/otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, otpCode })
    });
    const data = await res.json();
    console.log("OTP serverdə saxlanıldı:", data);
  } catch (err) {
    console.warn("Server POST uğursuz oldu (test üçün localStorage istifadə olunur)");
  }

  alert("OTP göndərildi! Console-a baxın (test üçün).");

  // focus-u ilk inputa gətir
  if (inputs.length > 0) inputs[0].focus();
});

// === Auto focus, backspace və verify ===
inputs.forEach((input, idx) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && idx < inputs.length - 1) {
      inputs[idx + 1].focus();
    }

    // 4 rəqəm daxil edilibsə verify
    const otpEntered = Array.from(inputs).map(i => i.value).join("");
    const storedOtp = localStorage.getItem("resetOtp");

    if (otpEntered.length === inputs.length) {
      if (otpEntered === storedOtp) {
        alert("OTP doğrulama uğurlu!");
        localStorage.removeItem("resetOtp");
        console.log("OTP doğrulama uğurlu!");

        // ✅ Uğurlu doğrulama → AI_cv.html səhifəsinə yönləndir
        setTimeout(() => {
          window.location.href = "AI_cv.html";
        }, 1000);
      } else {
        alert("OTP səhvdir!");
        console.log("OTP doğrulama uğursuz!");
      }
    }
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Backspace" && input.value === "" && idx > 0) {
      inputs[idx - 1].focus();
    }
  });
});