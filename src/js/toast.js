const toast = document.getElementById('toast');
let toastTimeout;

export function showToast(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('is-visible');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3000);
}
