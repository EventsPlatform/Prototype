/* ============================================================
   HELPERS
   Small, reusable presentation utilities used across views.
   ============================================================ */

const AVATAR_COLORS = ['#3D3A8C', '#0F7A54', '#B03A2E', '#B4790A', '#0E8F8A', '#7A4FC9', '#C24E86', '#2C5FB0'];

function hashStr(s) {
  return Math.abs(s.split('').reduce((a, c) => a + c.charCodeAt(0) * 31, 0));
}

function initials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('');
}

function avatarHTML(name, size) {
  size = size || 44;
  const idx = hashStr(name) % AVATAR_COLORS.length;
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:${AVATAR_COLORS[idx]};font-size:${size * 0.36}px;">${initials(name)}</div>`;
}

function tagColor(tag) {
  return AVATAR_COLORS[hashStr(tag) % AVATAR_COLORS.length];
}

function mediaGradient(seed) {
  const idx = hashStr(seed) % AVATAR_COLORS.length;
  return `linear-gradient(135deg, ${AVATAR_COLORS[idx]}, ${AVATAR_COLORS[(idx + 3) % AVATAR_COLORS.length]})`;
}

function mediaBlockHTML(label, seed, onclick) {
  return `<div class="media-block" style="background-image:${mediaGradient(seed)}" ${onclick ? `onclick="${onclick}"` : ''}><span>${label}</span></div>`;
}

function fmtSAR(n) {
  return n.toLocaleString() + ' SAR';
}

function nextAvailableDates(n) {
  const out = [];
  let d = new Date();
  d.setDate(d.getDate() + 2);
  while (out.length < n) {
    if (d.getDay() !== 5) { out.push(new Date(d)); }
    d.setDate(d.getDate() + (out.length % 2 === 0 ? 2 : 3));
  }
  return out.map(x => x.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
}
