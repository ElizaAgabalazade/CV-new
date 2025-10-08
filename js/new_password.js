const baseURL = 'http://localhost:5000'; // 🔥 server adresi buradan dəyişilir 

document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const inputId = icon.getAttribute("data-target");
    const input = document.getElementById(inputId);
    input.type = input.type === "password" ? "text" : "password";
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
});

const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const changeBtn = document.getElementById('changePasswordBtn');

/* === localStorage məlumatları === */
const userEmail = localStorage.getItem('googleUser'); // <--- emaili buradan götürürük

/* === user-i götürən arrow function === */
const getUserByEmail = async (email) => {
  if (!email) return null;

  const res = await fetch(`${baseURL}/users?email=${encodeURIComponent(email)}`);
  const users = await res.json();
  return users.length > 0 ? users[0] : null;
};

/* === Parolu dəyişən arrow function === */
const changePassword = async () => {
  const newPass = newPassword.value.trim();
  const confPass = confirmPassword.value.trim();

  if (!newPass || !confPass) {
    alert('Hər iki sahəni doldurun!');
    return;
  }

  if (newPass !== confPass) {
    alert('Yeni parol və təsdiq eyni deyil!');
    return;
  }

  try {
    if (changeBtn) changeBtn.disabled = true;

    const user = await getUserByEmail(userEmail);
    if (!user) {
      alert('İstifadəçi tapılmadı. Yenidən daxil olun.');
      return;
    }

    if (user.password === newPass) {
      alert('Yeni parol cari parolla eynidir!');
      return;
    }

    // Patch sorğusu ilə db.json-da update
    const res = await fetch(`${baseURL}/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPass })
    });

    if (res.ok) {
      alert('Parol uğurla dəyişdirildi!');
      newPassword.value = '';
      confirmPassword.value = '';

      // ✅ Uğurlu əməliyyatdan sonra AI_cv.html səhifəsinə yönləndirmə
      setTimeout(() => {
        window.location.href = 'AI_cv.html';
      }, 500);
    } else {
      const errorData = await res.json();
      alert('Xəta baş verdi: ' + (errorData.message || 'Server cavab vermədi'));
    }
  } catch (err) {
    console.error(err);
    alert('Xəta baş verdi: ' + (err.message || err));
  } finally {
    if (changeBtn) changeBtn.disabled = false;
  }
};

/* === Enter eventləri === */
newPassword.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    confirmPassword.focus();
  }
});

confirmPassword.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    changePassword();
  }
});

if (changeBtn) changeBtn.addEventListener('click', changePassword);
