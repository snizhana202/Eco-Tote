const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCloseBtn = document.querySelector('.modal-close');
const buyButtons = document.querySelectorAll('.assortment-button');
const orderForm = document.querySelector('.order-form');

const nameInput = orderForm.querySelector('input[name="name"]');
const phoneInput = orderForm.querySelector('input[name="phone"]');
const addressInput = orderForm.querySelector('input[name="address"]');

const toast = document.getElementById('toast');
let toastTimeout;

function openModal() {
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

buyButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

function showError(input, message) {
  const label = input.closest('.modal-label');
  const errorSpan = label.querySelector('.error-message');
  errorSpan.textContent = message;
  input.classList.add('invalid');
}

function clearError(input) {
  const label = input.closest('.modal-label');
  const errorSpan = label.querySelector('.error-message');
  errorSpan.textContent = '';
  input.classList.remove('invalid');
}

const namePattern = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s'-]{2,30}$/;
const phonePattern = /^\+?[0-9]{10,13}$/;

nameInput.addEventListener('input', () => {
  nameInput.value = nameInput.value.replace(/[^А-Яа-яЇїІіЄєҐґA-Za-z\s'-]/g, '');

  if (namePattern.test(nameInput.value.trim())) {
    clearError(nameInput);
  }
});

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/[^\d+]/g, '');

  if (phonePattern.test(phoneInput.value.trim())) {
    clearError(phoneInput);
  }
});

addressInput.addEventListener('input', () => {
  const addressValue = addressInput.value.trim();
  if (addressValue.length >= 5 && addressValue.length <= 100) {
    clearError(addressInput);
  }
});

function validateForm() {
  let isValid = true;

  const nameValue = nameInput.value.trim();
  if (!namePattern.test(nameValue)) {
    showError(
      nameInput,
      "Введіть коректне ім'я (тільки літери, 2-30 символів)."
    );
    isValid = false;
  } else {
    clearError(nameInput);
  }

  const phoneValue = phoneInput.value.trim();
  if (!phonePattern.test(phoneValue)) {
    showError(phoneInput, 'Введіть коректний номер телефону (10-13 цифр).');
    isValid = false;
  } else {
    clearError(phoneInput);
  }

  const addressValue = addressInput.value.trim();
  if (addressValue.length < 5 || addressValue.length > 100) {
    showError(addressInput, 'Адреса має містити від 5 до 100 символів.');
    isValid = false;
  } else {
    clearError(addressInput);
  }

  return isValid;
}

function showToast(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('is-visible');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3000);
}

orderForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  showToast('Дякуємо! Замовлення оформлено.');
  orderForm.reset();
  closeModal();
});
