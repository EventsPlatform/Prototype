/* ============================================================
   MARKETPLACE
   ============================================================ */
function ratingBadge(p) {
  if (p.rating && p.reviews >= 10) {
    return `<span class="badge badge-amber">★ ${p.rating.toFixed(1)} · ${p.reviews} reviews</span>`;
  }
  return `<span class="badge badge-gray">New · ${p.reviews} review${p.reviews === 1 ? '' : 's'}</span>`;
}
function providerCardHTML(p) {
  return `<div class="card pcard" style="border-left-color:${tagColor(p.tags[0])}" onclick="navigate('provider',{providerId:${p.id}})">
    <div class="cover" style="background:linear-gradient(135deg, ${tagColor(p.tags[0])}20, ${tagColor(p.tags[p.tags.length - 1])}30); display:flex; align-items:center; justify-content:center;">
      ${avatarHTML(p.name, 56)}
      ${p.bizType === 'business' ? '<div class="corner-badge"><span class="badge badge-accent">Business</span></div>' : ''}
    </div>
    <div class="body">
      <div class="h3" style="font-size:15.5px;">${p.name}</div>
      <div class="faint" style="font-size:12.5px;margin:2px 0 8px;">${p.city}</div>
      <div>${ratingBadge(p)}</div>
      <div style="margin-top:10px;">${p.tags.map(t => `<span class="tag-chip">${t}</span>`).join('')}</div>
      <div class="divider" style="margin:14px 0 10px;"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span class="faint" style="font-size:12.5px;">From</span>
        <span style="font-weight:700;font-size:14.5px;">${fmtSAR(p.priceFrom)}</span>
      </div>
    </div>
  </div>`;
}
function priceMatches(p, range) {
  if (range === 'any') return true;
  if (range === 'u1000') return p.priceFrom < 1000;
  if (range === '1000-2000') return p.priceFrom >= 1000 && p.priceFrom <= 2000;
  if (range === '2000plus') return p.priceFrom > 2000;
  return true;
}
function sortProviders(list, sort) {
  const arr = [...list];
  if (sort === 'rating') arr.sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.reviews - a.reviews);
  else if (sort === 'reviews') arr.sort((a, b) => b.reviews - a.reviews);
  else if (sort === 'price-asc') arr.sort((a, b) => a.priceFrom - b.priceFrom);
  else if (sort === 'price-desc') arr.sort((a, b) => b.priceFrom - a.priceFrom);
  return arr;
}
function filteredProviders() {
  let list = PROVIDERS.filter(p => state.filterTag === 'All' || p.tags.includes(state.filterTag));
  list = list.filter(p => state.city === 'All' || p.city === state.city);
  list = list.filter(p => priceMatches(p, state.priceRange));
  if (state.search.trim()) {
    const q = state.search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
  }
  return sortProviders(list, state.sort);
}
function renderMarketplace() {
  const bar = document.getElementById('tagFilterBar');
  bar.innerHTML = ['All', ...CATEGORIES].map(t => {
    const count = t === 'All' ? PROVIDERS.length : PROVIDERS.filter(p => p.tags.includes(t)).length;
    return `<button class="chip ${state.filterTag === t ? 'active' : ''}" onclick="setTag('${t}')">${t} (${count})</button>`;
  }).join('');

  const citySel = document.getElementById('citySelect');
  if (citySel.options.length <= 1) {
    citySel.innerHTML = '<option value="All">All cities</option>' + CITIES.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  const list = filteredProviders();
  const grid = document.getElementById('marketplaceGrid');
  const shown = list.slice(0, state.page * PAGE_SIZE);
  grid.innerHTML = shown.length ? shown.map(providerCardHTML).join('')
    : `<div class="card pad-lg" style="grid-column:1/-1;text-align:center;"><p class="muted">No providers match your filters. Try clearing a filter or searching a different keyword.</p></div>`;

  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.classList.toggle('hidden', shown.length >= list.length);
}
function setTag(t) { state.filterTag = t; state.page = 1; renderMarketplace(); }
function loadMore() { state.page += 1; renderMarketplace(); }
document.getElementById('searchInput').addEventListener('input', e => { state.search = e.target.value; state.page = 1; renderMarketplace(); });
document.getElementById('sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderMarketplace(); });
document.getElementById('priceSelect').addEventListener('change', e => { state.priceRange = e.target.value; state.page = 1; renderMarketplace(); });
document.getElementById('citySelect').addEventListener('change', e => { state.city = e.target.value; state.page = 1; renderMarketplace(); });
