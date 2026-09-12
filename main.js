// ==========================================================================
// Prime Care Services — site behavior
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initHeroScrollAnimation();
  initContactForm();
  initGradientWash();
});

/* Mobile nav — full-screen slide-over */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Scroll reveal */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => io.observe(el));
}

/* Hero illustration parallax (home only) */
function initHeroScrollAnimation() {
  const stage = document.querySelector('[data-hero-illustration]');
  if (!stage) return;

  const layers = stage.querySelectorAll('.illo-layer');
  const frame = document.querySelector('.blob-frame');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    layers.forEach(l => { l.style.transform = 'none'; l.style.opacity = '1'; });
    return;
  }

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  function update() {
    const rect = stage.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = 1 - clamp(rect.top / vh, 0, 1);
    const progress = clamp(raw * 1.15, 0, 1);

    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth || '1');
      const riseStart = 26 * depth;
      const y = riseStart * (1 - progress);
      const op = clamp(progress * 1.4, 0, 1);
      layer.style.transform = `translateY(${y}px)`;
      layer.style.opacity = String(op);
    });

    if (frame) {
      const morph = 55 + progress * 8;
      frame.style.borderRadius = `${morph}% ${100 - morph}% ${morph - 6}% ${100 - morph + 6}% / 45% 55% 45% 55%`;
    }
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* Contact form → Formspree */
function initContactForm() {
  const form = document.querySelector('.care-form');
  if (!form) return;

  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');

    // Required: name + phone (+ email)
    if (!name.value.trim() || name.value.trim().length < 2) {
      status.textContent = 'Please enter your full name.';
      status.className = 'form-status error';
      name.focus();
      return;
    }
    if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 7) {
      status.textContent = 'Please enter a valid phone number.';
      status.className = 'form-status error';
      phone.focus();
      return;
    }
    if (!email.value.trim() || !email.checkValidity()) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form-status error';
      email.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    status.className = 'form-status';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        form.reset();
        status.textContent = "Thank you — we've received your message and will reach out within one business day.";
        status.className = 'form-status success';
      } else {
        let msg = 'Something went wrong sending your message. Please call us at (604) 865-1727 or message us on WhatsApp.';
        try {
          const data = await response.json();
          if (data && data.error) msg = data.error;
        } catch (_) {}
        status.textContent = msg;
        status.className = 'form-status error';
      }
    } catch (err) {
      status.textContent = 'Unable to send right now. Please call (604) 865-1727 or use WhatsApp.';
      status.className = 'form-status error';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* Soft gradient wash — gentle shift on scroll */
function initGradientWash() {
  const wash = document.querySelector('.gradient-wash');
  if (!wash || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function update() {
    const y = window.scrollY;
    const shift = Math.min(y * 0.04, 80);
    wash.style.backgroundPosition = `0 ${shift}px, 0 ${-shift * 0.6}px, 50% ${shift * 0.3}px`;
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
}
