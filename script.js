// Replace this email address before publishing if you want the quote form to open a real draft.
const BUSINESS_EMAIL = 'service@portmaster.com';

const menuButton = document.getElementById('menu-button');
const mobileNav = document.getElementById('mobile-nav');

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const opening = mobileNav.hidden;
    mobileNav.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
  });

  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }));
}

const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const form = document.getElementById('quote-form');
const formMessage = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const company = (data.get('company') || 'New inquiry').toString();

    const lines = [
      `Name: ${data.get('name')}`,
      `Company: ${company}`,
      `Email: ${data.get('email')}`,
      `Container Size: ${data.get('container')}`,
      `Pickup Location: ${data.get('pickup')}`,
      `Delivery Destination: ${data.get('delivery')}`,
      `Shipment Details: ${data.get('details') || 'Not provided'}`
    ];

    const subject = encodeURIComponent(`PORTMASTER quote request — ${company}`);
    const body = encodeURIComponent(`Hello PORTMASTER,\n\nPlease review the following quote request:\n\n${lines.join('\n')}\n\nThank you.`);
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
    formMessage.textContent = 'Your email app should open with a prepared quote request.';
  });
}
