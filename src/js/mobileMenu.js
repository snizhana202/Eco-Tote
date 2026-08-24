const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
  mobileMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);
mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMobileMenu();
});
