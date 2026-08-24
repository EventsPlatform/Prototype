/* ============================================================
   NAV / VIEW SWITCHING
   ============================================================ */
function navigate(view, opts) {
  opts = opts || {};
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById('view-' + view).classList.remove('hidden');
  document.querySelectorAll('.navlink-btn').forEach(b => b.classList.toggle('active', b.dataset.nav === view));
  window.scrollTo({ top: 0, behavior: 'instant' });
  closeMobileMenu();
  if (view === 'auth' && opts.authtab) setAuthTab(opts.authtab);
  if (view === 'provider' && opts.providerId) { state.currentProviderId = opts.providerId; renderProviderDetail(); }
  if (view === 'dashboard') renderDashboard();
  if (view === 'checkout') { state.checkoutProviderId = opts.providerId || state.checkoutProviderId; state.checkoutDate = opts.date || state.checkoutDate; renderCheckout(); }
}
document.addEventListener('click', e => {
  const nav = e.target.closest('[data-nav]');
  if (nav) { navigate(nav.dataset.nav, { authtab: nav.dataset.authtab }); }
});

/* ---------- role switch (topbar + mobile menu) ---------- */
document.querySelectorAll('.role-switch').forEach(sw => {
  sw.addEventListener('click', e => {
    const btn = e.target.closest('button[data-role]');
    if (!btn) return;
    setRole(btn.dataset.role);
    closeMobileMenu();
    // Give explicit feedback since this switch isn't tied to any one page —
    // without it, clicking looks like it did nothing outside the dashboard.
    if (btn.dataset.role === 'guest') { showToast('Logged out — viewing as Guest (demo)'); navigate('marketplace'); }
    else { showToast('Switched to ' + btn.dataset.role + ' view (demo)'); navigate('dashboard'); }
  });
});
function setRole(role) {
  state.role = role;
  document.querySelectorAll('.role-switch button').forEach(b => b.classList.toggle('active', b.dataset.role === role));
  document.querySelectorAll('.auth-btn').forEach(authBtn => {
    if (role === 'guest') { authBtn.textContent = 'Log in'; authBtn.dataset.nav = 'auth'; }
    else { authBtn.textContent = 'My ' + role.charAt(0).toUpperCase() + role.slice(1) + ' Home'; authBtn.dataset.nav = 'dashboard'; }
  });
}

/* ---------- mobile hamburger menu ---------- */
function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.getElementById('hamburgerBtn').classList.add('active');
  document.getElementById('hamburgerBtn').setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburgerBtn').classList.remove('active');
  document.getElementById('hamburgerBtn').setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}
document.getElementById('hamburgerBtn').addEventListener('click', () => {
  const isOpen = document.getElementById('mobileMenu').classList.contains('open');
  if (isOpen) closeMobileMenu(); else openMobileMenu();
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (document.getElementById('mobileMenu').classList.contains('open')) { closeMobileMenu(); return; }
  const modalRoot = document.getElementById('modalRoot');
  if (modalRoot.innerHTML.trim()) {
    if (typeof window.currentModalEscape === 'function') window.currentModalEscape();
    else modalRoot.innerHTML = '';
  }
});

/* ---------- keyboard activation for custom "button" divs (cards, media blocks) ---------- */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const el = e.target.closest('[role="button"]');
  if (!el) return;
  e.preventDefault();
  el.click();
});

/* ---------- lock background scroll whenever a modal/lightbox is open ---------- */
new MutationObserver(() => {
  const hasModal = document.getElementById('modalRoot').innerHTML.trim().length > 0;
  document.body.classList.toggle('modal-open', hasModal);
}).observe(document.getElementById('modalRoot'), { childList: true });
