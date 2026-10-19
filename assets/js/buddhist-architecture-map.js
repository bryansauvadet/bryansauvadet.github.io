document.addEventListener('DOMContentLoaded', async () => {
  const mapEl = document.getElementById('buddhist-architecture-sites-map');
  if (!mapEl || typeof L === 'undefined') return;

  const rawLang = (document.documentElement.lang || 'fr').toLowerCase();
  const lang = rawLang.startsWith('zh') ? 'zh-hant' : rawLang.split('-')[0];

  const ui = {
    fr: {
      kicker:'Géographie du dossier', title:'Carte interactive des sites cités',
      intro:'Explorez les monuments, monastères, sites archéologiques, grottes et paysages sacrés mentionnés dans le dossier. Les monuments appartenant à une même enceinte sont regroupés sous un même point.',
      search:'Recherche', placeholder:'Monument, ville, région…', country:'Pays', allCountries:'Tous les pays',
      type:'Type de site', allTypes:'Tous les types', reset:'Réinitialiser', related:'Éléments cités',
      seeText:'Voir dans le texte', site:'site', sites:'sites', loading:'Chargement de la carte…',
      error:'Impossible de charger les données de la carte.', legend:'Pays représentés'
    },
    en: {
      kicker:'Dossier geography', title:'Interactive map of cited sites',
      intro:'Explore the monuments, monasteries, archaeological sites, caves, and sacred landscapes mentioned in the dossier. Monuments within the same precinct are grouped under a single point.',
      search:'Search', placeholder:'Monument, city, region…', country:'Country', allCountries:'All countries',
      type:'Site type', allTypes:'All site types', reset:'Reset', related:'Cited elements',
      seeText:'See in the text', site:'site', sites:'sites', loading:'Loading map…',
      error:'Unable to load the map data.', legend:'Countries shown'
    },
    ko: {
      kicker:'자료의 지리', title:'본문에 언급된 유적 인터랙티브 지도',
      intro:'본문에 언급된 기념물·사찰·고고유적·석굴·성지 경관을 지도에서 살펴볼 수 있습니다. 같은 사찰 경내의 건축물은 하나의 지점으로 묶었습니다.',
      search:'검색', placeholder:'유적, 도시, 지역…', country:'국가', allCountries:'모든 국가',
      type:'유적 유형', allTypes:'모든 유형', reset:'초기화', related:'본문의 관련 요소',
      seeText:'본문에서 보기', site:'곳', sites:'곳', loading:'지도 불러오는 중…',
      error:'지도 데이터를 불러올 수 없습니다.', legend:'표시 국가'
    },
    ja: {
      kicker:'ドシエの地理', title:'本文に登場する遺跡のインタラクティブ地図',
      intro:'本文で言及する建築、寺院、考古遺跡、石窟、聖地景観を地図上で確認できます。同一境内の複数の建築は一つの地点にまとめています。',
      search:'検索', placeholder:'建築、都市、地域…', country:'国', allCountries:'すべての国',
      type:'遺跡の種類', allTypes:'すべての種類', reset:'リセット', related:'本文中の関連要素',
      seeText:'本文を見る', site:'地点', sites:'地点', loading:'地図を読み込み中…',
      error:'地図データを読み込めませんでした。', legend:'表示国'
    },
    'zh-hant': {
      kicker:'專題地理', title:'文中所述遺址互動地圖',
      intro:'在地圖上探索本文提到的建築、寺院、考古遺址、石窟與神聖景觀。同一寺院範圍內的多座建築合併為同一地點。',
      search:'搜尋', placeholder:'建築、城市、地區…', country:'國家', allCountries:'所有國家',
      type:'遺址類型', allTypes:'所有類型', reset:'重設', related:'文中相關建築',
      seeText:'查看本文', site:'處', sites:'處', loading:'正在載入地圖…',
      error:'無法載入地圖資料。', legend:'顯示國家'
    },
    vi: {
      kicker:'Địa lý của chuyên đề', title:'Bản đồ tương tác các địa điểm được nhắc đến',
      intro:'Khám phá các di tích, tự viện, địa điểm khảo cổ, hang động và cảnh quan thiêng được nhắc trong chuyên đề. Các công trình nằm trong cùng một khuôn viên được gộp vào một điểm.',
      search:'Tìm kiếm', placeholder:'Di tích, thành phố, vùng…', country:'Quốc gia', allCountries:'Tất cả quốc gia',
      type:'Loại địa điểm', allTypes:'Tất cả loại', reset:'Đặt lại', related:'Các yếu tố được nhắc đến',
      seeText:'Xem trong bài', site:'địa điểm', sites:'địa điểm', loading:'Đang tải bản đồ…',
      error:'Không thể tải dữ liệu bản đồ.', legend:'Các quốc gia hiển thị'
    }
  };
  const T = ui[lang] || ui.fr;

  const countryMaps = {
    fr:{IN:'Inde',NP:'Népal',CN:'Chine',KR:'Corée du Sud',JP:'Japon',VN:'Vietnam'},
    en:{IN:'India',NP:'Nepal',CN:'China',KR:'South Korea',JP:'Japan',VN:'Vietnam'},
    ko:{IN:'인도',NP:'네팔',CN:'중국',KR:'대한민국',JP:'일본',VN:'베트남'},
    ja:{IN:'インド',NP:'ネパール',CN:'中国',KR:'韓国',JP:'日本',VN:'ベトナム'},
    'zh-hant':{IN:'印度',NP:'尼泊爾',CN:'中國',KR:'韓國',JP:'日本',VN:'越南'},
    vi:{IN:'Ấn Độ',NP:'Nepal',CN:'Trung Quốc',KR:'Hàn Quốc',JP:'Nhật Bản',VN:'Việt Nam'}
  };
  const typeMaps = {
    fr:{monastery:'Monastère / temple',pagoda:'Stoupa / pagode',caves:'Grottes bouddhiques',archaeological:'Site archéologique',sacred_landscape:'Paysage sacré'},
    en:{monastery:'Monastery / temple',pagoda:'Stupa / pagoda',caves:'Buddhist caves',archaeological:'Archaeological site',sacred_landscape:'Sacred landscape'},
    ko:{monastery:'사찰 / 승원',pagoda:'스투파 / 탑',caves:'불교 석굴',archaeological:'고고유적',sacred_landscape:'성지 경관'},
    ja:{monastery:'寺院',pagoda:'ストゥーパ / 仏塔',caves:'仏教石窟',archaeological:'考古遺跡',sacred_landscape:'聖地景観'},
    'zh-hant':{monastery:'寺院',pagoda:'窣堵波 / 佛塔',caves:'佛教石窟',archaeological:'考古遺址',sacred_landscape:'神聖景觀'},
    vi:{monastery:'Tự viện / chùa',pagoda:'Stūpa / tháp',caves:'Hang động Phật giáo',archaeological:'Địa điểm khảo cổ',sacred_landscape:'Cảnh quan thiêng'}
  };
  const countryLabel = code => (countryMaps[lang] || countryMaps.fr)[code] || code;
  const typeLabel = type => (typeMaps[lang] || typeMaps.fr)[type] || type;

  const nameMaps = {
    en:{
      grdhrakuta:'Mount Gṛdhrakūṭa', venuvana:'Bamboo Grove / Veṇuvana',
      kushinagar:'Kuśinagara / Kushinagar', bodhgaya:'Bodhgayā — Mahābodhi',
      lumbini:'Lumbinī — Māyā Devī Temple', 'white-horse':'White Horse Temple',
      yungang:'Yungang Grottoes', longmen:'Longmen Grottoes', mogao:'Mogao Caves',
      songyue:'Songyue Pagoda', famen:'Famen Temple', nanchan:'Nanchan Temple',
      foguang:'Foguang Temple', 'great-wild-goose':'Great Wild Goose Pagoda',
      'small-wild-goose':'Small Wild Goose Pagoda', fogongsi:'Fogongsi Pagoda',
      'iron-pagoda':'Iron Pagoda', kaiyuan:'Kaiyuan Temple and its twin pagodas',
      enryakuji:'Mount Hiei — Enryaku-ji', 'danjo-garan':'Mount Kōya — Danjō Garan'
    },
    ko:{
      mireuksa:'미륵사', jeongnimsa:'정림사', bunhwangsa:'분황사', bulguksa:'불국사',
      woljeongsa:'월정사', bongjeongsa:'봉정사', sudeoksa:'수덕사', geojoam:'거조암 / 거조사', buseoksa:'부석사'
    },
    ja:{
      asukadera:'飛鳥寺', horyuji:'法隆寺', yakushiji:'薬師寺', kofukuji:'興福寺',
      todaiji:'東大寺', enryakuji:'比叡山 — 延暦寺', 'danjo-garan':'高野山 — 壇上伽藍', byodoin:'平等院'
    },
    'zh-hant':{
      'white-horse':'白馬寺', yungang:'雲岡石窟', longmen:'龍門石窟', mogao:'莫高窟',
      songyue:'嵩岳寺塔', famen:'法門寺', nanchan:'南禪寺', foguang:'佛光寺',
      'great-wild-goose':'大雁塔', 'small-wild-goose':'小雁塔', fogongsi:'佛宮寺釋迦塔',
      'iron-pagoda':'鐵塔', kaiyuan:'開元寺與雙塔'
    }
  };
  const siteName = item => (nameMaps[lang] || {})[item.id] || item.name;

  const colors = {IN:'#b8753a',NP:'#8d6e63',CN:'#9d3b30',KR:'#426f8a',JP:'#6f5a8e',VN:'#4f7c62'};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalized = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  const countEl = document.getElementById('buddhist-architecture-sites-count');
  const searchEl = document.getElementById('hab-map-search');
  const countryEl = document.getElementById('hab-map-country');
  const typeEl = document.getElementById('hab-map-type');
  const resetEl = document.getElementById('hab-map-reset');
  const legendEl = document.getElementById('buddhist-architecture-sites-legend');

  document.querySelectorAll('[data-hab-map-copy]').forEach(el => {
    const key = el.dataset.habMapCopy;
    if (T[key]) el.textContent = T[key];
  });
  if (searchEl) searchEl.placeholder = T.placeholder;
  if (countryEl?.options[0]) countryEl.options[0].textContent = T.allCountries;
  if (typeEl?.options[0]) typeEl.options[0].textContent = T.allTypes;
  const filtersEl = document.querySelector('.hab-map-filters');
  if (filtersEl) filtersEl.setAttribute('aria-label', T.title);
  if (legendEl) legendEl.setAttribute('aria-label', T.legend);

  mapEl.innerHTML = '<div class="hab-map-loading">'+esc(T.loading)+'</div>';

  let payload;
  try {
    const response = await fetch('/data/buddhist-architecture-sites.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('data request failed');
    payload = await response.json();
  } catch (error) {
    mapEl.innerHTML = '<div class="hab-map-error">'+esc(T.error)+'</div>';
    return;
  }
  const items = Array.isArray(payload.items) ? payload.items : [];

  const map = L.map(mapEl, {scrollWheelZoom:true, minZoom:3, worldCopyJump:true}).setView([30,105],4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:18, attribution:'&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.control.scale({imperial:false}).addTo(map);
  const markerLayer = L.layerGroup().addTo(map);

  const orderedCountries = ['IN','NP','CN','KR','JP','VN'];
  orderedCountries.filter(code => items.some(x => x.country === code)).forEach(code => {
    const opt = document.createElement('option');
    opt.value = code; opt.textContent = countryLabel(code); countryEl.appendChild(opt);
  });
  ['monastery','pagoda','caves','archaeological','sacred_landscape'].filter(type => items.some(x => x.type === type)).forEach(type => {
    const opt = document.createElement('option');
    opt.value = type; opt.textContent = typeLabel(type); typeEl.appendChild(opt);
  });

  const popupHtml = item => {
    const name = siteName(item);
    const native = item.native && item.native !== name ? '<div class="hab-map-popup-native">'+esc(item.native)+'</div>' : '';
    const related = Array.isArray(item.related) && item.related.length
      ? '<div class="hab-map-popup-related"><span>'+esc(T.related)+'</span>'+item.related.map(esc).join(' · ')+'</div>' : '';
    return '<div class="hab-map-popup">'
      +'<strong>'+esc(name)+'</strong>'+native
      +'<div class="hab-map-popup-meta">'+esc(countryLabel(item.country))+' · '+esc(typeLabel(item.type))+'</div>'
      +'<div class="hab-map-popup-place">'+esc(item.place || '')+'</div>'
      +related
      +'<a href="#'+esc(item.anchor)+'">'+esc(T.seeText)+'</a>'
      +'</div>';
  };

  const filteredItems = () => {
    const q = normalized(searchEl?.value || '');
    const country = countryEl?.value || '';
    const type = typeEl?.value || '';
    return items.filter(item => {
      if (country && item.country !== country) return false;
      if (type && item.type !== type) return false;
      if (!q) return true;
      const haystack = [
        siteName(item), item.name, item.native, item.place,
        ...(item.related || []), ...(item.aliases || []),
        countryLabel(item.country), typeLabel(item.type)
      ].join(' ');
      return normalized(haystack).includes(q);
    });
  };

  const renderLegend = visible => {
    if (!legendEl) return;
    const present = orderedCountries.filter(code => visible.some(x => x.country === code));
    legendEl.innerHTML = present.map(code =>
      '<span class="hab-map-legend-item"><i class="hab-map-dot" style="background:'+colors[code]+'"></i>'+esc(countryLabel(code))+'</span>'
    ).join('');
  };

  const render = () => {
    const visible = filteredItems();
    markerLayer.clearLayers();
    const bounds = [];
    visible.forEach(item => {
      const lat = Number(item.lat), lng = Number(item.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      const marker = L.circleMarker([lat,lng], {
        radius:7, weight:1.5, color:'#fff', fillColor:colors[item.country] || '#6f655b',
        fillOpacity:.93
      }).bindPopup(popupHtml(item), {maxWidth:320});
      marker.addTo(markerLayer);
      bounds.push([lat,lng]);
    });
    if (countEl) countEl.textContent = visible.length+' '+(visible.length === 1 ? T.site : T.sites);
    renderLegend(visible);
    if (bounds.length === 1) map.setView(bounds[0], 10, {animate:false});
    else if (bounds.length > 1) map.fitBounds(bounds, {padding:[34,34], maxZoom:8, animate:false});
  };

  searchEl?.addEventListener('input', render);
  countryEl?.addEventListener('change', render);
  typeEl?.addEventListener('change', render);
  resetEl?.addEventListener('click', () => {
    if (searchEl) searchEl.value = '';
    if (countryEl) countryEl.value = '';
    if (typeEl) typeEl.value = '';
    render();
  });

  render();
  setTimeout(() => map.invalidateSize(), 0);
});
