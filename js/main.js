/* ============================================================
   INIT
   Bootstraps the prototype once all modules are loaded.
   ============================================================ */
function renderStats() {
  document.getElementById('heroProviderCount').textContent = PROVIDERS.length;
  document.getElementById('aboutProviderCount').textContent = PROVIDERS.length;
  document.getElementById('aboutCityCount').textContent = CITIES.length;
}
renderStats();
renderTeam();
renderMarketplace();
navigate('marketplace');
