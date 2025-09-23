const loadAccounts = async () => {
    try {
      const res = await fetch("/get-accounts"); // backend endpoint
      const data = await res.json(); // server JSON array qaytarmalıdır
      const box = document.querySelector(".box_2");
      box.innerHTML = ""; // əvvəlki content-i təmizləyirik

      data.forEach(account => {
        const accDiv = document.createElement("div");
        accDiv.classList.add("account");
        accDiv.innerHTML = `
          <div class="account_left">
            <img src="${account.img}" alt="">
          </div>
          <div class="account_right">
            <h3>${account.name}</h3>
            <p>${account.email || ""}</p>
          </div>
        `;
        box.appendChild(accDiv);
        box.appendChild(document.createElement("hr"));
      });
    } catch (err) {
      console.error("❌ Server xətası:", err);
    }
  };

  // Səhifə yüklənəndə account-ları gətir
  window.addEventListener("DOMContentLoaded", () => {
    loadAccounts();
  });