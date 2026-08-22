/* ============================================================
   APP STATE
   Single mutable store shared across all view renderers.
   ============================================================ */
let state = {
  role: 'guest',
  filterTag: 'All',
  search: '',
  sort: 'rating',
  priceRange: 'any',
  city: 'All',
  page: 1,
  currentProviderId: null,
  favorites: [4, 7],
  regRole: 'consumer',
  bizType: 'individual',
  checkoutProviderId: null,
  lightboxProviderId: null,
  lightboxIndex: 0,
};
