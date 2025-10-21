const faqSendBtn = document.getElementById("faqSendBtn");

faqSendBtn.addEventListener("click", () => {
  const email = document.getElementById("faqEmail").value.trim();
  const message = document.getElementById("faqMessage").value.trim();

  // Əgər heç nə yazılmayıbsa, sadəcə heç nə etmə (alert yoxdur)
  if (!email && !message) return;

  // Gələcəkdə bura email göndərmə funksiyası əlavə olunacaq
  console.log("Email:", email);
  console.log("Message:", message);

  // İndi sadəcə input-ları təmizləyək
  document.getElementById("faqEmail").value = "";
  document.getElementById("faqMessage").value = "";
});