(() => {
  "use strict";

  const translations = {
    fr: {
      label: "Frise chronologique",
      aria: "Frise chronologique de l’architecture bouddhique",
      india: {
        title: "Inde — du monastère itinérant au grand complexe bouddhique",
        intro: "Repères essentiels pour suivre la formation du monastère, du stoupa et des grands ensembles bouddhiques indiens.",
        events: [
          ["v. Ve s. av. n. è.", "Premières résidences monastiques", "Les communautés se stabilisent pendant la saison des pluies dans des jardins et domaines offerts, comme Jetavana ou la Bambouseraie."],
          ["IIIe s. av. n. è.", "Aśoka et les stoupas monumentaux", "Le patronage maurya amplifie le culte des reliques et la monumentalisation des stoupas ; le noyau ancien de Sāñcī appartient à cette phase."],
          ["IIe–Ier s. av. n. è.", "Sāñcī et Bhārhut", "Balustrades, portes sculptées et parcours de circumambulation transforment le stoupa en architecture narrative et rituelle."],
          ["IIe s. av. n. è.–IIe s.", "Caitya et vihāra rupestres", "Les ensembles excavés réunissent salle de culte, stoupa et espaces résidentiels dans une composition architecturale intégrée."],
          ["IVe–VIe s.", "Époque Gupta", "Le culte de l’image et les sanctuaires bâtis prennent une place croissante aux côtés des stoupas et des monastères."],
          ["Ve–XIIe s.", "Grands mahāvihāra", "Nālandā et d’autres centres combinent enseignement, résidence, sanctuaires, bibliothèques et monuments reliquaires à grande échelle."]
        ]
      },
      china: {
        title: "Chine — du stoupa importé à la pagode chinoise",
        intro: "La forme bouddhique se recompose au contact des techniques de charpente, de la maçonnerie et du plan axial chinois.",
        events: [
          ["Ier–IIe s.", "Premières fondations", "Les récits liés au monastère du Cheval blanc symbolisent l’implantation initiale du bouddhisme et de ses nouveaux types de bâtiments."],
          ["IVe–VIe s.", "Grottes et grandes pagodes", "Yungang, Longmen et les grands monastères des dynasties du Nord montrent la coexistence de sanctuaires rupestres et de tours de bois."],
          ["523", "Pagode de Songyue", "La maçonnerie produit une silhouette de pagode durable qui adapte la verticalité bouddhique à de nouvelles contraintes structurelles."],
          ["VIIe–IXe s.", "Apogée des Tang", "Les grands complexes axiaux et les pagodes de brique, comme celle de la Grande Oie sauvage, organisent un paysage monastique monumental."],
          ["Xe–XIIIe s.", "Song et développement du Chan", "Les salles du Bouddha, pavillons spécialisés et monastères Chan renforcent la hiérarchie axiale du complexe."],
          ["XIVe–XIXe s.", "Ming et Qing", "Cours successives, pavillons de bois et pagodes reconstruits ou restaurés fixent une grande partie de l’image classique du temple chinois."]
        ]
      },
      korea: {
        title: "Corée — de la pagode de bois au monastère de montagne",
        intro: "La péninsule transforme les modèles continentaux par la pierre, le relief et une forte tradition de charpente.",
        events: [
          ["IVe–VIe s.", "Trois Royaumes", "Le bouddhisme s’implante à Goguryeo, Baekje puis Silla ; les premiers monastères et pagodes accompagnent le patronage royal."],
          ["VIe–VIIe s.", "Grandes pagodes de bois", "Des ensembles comme Hwangnyongsa placent la pagode monumentale au cœur d’une architecture d’État aujourd’hui en grande partie disparue."],
          ["VIIe–IXe s.", "Silla unifié et pagode de pierre", "Le granite devient un médium majeur ; Bulguksa illustre l’équilibre entre pavillons, cours, escaliers et pagodes jumelles."],
          ["IXe–Xe s.", "Essor du Sŏn", "Les stoupas funéraires de maîtres, pudo ou sŭngt’ap, matérialisent les lignées monastiques dans le paysage."],
          ["918–1392", "Koryŏ", "Le puissant patronage bouddhique favorise de grands monastères, la diversification des stoupas et une charpente de bois raffinée."],
          ["1392–1910", "Chosŏn", "Les restrictions imposées au bouddhisme renforcent le rôle des monastères de montagne, où se maintiennent et évoluent les traditions architecturales."]
        ]
      },
      japan: {
        title: "Japon — de l’importation continentale aux traditions japonaises",
        intro: "Le Japon conserve exceptionnellement l’architecture de bois tout en transformant les modèles venus de Corée et de Chine.",
        events: [
          ["fin VIe s.", "Asuka et les premiers monastères", "Asuka-dera introduit pagode, salles d’images, galeries et techniques continentales dans l’archipel."],
          ["VIIe s.", "Hōryū-ji", "Le complexe ancien conserve certains des plus vieux bâtiments en bois subsistant au monde et témoigne d’une adaptation précoce des modèles continentaux."],
          ["VIIIe s.", "Nara et le bouddhisme d’État", "Les grands monastères structurent la capitale ; le Grand Bouddha du Tōdai-ji est consacré en 752."],
          ["IXe s.", "Montagnes et bouddhisme ésotérique", "Enryaku-ji et Kōyasan déplacent une partie de la vie religieuse vers des ensembles étagés dans le relief."],
          ["1053", "Byōdō-in et la Terre pure", "Le Pavillon du Phénix met en scène une vision paradisiaque où bâtiment, étang et image rituelle forment un tout."],
          ["XIIe–XIVe s.", "Kamakura et le Zen", "Les contacts renouvelés avec la Chine introduisent de nouvelles solutions de charpente et des plans monastiques associés au Zen."]
        ]
      },
      vietnam: {
        title: "Viet Nam — croisements régionaux et formes propres",
        intro: "L’architecture bouddhique vietnamienne naît d’échanges maritimes et continentaux, puis se développe dans un cadre politique et paysager propre.",
        events: [
          ["fin IIe s.", "Luy Lâu", "Le delta du fleuve Rouge devient l’un des premiers centres connus d’étude, de traduction et de diffusion du bouddhisme dans la région."],
          ["1009–1225", "Dynastie Lý", "Le patronage royal stimule temples, tours et monastères ; la pagode au Pilier unique est fondée en 1049."],
          ["1225–1400", "Dynastie Trần", "Les réseaux monastiques de montagne se développent, notamment autour de Yên Tử et de la tradition Trúc Lâm."],
          ["XVe–XVIIIe s.", "Plans vietnamiens matures", "Cours, salles parallèles et compositions de type nội công ngoại quốc structurent de nombreux ensembles reconstruits ou agrandis."],
          ["1601", "Fondation de Thiên Mụ", "Le monastère s’inscrit dans le paysage de Huế et dans la géographie politique des seigneurs Nguyễn."],
          ["1844–1846", "Tour Phước Duyên", "La tour à sept niveaux de Thiên Mụ devient un repère majeur du paysage religieux de Huế."]
        ]
      }
    },

    en: {
      label: "Timeline",
      aria: "Timeline of Buddhist architecture",
      india: {
        title: "India — from itinerant communities to major Buddhist complexes",
        intro: "Key milestones in the formation of the monastery, the stupa, and the large Buddhist architectural complex.",
        events: [
          ["c. 5th c. BCE", "Early monastic residences", "Communities settle during the rainy season in donated parks and estates such as Jetavana and the Bamboo Grove."],
          ["3rd c. BCE", "Aśoka and monumental stupas", "Mauryan patronage expands relic worship and stupa building; the early core of Sāñcī belongs to this phase."],
          ["2nd–1st c. BCE", "Sāñcī and Bhārhut", "Railings, carved gateways and circumambulatory paths turn the stupa into narrative and ritual architecture."],
          ["2nd c. BCE–2nd c. CE", "Rock-cut caitya and vihāra", "Excavated complexes integrate worship halls, stupas and residential spaces into a single architectural system."],
          ["4th–6th c.", "Gupta period", "Image worship and built shrines gain importance alongside stupas and monasteries."],
          ["5th–12th c.", "Great mahāvihāras", "Nālandā and other centers combine teaching, residence, shrines, libraries and reliquary monuments at an unprecedented scale."]
        ]
      },
      china: {
        title: "China — from imported stupa to Chinese pagoda",
        intro: "Buddhist forms are recast through Chinese timber construction, masonry, and axial planning.",
        events: [
          ["1st–2nd c.", "Early foundations", "Traditions surrounding White Horse Monastery symbolize the first establishment of Buddhism and its new building types."],
          ["4th–6th c.", "Cave temples and great pagodas", "Yungang, Longmen and Northern-dynasty monasteries show rock-cut sanctuaries alongside large timber towers."],
          ["523", "Songyue Pagoda", "Masonry creates a durable pagoda form that translates Buddhist verticality into a new structural system."],
          ["7th–9th c.", "Tang high point", "Large axial complexes and brick pagodas such as the Giant Wild Goose Pagoda define a monumental monastic landscape."],
          ["10th–13th c.", "Song and the growth of Chan", "Buddha halls, specialized pavilions and Chan monasteries strengthen the axial hierarchy of the compound."],
          ["14th–19th c.", "Ming and Qing", "Successive courtyards, timber halls and rebuilt pagodas shape much of the classical image of the Chinese temple."]
        ]
      },
      korea: {
        title: "Korea — from timber pagoda to mountain monastery",
        intro: "The peninsula transforms continental models through stone, topography, and a sophisticated timber-building tradition.",
        events: [
          ["4th–6th c.", "Three Kingdoms", "Buddhism takes root in Goguryeo, Baekje and then Silla; early monasteries and pagodas grow through royal patronage."],
          ["6th–7th c.", "Monumental timber pagodas", "Complexes such as Hwangnyongsa place an immense pagoda at the center of state-sponsored architecture."],
          ["7th–9th c.", "Unified Silla and stone pagodas", "Granite becomes a major medium; Bulguksa balances halls, courts, stairways and paired pagodas."],
          ["9th–10th c.", "Rise of Sŏn", "Monk reliquary stupas, pudo or sŭngt’ap, make lineage and memory visible in the landscape."],
          ["918–1392", "Koryŏ", "Strong Buddhist patronage supports major monasteries, diverse stupa types and refined timber construction."],
          ["1392–1910", "Chosŏn", "Restrictions on Buddhism strengthen the role of mountain monasteries, where architectural traditions survive and evolve."]
        ]
      },
      japan: {
        title: "Japan — from continental transfer to Japanese traditions",
        intro: "Japan preserves timber architecture to an exceptional degree while transforming models transmitted through Korea and China.",
        events: [
          ["late 6th c.", "Asuka and the first monasteries", "Asuka-dera introduces pagodas, image halls, cloisters and continental building techniques to the archipelago."],
          ["7th c.", "Hōryū-ji", "The ancient precinct preserves some of the world’s oldest surviving timber buildings and records an early adaptation of continental forms."],
          ["8th c.", "Nara and state Buddhism", "Large monasteries shape the capital; the Great Buddha of Tōdai-ji is dedicated in 752."],
          ["9th c.", "Mountains and esoteric Buddhism", "Enryaku-ji and Kōyasan shift major religious activity into terraced mountain compounds."],
          ["1053", "Byōdō-in and Pure Land", "The Phoenix Hall stages a paradisiacal vision in which architecture, pond and ritual image form a single composition."],
          ["12th–14th c.", "Kamakura and Zen", "Renewed contacts with China introduce new structural systems and monastic layouts associated with Zen."]
        ]
      },
      vietnam: {
        title: "Viet Nam — regional crossroads and distinctive forms",
        intro: "Vietnamese Buddhist architecture grows from maritime and continental exchanges, then develops within its own political and landscape traditions.",
        events: [
          ["late 2nd c.", "Luy Lâu", "The Red River delta becomes one of the region’s earliest known centers for Buddhist study, translation and transmission."],
          ["1009–1225", "Lý dynasty", "Royal patronage expands temples, towers and monasteries; the One Pillar Pagoda is founded in 1049."],
          ["1225–1400", "Trần dynasty", "Mountain monastic networks expand, especially around Yên Tử and the Trúc Lâm tradition."],
          ["15th–18th c.", "Mature Vietnamese layouts", "Courtyards, parallel halls and nội công ngoại quốc compositions organize many rebuilt or enlarged temple compounds."],
          ["1601", "Thiên Mụ founded", "The monastery becomes embedded in the landscape of Huế and the political geography of the Nguyễn lords."],
          ["1844–1846", "Phước Duyên Tower", "Thiên Mụ’s seven-story tower becomes a defining landmark of Huế’s Buddhist landscape."]
        ]
      }
    },

    ja: {
      label: "年表",
      aria: "仏教建築の年表",
      india: {
        title: "インド — 遊行する教団から大規模仏教複合施設へ",
        intro: "僧院・ストゥーパ・大規模仏教施設が形成されていく主要な節目。",
        events: [
          ["紀元前5世紀頃", "初期の僧院的居住", "雨安居の期間、祇園精舎や竹林精舎のような寄進された園林に教団が定着する。"],
          ["紀元前3世紀", "アショーカ王と大規模ストゥーパ", "マウリヤ朝の庇護によって舎利信仰とストゥーパ造営が拡大し、サーンチー大塔の初期核もこの時期に属する。"],
          ["紀元前2～1世紀", "サーンチーとバールフット", "欄楯・彫刻門・右繞の動線により、ストゥーパは物語と儀礼を担う建築へ発展する。"],
          ["紀元前2世紀～紀元2世紀", "石窟チャイティヤとヴィハーラ", "礼拝堂・ストゥーパ・僧房が掘削空間の中で一体的に構成される。"],
          ["4～6世紀", "グプタ時代", "仏像礼拝と独立した祠堂が、ストゥーパや僧院と並んで重要性を増す。"],
          ["5～12世紀", "大マハーヴィハーラ", "ナーランダーなどが教学・居住・祠堂・図書施設・舎利建築を大規模に統合する。"]
        ]
      },
      china: {
        title: "中国 — 伝来したストゥーパから中国式仏塔へ",
        intro: "仏教建築は中国の木造技術、煉瓦造、軸線的配置の中で再構成される。",
        events: [
          ["1～2世紀", "初期寺院の成立", "白馬寺にまつわる伝承は、仏教と新たな建築類型の初期定着を象徴する。"],
          ["4～6世紀", "石窟寺院と大規模木塔", "雲岡・龍門や北朝寺院では、石窟礼拝空間と巨大木塔が並行して発展する。"],
          ["523年", "嵩岳寺塔", "煉瓦造によって、仏塔の垂直性を新しい構造体系へ翻訳した耐久性の高い形式が成立する。"],
          ["7～9世紀", "唐代の隆盛", "大雁塔などの煉瓦塔と軸線的な大寺院が、壮大な仏教都市景観を形成する。"],
          ["10～13世紀", "宋代と禅宗の発展", "仏殿・専門堂宇・禅院が複合施設内部の軸線的ヒエラルキーを強める。"],
          ["14～19世紀", "明・清代", "連続する中庭、木造殿堂、再建された仏塔が中国寺院の古典的イメージを定着させる。"]
        ]
      },
      korea: {
        title: "韓国 — 木塔から山地寺院へ",
        intro: "朝鮮半島では大陸のモデルが、石材・地形・高度な木造技術によって独自に変換される。",
        events: [
          ["4～6世紀", "三国時代", "高句麗・百済・新羅へ仏教が定着し、王権の庇護のもとで初期寺院と塔が造営される。"],
          ["6～7世紀", "巨大木塔", "皇龍寺のような国家的寺院では、巨大な木塔が伽藍の中心を占める。"],
          ["7～9世紀", "統一新羅と石塔", "花崗岩が主要素材となり、仏国寺では殿堂・中庭・階段・双塔が均衡ある構成をつくる。"],
          ["9～10世紀", "禅の興隆", "高僧の舎利塔である浮屠・僧塔が、法脈と記憶を山地景観に可視化する。"],
          ["918–1392", "高麗", "強力な仏教保護のもと、大寺院、多様な塔形式、洗練された木造架構が発展する。"],
          ["1392–1910", "朝鮮王朝", "仏教抑制政策により山地寺院の重要性が増し、そこで建築伝統が継承・変容する。"]
        ]
      },
      japan: {
        title: "日本 — 大陸伝来から日本独自の仏教建築へ",
        intro: "日本は韓国・中国を経由したモデルを変容させながら、木造建築を例外的な規模で保存してきた。",
        events: [
          ["6世紀末", "飛鳥と初期寺院", "飛鳥寺が塔・金堂・回廊と大陸系の建築技術を列島へ導入する。"],
          ["7世紀", "法隆寺", "古い伽藍には世界最古級の現存木造建築が残り、大陸形式の早期受容を示す。"],
          ["8世紀", "奈良と国家仏教", "大寺院が都城を構成し、東大寺の大仏は752年に開眼供養を迎える。"],
          ["9世紀", "山岳と密教", "延暦寺と高野山は、宗教活動の重要な部分を山地の段状伽藍へ移す。"],
          ["1053年", "平等院と浄土", "鳳凰堂は建築・池・仏像を一体化し、極楽浄土の視覚的イメージを構築する。"],
          ["12～14世紀", "鎌倉と禅", "中国との新たな交流から、大仏様・禅宗様などの構法と禅院配置が導入される。"]
        ]
      },
      vietnam: {
        title: "ベトナム — 地域交流と独自の建築形成",
        intro: "海上・陸上の交流を基盤に成立し、独自の政治環境と景観の中で仏教建築が展開する。",
        events: [
          ["2世紀末", "ルイ・ラウ", "紅河デルタが、地域最古級の仏教教学・翻訳・伝播拠点の一つとなる。"],
          ["1009–1225", "李朝", "王室の庇護で寺院・塔・僧院が増え、一柱寺は1049年に創建される。"],
          ["1225–1400", "陳朝", "イエン・トゥーと竹林禅派を中心に山地寺院ネットワークが発展する。"],
          ["15～18世紀", "成熟したベトナム式伽藍", "中庭・並列殿堂・「内工外国」型の構成が、多くの再建・拡張寺院を組織する。"],
          ["1601年", "ティエンムー寺創建", "寺院はフエの景観と阮氏政権の政治地理に組み込まれていく。"],
          ["1844–1846", "フオックズエン塔", "ティエンムー寺の七層塔が、フエの仏教景観を代表するランドマークとなる。"]
        ]
      }
    },

    ko: {
      label: "연표",
      aria: "불교 건축 연표",
      india: {
        title: "인도 — 유행 교단에서 대규모 불교 복합공간으로",
        intro: "승원, 스투파, 대형 불교 건축군이 형성되는 핵심 단계.",
        events: [
          ["기원전 5세기경", "초기 승원 거주", "우안거 동안 제타바나와 죽림정사 같은 기증된 원림에 공동체가 정착하기 시작한다."],
          ["기원전 3세기", "아쇼카와 기념비적 스투파", "마우리아 왕조의 후원으로 사리 신앙과 스투파 건립이 확대되며 산치 대탑의 초기 핵심도 이 시기에 속한다."],
          ["기원전 2–1세기", "산치와 바르후트", "난간, 조각문, 우요 동선이 스투파를 서사적·의례적 건축으로 바꾼다."],
          ["기원전 2세기–기원후 2세기", "석굴 차이티야와 비하라", "예배당, 스투파, 승방이 하나의 굴착 건축 체계 안에 통합된다."],
          ["4–6세기", "굽타 시대", "불상 예배와 독립 성소가 스투파·승원과 함께 점차 중요한 위치를 차지한다."],
          ["5–12세기", "대규모 마하비하라", "날란다 등은 교육, 거주, 성소, 도서 시설, 사리 기념물을 대규모로 결합한다."]
        ]
      },
      china: {
        title: "중국 — 전래된 스투파에서 중국식 탑으로",
        intro: "불교 건축은 중국의 목조건축, 조적, 축선형 배치와 만나 새롭게 구성된다.",
        events: [
          ["1–2세기", "초기 사원", "백마사 전승은 불교와 새로운 건축 유형이 중국에 정착하는 초기 단계를 상징한다."],
          ["4–6세기", "석굴사원과 대형 목탑", "윈강·룽먼과 북조 사원에서 석굴 예배공간과 거대한 목탑이 함께 발전한다."],
          ["523", "쑹웨사탑", "벽돌 구조가 불교적 수직성을 새로운 구조 체계로 번역한 내구성 높은 탑 형식을 만든다."],
          ["7–9세기", "당대의 전성기", "대안탑 같은 벽돌탑과 대규모 축선형 사원이 장대한 불교 경관을 조직한다."],
          ["10–13세기", "송대와 선종의 발전", "불전과 전문 전각, 선원이 사찰 내부의 축선적 위계를 강화한다."],
          ["14–19세기", "명·청", "연속된 마당, 목조 전각, 재건된 탑이 중국 사찰의 고전적 이미지를 정착시킨다."]
        ]
      },
      korea: {
        title: "한국 — 목탑에서 산지사찰로",
        intro: "한반도는 대륙의 모델을 석재, 지형, 정교한 목조건축 전통을 통해 독자적으로 변형한다.",
        events: [
          ["4–6세기", "삼국시대", "고구려·백제·신라에 불교가 정착하며 왕실 후원 아래 초기 사찰과 탑이 건립된다."],
          ["6–7세기", "대형 목탑", "황룡사 같은 국가 사찰에서는 거대한 목탑이 가람의 중심을 차지한다."],
          ["7–9세기", "통일신라와 석탑", "화강암이 주요 재료가 되고, 불국사는 전각·마당·계단·쌍탑의 균형을 보여 준다."],
          ["9–10세기", "선의 확산", "고승의 사리탑인 부도·승탑이 산지 경관 속에 법맥과 기억을 시각화한다."],
          ["918–1392", "고려", "강력한 불교 후원으로 대형 사찰, 다양한 탑 형식, 세련된 목구조가 발전한다."],
          ["1392–1910", "조선", "억불 정책은 산지사찰의 비중을 높였고, 그곳에서 건축 전통이 보존되고 변형되었다."]
        ]
      },
      japan: {
        title: "일본 — 대륙 전래에서 일본 고유의 전통으로",
        intro: "일본은 한반도와 중국을 거친 모델을 변형하면서 목조건축을 예외적으로 잘 보존했다.",
        events: [
          ["6세기 말", "아스카와 초기 사찰", "아스카데라는 탑, 금당, 회랑과 대륙계 건축기술을 일본 열도에 도입한다."],
          ["7세기", "호류지", "고대 가람에는 세계 최고(最古)급 현존 목조건축이 남아 대륙 형식의 초기 수용을 보여 준다."],
          ["8세기", "나라와 국가불교", "대형 사찰이 수도를 구성하며 도다이지 대불은 752년에 개안 공양을 맞는다."],
          ["9세기", "산악과 밀교", "엔랴쿠지와 고야산은 주요 종교 활동을 산지의 단계형 가람으로 확장한다."],
          ["1053", "뵤도인과 정토", "봉황당은 건축, 연못, 불상을 하나로 묶어 극락정토의 시각적 이미지를 만든다."],
          ["12–14세기", "가마쿠라와 선", "중국과의 새로운 교류를 통해 새로운 목구조 방식과 선종 사찰 배치가 도입된다."]
        ]
      },
      vietnam: {
        title: "베트남 — 지역 교류와 고유 형식의 형성",
        intro: "해상·육상 교류에서 출발한 베트남 불교 건축은 독자적인 정치 환경과 경관 속에서 발전한다.",
        events: [
          ["2세기 말", "루이라우", "홍강 삼각주가 이 지역에서 가장 이른 불교 연구·번역·전파 중심지 가운데 하나가 된다."],
          ["1009–1225", "리 왕조", "왕실 후원으로 사찰, 탑, 승원이 확대되고 일주사는 1049년에 창건된다."],
          ["1225–1400", "쩐 왕조", "옌뜨와 죽림 전통을 중심으로 산지 승원 네트워크가 발전한다."],
          ["15–18세기", "성숙한 베트남식 배치", "마당, 병렬 전각, nội công ngoại quốc 형식이 많은 재건·확장 사찰의 공간을 조직한다."],
          ["1601", "티엔무사 창건", "사찰은 후에의 경관과 응우옌 군주의 정치 지리에 깊이 결합된다."],
          ["1844–1846", "프억주옌탑", "티엔무사의 칠층탑이 후에 불교 경관을 대표하는 표지가 된다."]
        ]
      }
    },

    vi: {
      label: "Dòng thời gian",
      aria: "Dòng thời gian kiến trúc Phật giáo",
      india: {
        title: "Ấn Độ — từ tăng đoàn du hành đến quần thể Phật giáo quy mô lớn",
        intro: "Những mốc chính trong quá trình hình thành tu viện, stūpa và các quần thể kiến trúc Phật giáo lớn.",
        events: [
          ["khoảng TK V TCN", "Những nơi cư trú tăng đoàn đầu tiên", "Trong mùa an cư, tăng đoàn dần ổn định tại các khu vườn và điền trang được cúng dường như Jetavana hay Trúc Lâm."],
          ["TK III TCN", "Aśoka và stūpa quy mô lớn", "Sự bảo trợ của đế chế Maurya mở rộng việc thờ xá lợi và xây stūpa; phần lõi sớm của Sāñcī thuộc giai đoạn này."],
          ["TK II–I TCN", "Sāñcī và Bhārhut", "Lan can, cổng chạm khắc và lộ trình nhiễu tháp biến stūpa thành một kiến trúc vừa tự sự vừa nghi lễ."],
          ["TK II TCN–TK II", "Caitya và vihāra trong hang đá", "Không gian thờ, stūpa và khu ở của tăng sĩ được tích hợp trong cùng một hệ kiến trúc khoét núi."],
          ["TK IV–VI", "Thời Gupta", "Việc thờ tượng và các điện thờ xây dựng độc lập ngày càng quan trọng bên cạnh stūpa và tu viện."],
          ["TK V–XII", "Các mahāvihāra lớn", "Nālandā và những trung tâm khác kết hợp giảng dạy, lưu trú, điện thờ, thư viện và kiến trúc xá lợi ở quy mô lớn."]
        ]
      },
      china: {
        title: "Trung Quốc — từ stūpa du nhập đến tháp Phật kiểu Trung Hoa",
        intro: "Hình thức Phật giáo được tái cấu trúc qua kỹ thuật gỗ, xây gạch và bố cục theo trục của Trung Quốc.",
        events: [
          ["TK I–II", "Những cơ sở đầu tiên", "Truyền thuyết về chùa Bạch Mã tượng trưng cho giai đoạn đầu Phật giáo và các loại hình kiến trúc mới bén rễ tại Trung Quốc."],
          ["TK IV–VI", "Chùa hang và đại tháp", "Vân Cương, Long Môn và các tự viện thời Bắc triều cho thấy chùa hang cùng phát triển với những tháp gỗ lớn."],
          ["523", "Tháp Tung Nhạc", "Kết cấu gạch tạo nên một dạng tháp bền vững, chuyển dịch tính thẳng đứng Phật giáo sang một hệ kết cấu mới."],
          ["TK VII–IX", "Thịnh thời Đường", "Các quần thể lớn theo trục và tháp gạch như Đại Nhạn tháp tạo nên cảnh quan tự viện hoành tráng."],
          ["TK X–XIII", "Thời Tống và sự phát triển Thiền", "Phật điện, điện chuyên biệt và thiền viện củng cố thứ bậc theo trục của toàn khu."],
          ["TK XIV–XIX", "Minh và Thanh", "Chuỗi sân, điện gỗ và các tháp được trùng tu định hình phần lớn hình ảnh cổ điển của chùa Trung Hoa."]
        ]
      },
      korea: {
        title: "Triều Tiên — từ tháp gỗ đến tự viện miền núi",
        intro: "Bán đảo Triều Tiên biến đổi mô hình lục địa qua đá, địa hình và truyền thống kết cấu gỗ tinh tế.",
        events: [
          ["TK IV–VI", "Thời Tam Quốc", "Phật giáo bén rễ ở Goguryeo, Baekje rồi Silla; các chùa và tháp đầu tiên phát triển nhờ bảo trợ vương quyền."],
          ["TK VI–VII", "Đại tháp gỗ", "Những quần thể như Hwangnyongsa đặt tháp gỗ khổng lồ ở trung tâm kiến trúc nhà nước."],
          ["TK VII–IX", "Silla Thống nhất và tháp đá", "Đá granite trở thành vật liệu chủ đạo; Bulguksa cân bằng điện, sân, bậc thang và cặp tháp."],
          ["TK IX–X", "Sự phát triển của Sŏn", "Tháp xá lợi cao tăng — pudo hay sŭngt’ap — làm hiện rõ dòng truyền thừa và ký ức trong cảnh quan."],
          ["918–1392", "Koryŏ", "Sự bảo trợ mạnh mẽ của Phật giáo thúc đẩy đại tự viện, nhiều kiểu tháp và kết cấu gỗ tinh xảo."],
          ["1392–1910", "Chosŏn", "Các hạn chế đối với Phật giáo làm tăng vai trò của tự viện miền núi, nơi truyền thống kiến trúc tiếp tục được bảo tồn và biến đổi."]
        ]
      },
      japan: {
        title: "Nhật Bản — từ truyền nhập lục địa đến truyền thống bản địa",
        intro: "Nhật Bản bảo tồn kiến trúc gỗ ở mức đặc biệt cao, đồng thời biến đổi các mô hình truyền qua Triều Tiên và Trung Quốc.",
        events: [
          ["cuối TK VI", "Asuka và các chùa đầu tiên", "Asuka-dera đưa tháp, kim đường, hành lang và kỹ thuật xây dựng lục địa vào quần đảo Nhật Bản."],
          ["TK VII", "Hōryū-ji", "Khu cổ tự còn giữ một số công trình gỗ lâu đời nhất thế giới và cho thấy sự bản địa hóa sớm các mô hình lục địa."],
          ["TK VIII", "Nara và Phật giáo nhà nước", "Các đại tự viện định hình kinh đô; Đại Phật ở Tōdai-ji được cử hành khai nhãn năm 752."],
          ["TK IX", "Núi và Mật giáo", "Enryaku-ji và Kōyasan chuyển một phần quan trọng của đời sống tôn giáo lên các quần thể bậc thang trên núi."],
          ["1053", "Byōdō-in và Tịnh độ", "Phượng Hoàng đường kết hợp kiến trúc, hồ nước và tượng thờ thành một hình ảnh tổng thể về cõi Cực Lạc."],
          ["TK XII–XIV", "Kamakura và Thiền", "Giao lưu mới với Trung Quốc đưa vào các hệ kết cấu và bố cục tự viện gắn với Thiền tông."]
        ]
      },
      vietnam: {
        title: "Việt Nam — giao điểm khu vực và những hình thức riêng",
        intro: "Kiến trúc Phật giáo Việt Nam hình thành từ giao lưu đường biển và lục địa, rồi phát triển trong bối cảnh chính trị và cảnh quan riêng.",
        events: [
          ["cuối TK II", "Luy Lâu", "Châu thổ sông Hồng trở thành một trong những trung tâm sớm nhất của khu vực về học tập, dịch thuật và truyền bá Phật giáo."],
          ["1009–1225", "Triều Lý", "Sự bảo trợ của triều đình thúc đẩy chùa, tháp và tu viện; Chùa Một Cột được dựng năm 1049."],
          ["1225–1400", "Triều Trần", "Mạng lưới tự viện miền núi phát triển, đặc biệt quanh Yên Tử và truyền thống Trúc Lâm."],
          ["TK XV–XVIII", "Bố cục Việt Nam trưởng thành", "Hệ sân, các dãy điện song song và mô thức nội công ngoại quốc tổ chức nhiều quần thể được trùng tu hoặc mở rộng."],
          ["1601", "Khởi dựng chùa Thiên Mụ", "Ngôi chùa gắn chặt với cảnh quan Huế và địa lý chính trị của các chúa Nguyễn."],
          ["1844–1846", "Tháp Phước Duyên", "Tòa tháp bảy tầng của Thiên Mụ trở thành một biểu tượng nổi bật trong cảnh quan Phật giáo Huế."]
        ]
      }
    },

    "zh-hant": {
      label: "時間軸",
      aria: "佛教建築時間軸",
      india: {
        title: "印度 — 從遊行僧團到大型佛教建築群",
        intro: "僧院、窣堵波與大型佛教建築群形成過程中的關鍵節點。",
        events: [
          ["約前5世紀", "早期僧團居所", "雨安居期間，僧團逐漸固定於祇園精舍、竹林精舍等受施園林與莊園。"],
          ["前3世紀", "阿育王與大型窣堵波", "孔雀王朝的護持擴大舍利崇拜與窣堵波營建；桑奇大塔的早期核心也屬於此階段。"],
          ["前2–1世紀", "桑奇與巴爾胡特", "欄楯、雕刻塔門與繞塔動線，使窣堵波成為兼具敘事與儀式功能的建築。"],
          ["前2世紀–2世紀", "石窟支提與毘訶羅", "禮拜堂、窣堵波與僧房在同一石窟建築體系中被整合。"],
          ["4–6世紀", "笈多時期", "佛像崇拜與獨立殿堂的重要性上升，與窣堵波及僧院並行發展。"],
          ["5–12世紀", "大型摩訶毘訶羅", "那爛陀等中心把教學、居住、殿堂、藏書與舍利建築整合到前所未有的規模。"]
        ]
      },
      china: {
        title: "中國 — 從傳入的窣堵波到中國佛塔",
        intro: "佛教建築在中國木構技術、磚石結構與中軸佈局中被重新塑造。",
        events: [
          ["1–2世紀", "早期寺院", "白馬寺相關傳說象徵佛教及其新建築類型在中國初步落地。"],
          ["4–6世紀", "石窟寺與大型木塔", "雲岡、龍門與北朝寺院展現石窟禮拜空間與大型木塔並行發展。"],
          ["523", "嵩岳寺塔", "磚構形成耐久的佛塔形式，把佛教的垂直性轉譯為新的結構系統。"],
          ["7–9世紀", "唐代高峰", "大型中軸寺院與大雁塔等磚塔共同構成宏大的佛教建築景觀。"],
          ["10–13世紀", "宋代與禪宗發展", "佛殿、專門殿堂與禪院進一步強化寺院建築群的中軸層級。"],
          ["14–19世紀", "明清時期", "連續院落、木構殿堂與重建佛塔塑造了中國寺院的經典形象。"]
        ]
      },
      korea: {
        title: "韓國 — 從木塔到山地寺院",
        intro: "朝鮮半島以石材、地形與精緻木構技術重新詮釋大陸傳入的模式。",
        events: [
          ["4–6世紀", "三國時代", "佛教先後在高句麗、百濟與新羅扎根，早期寺院與佛塔在王權護持下發展。"],
          ["6–7世紀", "大型木塔", "皇龍寺等國家寺院以巨型木塔作為伽藍的核心。"],
          ["7–9世紀", "統一新羅與石塔", "花崗岩成為重要材料；佛國寺以殿堂、院落、階梯與雙塔形成均衡構圖。"],
          ["9–10世紀", "禪宗興起", "高僧舍利塔——浮屠或僧塔——把法脈與記憶具體化於山地景觀。"],
          ["918–1392", "高麗", "強盛的佛教護持推動大型寺院、多樣塔式與精緻木構的發展。"],
          ["1392–1910", "朝鮮王朝", "抑佛政策提高山地寺院的重要性，建築傳統也在此延續並轉化。"]
        ]
      },
      japan: {
        title: "日本 — 從大陸傳入到日本自身的傳統",
        intro: "日本在轉化經韓國與中國傳入的模式同時，也異常完整地保存了木構佛教建築。",
        events: [
          ["6世紀末", "飛鳥與早期寺院", "飛鳥寺把佛塔、金堂、迴廊與大陸建築技術帶入日本列島。"],
          ["7世紀", "法隆寺", "古伽藍保存了世界最古老的一批現存木構建築，顯示大陸形式的早期在地化。"],
          ["8世紀", "奈良與國家佛教", "大型寺院塑造都城；東大寺大佛於752年舉行開眼供養。"],
          ["9世紀", "山岳與密教", "延曆寺與高野山把重要宗教活動帶到依山勢分層展開的伽藍中。"],
          ["1053", "平等院與淨土", "鳳凰堂把建築、池水與禮拜佛像整合為一幅極樂淨土的空間圖像。"],
          ["12–14世紀", "鎌倉與禪", "與中國的新交流引入新的木構方法與禪宗寺院配置。"]
        ]
      },
      vietnam: {
        title: "越南 — 區域交流與自身形式",
        intro: "越南佛教建築源於海陸交流，並在自身的政治與景觀環境中逐步發展。",
        events: [
          ["2世紀末", "羸𨻻（Luy Lâu）", "紅河三角洲成為區域內最早的佛教學習、翻譯與傳播中心之一。"],
          ["1009–1225", "李朝", "王室護持促進寺院、塔與僧院建設；一柱寺建於1049年。"],
          ["1225–1400", "陳朝", "山地僧院網絡擴展，尤其以安子山與竹林禪派為核心。"],
          ["15–18世紀", "成熟的越南式配置", "院落、平行殿堂與「內工外國」型構圖組織許多重建或擴建的寺院。"],
          ["1601", "天姥寺創建", "寺院逐漸嵌入順化景觀與阮主的政治地理。"],
          ["1844–1846", "福緣塔", "天姥寺七層塔成為順化佛教景觀的重要地標。"]
        ]
      }
    }
  };

  const placements = [
    ["india", "#i-1"],
    ["china", "#iii-4"],
    ["korea", "#iv-2"],
    ["japan", "#vi-1"],
    ["vietnam", "#vii-1"]
  ];

  function localeKey() {
    const raw = (document.documentElement.lang || "fr").toLowerCase();
    if (raw.startsWith("zh-hant") || raw === "zh-tw") return "zh-hant";
    if (raw.startsWith("ja")) return "ja";
    if (raw.startsWith("ko")) return "ko";
    if (raw.startsWith("vi")) return "vi";
    if (raw.startsWith("en")) return "en";
    return "fr";
  }

  function buildTimeline(country, copy, common) {
    const section = document.createElement("section");
    section.className = "hab-timeline";
    section.dataset.country = country;

    const titleId = "hab-timeline-" + country + "-title";
    section.setAttribute("aria-labelledby", titleId);

    const head = document.createElement("header");
    head.className = "hab-timeline-head";

    const kicker = document.createElement("div");
    kicker.className = "hab-kicker";
    kicker.textContent = common.label;

    const title = document.createElement("h3");
    title.id = titleId;
    title.textContent = copy.title;

    const intro = document.createElement("p");
    intro.textContent = copy.intro;

    head.append(kicker, title, intro);

    const track = document.createElement("ol");
    track.className = "hab-timeline-track";
    track.setAttribute("aria-label", common.aria + " — " + copy.title);
    track.style.setProperty("--hab-timeline-count", copy.events.length);

    copy.events.forEach(function(event) {
      const date = event[0], eventTitle = event[1], description = event[2];
      const item = document.createElement("li");

      const time = document.createElement("time");
      time.className = "hab-timeline-date";
      time.textContent = date;

      const strong = document.createElement("strong");
      strong.className = "hab-timeline-event";
      strong.textContent = eventTitle;

      const p = document.createElement("p");
      p.textContent = description;

      item.append(time, strong, p);
      track.appendChild(item);
    });

    section.append(head, track);
    return section;
  }

  function render() {
    const common = translations[localeKey()] || translations.fr;

    placements.forEach(function(placement) {
      const country = placement[0], selector = placement[1];
      if (document.querySelector('.hab-timeline[data-country="' + country + '"]')) return;

      const anchor = document.querySelector(selector);
      const copy = common[country];
      if (!anchor || !copy) return;

      anchor.insertAdjacentElement("beforebegin", buildTimeline(country, copy, common));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }
})();