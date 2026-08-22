/* ============================================================
   MEET THE TEAM
   ============================================================ */
function renderTeam() {
  document.getElementById('teamGrid').innerHTML = TEAM.map(t => `
    <div class="card team-card">
      <div class="team-avatar" style="margin:0 auto 14px;">${avatarHTML(t.name, 76)}</div>
      <div class="h3" style="font-size:15px;">${t.name}</div>
      <div class="faint" style="font-size:12.5px;margin-top:4px;">${t.role}</div>
    </div>`).join('');
}
