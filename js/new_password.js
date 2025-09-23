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

newPassword.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        confirmPassword.focus();
    }
});

confirmPassword.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();

        if (newPassword.value !== confirmPassword.value) {
            alert('Passwords do not match!');
            return;
        }

        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: newPassword.value })
        })
        .then(res => res.json())
        .then(data => console.log('Server response:', data))
        .catch(err => console.error(err));
    }
});