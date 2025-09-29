// Robust dark mode toggle supporting multiple toggles, FontAwesome/SVG, keyboard access, aria attributes, and persistence
document.addEventListener('DOMContentLoaded', () => {
  // collect toggles: prefer class-based, but support legacy id
  let toggles = Array.from(document.querySelectorAll('.dark-mode-toggle'));
  const legacy = document.getElementById('darkModeToggle');
  if (legacy && !toggles.length) toggles = [legacy];

  const root = document.documentElement;
  const body = document.body;

  if (!toggles.length) {
    // nothing to do
    return;
  }

  // Update DOM to reflect dark mode state
  function applyDark(on) {
    if (on) {
      root.classList.add('dark-mode');
      body.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
    }

    // update each toggle's accessible state and icon
    toggles.forEach(t => {
      try {
        t.setAttribute('aria-pressed', on ? 'true' : 'false');
        updateIcon(t, on);
      } catch (err) {
        // ignore individual toggle failures
      }
    });
  }

  // Initialize from storage (don't emit event yet)
  const saved = localStorage.getItem('darkMode');
  const initiallyDark = saved === 'enabled';
  applyDark(initiallyDark);

  // Make toggles accessible and attach handlers
  toggles.forEach(toggle => {
    if (!toggle.hasAttribute('role')) toggle.setAttribute('role', 'button');
    if (!toggle.hasAttribute('tabindex')) toggle.setAttribute('tabindex', '0');
    toggle.style.cursor = 'pointer';

    // click handler
    toggle.addEventListener('click', (e) => {
      if (e) e.preventDefault();
      const now = !root.classList.contains('dark-mode');
      applyDark(now);
      localStorage.setItem('darkMode', now ? 'enabled' : 'disabled');
      document.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: now } }));
    });

    // keyboard support
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });

  // Update icon inside a toggle element. Supports FontAwesome <i>, SVG, or generic .icon
  function updateIcon(toggle, isDark) {
    const fa = toggle.querySelector('i');
    const svg = toggle.querySelector('svg');
    const generic = toggle.querySelector('.icon');

    if (fa) {
      // swap FontAwesome moon/sun classes while keeping base family class
      // remove common classes then add the one we want
      fa.classList.remove('fa-moon', 'fa-sun', 'fas-moon', 'fas-sun', 'far-moon', 'far-sun');
      // ensure at least a family class remains (fa, fas, far)
      if (!fa.classList.contains('fa') && !fa.classList.contains('fas') && !fa.classList.contains('far')) {
        fa.classList.add('fa');
      }
      // add new symbol class
      fa.classList.add(isDark ? 'fa-sun' : 'fa-moon');

      // small rotation animation for feedback
      fa.style.transition = 'transform 220ms ease, opacity 180ms';
      fa.style.transform = isDark ? 'rotate(180deg)' : 'rotate(0deg)';
    } else if (svg) {
      // toggle data attribute so CSS can show the correct glyph if desired
      svg.setAttribute('data-theme-icon', isDark ? 'sun' : 'moon');
    } else if (generic) {
      generic.setAttribute('data-icon', isDark ? 'sun' : 'moon');
    } else {
      // fallback: set title for tooltip/assistive tech
      toggle.setAttribute('title', isDark ? 'Desactivar modo oscuro' : 'Activar modo oscuro');
    }
  }

  // ensure initial icon state for all toggles
  toggles.forEach(t => updateIcon(t, initiallyDark));
});