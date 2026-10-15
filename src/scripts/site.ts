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

const dock = document.querySelector<HTMLDetailsElement>('#workFilterDock');
const resetFilters = document.querySelector<HTMLButtonElement>('#workFilterReset');
const showProjects = document.querySelector<HTMLButtonElement>('#workFilterDone');
const emptyState = document.querySelector<HTMLElement>('#workNoResults');
const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const industryButtons = document.querySelectorAll<HTMLButtonElement>('[data-industry-filter]');
const cards = document.querySelectorAll<HTMLElement>('[data-type]');
const counter = document.querySelector<HTMLElement>('#filterCount');
const search = document.querySelector<HTMLInputElement>('#projectSearch');
let discipline = 'all';
let industry = 'all';
function filterProjects() {
  const query = (search?.value || '').trim().toLocaleLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const types = (card.dataset.type || '').split(' ');
    const matches = (discipline === 'all' || types.includes(discipline)) &&
      (industry === 'all' || card.dataset.industry === industry) &&
      (!query || (card.dataset.search || '').toLocaleLowerCase().includes(query));
    card.hidden = !matches;
    if(matches) visible++;
  });
  document.querySelectorAll<HTMLElement>('[data-project-section]').forEach(section => {
    section.hidden = !Array.from(section.querySelectorAll<HTMLElement>('[data-type]')).some(card => !card.hidden);
  });
  if(counter) counter.textContent = visible + ' project' + (visible === 1 ? '' : 's') + ' visible';
  if(emptyState) emptyState.hidden = visible !== 0;
}
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  discipline = button.dataset.filter || 'all';
  filterButtons.forEach(b=>{const yes=b===button;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes))});
  filterProjects();
}));
industryButtons.forEach(button=>button.addEventListener('click',()=>{
  industry = button.dataset.industryFilter || 'all';
  industryButtons.forEach(b=>{const yes=b===button;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes))});
  filterProjects();
}));
search?.addEventListener('input',filterProjects);
function resetPortfolioFilters() {
  discipline='all'; industry='all';
  if(search) search.value='';
  filterButtons.forEach(b=>{const yes=b.dataset.filter==='all';b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});
  industryButtons.forEach(b=>{const yes=b.dataset.industryFilter==='all';b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});
  filterProjects();
}
resetFilters?.addEventListener('click',resetPortfolioFilters);
showProjects?.addEventListener('click',()=>{if(dock) dock.open=false;});
dock?.addEventListener('keydown',(e:KeyboardEvent)=>{
  if(e.key==='Escape'){dock.open=false;dock.querySelector<HTMLElement>('summary')?.focus();}
});
document.addEventListener('pointerdown',event=>{
  if(dock?.open && event.target instanceof Node && !dock.contains(event.target)) dock.open=false;
});
if(dock) filterProjects();

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

