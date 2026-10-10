// Progressive enhancements: mobile menu and portfolio category filters.
const toggle = document.querySelector<HTMLButtonElement>('#menuToggle');
const mobileMenu = document.querySelector<HTMLElement>('#mobileMenu');

function closeMenu() {
  if (!toggle || !mobileMenu) return;
  mobileMenu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}

toggle?.addEventListener('click', () => {
  if (!mobileMenu) return;
  const isOpen = mobileMenu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.textContent = isOpen ? '✕' : '☰';
});
mobileMenu?.querySelectorAll<HTMLAnchorElement>('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const cards = document.querySelectorAll<HTMLElement>('[data-type]');
const counter = document.querySelector<HTMLElement>('#filterCount');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(other => {
    const selected = other === button;
    other.classList.toggle('active', selected);
    other.setAttribute('aria-pressed', String(selected));
  });
  const selection = button.dataset.filter ?? 'all';
  let visibleCount = 0;
  let placeholderVisible = false;
  cards.forEach(card => {
    const matches = selection === 'all' || (card.dataset.type ?? '').split(' ').includes(selection);
    card.hidden = !matches;
    if (matches && card.dataset.placeholder === 'true') placeholderVisible = true;
    else if (matches) visibleCount++;
  });
  if (counter) counter.textContent = `${visibleCount} project${visibleCount === 1 ? '' : 's'} displayed${placeholderVisible ? ' · 1 reserved slot' : ''}`;
}));
