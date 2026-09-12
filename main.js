// ==========================================================================
// Prime Care Services — site behavior
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initHeroScrollAnimation();
  initContactForm();
});

/* Mobile nav toggle */
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
    });
  });
}

/* Restrained scroll-reveal: fades sections in once, on entry */
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
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => io.observe(el));
}

/*
  The single orchestrated motion moment (home hero only):
  as the visitor scrolls through the hero, the illustration's layers
  (home outline -> caregiver -> senior -> warmth glow) settle into place
  with a gentle parallax drift, and the blob frame softens its shape.
  This intentionally does NOT run on every section — just once, here.
*/
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
    // progress: 0 when hero enters viewport bottom, 1 when centered
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

/* Contact form -> Formspree (progressive enhancement: works without JS too) */
function initContactForm() {
  const form = document.querySelector('.care-form');
  if (!form) return;

  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

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
        status.textContent = 'Something went wrong sending your message. Please call us directly at (604) 865-1727.';
        status.className = 'form-status error';
      }
    } catch (err) {
      status.textContent = 'Something went wrong sending your message. Please call us directly at (604) 865-1727.';
      status.className = 'form-status error';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}


/* Soft ambient shape parallax */
function initAmbient() {
  const shapes = document.querySelectorAll('.ambient-shapes span');
  if (!shapes.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function update() {
    const y = window.scrollY;
    shapes.forEach(s => {
      const depth = parseFloat(s.dataset.depth || '0.2');
      s.style.transform = `translate3d(0, ${y * depth * 0.35}px, 0)`;
    });
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
}
document.addEventListener('DOMContentLoaded', initAmbient);
