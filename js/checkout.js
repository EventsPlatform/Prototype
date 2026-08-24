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
  const dateVal = state.checkoutDate || nextAvailableDates(1)[0].raw;
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
      ${state.role === 'guest' ? `
      <div class="kicker-banner" style="margin-bottom:16px;">You're booking as a guest. A consumer account will be created automatically from the details below so you can track this booking.</div>
      <div class="grid grid-2">
        <div class="field"><label>Full name</label><input id="guestName" placeholder="Your name"></div>
        <div class="field"><label>Email</label><input id="guestEmail" type="email" placeholder="you@example.com"></div>
      </div>` : ''}
      <div class="field"><label>Service</label>
        <select>${p.tags.map(t => `<option>${t}</option>`).join('')}</select>
      </div>
      <div class="grid grid-2">
        <div class="field"><label>Date</label><input type="date" id="checkoutDateInput" value="${dateVal}"></div>
        <div class="field"><label>Location</label><input value="${p.city}"></div>
      </div>
      <label style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--text);margin:6px 0 16px;">
        <input type="checkbox" id="insuranceCheck" style="width:auto;" onchange="updateCheckoutTotal()"> Add shoot insurance (+${fmtSAR(insurance)})
      </label>
      <div class="divider"></div>
      <div style="font-size:14px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Service fee (billed on completion)</span><span>${fmtSAR(base)}</span></div>
        <div class="divider" style="margin:10px 0;"></div>
        <div class="hint" style="margin-bottom:8px;font-weight:600;">Due today</div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Security deposit (${(FEES.depositRate * 100) | 0}%)</span><span>${fmtSAR(deposit)}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Platform fee (${(FEES.platformRate * 100) | 0}%)</span><span>${fmtSAR(platformFee)}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">VAT (${(FEES.vatRate * 100) | 0}%, on service + platform fee)</span><span>${fmtSAR(vat)}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Insurance</span><span id="insuranceAmt">0 SAR</span></div>
        <div class="divider"></div>
        <div style="display:flex;justify-content:space-between;font-weight:800;font-size:16px;"><span>Total due today</span><span id="totalAmt">${fmtSAR(deposit + platformFee + vat)}</span></div>
        <div class="faint" style="font-size:12px;margin-top:6px;">The remaining ${fmtSAR(base)} service fee is charged and released to the provider only once you confirm the work is complete.</div>
      </div>
      <div class="kicker-banner" style="margin-top:18px;">Deposits, platform fees and VAT are non-refundable after work begins.</div>
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
  if (state.role === 'guest') {
    const nameEl = document.getElementById('guestName');
    const emailEl = document.getElementById('guestEmail');
    if (!nameEl.value.trim() || !emailEl.value.trim()) {
      showToast('Please add your name and email to continue.');
      (nameEl.value.trim() ? emailEl : nameEl).focus();
      return;
    }
  }
  const p = PROVIDERS.find(x => x.id === state.checkoutProviderId) || PROVIDERS[0];
  const c = window._checkoutCalc;
  const insuranceOn = document.getElementById('insuranceCheck') ? document.getElementById('insuranceCheck').checked : false;
  const total = c.deposit + c.platformFee + c.vat + (insuranceOn ? c.insurance : 0);
  const dateVal = document.getElementById('checkoutDateInput') ? document.getElementById('checkoutDateInput').value : state.checkoutDate;
  const dateLabel = dateVal ? new Date(dateVal).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';
  const ref = '#' + (8800 + Math.floor(Math.random() * 199));
  setRole(state.role === 'guest' ? 'consumer' : state.role);
  window.currentModalEscape = closeBookingConfirmation;

  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay">
      <div class="modal-card" style="max-width:460px;">
        <div class="modal-body" style="text-align:center;padding:34px 26px;">
          <div style="width:56px;height:56px;border-radius:50%;background:var(--green-bg);color:var(--green);display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 16px;">✓</div>
          <div class="h3" style="font-size:19px;">Booking confirmed</div>
          <p class="muted" style="font-size:14px;margin-top:8px;">Your deposit is held in escrow and will be released to ${p.name} once you confirm the work is complete.</p>
          <div class="card pad-md" style="margin-top:18px;text-align:left;font-size:13.5px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Booking reference</span><span style="font-weight:700;">${ref}</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Provider</span><span style="font-weight:600;">${p.name}</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Date</span><span style="font-weight:600;">${dateLabel}</span></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">Paid today</span><span style="font-weight:700;">${fmtSAR(total)}</span></div>
          </div>
          <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="closeBookingConfirmation()">Go to My Bookings</button>
        </div>
      </div>
    </div>`;
}
function closeBookingConfirmation() {
  document.getElementById('modalRoot').innerHTML = '';
  window.currentModalEscape = null;
  state.dashboardTab = 'bookings';
  navigate('dashboard');
}
