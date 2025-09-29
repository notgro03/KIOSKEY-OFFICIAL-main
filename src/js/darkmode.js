// Simple, single-responsibility dark mode toggle script
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.dark-mode-toggle') || document.getElementById('darkModeToggle');
  const root = document.documentElement;
  const body = document.body;

  if (!toggle) return;

  // helper: set classes and icon
  function applyDark(on) {
    if (on) {
      root.classList.add('dark-mode');
      body.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
    }
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-moon', 'fa-sun');
      icon.classList.add(on ? 'fa-sun' : 'fa-moon');
      icon.style.transition = 'transform 220ms ease';
      icon.style.transform = on ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  }

  // init from storage
  const saved = localStorage.getItem('darkMode');
  const initiallyDark = saved === 'enabled';
  applyDark(initiallyDark);

  // a11y
  toggle.setAttribute('role', 'button');
  if (!toggle.hasAttribute('tabindex')) toggle.setAttribute('tabindex', '0');
  toggle.style.cursor = 'pointer';

  // toggle handler
  function toggleDark(e) {
    if (e) e.preventDefault();
    const nowDark = !root.classList.contains('dark-mode');
    applyDark(nowDark);
    localStorage.setItem('darkMode', nowDark ? 'enabled' : 'disabled');
    // emit event
    document.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: nowDark } }));
  }

  toggle.addEventListener('click', toggleDark);
  toggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') toggleDark(e); });
});