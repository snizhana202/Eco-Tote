import { showToast } from './toast.js';

const supportForm = document.querySelector('.support-form');
const nameInput = supportForm.querySelector('#name');
const emailInput = supportForm.querySelector('#email');
const messageInput = supportForm.querySelector('#message');

function showError(input, message) {
  const errorText = input.parentElement.querySelector('.error-text');
  errorText.textContent = message;
  input.classList.add('invalid');
}

function clearError(input) {
  const errorText = input.parentElement.querySelector('.error-text');
  errorText.textContent = '';
  input.classList.remove('invalid');
}

const namePattern = /^[А-Яа-яЇїІіЄєҐґA-Za-z]+([\s'-][А-Яа-яЇїІіЄєҐґA-Za-z]+)*$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

nameInput.addEventListener('input', () => {
  const value = nameInput.value.trim();
  if (value.length >= 2 && value.length <= 64) {
    clearError(nameInput);
  }
});

emailInput.addEventListener('input', () => {
  if (emailPattern.test(emailInput.value.trim())) {
    clearError(emailInput);
  }
});

function validateSupportForm() {
  let isValid = true;

  const nameValue = nameInput.value.trim();
  if (
    !namePattern.test(nameValue) ||
    nameValue.length < 2 ||
    nameValue.length > 64
  ) {
    showError(nameInput, "Введіть ім'я (від 2 до 64 символів).");
    isValid = false;
  } else {
    clearError(nameInput);
  }

  const emailValue = emailInput.value.trim();
  if (!emailPattern.test(emailValue)) {
    showError(emailInput, 'Введіть коректну електронну пошту.');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  return isValid;
}

supportForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!validateSupportForm()) {
    return;
  }

  showToast('Дякуємо! Ваше повідомлення надіслано.');
  supportForm.reset();
});
