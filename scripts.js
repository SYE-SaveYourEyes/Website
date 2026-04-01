const mobileMenu = document.getElementById('mobileMenu');
const menuButtons = document.querySelectorAll('.topbar__menu-button, .mobile-menu__close');
const menuLinks = document.querySelectorAll('.mobile-menu__nav a');

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = link.getAttribute('href');
    if (!target || target === '#') return;
    if (target.startsWith('#')) {
      event.preventDefault();
      const destination = document.querySelector(target);
      if (destination) {
        destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

const faqToggles = document.querySelectorAll('.faq-card__toggle');
faqToggles.forEach((toggle) => {
  const card = toggle.closest('.faq-card');
  toggle.addEventListener('click', () => {
    if (card) {
      card.classList.toggle('open');
    }
  });
});

const copyEmailButton = document.getElementById('copyEmailButton');
const copyEmailToast = document.getElementById('copyEmailToast');

if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    const email = 'syecontact.app@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      if (copyEmailToast) {
        copyEmailToast.textContent = 'Copied to clipboard.';
        copyEmailToast.classList.add('visible');
        window.setTimeout(() => copyEmailToast.classList.remove('visible'), 2500);
      }
    } catch (error) {
      if (copyEmailToast) {
        copyEmailToast.textContent = 'Copy failed. Please use the email link.';
        copyEmailToast.classList.add('visible');
        window.setTimeout(() => copyEmailToast.classList.remove('visible'), 2500);
      }
    }
  });
}

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
