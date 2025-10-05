const baseURL = "http://localhost:5000";

const emailInput = document.getElementById("email");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
  // email inputu götür, boşluqları sil və kiçik hərfə çevir
  const email = emailInput.value.trim().toLowerCase();
  if (!email) {
    alert("Email daxil edin!");
    return;
  }

  try {
    // db.json-da email yoxla (case insensitive üçün kiçik hərf)
    const res = await fetch(`${baseURL}/users`);
    const users = await res.json();

    // case insensitive müqayisə
    const matchedUser = users.find(user => user.email.toLowerCase() === email);

    if (!matchedUser) {
      alert("Belə email ilə istifadəçi tapılmadı!");
      return;
    }

    // user mövcuddur → OTP yarat
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 rəqəmli OTP
    console.log("OTP (test üçün):", otp);

    // OTP və email-i localStorage-da saxla
    localStorage.setItem("resetOtp", otp);
    localStorage.setItem("resetEmail", email);

    // verification səhifəsinə yönləndir
    window.location.href = "./Verification.html";
  } catch (err) {
    console.error(err);
    alert("Xəta baş verdi!");
  }
});