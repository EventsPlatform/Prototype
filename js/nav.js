/* ============================================================
   NAV / VIEW SWITCHING
   ============================================================ */
function navigate(view, opts) {
  opts = opts || {};
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById('view-' + view).classList.remove('hidden');
  document.querySelectorAll('#navlinks button').forEach(b => b.classList.toggle('active', b.dataset.nav === view));
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (view === 'auth' && opts.authtab) setAuthTab(opts.authtab);
  if (view === 'provider' && opts.providerId) { state.currentProviderId = opts.providerId; renderProviderDetail(); }
  if (view === 'dashboard') renderDashboard();
  if (view === 'checkout') { state.checkoutProviderId = opts.providerId || state.checkoutProviderId; renderCheckout(); }
}
document.addEventListener('click', e => {
  const nav = e.target.closest('[data-nav]');
  if (nav) { navigate(nav.dataset.nav, { authtab: nav.dataset.authtab }); }
});

/* ---------- role switch ---------- */
document.getElementById('roleSwitch').addEventListener('click', e => {
  const btn = e.target.closest('button[data-role]');
  if (!btn) return;
  setRole(btn.dataset.role);
});
function setRole(role) {
  state.role = role;
  document.querySelectorAll('#roleSwitch button').forEach(b => b.classList.toggle('active', b.dataset.role === role));
  const authBtn = document.getElementById('authBtn');
  if (role === 'guest') { authBtn.textContent = 'Log in'; authBtn.dataset.nav = 'auth'; }
  else { authBtn.textContent = 'My ' + role.charAt(0).toUpperCase() + role.slice(1) + ' Home'; authBtn.dataset.nav = 'dashboard'; }
}
