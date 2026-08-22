/* ============================================================
   AUTH
   ============================================================ */
function setAuthTab(tab) {
  document.querySelectorAll('#authTabs button').forEach(b => b.classList.toggle('active', b.dataset.authtab === tab));
  document.getElementById('loginPanel').classList.toggle('hidden', tab !== 'login');
  document.getElementById('registerPanel').classList.toggle('hidden', tab !== 'register');
}
document.getElementById('authTabs').addEventListener('click', e => {
  const b = e.target.closest('button[data-authtab]'); if (!b) return; setAuthTab(b.dataset.authtab);
});
document.getElementById('regRoleChoice').addEventListener('click', e => {
  const b = e.target.closest('button[data-regrole]'); if (!b) return;
  state.regRole = b.dataset.regrole;
  document.querySelectorAll('#regRoleChoice button').forEach(x => x.classList.toggle('active', x === b));
  document.getElementById('providerFields').classList.toggle('hidden', state.regRole !== 'provider');
});
document.getElementById('bizTypeChoice').addEventListener('click', e => {
  const b = e.target.closest('button[data-biztype]'); if (!b) return;
  state.bizType = b.dataset.biztype;
  document.querySelectorAll('#bizTypeChoice button').forEach(x => x.classList.toggle('active', x === b));
  document.getElementById('businessFields').classList.toggle('hidden', state.bizType !== 'business');
  document.getElementById('individualFields').classList.toggle('hidden', state.bizType === 'business');
});
function mockLogin(role) {
  setRole(role);
  showToast('Logged in as ' + role + ' (prototype — no real authentication)');
  navigate('dashboard');
}
function mockRegister() {
  const agreed = document.getElementById('agreeTerms').checked;
  if (!agreed) { showToast('Please agree to the Terms & Conditions to continue.'); return; }
  setRole(state.regRole);
  const bizNote = (state.regRole === 'provider' && state.bizType === 'business') ? ' — your CR and VAT certificate will be verified before your listing goes live' : '';
  showToast('Account created as ' + state.regRole + bizNote + ' (prototype)');
  navigate('dashboard');
}
