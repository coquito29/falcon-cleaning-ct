// Falcon Cleaning Service — site interactions

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu on link click
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header shadow on scroll
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form — opens a pre-filled email
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const service = (data.get('service') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  if (!name || !email) {
    form.reportValidity();
    return;
  }

  const subject = `Cleaning estimate request from ${name}`;
  const lines = [
    `Hi Falcon Cleaning,`,
    ``,
    `My name is ${name} and I'd like a free estimate.`,
    ``,
    service ? `Service needed: ${service}` : null,
    phone ? `Phone: ${phone}` : null,
    `Email: ${email}`,
    ``,
    message ? `Details:\n${message}` : null,
    ``,
    `Thanks!`
  ].filter(Boolean);

  const body = lines.join('\n');
  const mailto = `mailto:falconcleaningservicellc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
  success.hidden = false;
  form.reset();
});

// Reveal-on-scroll for cards & sections
const revealTargets = document.querySelectorAll('.service-card, .why-feature, .trust-item, .hero-card, .visual-card');
revealTargets.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((el) => io.observe(el));
