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
const userId = localStorage.getItem('userId');
const userEmail = localStorage.getItem('email');

/* === user-i götürən arrow function === */
const getUser = async () => {
  if (userId) {
    const res = await fetch(`${baseURL}/users/${userId}`);
    return await res.json();
  }

  if (userEmail) {
    const res = await fetch(`${baseURL}/users?email=${encodeURIComponent(userEmail)}`);
    const users = await res.json();
    return users.length > 0 ? users[0] : null;
  }

  return null;
};

/* === Parolu dəyişən arrow function === */
const changePassword = async () => {
  const newPass = newPassword.value.trim();
  const confPass = confirmPassword.value.trim();

  // boşluq yoxlaması
  if (!newPass || !confPass) {
    alert('Hər iki sahəni doldurun!');
    return;
  }

  // yeni parol ilə confirm eyni deyil
  if (newPass !== confPass) {
    alert('Yeni parol və təsdiq eyni deyil!');
    return;
  }

  try {
    if (changeBtn) changeBtn.disabled = true;

    const user = await getUser();
    if (!user) {
      alert('İstifadəçi tapılmadı. Yenidən daxil olun.');
      return;
    }

    // köhnə parol ilə eyni qoyulub
    if (user.password === newPass) {
      alert('Yeni parol cari parolla eynidir!');
      return;
    }

    // əsl update sorğusu
    await fetch(`${baseURL}/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPass })
    });

    alert('Parol uğurla dəyişdirildi!');
    newPassword.value = '';
    confirmPassword.value = '';
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