const btn = document.querySelector('.pay-btn');
const successBox = document.querySelector('.succes');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  successBox.classList.toggle('active'); // indi düz oldu
});