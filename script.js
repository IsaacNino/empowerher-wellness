/* ============ ICON SETUP ============ */
/* Initializes Lucide icons after the page loads. */
lucide.createIcons();

/* ============ SERVICE DATA ============ */
/* These objects power the service modals.
   Each service card uses data-service="0", "1", or "2" to match this array. */
const services = [
  {
    title: "Individual Therapy",
    icon: "heart",
    color: "bg-sand-100",
    iconColor: "text-accent-400",
    description:
      "Individual therapy provides a compassionate, trauma-informed space where women can explore their experiences, emotions, and personal challenges. Through traditional therapeutic approaches and creative expression, clients are supported in understanding their stories, processing difficult experiences, and reconnecting with their authentic sense of self.",
    whoFor:
      "Women navigating trauma, substance use recovery, anxiety, depression, life transitions, identity challenges, or emotional overwhelm. This service is designed for those seeking individualized support in a safe, nonjudgmental environment.",
    howWeHelp:
      "Using a trauma-informed approach, therapy helps clients process experiences at a pace that feels manageable and supportive. Creative expression can be incorporated when words alone feel insufficient, helping clients access emotions, strengthen their voice, build self-awareness, and develop healthier ways of moving forward. Therapy is further supported by coaching and family therapy when appropriate, creating a more connected path toward recovery."
  },
  {
    title: "Life & Recovery Coaching",
    icon: "compass",
    color: "bg-sand-100",
    iconColor: "text-accent-400",
    description:
      "Life and recovery coaching provides non-clinical, action-focused support for clients working to build a healthier, more meaningful life. While therapy often focuses on healing and deeper emotional work, coaching helps clients apply what they are learning in real time through structure, accountability, and clear next steps.",
    whoFor:
      "Clients who need support turning insight into action. This may include individuals navigating addiction recovery, life transitions, motivation challenges, relapse prevention, daily structure, healthy routines, communication, organization, or rebuilding confidence and independence.",
    howWeHelp:
      "Coaching meets clients where they are and helps them set realistic goals, break those goals into manageable steps, build healthy habits, identify triggers, strengthen internal motivation, and create supportive connections. With consent, the coach can coordinate with the therapist so care feels connected and clients can apply therapeutic work to everyday life. Therapy supports healing. Coaching supports action."
  },
  {
    title: "Family Therapy & Support",
    icon: "heart-handshake",
    color: "bg-sand-100",
    iconColor: "text-accent-400",
    description:
        "Family therapy and support helps clients and their support systems build healthier communication, deeper understanding, and stronger accountability. Recovery does not happen in isolation, and involving trusted support people can help create a more stable foundation for lasting change.",
    whoFor:
        "Clients whose recovery would benefit from family involvement, relational support, clearer boundaries, or stronger communication at home. This may include parents, partners, trusted friends, sponsors, or other meaningful support people when appropriate.",
    howWeHelp:
        "We help families and support systems better understand the client’s needs, strengthen communication, repair patterns that may be getting in the way, and build healthier forms of encouragement and accountability. Family therapy works alongside individual therapy and coaching so care feels connected, practical, and aligned with the client’s recovery goals."
    }
];

/* ============ MODAL ELEMENTS ============ */
const modal = document.getElementById('serviceModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalTitle = document.getElementById('modalTitle');
const modalIcon = document.getElementById('modalIcon');
const modalDescription = document.getElementById('modalDescription');
const modalWho = document.getElementById('modalWho');
const modalHow = document.getElementById('modalHow');
const modalCTA = document.getElementById('modalCTA');

let lastFocusedElement = null;

/* ============ OPEN MODAL ============ */
/* Populates modal content based on selected service index. */
function openModal(index) {
  const service = services[index];

  if (!service) return;

  lastFocusedElement = document.activeElement;

  modalTitle.textContent = service.title;
  modalDescription.textContent = service.description;
  modalWho.textContent = service.whoFor;
  modalHow.textContent = service.howWeHelp;

  modalIcon.className = `w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${service.color}`;
  modalIcon.innerHTML = `<i data-lucide="${service.icon}" class="w-8 h-8 ${service.iconColor}"></i>`;

  modal.classList.remove('hidden');
  modalBackdrop.classList.add('animate-backdrop-in');
  document.body.style.overflow = 'hidden';

  lucide.createIcons();

  setTimeout(() => modalCloseBtn.focus(), 100);

  modal.addEventListener('keydown', trapFocus);
}

/* ============ CLOSE MODAL ============ */
function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  modal.removeEventListener('keydown', trapFocus);

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/* ============ MODAL ACCESSIBILITY ============ */
/* Keeps keyboard focus inside modal and allows Escape to close. */
function trapFocus(e) {
  if (e.key === 'Escape') {
    closeModal();
    return;
  }

  if (e.key !== 'Tab') return;

  const focusable = modalContent.querySelectorAll(
    'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/* ============ MODAL EVENT LISTENERS ============ */
modal.addEventListener('click', (e) => {
  // Only close if the click happened outside the modal card
  if (!modalContent.contains(e.target)) {
    closeModal();
  }
});
modalCloseBtn.addEventListener('click', closeModal);
modalCTA.addEventListener('click', closeModal);

/* Service card click listeners. */
document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('click', () => {
    const index = parseInt(card.dataset.service, 10);
    openModal(index);
  });
});

/* ============ MOBILE MENU ============ */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

let mobileMenuOpen = false;

/* Opens/closes mobile nav menu. */
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuOpen = !mobileMenuOpen;
  mobileMenu.classList.toggle('hidden', !mobileMenuOpen);

  mobileMenuBtn.innerHTML = mobileMenuOpen
    ? '<i data-lucide="x" class="w-6 h-6"></i>'
    : '<i data-lucide="menu" class="w-6 h-6"></i>';

  lucide.createIcons();
});

/* Closes mobile menu after clicking a nav link. */
document.querySelectorAll('.mobile-nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
    lucide.createIcons();
  });
});

/* ============ NAVBAR SCROLL EFFECT ============ */
/* Adds background blur after scrolling. */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('nav-scrolled');
  } else {
    navbar.classList.remove('nav-scrolled');
  }
});

/* ============ SECTION REVEAL ON SCROLL ============ */
/* Adds reveal animation when sections enter viewport. */
const revealSections = document.querySelectorAll('.section-reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealSections.forEach((section) => revealObserver.observe(section));

/* ============ CONTACT FORM ============ */
/* Sends form submissions to the Vercel serverless function at /api/contact. */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.classList.add(
    'opacity-70',
    'cursor-not-allowed'
  );
  submitButton.innerHTML = `
    <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            fill="none">
        </circle>

        <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
        </path>
    </svg>

    Sending...
  `;

  const formData = new FormData(contactForm);

  const payload = {
    name: formData.get('name')?.trim(),
    email: formData.get('email')?.trim(),
    supportType: formData.get('supportType')?.trim(),
    phone: formData.get('phone')?.trim(),
    message: formData.get('message')?.trim(),
    how: formData.get('how')?.trim(),
    website: formData.get('website')?.trim()
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    formSuccess.classList.remove('hidden');
    formSuccess.classList.add('flex');

    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.add('hidden');
      formSuccess.classList.remove('flex');
    }, 4000);
  } catch (error) {
    console.error('Contact form error:', error);
    alert('Sorry, something went wrong. Please try again or reach out directly by email.');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
    submitButton.classList.remove(  
    'opacity-70',
    'cursor-not-allowed'
    );
  }
});