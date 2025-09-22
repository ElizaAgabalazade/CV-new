function togglePassword() {
  const input = document.getElementById("password");
  const icon = document.getElementById("toggleIcon");

  if (input.type === "password") {
    input.type = "text";  // göstər
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    input.type = "password"; // gizlət
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}