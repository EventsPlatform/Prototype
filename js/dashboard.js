/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard() {
  if (state.role === 'guest') { setRole('consumer'); }
  const header = document.getElementById('dashHeader');
  header.innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;">
      ${avatarHTML(state.role === 'provider' ? 'Sara Al-Harbi' : (state.role === 'admin' ? 'Admin User' : 'Huda M.'), 50)}
      <div>
        <div class="h3">${state.role === 'provider' ? 'Sara Al-Harbi' : (state.role === 'admin' ? 'Admin User' : 'Huda M.')}</div>
        <span class="badge ${state.role === 'admin' ? 'badge-red' : (state.role === 'provider' ? 'badge-accent' : 'badge-green')}">${state.role.toUpperCase()} ACCOUNT</span>
      </div>
    </div>
    <div class="role-switch">
      <button class="${state.role === 'consumer' ? 'active' : ''}" onclick="setRole('consumer');renderDashboard();">Consumer view</button>
      <button class="${state.role === 'provider' ? 'active' : ''}" onclick="setRole('provider');renderDashboard();">Provider view</button>
      <button class="${state.role === 'admin' ? 'active' : ''}" onclick="setRole('admin');renderDashboard();">Admin view</button>
    </div>
  `;
  const root = document.getElementById('dashboardRoot');
  if (state.role === 'consumer') root.innerHTML = consumerDashboardHTML();
  else if (state.role === 'provider') root.innerHTML = providerDashboardHTML();
  else root.innerHTML = adminDashboardHTML();
  initTabs();
  if (state.dashboardTab) { selectTab(state.dashboardTab); state.dashboardTab = null; }
}
function selectTab(tabId) {
  const btn = document.querySelector('.tabs button[data-tab="' + tabId + '"]');
  if (btn) btn.click();
}
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabset => {
    tabset.querySelectorAll('button').forEach(btn => {
      btn.onclick = () => {
        tabset.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const panelId = btn.dataset.tab;
        document.querySelectorAll('.tabpanel[data-group="' + tabset.dataset.group + '"]').forEach(p => p.classList.remove('active'));
        document.querySelector('.tabpanel[data-group="' + tabset.dataset.group + '"][data-panel="' + panelId + '"]').classList.add('active');
      };
    });
  });
}

function consumerDashboardHTML() {
  return `
  <div class="tabs" data-group="consumer">
    <button class="active" data-tab="overview">Overview</button>
    <button data-tab="bookings">My Bookings</button>
    <button data-tab="favorites">Favorites</button>
    <button data-tab="messages">Messages</button>
    <button data-tab="profile">Profile</button>
  </div>

  <div class="tabpanel active" data-group="consumer" data-panel="overview">
    <div class="grid grid-4">
      <div class="stat card"><div class="num">${BOOKINGS.length}</div><div class="label">Total bookings</div></div>
      <div class="stat card"><div class="num">${BOOKINGS.filter(b => b.status === 'Upcoming').length}</div><div class="label">Upcoming</div></div>
      <div class="stat card"><div class="num">${state.favorites.length}</div><div class="label">Saved providers</div></div>
      <div class="stat card"><div class="num">1</div><div class="label">Escrow held</div></div>
    </div>
    <div class="h3" style="margin:24px 0 12px;">Recent activity</div>
    <div class="card pad-md">
      <p class="muted" style="font-size:14px;">Your deposit for <b>Sara Al-Harbi</b> (Wedding Photography, 14 Sep) is confirmed and held in escrow until the shoot is marked complete.</p>
    </div>
  </div>

  <div class="tabpanel" data-group="consumer" data-panel="bookings">
    <div class="table-scroll"><table>
      <tr><th>Provider</th><th>Service</th><th>Date</th><th>Status</th><th>Payment</th></tr>
      ${BOOKINGS.map(b => `<tr><td>${b.provider}</td><td>${b.service}</td><td>${b.date}</td>
        <td><span class="badge ${b.status === 'Upcoming' ? 'badge-accent' : b.status === 'Completed' ? 'badge-green' : 'badge-red'}">${b.status}</span></td>
        <td class="muted">${b.escrow}</td></tr>`).join('')}
    </table></div>
  </div>

  <div class="tabpanel" data-group="consumer" data-panel="favorites">
    <div class="grid grid-3">
      ${PROVIDERS.filter(p => state.favorites.includes(p.id)).map(providerCardHTML).join('') || '<p class="muted">No favorites saved yet.</p>'}
    </div>
  </div>

  <div class="tabpanel" data-group="consumer" data-panel="messages">
    <div class="card pad-md" style="margin-bottom:10px;"><b>Sara Al-Harbi:</b> <span class="muted">Looking forward to your wedding shoot on the 14th! I'll send a shot list beforehand.</span></div>
    <div class="card pad-md"><b>Lensly Support:</b> <span class="muted">Your deposit for booking #8841 has been confirmed.</span></div>
  </div>

  <div class="tabpanel" data-group="consumer" data-panel="profile">
    <div class="card pad-lg" style="max-width:420px;">
      <div class="field"><label>Full name</label><input value="Huda M."></div>
      <div class="field"><label>Email</label><input value="huda@example.com"></div>
      <div class="field"><label>Phone</label><input value="+966 5x xxx xxxx"></div>
      <button class="btn btn-primary" onclick="showToast('Profile saved (prototype)')">Save changes</button>
    </div>
  </div>
  `;
}

function providerDashboardHTML() {
  const p = PROVIDERS[0];
  return `
  <div class="tabs" data-group="provider">
    <button class="active" data-tab="overview">Overview</button>
    <button data-tab="services">My Services</button>
    <button data-tab="portfolio">Portfolio &amp; Media</button>
    <button data-tab="certs">Certificates</button>
    <button data-tab="reviews">Reviews</button>
    <button data-tab="payments">Payments &amp; Deposits</button>
    <button data-tab="business">Business Info</button>
  </div>

  <div class="tabpanel active" data-group="provider" data-panel="overview">
    <div class="grid grid-4">
      <div class="stat card"><div class="num">${p.reviews >= 10 ? p.rating : '—'}</div><div class="label">Rating (hidden until 10+ reviews)</div></div>
      <div class="stat card"><div class="num">${p.reviews}</div><div class="label">Reviews</div></div>
      <div class="stat card"><div class="num">${p.mediaCount}</div><div class="label">Media items</div></div>
      <div class="stat card"><div class="num">2,150 SAR</div><div class="label">Held in escrow</div></div>
    </div>
    <div class="kicker-banner" style="margin-top:20px;">Your rating and review count only appear on the discovery page once you pass 10 rated reviews — you're at ${p.reviews}/10.</div>
  </div>

  <div class="tabpanel" data-group="provider" data-panel="services">
    <div class="field" style="max-width:360px;"><label>Type of service (tags)</label>
      <div>${p.tags.map(t => `<span class="tag-chip">${t}</span>`).join('')}<span class="tag-chip" style="cursor:pointer;border:1px dashed var(--border);">+ Add tag</span></div>
    </div>
    <div class="field" style="max-width:360px;"><label>Starting price (SAR)</label><input value="${p.priceFrom}"></div>
    <button class="btn btn-primary" onclick="showToast('Services updated (prototype)')">Save services</button>
  </div>

  <div class="tabpanel" data-group="provider" data-panel="portfolio">
    <div class="grid grid-3">
      ${p.freelance.map((f, i) => mediaBlockHTML(f, p.name + i, `openLightbox(${p.id},${i})`)).join('')}
      <div class="media-more" onclick="showToast('Upload flow (prototype)')">+ Upload media</div>
    </div>
    <p class="faint" style="font-size:12.5px;margin-top:12px;">Newly uploaded media may be queued for admin quality review before appearing publicly.</p>
  </div>

  <div class="tabpanel" data-group="provider" data-panel="certs">
    ${p.certs.map(c => `<span class="badge badge-green" style="margin:0 8px 8px 0;">${c}</span>`).join('') || '<p class="muted">No certificates yet.</p>'}
    <div style="margin-top:14px;"><button class="btn btn-ghost btn-sm" onclick="showToast('Certificate upload (prototype)')">+ Upload certificate</button></div>
  </div>

  <div class="tabpanel" data-group="provider" data-panel="reviews">
    ${p.reviewsList.map(r => `
      <div class="card pad-md" style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:13.5px;">${r.name}</span><span class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></div>
        <p class="muted" style="font-size:13.5px;margin-top:6px;">${r.text}</p>
      </div>`).join('')}
  </div>

  <div class="tabpanel" data-group="provider" data-panel="payments">
    <div class="table-scroll"><table>
      <tr><th>Booking</th><th>Client</th><th>Amount</th><th>Status</th></tr>
      <tr><td>#8841</td><td>Huda M.</td><td>1,200 SAR</td><td><span class="badge badge-amber">Held until complete</span></td></tr>
      <tr><td>#8790</td><td>Abdullah S.</td><td>950 SAR</td><td><span class="badge badge-green">Released</span></td></tr>
      <tr><td>#8703</td><td>Reem K.</td><td>1,500 SAR</td><td><span class="badge badge-green">Released</span></td></tr>
    </table></div>
    <p class="faint" style="font-size:12.5px;margin-top:12px;">A ${(FEES.platformRate * 100) | 0}% platform fee and ${(FEES.vatRate * 100) | 0}% VAT are deducted before payout; the remaining balance is held in escrow until the client confirms delivery.</p>
  </div>

  <div class="tabpanel" data-group="provider" data-panel="business">
    <div class="field" style="max-width:360px;"><label>Provider type</label>
      <select><option ${p.bizType === 'individual' ? 'selected' : ''}>Individual (freelance / part-time)</option><option ${p.bizType === 'business' ? 'selected' : ''}>Business</option></select>
    </div>
    <div class="field" style="max-width:360px;"><label>Business name</label><input placeholder="Only required for business accounts" value="${p.businessName || ''}"></div>
    <div class="field" style="max-width:360px;"><label>CR Number</label><input placeholder="Only required for business accounts" value="${p.cr || ''}"></div>
    <div class="field" style="max-width:360px;"><label>VAT Certificate</label><input type="file" accept=".pdf,.jpg,.png"><p class="hint">${p.bizType === 'business' ? (p.vatCertVerified ? 'Current certificate verified.' : 'Certificate pending verification.') : 'Not required for individual accounts.'}</p></div>
    <button class="btn btn-primary" onclick="showToast('Business info saved (prototype)')">Save</button>
  </div>
  `;
}

function adminDashboardHTML() {
  return `
  <div class="tabs" data-group="admin">
    <button class="active" data-tab="overview">Overview</button>
    <button data-tab="users">Users</button>
    <button data-tab="approvals">Provider Approvals</button>
    <button data-tab="payments">Payments &amp; Escrow</button>
    <button data-tab="settings">Platform Settings</button>
  </div>

  <div class="tabpanel active" data-group="admin" data-panel="overview">
    <div class="grid grid-4">
      <div class="stat card"><div class="num">1,204</div><div class="label">Total users</div></div>
      <div class="stat card"><div class="num">${PROVIDERS.length}</div><div class="label">Providers</div></div>
      <div class="stat card"><div class="num">${ADMIN_QUEUE.length}</div><div class="label">Pending reviews</div></div>
      <div class="stat card"><div class="num">18,400 SAR</div><div class="label">Currently in escrow</div></div>
    </div>
  </div>

  <div class="tabpanel" data-group="admin" data-panel="users">
    <div class="table-scroll"><table>
      <tr><th>Name</th><th>Role</th><th>Status</th></tr>
      <tr><td>Huda M.</td><td>Consumer</td><td><span class="badge badge-green">Active</span></td></tr>
      <tr><td>Sara Al-Harbi</td><td>Provider (Individual)</td><td><span class="badge badge-green">Active</span></td></tr>
      <tr><td>Khalid Studios</td><td>Provider (Business)</td><td><span class="badge badge-green">Active</span></td></tr>
      <tr><td>Reem K.</td><td>Consumer</td><td><span class="badge badge-gray">Inactive</span></td></tr>
    </table></div>
  </div>

  <div class="tabpanel" data-group="admin" data-panel="approvals">
    <p class="muted" style="font-size:14px;margin-bottom:14px;">Quality-assurance review queue for new provider profiles, certificates and media.</p>
    ${ADMIN_QUEUE.map(q => `
      <div class="card pad-md" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:10px;">
        <div>
          <div style="font-weight:700;font-size:14px;">${q.name} <span class="badge badge-gray" style="margin-left:6px;">${q.type}</span></div>
          <div class="muted" style="font-size:13px;margin-top:4px;">${q.item}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" onclick="showToast('Rejected (prototype)')">Reject</button>
          <button class="btn btn-primary btn-sm" onclick="showToast('Approved (prototype)')">Approve</button>
        </div>
      </div>`).join('')}
  </div>

  <div class="tabpanel" data-group="admin" data-panel="payments">
    <div class="table-scroll"><table>
      <tr><th>Booking</th><th>Consumer</th><th>Provider</th><th>Amount</th><th>Status</th></tr>
      ${ADMIN_PAYMENTS.map(p => `<tr><td>${p.booking}</td><td>${p.consumer}</td><td>${p.provider}</td><td>${p.amount}</td>
        <td><span class="badge ${p.status.includes('Held') ? 'badge-amber' : p.status.includes('Disputed') ? 'badge-red' : 'badge-green'}">${p.status}</span></td></tr>`).join('')}
    </table></div>
  </div>

  <div class="tabpanel" data-group="admin" data-panel="settings">
    <div class="grid grid-2" style="max-width:600px;">
      <div class="card pad-md"><div style="font-weight:700;font-size:14px;">2FA required for Providers &amp; Admins</div><div class="muted" style="font-size:13px;margin-top:4px;">Enabled</div></div>
      <div class="card pad-md"><div style="font-weight:700;font-size:14px;">2FA required for Consumers</div><div class="muted" style="font-size:13px;margin-top:4px;">Optional (disabled by default)</div></div>
      <div class="card pad-md"><div style="font-weight:700;font-size:14px;">Reviews visible after</div><div class="muted" style="font-size:13px;margin-top:4px;">10 rated bookings</div></div>
      <div class="card pad-md"><div style="font-weight:700;font-size:14px;">Default security deposit</div><div class="muted" style="font-size:13px;margin-top:4px;">${(FEES.depositRate * 100) | 0}% of booking value</div></div>
      <div class="card pad-md"><div style="font-weight:700;font-size:14px;">Platform fee</div><div class="muted" style="font-size:13px;margin-top:4px;">${(FEES.platformRate * 100) | 0}% of booking value</div></div>
      <div class="card pad-md"><div style="font-weight:700;font-size:14px;">VAT rate</div><div class="muted" style="font-size:13px;margin-top:4px;">${(FEES.vatRate * 100) | 0}%, per Saudi tax regulations</div></div>
    </div>
  </div>
  `;
}
