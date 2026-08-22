/* ============================================================
   CHECKOUT
   ============================================================ */
function renderCheckout() {
  const p = PROVIDERS.find(x => x.id === state.checkoutProviderId) || PROVIDERS[0];
  const base = p.priceFrom;
  const deposit = Math.round(base * FEES.depositRate);
  const platformFee = Math.round(base * FEES.platformRate);
  const vat = Math.round((base + platformFee) * FEES.vatRate);
  const insurance = Math.round(base * FEES.insuranceRate);
  document.getElementById('checkoutRoot').innerHTML = `
    <button class="btn btn-ghost btn-sm" onclick="navigate('provider',{providerId:${p.id}})" style="margin-bottom:20px;">← Back to profile</button>
    <div class="eyebrow">Dynamic · Checkout</div>
    <div class="h2">Confirm your booking</div>
    <div class="card pad-lg" style="margin-top:20px;">
      <div style="display:flex;gap:14px;align-items:center;">
        ${avatarHTML(p.name, 54)}
        <div>
          <div style="font-weight:700;">${p.name}</div>
          <div class="muted" style="font-size:13px;">${p.city} · ${p.tags[0]}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="field"><label>Service</label>
        <select>${p.tags.map(t => `<option>${t}</option>`).join('')}</select>
      </div>
      <div class="grid grid-2">
        <div class="field"><label>Date</label><input type="date" value="2026-09-14"></div>
        <div class="field"><label>Location</label><input value="${p.city}"></div>
      </div>
      <label style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--text);margin:6px 0 16px;">
        <input type="checkbox" id="insuranceCheck" style="width:auto;" onchange="updateCheckoutTotal()"> Add shoot insurance (+${fmtSAR(insurance)})
      </label>
      <div class="divider"></div>
      <div style="font-size:14px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Service fee</span><span>${fmtSAR(base)}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Security deposit (${(FEES.depositRate * 100) | 0}%)</span><span>${fmtSAR(deposit)}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Platform fee (${(FEES.platformRate * 100) | 0}%)</span><span>${fmtSAR(platformFee)}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">VAT (${(FEES.vatRate * 100) | 0}%, on service + platform fee)</span><span>${fmtSAR(vat)}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Insurance</span><span id="insuranceAmt">0 SAR</span></div>
        <div class="divider"></div>
        <div style="display:flex;justify-content:space-between;font-weight:800;font-size:16px;"><span>Total due today</span><span id="totalAmt">${fmtSAR(deposit + platformFee + vat)}</span></div>
      </div>
      <div class="kicker-banner" style="margin-top:18px;">The remaining service fee is only released to the provider once you mark the work as complete. Deposits, platform fees and VAT are non-refundable after work begins.</div>
      <button class="btn btn-primary btn-block" style="margin-top:18px;" onclick="confirmCheckout()">Confirm &amp; pay (prototype)</button>
    </div>
  `;
  window._checkoutCalc = { base, deposit, platformFee, vat, insurance };
}
function updateCheckoutTotal() {
  const c = window._checkoutCalc;
  const on = document.getElementById('insuranceCheck').checked;
  document.getElementById('insuranceAmt').textContent = (on ? c.insurance : 0).toLocaleString() + ' SAR';
  document.getElementById('totalAmt').textContent = (c.deposit + c.platformFee + c.vat + (on ? c.insurance : 0)).toLocaleString() + ' SAR';
}
function confirmCheckout() {
  showToast('Booking confirmed — payment held in escrow (prototype)');
  setRole(state.role === 'guest' ? 'consumer' : state.role);
  setTimeout(() => navigate('dashboard'), 700);
}
