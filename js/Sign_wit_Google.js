const baseURL = "http://localhost:5000"; // json-server portu

const loadAccounts = async () => {
  try {
    // db.json-dakı "users" siyahısını çəkirik
    const res = await fetch(`${baseURL}/users`);
    const data = await res.json();

    const box = document.querySelector(".box_2");
    box.innerHTML = ""; // əvvəlki məlumatları təmizləyirik

    data.forEach(account => {
      // hər email üçün bir account elementi yaradılır
      const accDiv = document.createElement("div");
      accDiv.classList.add("account");

      accDiv.innerHTML = `
        <div class="account_right">
          <p>${account.email}</p>
        </div>
      `;

      // kliklənəndə həmin email localStorage-da saxlanılır və səhifəyə yönləndirilir
      accDiv.addEventListener("click", () => {
        localStorage.setItem("googleUser", account.email);
        alert(`${account.email} ilə daxil olundu`);

        // ✅ AI_cv.html səhifəsinə yönləndirmə
        setTimeout(() => {
          window.location.href = "AI_cv.html";
        }, 100); // kiçik gecikmə alert üçün
      });

      box.appendChild(accDiv);
      box.appendChild(document.createElement("hr"));
    });
  } catch (err) {
    console.error("❌ Server xətası:", err);
  }
};

// səhifə tam yüklənəndə avtomatik çağırırıq
window.addEventListener("DOMContentLoaded", loadAccounts);