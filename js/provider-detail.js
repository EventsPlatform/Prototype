/* ============================================================
   PROVIDER DETAIL
   ============================================================ */
function similarProviders(p) {
  let others = PROVIDERS.filter(x => x.id !== p.id && x.tags.some(t => p.tags.includes(t)));
  if (others.length < 3) others = others.concat(PROVIDERS.filter(x => x.id !== p.id && !others.includes(x)));
  return others.slice(0, 3);
}
function renderProviderDetail() {
  const p = PROVIDERS.find(x => x.id === state.currentProviderId);
  if (!p) return;
  const isFav = state.favorites.includes(p.id);
  const avail = nextAvailableDates(3);
  const similar = similarProviders(p);

  document.getElementById('providerDetail').innerHTML = `
    <button class="btn btn-ghost btn-sm" onclick="navigate('marketplace')" style="margin-bottom:20px;">← Back to marketplace</button>
    <div class="grid" style="grid-template-columns:2fr 1fr;gap:28px;align-items:start;">
      <div>
        <div style="display:flex;gap:16px;align-items:center;">
          ${avatarHTML(p.name, 72)}
          <div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <div class="h2">${p.name}</div>
              ${p.bizType === 'business' ? '<span class="badge badge-accent">Business account</span>' : '<span class="badge badge-gray">Individual</span>'}
            </div>
            <div class="muted" style="margin-top:4px;">${p.city} · ${ratingBadge(p)}</div>
          </div>
        </div>
        <p style="margin-top:18px;font-size:14.5px;" class="muted">${p.bio}</p>
        <div class="stat-row-inline" style="margin-top:14px;">
          <span><b>${p.completedBookings}</b> bookings completed</span>
          <span>${p.responseTime}</span>
        </div>
        <div style="margin-top:14px;">${p.tags.map(t => `<span class="tag-chip">${t}</span>`).join('')}</div>

        <div class="divider"></div>

        <div class="h3" style="margin-bottom:12px;">Portfolio / media (${p.mediaCount} items)</div>
        <div class="grid grid-3">
          ${p.freelance.slice(0, 5).map((f, i) => mediaBlockHTML(f, p.name + i, `openLightbox(${p.id},${i})`)).join('')}
          ${p.mediaCount > p.freelance.length ? `<div class="media-more" onclick="openLightbox(${p.id},0)">+${p.mediaCount - Math.min(5, p.freelance.length)} more</div>` : ''}
        </div>

        <div class="divider"></div>

        <div class="h3" style="margin-bottom:12px;">Freelance work / past projects</div>
        <ul style="margin:0;padding-left:18px;font-size:14px;" class="muted">
          ${p.freelance.map(f => `<li style="margin-bottom:6px;">${f}</li>`).join('') || '<li>None listed yet.</li>'}
        </ul>

        <div class="divider"></div>

        <div class="h3" style="margin-bottom:12px;">Certificates</div>
        ${p.certs.length ? p.certs.map(c => `<span class="badge badge-green" style="margin:0 8px 8px 0;">${c}</span>`).join('') : '<p class="muted" style="font-size:14px;">No certificates uploaded yet.</p>'}

        ${p.bizType === 'business' ? `
        <div class="divider"></div>
        <div class="h3" style="margin-bottom:12px;">Business registration</div>
        <div class="card pad-md" style="font-size:13.5px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">Business name</span><span style="font-weight:600;">${p.businessName}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="muted">CR Number</span><span style="font-weight:600;">${p.cr}</span></div>
          <div style="display:flex;justify-content:space-between;"><span class="muted">VAT Certificate</span><span class="badge ${p.vatCertVerified ? 'badge-green' : 'badge-amber'}">${p.vatCertVerified ? 'Verified' : 'Pending verification'}</span></div>
        </div>` : ''}

        <div class="divider"></div>

        <div class="h3" style="margin-bottom:12px;">Reviews</div>
        ${p.reviews >= 10 ? p.reviewsList.map(r => `
          <div class="card pad-md" style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:13.5px;">${r.name}</span><span class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></div>
            <p class="muted" style="font-size:13.5px;margin-top:6px;">${r.text}</p>
            <p class="faint" style="font-size:11.5px;margin-top:6px;">${r.date}</p>
          </div>`).join('')
          : `<div class="kicker-banner">Reviews are hidden on the discovery page until a provider reaches 10+ rated bookings. This provider currently has ${p.reviews}.</div>`}

        ${similar.length ? `
        <div class="divider"></div>
        <div class="h3" style="margin-bottom:12px;">Similar providers</div>
        <div class="grid grid-3">${similar.map(providerCardHTML).join('')}</div>` : ''}
      </div>

      <div>
        <div class="card pad-lg" style="position:sticky;top:90px;">
          <div class="faint" style="font-size:12.5px;">Starting from</div>
          <div class="h2">${fmtSAR(p.priceFrom)}</div>
          <button class="btn btn-primary btn-block" style="margin-top:16px;" onclick="navigate('checkout',{providerId:${p.id}})">Book now</button>
          <button class="btn btn-ghost btn-block" style="margin-top:10px;" onclick="toggleFavorite(${p.id})">${isFav ? '★ Saved to favorites' : '☆ Save to favorites'}</button>
          <div class="divider"></div>
          <div class="hint" style="margin-bottom:8px;font-weight:600;color:var(--text-dim);">Next available</div>
          <div>${avail.map(d => `<span class="tag-chip">${d}</span>`).join('')}</div>
          <div class="divider"></div>
          <div style="font-size:13px;" class="muted">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span>Security deposit</span><span>${(FEES.depositRate * 100) | 0}%</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span>Platform fee</span><span>${(FEES.platformRate * 100) | 0}%</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span>VAT</span><span>${(FEES.vatRate * 100) | 0}%</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Payment release</span><span>On completion</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}
function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i > -1) state.favorites.splice(i, 1); else state.favorites.push(id);
  renderProviderDetail();
  showToast(i > -1 ? 'Removed from favorites' : 'Saved to favorites');
}

/* ---------- lightbox ---------- */
function openLightbox(providerId, index) {
  state.lightboxProviderId = providerId; state.lightboxIndex = index;
  renderLightbox();
}
function closeLightbox() { document.getElementById('modalRoot').innerHTML = ''; }
function shiftLightbox(delta) {
  const p = PROVIDERS.find(x => x.id === state.lightboxProviderId);
  const n = p.freelance.length;
  state.lightboxIndex = (state.lightboxIndex + delta + n) % n;
  renderLightbox();
}
function renderLightbox() {
  const p = PROVIDERS.find(x => x.id === state.lightboxProviderId);
  if (!p) return;
  const label = p.freelance[state.lightboxIndex];
  document.getElementById('modalRoot').innerHTML = `
    <div class="lightbox-overlay" onclick="if(event.target===this) closeLightbox()">
      <div class="lightbox-card">
        <div class="lightbox-media" style="background-image:${mediaGradient(p.name + state.lightboxIndex)}"><span>${label}</span></div>
        <div class="lightbox-controls">
          <button class="btn btn-ghost btn-sm" onclick="shiftLightbox(-1)">Previous</button>
          <span class="faint" style="font-size:12.5px;">${state.lightboxIndex + 1} / ${p.freelance.length} · ${p.name}</span>
          <button class="btn btn-ghost btn-sm" onclick="shiftLightbox(1)">Next</button>
        </div>
        <div style="text-align:center;margin-top:12px;">
          <button class="btn btn-ghost btn-sm" onclick="closeLightbox()">Close</button>
        </div>
      </div>
    </div>`;
}
