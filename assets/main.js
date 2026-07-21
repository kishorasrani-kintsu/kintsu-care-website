// Shared behavior for all Kintsu Care pages: mobile menu + mailto-based forms + optional journey preview.

function initMobileMenu() {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuButton || !mobileMenu) return;
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    mobileMenu.classList.toggle('hidden');
    document.getElementById('menuIcon').innerHTML = open
      ? '<path d="M4 7h16M4 12h16M4 17h16"/>'
      : '<path d="M6 6l12 12M18 6 6 18"/>';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      document.getElementById('menuIcon').innerHTML = '<path d="M4 7h16M4 12h16M4 17h16"/>';
    });
  });
}

function wireMailtoForm(formId, subjectPrefix) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [];
    for (const [key, value] of data.entries()) {
      if (!value) continue;
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
      lines.push(label + ': ' + value);
    }
    const subject = encodeURIComponent(subjectPrefix + (data.get('persona') ? ' — ' + data.get('persona') : ''));
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:info@kintsucare.in?subject=' + subject + '&body=' + body;
  });
}

function initJourneyPreview() {
  const steps = document.querySelectorAll('.journey-step');
  if (!steps.length) return;
  const journeyCopy = {
    1: 'A care coordinator receives the request and begins the intake checklist.',
    2: 'The clinical team reviews referral letters, reports and prior treatment history.',
    3: 'A treatment slot is confirmed and shared with the patient ahead of their visit.',
    4: 'A visit summary and next-step plan are shared back through the Passport.'
  };
  steps.forEach(button => {
    button.addEventListener('click', () => {
      steps.forEach(item => {
        item.className = 'journey-step flex w-full items-center gap-4 rounded-2xl border soft-line p-4 text-left hover:bg-mist';
      });
      button.className = 'journey-step flex w-full items-center gap-4 rounded-2xl border border-care/30 bg-care-light/60 p-4 text-left';
      const detail = document.getElementById('journeyDetail');
      if (detail) detail.textContent = journeyCopy[button.dataset.step];
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initJourneyPreview();
  wireMailtoForm('waitlistForm', 'Kintsu Care waitlist');
  wireMailtoForm('partnerForm', 'Kintsu Care alliance enquiry');
  wireMailtoForm('careersForm', 'Kintsu Care job application');
});
