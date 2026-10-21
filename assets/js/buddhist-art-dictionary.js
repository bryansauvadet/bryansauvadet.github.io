(() => {
  "use strict";

  const root = document.getElementById("multilingual-dictionary");
  if (!root) return;

  const locale = root.dataset.locale || "fr";
  const ui = {
    fr: {
      search: "Recherche",
      placeholder: "Rechercher un terme dans le dictionnaire…",
      field: "Champ de recherche",
      all: "Toutes les langues",
      reset: "Réinitialiser",
      loading: "Chargement des 1 500 entrées…",
      one: "1 entrée",
      many: "{n} entrées",
      empty: "Aucune entrée ne correspond à cette recherche.",
      error: "Le dictionnaire n’a pas pu être chargé."
    },
    en: {
      search: "Search",
      placeholder: "Search the dictionary…",
      field: "Search field",
      all: "All languages",
      reset: "Reset",
      loading: "Loading 1,500 entries…",
      one: "1 entry",
      many: "{n} entries",
      empty: "No entries match this search.",
      error: "The dictionary could not be loaded."
    },
    ko: {
      search: "검색",
      placeholder: "사전에서 용어 검색…",
      field: "검색 범위",
      all: "모든 언어",
      reset: "초기화",
      loading: "1,500개 항목 불러오는 중…",
      one: "1개 항목",
      many: "{n}개 항목",
      empty: "검색 결과가 없습니다.",
      error: "사전을 불러오지 못했습니다."
    },
    ja: {
      search: "検索",
      placeholder: "辞典内の用語を検索…",
      field: "検索対象",
      all: "すべての言語",
      reset: "リセット",
      loading: "1,500項目を読み込み中…",
      one: "1項目",
      many: "{n}項目",
      empty: "該当する項目はありません。",
      error: "辞典を読み込めませんでした。"
    },
    "zh-hant": {
      search: "搜尋",
      placeholder: "搜尋辭典中的術語…",
      field: "搜尋欄位",
      all: "所有語言",
      reset: "重設",
      loading: "正在載入1,500筆條目…",
      one: "1筆條目",
      many: "{n}筆條目",
      empty: "沒有符合搜尋條件的條目。",
      error: "無法載入辭典。"
    },
    vi: {
      search: "Tìm kiếm",
      placeholder: "Tìm thuật ngữ trong từ điển…",
      field: "Phạm vi tìm kiếm",
      all: "Tất cả ngôn ngữ",
      reset: "Đặt lại",
      loading: "Đang tải 1.500 mục…",
      one: "1 mục",
      many: "{n} mục",
      empty: "Không có mục nào phù hợp.",
      error: "Không thể tải từ điển."
    }
  }[locale] || null;

  const columns = [
    { key: "fr", label: "Terme", group: "Français", lang: "fr", cls: "dictionary-fr" },
    { key: "en", label: "Term", group: "English", lang: "en" },
    { key: "ko_hanja", label: "Hancha", group: "한국어", lang: "ko-Hani" },
    { key: "ko_hangul", label: "Hangŭl", group: "한국어", lang: "ko" },
    { key: "ja_kanji", label: "Kanji", group: "日本語", lang: "ja" },
    { key: "ja_romaji", label: "Rōmaji", group: "日本語", lang: "ja-Latn" },
    { key: "zh_hanzi", label: "Hanzi", group: "中文", lang: "zh-Hant" },
    { key: "zh_pinyin", label: "Pinyin", group: "中文", lang: "zh-Latn" },
    { key: "vi_hannom", label: "Hán Nôm", group: "Tiếng Việt", lang: "vi-Hani" },
    { key: "vi_quocngu", label: "Quốc Ngữ", group: "Tiếng Việt", lang: "vi" },
    { key: "sa", label: "Devanāgarī", group: "Sanskrit", lang: "sa" },
    { key: "iast", label: "IAST", group: "Sanskrit", lang: "sa-Latn" },
    { key: "bo", label: "བོད་ཡིག", group: "Tibétain", lang: "bo", cls: "dictionary-tibetan" },
    { key: "wylie", label: "Wylie", group: "Tibétain", lang: "bo-Latn" }
  ];

  const groups = [
    { label: "Français", span: 1 },
    { label: "English", span: 1 },
    { label: "한국어", span: 2 },
    { label: "日本語", span: 2 },
    { label: "中文", span: 2 },
    { label: "Tiếng Việt", span: 2 },
    { label: "Sanskrit", span: 2 },
    { label: "བོད་སྐད། · Tibetan", span: 2 }
  ];

  const fieldGroups = [
    { value: "all", label: ui.all, keys: columns.map(c => c.key) },
    { value: "fr", label: "Français", keys: ["fr"] },
    { value: "en", label: "English", keys: ["en"] },
    { value: "ko", label: "한국어 · Hancha / Hangŭl", keys: ["ko_hanja", "ko_hangul"] },
    { value: "ja", label: "日本語 · Kanji / Rōmaji", keys: ["ja_kanji", "ja_romaji"] },
    { value: "zh", label: "中文 · Hanzi / Pinyin", keys: ["zh_hanzi", "zh_pinyin"] },
    { value: "vi", label: "Tiếng Việt · Hán Nôm / Quốc Ngữ", keys: ["vi_hannom", "vi_quocngu"] },
    { value: "sa", label: "Sanskrit · IAST", keys: ["sa", "iast"] },
    { value: "bo", label: "བོད་སྐད། · Wylie", keys: ["bo", "wylie"] }
  ];

  const sortConfig = {
    fr: { key: "fr", locale: "fr" },
    en: { key: "en", locale: "en" },
    ko: { key: "ko_hangul", locale: "ko" },
    ja: { key: "ja_romaji", locale: "ja" },
    "zh-hant": { key: "zh_pinyin", locale: "zh-Hant" },
    vi: { key: "vi_quocngu", locale: "vi" }
  };

  const activeSort = sortConfig[locale] || sortConfig.fr;
  const collator = new Intl.Collator(activeSort.locale, {
    usage: "sort",
    sensitivity: "variant",
    ignorePunctuation: true,
    numeric: true
  });

  function sortRows(data) {
    return data.sort((a, b) => {
      const av = String(a[activeSort.key] || "");
      const bv = String(b[activeSort.key] || "");
      if (!av && !bv) return Number(a.id) - Number(b.id);
      if (!av) return 1;
      if (!bv) return -1;
      const primary = collator.compare(av, bv);
      if (primary !== 0) return primary;
      return Number(a.id) - Number(b.id);
    });
  }

  root.innerHTML = `
    <div class="dictionary-toolbar">
      <label class="dictionary-control dictionary-search-control">
        <span>${ui.search}</span>
        <input id="dictionary-search" type="search" autocomplete="off" placeholder="${ui.placeholder}">
      </label>
      <label class="dictionary-control">
        <span>${ui.field}</span>
        <select id="dictionary-field">
          ${fieldGroups.map(f => `<option value="${f.value}">${f.label}</option>`).join("")}
        </select>
      </label>
      <button id="dictionary-reset" class="dictionary-reset" type="button">${ui.reset}</button>
      <div id="dictionary-count" class="dictionary-count" aria-live="polite">${ui.loading}</div>
    </div>
    <div class="dictionary-table-wrap" tabindex="0" aria-label="Multilingual Buddhist art dictionary">
      <table class="dictionary-table" id="dictionary-table">
        <thead>
          <tr class="dictionary-groups">
            ${groups.map((g, i) => `<th colspan="${g.span}"${i === 0 ? ' class="dictionary-sticky-col"' : ""}>${g.label}</th>`).join("")}
          </tr>
          <tr class="dictionary-columns">
            ${columns.map((c, i) => `<th${i === 0 ? ' class="dictionary-sticky-col"' : ""}>${c.label}</th>`).join("")}
          </tr>
        </thead>
        <tbody id="dictionary-body"></tbody>
      </table>
    </div>
    <p id="dictionary-empty" class="dictionary-empty" hidden>${ui.empty}</p>
  `;

  const search = document.getElementById("dictionary-search");
  const field = document.getElementById("dictionary-field");
  const reset = document.getElementById("dictionary-reset");
  const count = document.getElementById("dictionary-count");
  const body = document.getElementById("dictionary-body");
  const empty = document.getElementById("dictionary-empty");

  let rows = [];

  const normalize = value => String(value || "")
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’ʻʼ]/g, "'")
    .trim();

  const escapeHtml = value => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  function displayCount(n) {
    count.textContent = n === 1 ? ui.one : ui.many.replace("{n}", String(n));
  }

  function render(data) {
    body.innerHTML = data.map(row => `<tr>${columns.map((col, i) => {
      const raw = row[col.key] || "";
      const value = raw ? escapeHtml(raw) : "—";
      const classes = [i === 0 ? "dictionary-sticky-col" : "", col.cls || "", raw ? "" : "dictionary-cell-empty"].filter(Boolean).join(" ");
      return `<td class="${classes}" lang="${col.lang}">${value}</td>`;
    }).join("")}</tr>`).join("");
    displayCount(data.length);
    empty.hidden = data.length !== 0;
  }

  function applyFilter() {
    const q = normalize(search.value);
    const active = fieldGroups.find(f => f.value === field.value) || fieldGroups[0];
    if (!q) {
      render(rows);
      return;
    }
    const filtered = rows.filter(row =>
      active.keys.some(key => normalize(row[key]).includes(q))
    );
    render(filtered);
  }

  search.addEventListener("input", applyFilter);
  field.addEventListener("change", applyFilter);
  reset.addEventListener("click", () => {
    search.value = "";
    field.value = "all";
    render(rows);
    search.focus();
  });

  const files = Array.from({ length: 50 }, (_, i) => i + 1).map(n =>
    `/data/buddhist-art-dictionary-${String(n).padStart(2, "0")}.json`
  );

  Promise.all(files.map(url => fetch(url).then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })))
    .then(parts => {
      rows = sortRows(parts.flat());
      render(rows);
    })
    .catch(error => {
      console.error("Buddhist art dictionary:", error);
      count.textContent = ui.error;
      document.querySelector(".dictionary-table-wrap").hidden = true;
      empty.hidden = false;
      empty.textContent = ui.error;
    });
})();
