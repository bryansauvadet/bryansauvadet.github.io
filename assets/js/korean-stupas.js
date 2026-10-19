document.addEventListener('DOMContentLoaded', async () => {
  const mapEl = document.getElementById('korean-stupas-map');
  const galleryEl = document.getElementById('korean-stupas-gallery');
  if (!mapEl || !galleryEl || typeof L === 'undefined') return;

  const rawLang = (document.documentElement.lang || 'fr').toLowerCase();
  const lang = rawLang.startsWith('zh') ? 'zh-hant' : rawLang.split('-')[0];
  const countEl = document.getElementById('korean-stupas-count');
  const searchEl = document.getElementById('stupa-search');
  const realmEl = document.getElementById('stupa-realm');
  const typeEl = document.getElementById('stupa-type');
  const resetEl = document.getElementById('stupa-reset');

  const ui = {
    fr:{stupa:'stoupa',stupas:'stoupas',heritage:'Source patrimoniale ↗',photo:'Source photo ↗',map:'Carte ↗',error:'Impossible de charger les données du répertoire.',sheet:'Voir la fiche'},
    en:{stupa:'stupa',stupas:'stupas',heritage:'Heritage source ↗',photo:'Photo source ↗',map:'Map ↗',error:'Unable to load the catalogue data.',sheet:'View entry'},
    ko:{stupa:'불탑',stupas:'불탑',heritage:'문화유산 출처 ↗',photo:'사진 출처 ↗',map:'지도 ↗',error:'목록 데이터를 불러올 수 없습니다.',sheet:'항목 보기'},
    ja:{stupa:'仏塔',stupas:'仏塔',heritage:'文化遺産資料 ↗',photo:'写真出典 ↗',map:'地図 ↗',error:'データを読み込めませんでした。',sheet:'項目を見る'},
    'zh-hant':{stupa:'佛塔',stupas:'佛塔',heritage:'文化遺產來源 ↗',photo:'圖片來源 ↗',map:'地圖 ↗',error:'無法載入目錄資料。',sheet:'查看條目'},
    vi:{stupa:'bảo tháp',stupas:'bảo tháp',heritage:'Nguồn di sản ↗',photo:'Nguồn ảnh ↗',map:'Bản đồ ↗',error:'Không thể tải dữ liệu danh mục.',sheet:'Xem mục'}
  };
  const T = ui[lang] || ui.fr;

  const realmMaps = {
    fr:{'Silla':'Silla','Paekche':'Paekche','Grand Silla':'Grand Silla','Koryŏ':'Koryŏ','Transition Koryŏ–Chosŏn':'Transition Koryŏ–Chosŏn','Chosŏn':'Chosŏn'},
    en:{'Silla':'Silla','Paekche':'Paekche','Grand Silla':'Grand Silla','Koryŏ':'Koryŏ','Transition Koryŏ–Chosŏn':'Koryŏ–Chosŏn transition','Chosŏn':'Chosŏn'},
    ko:{'Silla':'신라','Paekche':'백제','Grand Silla':'대신라','Koryŏ':'고려','Transition Koryŏ–Chosŏn':'고려–조선 전환기','Chosŏn':'조선'},
    ja:{'Silla':'新羅','Paekche':'百済','Grand Silla':'大新羅','Koryŏ':'高麗','Transition Koryŏ–Chosŏn':'高麗–朝鮮移行期','Chosŏn':'朝鮮'},
    'zh-hant':{'Silla':'新羅','Paekche':'百濟','Grand Silla':'大新羅','Koryŏ':'高麗','Transition Koryŏ–Chosŏn':'高麗–朝鮮過渡期','Chosŏn':'朝鮮'},
    vi:{'Silla':'Silla','Paekche':'Paekche','Grand Silla':'Đại Silla','Koryŏ':'Koryŏ','Transition Koryŏ–Chosŏn':'Giai đoạn chuyển tiếp Koryŏ–Chosŏn','Chosŏn':'Chosŏn'}
  };
  const typeMaps = {
    fr:{'석탑 — stoupa de pierre':'석탑 (石塔) — stoupa de pierre','승탑/부도 — stoupa funéraire':'승탑 (僧塔) / 부도 (浮屠) — stoupa funéraire','사리탑 — stoupa-reliquaire':'사리탑 (舍利塔) — stoupa-reliquaire'},
    en:{'석탑 — stoupa de pierre':'석탑 (石塔) — stone stupa','승탑/부도 — stoupa funéraire':'승탑 (僧塔) / 부도 (浮屠) — funerary stupa','사리탑 — stoupa-reliquaire':'사리탑 (舍利塔) — reliquary stupa'},
    ko:{'석탑 — stoupa de pierre':'석탑 (石塔)','승탑/부도 — stoupa funéraire':'승탑 (僧塔) · 부도 (浮屠)','사리탑 — stoupa-reliquaire':'사리탑 (舍利塔)'},
    ja:{'석탑 — stoupa de pierre':'石塔','승탑/부도 — stoupa funéraire':'僧塔・浮屠','사리탑 — stoupa-reliquaire':'舎利塔'},
    'zh-hant':{'석탑 — stoupa de pierre':'石塔','승탑/부도 — stoupa funéraire':'僧塔・浮屠','사리탑 — stoupa-reliquaire':'舍利塔'},
    vi:{'석탑 — stoupa de pierre':'석탑 (石塔) — bảo tháp đá','승탑/부도 — stoupa funéraire':'승탑 (僧塔) / 부도 (浮屠) — tháp mộ cao tăng','사리탑 — stoupa-reliquaire':'사리탑 (舍利塔) — bảo tháp xá lợi'}
  };
  const realmLabel = value => (realmMaps[lang] || realmMaps.fr)[value] || value;
  const typeLabel = value => (typeMaps[lang] || typeMaps.fr)[value] || value;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalized = s => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  const numWords = {
    en:{'trois':'three','cinq':'five','sept':'seven','neuf':'nine','dix':'ten','treize':'thirteen'},
    vi:{'trois':'ba','cinq':'năm','sept':'bảy','neuf':'chín','dix':'mười','treize':'mười ba'}
  };

  const translateTitleLatin = (title, target) => {
    let s = String(title || '').replace(/^\d+\s*[—-]\s*/, '');
    const nw = numWords[target] || {};
    if (target === 'en') {
      s = s
        .replace(/^Kŭmgang Kyedan et stoupa-reliquaire du /, 'Kŭmgang Kyedan and reliquary stupa of ')
        .replace(/^Kŭmgang Kyedan du /, 'Kŭmgang Kyedan of ')
        .replace(/^Stoupa-reliquaire de Śākyamuni au /, 'Śākyamuni reliquary stupa at ')
        .replace(/^Stoupa-reliquaire Haesu Kwanŭm Kongjung du /, 'Haesu Kwanŭm Kongjung reliquary stupa of ')
        .replace(/^Stoupa-reliquaire du site de /, 'Reliquary stupa at the site of ')
        .replace(/^Stoupa-reliquaire du site du /, 'Reliquary stupa at the ')
        .replace(/^Stoupa-reliquaire du /, 'Reliquary stupa of ')
        .replace(/^Stoupa-reliquaire aux douze animaux du zodiaque du site du /, 'Reliquary stupa with the twelve zodiac animals at the ')
        .replace(/^Stoupa du maître ([^,]+) au site du /, 'Stupa of Master $1 at the ')
        .replace(/^Stoupa du maître ([^,]+) du site du /, 'Stupa of Master $1 at the ')
        .replace(/^Stoupa du maître ([^,]+) au /, 'Stupa of Master $1 at ')
        .replace(/^Stoupas du maître ([^,]+) du site du /, 'Stupas of Master $1 at the ')
        .replace(/^Stoupas est et ouest à (\w+) étages du site du /, (_,n) => 'East and west '+(nw[n]||n)+'-story stupas at the ')
        .replace(/^Stoupas nord et sud à (\w+) étages du /, (_,n) => 'North and south '+(nw[n]||n)+'-story stupas of ')
        .replace(/^Stoupa de pierre imitant la brique du /, 'Brick-imitation stone stupa of ')
        .replace(/^Stoupa de pierre du site du /, 'Stone stupa at the ')
        .replace(/^Stoupa aux quatre lions à (\w+) étages du /, (_,n) => 'Four-lion '+(nw[n]||n)+'-story stupa of ')
        .replace(/^Stoupa occidentale à (\w+) étages de /, (_,n) => 'Western '+(nw[n]||n)+'-story stupa of ')
        .replace(/^Stoupa octogonale à (\w+) étages du /, (_,n) => 'Octagonal '+(nw[n]||n)+'-story stupa of ')
        .replace(/^Stoupa à (\w+) étages du site du /, (_,n) => (nw[n]||n)+'-story stupa at the ')
        .replace(/^Stoupa à (\w+) étages du /, (_,n) => (nw[n]||n)+'-story stupa of ')
        .replace(/^Stoupa à (\w+) étages de /, (_,n) => (nw[n]||n)+'-story stupa of ')
        .replace(/^Stoupa à (\w+) étages d’/, (_,n) => (nw[n]||n)+'-story stupa of ')
        .replace(/^Stoupa du site du /, 'Stupa at the ')
        .replace(/^Stoupa Sumanot'ap du /, "Sumanot'ap stupa of ")
        .replace(/^Sŏkkat'ap — stoupa à (\w+) étages du /, (_,n) => "Sŏkkat'ap — "+(nw[n]||n)+"-story stupa of ")
        .replace(/^Tabot'ap du /, "Tabot'ap of ");
      s = s.replace(/, ([^,]+)$/, ', $1');
      return s;
    }
    if (target === 'vi') {
      s = s
        .replace(/^Kŭmgang Kyedan et stoupa-reliquaire du /, 'Kŭmgang Kyedan và bảo tháp xá lợi của ')
        .replace(/^Kŭmgang Kyedan du /, 'Kŭmgang Kyedan của ')
        .replace(/^Stoupa-reliquaire de Śākyamuni au /, 'Bảo tháp xá lợi Śākyamuni tại ')
        .replace(/^Stoupa-reliquaire Haesu Kwanŭm Kongjung du /, 'Bảo tháp xá lợi Haesu Kwanŭm Kongjung của ')
        .replace(/^Stoupa-reliquaire du site de /, 'Bảo tháp xá lợi tại di chỉ ')
        .replace(/^Stoupa-reliquaire du site du /, 'Bảo tháp xá lợi tại di chỉ ')
        .replace(/^Stoupa-reliquaire du /, 'Bảo tháp xá lợi của ')
        .replace(/^Stoupa-reliquaire aux douze animaux du zodiaque du site du /, 'Bảo tháp xá lợi với mười hai con giáp tại di chỉ ')
        .replace(/^Stoupa du maître ([^,]+) au site du /, 'Tháp của Đại sư $1 tại di chỉ ')
        .replace(/^Stoupa du maître ([^,]+) du site du /, 'Tháp của Đại sư $1 tại di chỉ ')
        .replace(/^Stoupa du maître ([^,]+) au /, 'Tháp của Đại sư $1 tại ')
        .replace(/^Stoupas du maître ([^,]+) du site du /, 'Các tháp của Đại sư $1 tại di chỉ ')
        .replace(/^Stoupas est et ouest à (\w+) étages du site du /, (_,n) => 'Hai tháp đông và tây '+(nw[n]||n)+' tầng tại di chỉ ')
        .replace(/^Stoupas nord et sud à (\w+) étages du /, (_,n) => 'Hai tháp bắc và nam '+(nw[n]||n)+' tầng của ')
        .replace(/^Stoupa de pierre imitant la brique du /, 'Bảo tháp đá mô phỏng gạch của ')
        .replace(/^Stoupa de pierre du site du /, 'Bảo tháp đá tại di chỉ ')
        .replace(/^Stoupa aux quatre lions à (\w+) étages du /, (_,n) => 'Bảo tháp bốn sư tử '+(nw[n]||n)+' tầng của ')
        .replace(/^Stoupa occidentale à (\w+) étages de /, (_,n) => 'Bảo tháp phía tây '+(nw[n]||n)+' tầng tại ')
        .replace(/^Stoupa octogonale à (\w+) étages du /, (_,n) => 'Bảo tháp bát giác '+(nw[n]||n)+' tầng của ')
        .replace(/^Stoupa à (\w+) étages du site du /, (_,n) => 'Bảo tháp '+(nw[n]||n)+' tầng tại di chỉ ')
        .replace(/^Stoupa à (\w+) étages du /, (_,n) => 'Bảo tháp '+(nw[n]||n)+' tầng của ')
        .replace(/^Stoupa à (\w+) étages de /, (_,n) => 'Bảo tháp '+(nw[n]||n)+' tầng tại ')
        .replace(/^Stoupa à (\w+) étages d’/, (_,n) => 'Bảo tháp '+(nw[n]||n)+' tầng tại ')
        .replace(/^Stoupa du site du /, 'Bảo tháp tại di chỉ ')
        .replace(/^Stoupa Sumanot'ap du /, "Bảo tháp Sumanot'ap của ")
        .replace(/^Sŏkkat'ap — stoupa à (\w+) étages du /, (_,n) => "Sŏkkat'ap — bảo tháp "+(nw[n]||n)+" tầng của ")
        .replace(/^Tabot'ap du /, "Tabot'ap của ");
      return s;
    }
    return s;
  };

  const titleLabel = item => {
    if (lang === 'fr') return String(item.monument || '').replace(/^\d+\s*[—-]\s*/, '');
    if (lang === 'ko') return item.nom_coreen || String(item.monument || '').replace(/^\d+\s*[—-]\s*/, '');
    if (lang === 'ja' || lang === 'zh-hant') return item.hanja || item.nom_coreen || String(item.monument || '').replace(/^\d+\s*[—-]\s*/, '');
    if (lang === 'en') return translateTitleLatin(item.monument, 'en');
    if (lang === 'vi') return translateTitleLatin(item.monument, 'vi');
    return item.monument;
  };

  const dateLabel = item => {
    if (lang === 'fr') return item.datation || '';
    if (item.annee) return String(item.annee);
    const d = String(item.datation || '');
    const maps = {
      en:[['début du Grand Silla','early Grand Silla'],['Grand Silla','Grand Silla'],['VIIIe siècle','8th century'],['IXe siècle','9th century'],['début du Koryŏ','early Koryŏ'],['fin du Koryŏ – début du Chosŏn','late Koryŏ–early Chosŏn'],['fin du Koryŏ','late Koryŏ'],['période du Koryŏ','Koryŏ period'],['période du Chosŏn','Chosŏn period'],['Chosŏn tardif','late Chosŏn'],['fin du Chosŏn','late Chosŏn'],['Après le milieu du XVIIe siècle et avant 1759','after the mid-17th century and before 1759']],
      ko:[['début du Grand Silla','대신라 초기'],['Grand Silla','대신라'],['VIIIe siècle','8세기'],['IXe siècle','9세기'],['début du Koryŏ','고려 초기'],['fin du Koryŏ – début du Chosŏn','고려 말–조선 초'],['fin du Koryŏ','고려 말'],['période du Koryŏ','고려시대'],['période du Chosŏn','조선시대'],['Chosŏn tardif','조선 후기'],['fin du Chosŏn','조선 말기'],['Après le milieu du XVIIe siècle et avant 1759','17세기 중엽 이후–1759년 이전']],
      ja:[['début du Grand Silla','大新羅初期'],['Grand Silla','大新羅'],['VIIIe siècle','8世紀'],['IXe siècle','9世紀'],['début du Koryŏ','高麗初期'],['fin du Koryŏ – début du Chosŏn','高麗末–朝鮮初'],['fin du Koryŏ','高麗末'],['période du Koryŏ','高麗時代'],['période du Chosŏn','朝鮮時代'],['Chosŏn tardif','朝鮮後期'],['fin du Chosŏn','朝鮮末期'],['Après le milieu du XVIIe siècle et avant 1759','17世紀中葉以後・1759年以前']],
      'zh-hant':[['début du Grand Silla','大新羅初期'],['Grand Silla','大新羅'],['VIIIe siècle','8世紀'],['IXe siècle','9世紀'],['début du Koryŏ','高麗初期'],['fin du Koryŏ – début du Chosŏn','高麗末至朝鮮初'],['fin du Koryŏ','高麗末期'],['période du Koryŏ','高麗時期'],['période du Chosŏn','朝鮮時期'],['Chosŏn tardif','朝鮮後期'],['fin du Chosŏn','朝鮮末期'],['Après le milieu du XVIIe siècle et avant 1759','17世紀中葉以後至1759年以前']],
      vi:[['début du Grand Silla','đầu thời Đại Silla'],['Grand Silla','Đại Silla'],['VIIIe siècle','thế kỷ VIII'],['IXe siècle','thế kỷ IX'],['début du Koryŏ','đầu thời Koryŏ'],['fin du Koryŏ – début du Chosŏn','cuối Koryŏ–đầu Chosŏn'],['fin du Koryŏ','cuối thời Koryŏ'],['période du Koryŏ','thời Koryŏ'],['période du Chosŏn','thời Chosŏn'],['Chosŏn tardif','cuối thời Chosŏn'],['fin du Chosŏn','cuối thời Chosŏn'],['Après le milieu du XVIIe siècle et avant 1759','sau giữa thế kỷ XVII và trước 1759']]
    };
    for (const [from,to] of (maps[lang] || [])) if (d.includes(from)) return to;
    return d.match(/\b\d{3,4}\b/)?.[0] || d;
  };

  const statusLabel = s => {
    if (!s || lang === 'fr') return s || '';
    const exact = {
      en:{'Trésor national (국보)':'National Treasure (국보)','Trésor (보물)':'Treasure (보물)'},
      ko:{'Trésor national (국보)':'국보','Trésor (보물)':'보물'},
      ja:{'Trésor national (국보)':'国宝（국보）','Trésor (보물)':'宝物（보물）'},
      'zh-hant':{'Trésor national (국보)':'國寶（국보）','Trésor (보물)':'寶物（보물）'},
      vi:{'Trésor national (국보)':'Bảo vật quốc gia (국보)','Trésor (보물)':'Bảo vật (보물)'}
    };
    if ((exact[lang]||{})[s]) return exact[lang][s];
    if (s.startsWith('Trésor national (국보)')) return (exact[lang]||{})['Trésor national (국보)'] || s;
    if (s.startsWith('Trésor (보물)')) return (exact[lang]||{})['Trésor (보물)'] || s;
    const generic = {en:'Cultural heritage designation',ko:'문화유산 지정',ja:'文化遺産指定','zh-hant':'文化遺產指定',vi:'Xếp hạng di sản văn hóa'};
    return generic[lang] || s;
  };

  const locationLabel = s => {
    if (!s || lang === 'fr') return s || '';
    let x = String(s);
    const repl = {
      en:[['Musée national de Corée','National Museum of Korea'],['Musée national de Kyŏngju','Kyŏngju National Museum'],['Musée d’Ulsan','Ulsan Museum'],['Musée national de Taegu','Taegu National Museum'],['Kyŏngsang du Nord','North Kyŏngsang'],['Chŏlla du Nord','North Chŏlla'],['Chŏlla du Sud','South Chŏlla'],["Ch'ungch'ŏng du Nord",'North Ch'ungch'ŏng'],["Ch'ungch'ŏng du Sud",'South Ch'ungch'ŏng'],['provenance :','provenance:']],
      ko:[['Musée national de Corée','국립중앙박물관'],['Musée national de Kyŏngju','국립경주박물관'],['Musée d’Ulsan','울산박물관'],['Musée national de Taegu','국립대구박물관'],['Kyŏngsang du Nord','경상북도'],['Chŏlla du Nord','전북'],['Chŏlla du Sud','전남'],["Ch'ungch'ŏng du Nord",'충북'],["Ch'ungch'ŏng du Sud",'충남'],['provenance :','출토지:']],
      ja:[['Musée national de Corée','国立中央博物館'],['Musée national de Kyŏngju','国立慶州博物館'],['Musée d’Ulsan','蔚山博物館'],['Musée national de Taegu','国立大邱博物館'],['Kyŏngsang du Nord','慶尚北道'],['Chŏlla du Nord','全羅北道'],['Chŏlla du Sud','全羅南道'],["Ch'ungch'ŏng du Nord",'忠清北道'],["Ch'ungch'ŏng du Sud",'忠清南道'],['provenance :','旧所在地：']],
      'zh-hant':[['Musée national de Corée','韓國國立中央博物館'],['Musée national de Kyŏngju','國立慶州博物館'],['Musée d’Ulsan','蔚山博物館'],['Musée national de Taegu','國立大邱博物館'],['Kyŏngsang du Nord','慶尚北道'],['Chŏlla du Nord','全羅北道'],['Chŏlla du Sud','全羅南道'],["Ch'ungch'ŏng du Nord",'忠清北道'],["Ch'ungch'ŏng du Sud",'忠清南道'],['provenance :','原址：']],
      vi:[['Musée national de Corée','Bảo tàng Quốc gia Hàn Quốc'],['Musée national de Kyŏngju','Bảo tàng Quốc gia Kyŏngju'],['Musée d’Ulsan','Bảo tàng Ulsan'],['Musée national de Taegu','Bảo tàng Quốc gia Taegu'],['Kyŏngsang du Nord','Bắc Kyŏngsang'],['Chŏlla du Nord','Bắc Chŏlla'],['Chŏlla du Sud','Nam Chŏlla'],["Ch'ungch'ŏng du Nord",'Bắc Ch'ungch'ŏng'],["Ch'ungch'ŏng du Sud",'Nam Ch'ungch'ŏng'],['provenance :','nguồn gốc:']]
    };
    for (const [a,b] of (repl[lang]||[])) x=x.replaceAll(a,b);
    return x;
  };

  let payload;
  try {
    const response = await fetch('/data/korean-stupas-fr.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('data request failed');
    payload = await response.json();
  } catch (error) {
    mapEl.innerHTML = '<div class="stupa-data-error">'+esc(T.error)+'</div>';
    return;
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  const map = L.map(mapEl, {scrollWheelZoom:true, minZoom:5}).setView([36.25, 127.85], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:18, attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  L.control.scale({imperial:false}).addTo(map);
  const markerLayer = L.layerGroup().addTo(map);
  const markerByNumber = new Map();

  const populateSelect = (el, values, fn) => {
    [...new Set(values.filter(Boolean))].sort((a,b) => fn(a).localeCompare(fn(b), lang)).forEach(value => {
      const option=document.createElement('option');
      option.value=value; option.textContent=fn(value); el.appendChild(option);
    });
  };
  populateSelect(realmEl, items.map(x=>x.royaume), realmLabel);
  populateSelect(typeEl, items.map(x=>x.type), typeLabel);

  const cardHtml = item => {
    const image=item.image
      ? `<div class="stupa-card-image"><img src="${esc(item.image)}" alt="${esc(item.nom_coreen || titleLabel(item))}" loading="lazy"></div>`
      : '<div class="stupa-card-image stupa-card-placeholder" aria-hidden="true"><span>塔</span></div>';
    const meta=[realmLabel(item.royaume),dateLabel(item)].filter(Boolean).map(esc).join(' · ');
    const sourceLink=item.source?`<a href="${esc(item.source)}" target="_blank" rel="noopener">${esc(T.heritage)}</a>`:'';
    const photoLink=item.source_photo?`<a href="${esc(item.source_photo)}" target="_blank" rel="noopener">${esc(T.photo)}</a>`:'';
    const mapsLink=item.google_maps?`<a href="${esc(item.google_maps)}" target="_blank" rel="noopener">${esc(T.map)}</a>`:'';
    const secondary = lang === 'ko'
      ? (item.hanja ? `<div class="stupa-card-korean">${esc(item.hanja)}</div>` : '')
      : (item.nom_coreen ? `<div class="stupa-card-korean" lang="ko">${esc(item.nom_coreen)}</div>` : '');
    return `<article class="stupa-card" id="stupa-${esc(item.numero)}" data-stupa-number="${esc(item.numero)}">
      ${image}<div class="stupa-card-body">
      <div class="stupa-card-number">${String(item.numero??'').padStart(2,'0')}</div>
      <h3>${esc(titleLabel(item))}</h3>${secondary}
      <div class="stupa-card-meta">${meta}</div>
      ${item.localisation?`<p class="stupa-card-place">${esc(locationLabel(item.localisation))}</p>`:''}
      ${item.statut?`<p class="stupa-card-status">${esc(statusLabel(item.statut))}</p>`:''}
      <div class="stupa-card-links">${sourceLink}${photoLink}${mapsLink}</div>
      ${item.licence_photo?`<div class="stupa-photo-credit">${esc(item.licence_photo)}</div>`:''}
      </div></article>`;
  };

  const popupHtml = item => `<div class="stupa-popup"><strong>${esc(titleLabel(item))}</strong>
    ${item.nom_coreen && lang!=='ko'?`<div lang="ko">${esc(item.nom_coreen)}</div>`:''}
    <div>${esc(dateLabel(item))}</div><div>${esc(locationLabel(item.localisation))}</div>
    <a href="#stupa-${esc(item.numero)}">${esc(T.sheet)}</a></div>`;

  const filters = () => {
    const q=normalized(searchEl.value), realm=realmEl.value, type=typeEl.value;
    return items.filter(item => {
      if(realm && item.royaume!==realm) return false;
      if(type && item.type!==type) return false;
      if(!q) return true;
      return normalized([item.monument,titleLabel(item),item.nom_coreen,item.hanja,item.localisation,locationLabel(item.localisation),item.datation,dateLabel(item),item.royaume,realmLabel(item.royaume),item.type,typeLabel(item.type),item.statut,statusLabel(item.statut)].join(' ')).includes(q);
    });
  };

  const render = () => {
    const visible=filters();
    galleryEl.innerHTML=visible.map(cardHtml).join('');
    countEl.textContent=`${visible.length} ${visible.length===1?T.stupa:T.stupas}`;
    markerLayer.clearLayers(); markerByNumber.clear();
    const bounds=[];
    visible.forEach(item=>{
      const lat=Number(item.latitude),lng=Number(item.longitude);
      if(!Number.isFinite(lat)||!Number.isFinite(lng)) return;
      const marker=L.marker([lat,lng]).bindPopup(popupHtml(item));
      marker.addTo(markerLayer); markerByNumber.set(String(item.numero),marker); bounds.push([lat,lng]);
    });
    if(bounds.length) map.fitBounds(bounds,{padding:[28,28],maxZoom:9});
    galleryEl.querySelectorAll('.stupa-card').forEach(card=>{
      card.addEventListener('click',event=>{
        if(event.target.closest('a')) return;
        const marker=markerByNumber.get(card.dataset.stupaNumber); if(!marker) return;
        const ll=marker.getLatLng(); map.setView(ll,Math.max(map.getZoom(),12),{animate:true}); marker.openPopup();
        mapEl.scrollIntoView({behavior:'smooth',block:'center'});
      });
    });
  };

  [searchEl,realmEl,typeEl].forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',render));
  resetEl.addEventListener('click',()=>{searchEl.value='';realmEl.value='';typeEl.value='';render();});
  render();
});