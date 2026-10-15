// All functionality is progressive enhancement: every destination still works without JS.
const toggle = document.querySelector<HTMLButtonElement>('#menuToggle');
const mobileMenu = document.querySelector<HTMLElement>('#mobileMenu');
const menuSymbol = toggle?.querySelector<HTMLElement>('[aria-hidden]');

function setMenu(open: boolean) {
  if (!toggle || !mobileMenu) return;
  mobileMenu.classList.toggle('open', open);
  mobileMenu.inert = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (menuSymbol) menuSymbol.textContent = open ? '✕' : '☰';
}

toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
document.addEventListener('pointerdown', event => {
  if (toggle?.getAttribute('aria-expanded') === 'true' && event.target instanceof Node && !toggle.contains(event.target) && !mobileMenu?.contains(event.target)) setMenu(false);
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const cards = document.querySelectorAll<HTMLElement>('[data-type]');
const counter = document.querySelector<HTMLElement>('#filterCount');
const search = document.querySelector<HTMLInputElement>('#projectSearch');
let category = 'all';
function filterProjects() {
  const query = (search?.value || '').trim().toLocaleLowerCase();
  let count = 0;
  let reserved = false;
  cards.forEach(card => {
    const typeMatch = category === 'all' || (card.dataset.type ?? '').split(' ').includes(category);
    const searchMatch = !query || (card.dataset.search || '').toLocaleLowerCase().includes(query);
    const visible = typeMatch && searchMatch;
    card.hidden = !visible;
    if (visible && card.dataset.placeholder === 'true') reserved = true;
    else if (visible) count++;
  });
  if (counter) counter.textContent = `${count} project${count === 1 ? '' : 's'} displayed${reserved ? ' · 1 reserved slot' : ''}`;
}
filters.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter ?? 'all';
  filters.forEach(other => {
    const selected = other === button;
    other.classList.toggle('active', selected);
    other.setAttribute('aria-pressed', String(selected));
  });
  filterProjects();
}));
search?.addEventListener('input', filterProjects);

const copyButton = document.querySelector<HTMLButtonElement>('#copyEmail');
const copyFeedback = document.querySelector<HTMLElement>('#copyFeedback');
copyButton?.addEventListener('click', async () => {
  const address = copyButton.dataset.email;
  if (!address) return;
  try {
    await navigator.clipboard.writeText(address);
    if (copyFeedback) copyFeedback.textContent = 'Email address copied.';
  } catch {
    if (copyFeedback) copyFeedback.textContent = 'Select the address in the Email link to copy it.';
  }
});

