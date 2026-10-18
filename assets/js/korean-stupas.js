document.addEventListener('DOMContentLoaded', async () => {
  const mapEl = document.getElementById('korean-stupas-map');
  const galleryEl = document.getElementById('korean-stupas-gallery');
  if (!mapEl || !galleryEl || typeof L === 'undefined') return;

  const countEl = document.getElementById('korean-stupas-count');
  const searchEl = document.getElementById('stupa-search');
  const realmEl = document.getElementById('stupa-realm');
  const typeEl = document.getElementById('stupa-type');
  const resetEl = document.getElementById('stupa-reset');

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  let payload;
  try {
    const response = await fetch('/data/korean-stupas-fr.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('data request failed');
    payload = await response.json();
  } catch (error) {
    mapEl.innerHTML = '<div class="stupa-data-error">Impossible de charger les données du répertoire.</div>';
    return;
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  const map = L.map(mapEl, {scrollWheelZoom:true, minZoom:5}).setView([36.25, 127.85], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.control.scale({imperial:false}).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  const markerByNumber = new Map();

  const populateSelect = (el, values) => {
    [...new Set(values.filter(Boolean))].sort((a,b) => a.localeCompare(b, 'fr')).forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      el.appendChild(option);
    });
  };

  populateSelect(realmEl, items.map(x => x.royaume));
  populateSelect(typeEl, items.map(x => x.type));

  const normalized = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  const cardHtml = (item) => {
    const image = item.image
      ? `<div class="stupa-card-image"><img src="${esc(item.image)}" alt="${esc(item.nom_coreen || item.monument)}" loading="lazy"></div>`
      : '<div class="stupa-card-image stupa-card-placeholder" aria-hidden="true"><span>塔</span></div>';

    const meta = [item.royaume, item.datation].filter(Boolean).map(esc).join(' · ');
    const sourceLink = item.source
      ? `<a href="${esc(item.source)}" target="_blank" rel="noopener">Source patrimoniale ↗</a>`
      : '';
    const photoLink = item.source_photo
      ? `<a href="${esc(item.source_photo)}" target="_blank" rel="noopener">Source photo ↗</a>`
      : '';
    const mapsLink = item.google_maps
      ? `<a href="${esc(item.google_maps)}" target="_blank" rel="noopener">Carte ↗</a>`
      : '';

    return `
      <article class="stupa-card" id="stupa-${esc(item.numero)}" data-stupa-number="${esc(item.numero)}">
        ${image}
        <div class="stupa-card-body">
          <div class="stupa-card-number">${String(item.numero ?? '').padStart(2,'0')}</div>
          <h3>${esc(item.monument.replace(/^\d+\s*[—-]\s*/,''))}</h3>
          ${item.nom_coreen ? `<div class="stupa-card-korean" lang="ko">${esc(item.nom_coreen)}</div>` : ''}
          <div class="stupa-card-meta">${meta}</div>
          ${item.localisation ? `<p class="stupa-card-place">${esc(item.localisation)}</p>` : ''}
          ${item.statut ? `<p class="stupa-card-status">${esc(item.statut)}</p>` : ''}
          <div class="stupa-card-links">${sourceLink}${photoLink}${mapsLink}</div>
          ${item.licence_photo ? `<div class="stupa-photo-credit">${esc(item.licence_photo)}</div>` : ''}
        </div>
      </article>`;
  };

  const popupHtml = (item) => `
    <div class="stupa-popup">
      <strong>${esc(item.monument)}</strong>
      ${item.nom_coreen ? `<div lang="ko">${esc(item.nom_coreen)}</div>` : ''}
      <div>${esc(item.datation)}</div>
      <div>${esc(item.localisation)}</div>
      <a href="#stupa-${esc(item.numero)}">Voir la fiche</a>
    </div>`;

  const filters = () => {
    const q = normalized(searchEl.value);
    const realm = realmEl.value;
    const type = typeEl.value;
    return items.filter(item => {
      if (realm && item.royaume !== realm) return false;
      if (type && item.type !== type) return false;
      if (!q) return true;
      const haystack = normalized([
        item.monument,item.nom_coreen,item.hanja,item.localisation,
        item.datation,item.royaume,item.type,item.statut
      ].join(' '));
      return haystack.includes(q);
    });
  };

  const render = () => {
    const visible = filters();
    galleryEl.innerHTML = visible.map(cardHtml).join('');
    countEl.textContent = `${visible.length} stoupa${visible.length > 1 ? 's' : ''}`;

    markerLayer.clearLayers();
    markerByNumber.clear();
    const bounds = [];

    visible.forEach(item => {
      const lat = Number(item.latitude);
      const lng = Number(item.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      const marker = L.marker([lat,lng]).bindPopup(popupHtml(item));
      marker.addTo(markerLayer);
      markerByNumber.set(String(item.numero), marker);
      bounds.push([lat,lng]);
    });

    if (bounds.length) {
      map.fitBounds(bounds, {padding:[28,28], maxZoom:9});
    }

    galleryEl.querySelectorAll('.stupa-card').forEach(card => {
      card.addEventListener('click', event => {
        if (event.target.closest('a')) return;
        const marker = markerByNumber.get(card.dataset.stupaNumber);
        if (!marker) return;
        const ll = marker.getLatLng();
        map.setView(ll, Math.max(map.getZoom(), 12), {animate:true});
        marker.openPopup();
        mapEl.scrollIntoView({behavior:'smooth', block:'center'});
      });
    });
  };

  [searchEl, realmEl, typeEl].forEach(el => el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', render));
  resetEl.addEventListener('click', () => {
    searchEl.value = '';
    realmEl.value = '';
    typeEl.value = '';
    render();
  });

  render();
});
