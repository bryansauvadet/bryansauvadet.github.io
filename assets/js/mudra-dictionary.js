(() => {
"use strict";
const root=document.getElementById("mudra-dictionary");
if(!root)return;
const locale=root.dataset.locale||"fr";

const UI={
fr:{search:"Recherche",placeholder:"Nom, signification, contexte…",category:"Catégorie",tradition:"Tradition",all:"Tous",reset:"Réinitialiser",one:"1 mudrā",many:"{n} mudrā",open:"Voir la fiche",meaning:"Signification",gesture:"Description du geste",context:"Contexte iconographique",source:"Source de référence",close:"Fermer",legend:"30 fiches · schémas vectoriels normalisés",empty:"Aucun mudrā ne correspond à ces filtres.",sourceNote:"Terminologie et formes varient selon les corpus. Les fiches distinguent les gestes iconographiques généraux, les usages tantriques et les systèmes régionaux japonais.",cats:{core:"Fondamental",regional:"Asie orientale",tantric:"Tantrique / Vajrayāna",pureland:"Amida · 九品印"},trad:{pan:"Bouddhisme ancien / Mahāyāna",mahayana:"Mahāyāna",vajrayana:"Vajrayāna",japan:"Japon · Terre pure"}},
en:{search:"Search",placeholder:"Name, meaning, context…",category:"Category",tradition:"Tradition",all:"All",reset:"Reset",one:"1 mudra",many:"{n} mudras",open:"View entry",meaning:"Meaning",gesture:"Gesture description",context:"Iconographic context",source:"Reference source",close:"Close",legend:"30 entries · normalized vector diagrams",empty:"No mudra matches these filters.",sourceNote:"Terminology and forms vary across corpora. Entries distinguish general iconographic gestures, tantric uses, and regional Japanese systems.",cats:{core:"Foundational",regional:"East Asian",tantric:"Tantric / Vajrayana",pureland:"Amida · 九品印"},trad:{pan:"Early Buddhism / Mahayana",mahayana:"Mahayana",vajrayana:"Vajrayana",japan:"Japan · Pure Land"}},
ko:{search:"검색",placeholder:"명칭, 의미, 도상 맥락…",category:"분류",tradition:"전통",all:"전체",reset:"초기화",one:"1개 수인",many:"{n}개 수인",open:"상세 보기",meaning:"의미",gesture:"손 자세",context:"도상적 맥락",source:"참고 자료",close:"닫기",legend:"30개 항목 · 표준화 벡터 도식",empty:"조건에 맞는 수인이 없습니다.",sourceNote:"명칭과 형태는 자료와 전승에 따라 달라질 수 있습니다. 이 사전은 일반 도상 수인, 탄트라 계통의 용례, 일본의 지역적 체계를 구분합니다.",cats:{core:"기본 도상",regional:"동아시아",tantric:"밀교 / 금강승",pureland:"아미타 · 九品印"},trad:{pan:"초기불교 / 대승",mahayana:"대승불교",vajrayana:"금강승",japan:"일본 · 정토교"}},
ja:{search:"検索",placeholder:"名称・意味・図像文脈…",category:"分類",tradition:"伝統",all:"すべて",reset:"リセット",one:"1件",many:"{n}件",open:"詳細を見る",meaning:"意味",gesture:"手の形",context:"図像上の文脈",source:"参考資料",close:"閉じる",legend:"30項目 · 正規化ベクター模式図",empty:"条件に一致する印相はありません。",sourceNote:"名称と形は資料・伝承によって異なります。本辞典では一般的な図像の印相、密教的用法、日本の地域的体系を区別しています。",cats:{core:"基本図像",regional:"東アジア",tantric:"密教 / 金剛乗",pureland:"阿弥陀 · 九品印"},trad:{pan:"初期仏教 / 大乗",mahayana:"大乗仏教",vajrayana:"金剛乗",japan:"日本 · 浄土教"}},
"zh-hant":{search:"搜尋",placeholder:"名稱、意義、圖像脈絡…",category:"類別",tradition:"傳統",all:"全部",reset:"重設",one:"1種手印",many:"{n}種手印",open:"查看條目",meaning:"意義",gesture:"手勢說明",context:"圖像脈絡",source:"參考資料",close:"關閉",legend:"30個條目 · 標準化向量示意圖",empty:"沒有符合條件的手印。",sourceNote:"名稱與形式可能隨文獻與傳承而異。本辭典區分一般圖像手印、密教用法與日本地區性體系。",cats:{core:"基本圖像",regional:"東亞",tantric:"密教 / 金剛乘",pureland:"阿彌陀 · 九品印"},trad:{pan:"早期佛教 / 大乘",mahayana:"大乘佛教",vajrayana:"金剛乘",japan:"日本 · 淨土教"}},
vi:{search:"Tìm kiếm",placeholder:"Tên, ý nghĩa, bối cảnh…",category:"Phân loại",tradition:"Truyền thống",all:"Tất cả",reset:"Đặt lại",one:"1 thủ ấn",many:"{n} thủ ấn",open:"Xem chi tiết",meaning:"Ý nghĩa",gesture:"Mô tả thủ thế",context:"Bối cảnh hình tượng",source:"Nguồn tham khảo",close:"Đóng",legend:"30 mục · sơ đồ vector chuẩn hóa",empty:"Không có thủ ấn phù hợp với bộ lọc.",sourceNote:"Thuật ngữ và hình thức có thể thay đổi theo văn bản và truyền thừa. Từ điển phân biệt các thủ ấn hình tượng phổ quát, cách dùng Mật giáo và các hệ thống khu vực của Nhật Bản.",cats:{core:"Căn bản",regional:"Đông Á",tantric:"Mật giáo / Kim Cương thừa",pureland:"A Di Đà · 九品印"},trad:{pan:"Phật giáo sớm / Đại thừa",mahayana:"Đại thừa",vajrayana:"Kim Cương thừa",japan:"Nhật Bản · Tịnh độ"}}
}[locale]||null;

const TEXT={
fearlessness:{fr:"Protection et absence de crainte.",en:"Protection and fearlessness.",ko:"보호와 두려움 없음.",ja:"守護と畏れのなさ。","zh-hant":"守護與無畏。",vi:"Che chở và vô úy."},
generosity:{fr:"Don, générosité et accomplissement des vœux.",en:"Giving, generosity, and the granting of wishes.",ko:"보시·관대함·소원의 성취.",ja:"施与・寛容・願いの成就。","zh-hant":"布施、慷慨與滿願。",vi:"Bố thí, rộng lượng và viên mãn lời nguyện."},
earth:{fr:"Prise de la terre à témoin au moment de l’Éveil.",en:"Calling the earth to witness at the moment of awakening.",ko:"깨달음의 순간에 대지를 증인으로 삼음.",ja:"成道の瞬間に大地を証人とする。","zh-hant":"成道之際以大地為證。",vi:"Gọi đất làm chứng vào thời khắc giác ngộ."},
meditation:{fr:"Méditation, concentration et stabilité contemplative.",en:"Meditation, concentration, and contemplative stability.",ko:"명상·삼매·관조의 안정.",ja:"瞑想・禅定・観想の安定。","zh-hant":"禪定、專注與觀修的安住。",vi:"Thiền định, tập trung và an trú quán chiếu."},
wheel:{fr:"Enseignement : mise en mouvement de la roue du Dharma.",en:"Teaching: setting the Wheel of Dharma in motion.",ko:"설법, 즉 법륜을 굴리는 의미.",ja:"説法、すなわち法輪を転ずること。","zh-hant":"說法，即轉動法輪。",vi:"Thuyết pháp, chuyển bánh xe Pháp."},
exposition:{fr:"Explication, enseignement et argumentation doctrinale.",en:"Exposition, teaching, and doctrinal discussion.",ko:"가르침의 설명과 교설의 논증.",ja:"教えの解説・説法・論議。","zh-hant":"教義的解說、說法與論議。",vi:"Giảng giải, thuyết pháp và biện giải giáo lý."},
reverence:{fr:"Hommage, respect et salutation.",en:"Homage, reverence, and respectful greeting.",ko:"예경·공경·합장.",ja:"礼拝・敬意・合掌。","zh-hant":"禮敬、恭敬與合掌。",vi:"Đảnh lễ, tôn kính và chắp tay."},
welcome:{fr:"Accueil d’un fidèle par Amitābha vers la Terre pure.",en:"Amitabha welcoming a devotee into the Pure Land.",ko:"아미타불이 왕생자를 정토로 맞이함.",ja:"阿弥陀が往生者を浄土へ迎えること。","zh-hant":"阿彌陀佛迎接往生者進入淨土。",vi:"Phật A Di Đà tiếp dẫn người vãng sinh về Tịnh độ."},
miracles:{fr:"Manifestation miraculeuse et affirmation de la puissance éveillée.",en:"Display of miracles and awakened power.",ko:"신통의 시현과 깨달음의 힘.",ja:"神変の示現と覚りの力。","zh-hant":"示現神通與覺悟之力。",vi:"Biểu hiện thần thông và năng lực giác ngộ."},
blessing:{fr:"Bénédiction ou explication d’un enseignement.",en:"Blessing or explication of a teaching.",ko:"가피 또는 가르침의 해설.",ja:"加持、または教えの解説。","zh-hant":"加持或教法解說。",vi:"Gia trì hoặc giảng giải giáo pháp."},
amidaMeditation:{fr:"Concentration méditative d’Amitābha.",en:"Amitabha’s meditative concentration.",ko:"아미타불의 선정.",ja:"阿弥陀の禅定。","zh-hant":"阿彌陀佛的禪定。",vi:"Thiền định của Phật A Di Đà."},
preaching:{fr:"Prédication et transmission de l’enseignement.",en:"Preaching and transmission of the teaching.",ko:"설법과 가르침의 전승.",ja:"説法と教えの伝達。","zh-hant":"說法與教法傳授。",vi:"Thuyết pháp và truyền trao giáo pháp."},
essence:{fr:"Sceau de l’essence de l’Éveil, associé à Vairocana.",en:"Seal of the essence of enlightenment, associated with Vairochana.",ko:"비로자나불과 관련된 깨달음의 본질을 나타내는 인.",ja:"大日如来に結びつく覚りの本質の印。","zh-hant":"與毘盧遮那佛相關的覺悟本質之印。",vi:"Ấn biểu thị bản thể giác ngộ, gắn với Đại Nhật Như Lai."},
vajraUnion:{fr:"Union indissociable de la méthode et de la sagesse dans l’iconographie tantrique.",en:"Indivisible union of method and wisdom in tantric iconography.",ko:"탄트라 도상에서 방편과 지혜의 불가분한 결합.",ja:"密教図像における方便と智慧の不可分の結合。","zh-hant":"密教圖像中方便與智慧不可分的結合。",vi:"Sự hợp nhất bất khả phân của phương tiện và trí tuệ trong hình tượng Mật giáo."},
subjugation:{fr:"Subjugation des forces hostiles dans un contexte tantrique.",en:"Subjugation of hostile forces in a tantric context.",ko:"밀교적 맥락에서 적대적 힘을 조복함.",ja:"密教的文脈における障碍・敵対力の調伏。","zh-hant":"密教脈絡中對障礙與敵對力量的降伏。",vi:"Hàng phục các lực cản trong bối cảnh Mật giáo."},
flame:{fr:"Geste dynamique associé à certaines ḍākinī et cycles tantriques.",en:"Dynamic gesture associated with certain dakinis and tantric cycles.",ko:"일부 다키니와 탄트라 의궤에 관련된 역동적 수인.",ja:"一部のダーキニーと密教儀軌に関わる動的な印。","zh-hant":"與部分空行母及密續儀軌相關的動態手印。",vi:"Thủ thế động gắn với một số ḍākinī và chu kỳ tantra."},
nagaraja:{fr:"Geste distinctif du Buddha Nāgarāja.",en:"Distinctive gesture of Nagaraja Buddha.",ko:"나가라자 불의 특징적 수인.",ja:"ナーガラージャ仏に特有の印。","zh-hant":"龍王佛的特徵性手印。",vi:"Thủ ấn đặc trưng của Phật Nāgarāja."},
wrathful:{fr:"Commandement, avertissement ou énergie courroucée.",en:"Command, warning, or wrathful energy.",ko:"명령·경고 또는 분노존의 위세.",ja:"命令・警告、または忿怒の威勢。","zh-hant":"命令、警示或忿怒之威勢。",vi:"Mệnh lệnh, cảnh báo hoặc năng lực phẫn nộ."},
embrace:{fr:"Étreinte symbolique dans certaines images tantriques.",en:"Symbolic embrace in certain tantric images.",ko:"일부 밀교 도상에서 나타나는 상징적 포옹.",ja:"一部の密教図像に見られる象徴的な抱擁。","zh-hant":"部分密教圖像中的象徵性抱持。",vi:"Động tác ôm mang tính biểu tượng trong một số hình tượng Mật giáo."},
humkara:{fr:"Geste spécialisé associé à la divinité courroucée Hūṃkāra.",en:"Specialized gesture associated with the wrathful deity Humkara.",ko:"분노존 훔카라와 관련된 특수 수인.",ja:"忿怒尊フーンカーラに結びつく特殊な印。","zh-hant":"與忿怒尊吽迦羅相關的特殊手印。",vi:"Thủ ấn chuyên biệt gắn với phẫn nộ tôn Hūṃkāra."},
mandala:{fr:"Offrande symbolique de l’univers dans la pratique tibétaine.",en:"Symbolic offering of the universe in Tibetan practice.",ko:"티베트 수행에서 우주 전체를 상징적으로 공양함.",ja:"チベット仏教の修行で宇宙全体を象徴的に供養する。","zh-hant":"藏傳佛教修持中象徵性供養整個宇宙。",vi:"Dâng cúng biểu tượng toàn thể vũ trụ trong thực hành Tây Tạng."}
};

const CONTEXT={
shakyamuni:{fr:"Śākyamuni et, selon les traditions, d’autres Buddha ou bodhisattva.",en:"Shakyamuni and, depending on tradition, other Buddhas or bodhisattvas.",ko:"석가모니와 전통에 따라 다른 불·보살.",ja:"釈迦如来、および伝統によっては他の仏・菩薩。","zh-hant":"釋迦牟尼，以及依傳統而定的其他佛、菩薩。",vi:"Thích-ca Mâu-ni và, tùy truyền thống, các Phật hoặc Bồ-tát khác."},
five:{fr:"Répertoire des cinq Buddha symboliques et iconographie mahāyāna.",en:"Five symbolic Buddhas and wider Mahayana iconography.",ko:"오방불 및 대승불교 도상.",ja:"五仏と大乗仏教図像。","zh-hant":"五方佛與大乘佛教圖像。",vi:"Ngũ Phật và hình tượng Đại thừa."},
teaching:{fr:"Images de Buddha et de maîtres enseignant le Dharma.",en:"Images of Buddhas and teachers expounding the Dharma.",ko:"법을 설하는 불·스승의 도상.",ja:"法を説く仏や高僧の図像。","zh-hant":"佛與上師說法的圖像。",vi:"Hình tượng chư Phật và đạo sư thuyết pháp."},
amida:{fr:"Amitābha/Amida dans l’iconographie japonaise de la Terre pure.",en:"Amitabha/Amida in Japanese Pure Land iconography.",ko:"일본 정토교 도상의 아미타불.",ja:"日本浄土教図像における阿弥陀如来。","zh-hant":"日本淨土教圖像中的阿彌陀佛。",vi:"Phật A Di Đà trong hình tượng Tịnh độ Nhật Bản."},
vajrayana:{fr:"Iconographie et rituels du bouddhisme tantrique/Vajrayāna.",en:"Tantric/Vajrayana Buddhist iconography and ritual.",ko:"탄트라·금강승 불교의 도상과 의례.",ja:"密教・金剛乗仏教の図像と儀礼。","zh-hant":"密教／金剛乘佛教的圖像與儀軌。",vi:"Hình tượng và nghi lễ Phật giáo Mật thừa/Kim Cương thừa."},
special:{fr:"Geste spécialisé attesté dans des corpus iconographiques précis.",en:"Specialized gesture attested in specific iconographic corpora.",ko:"특정 도상 자료에서 확인되는 전문적 손짓.",ja:"特定の図像資料に確認される特殊な手勢。","zh-hant":"特定圖像資料中可見的專門手勢。",vi:"Thủ thế chuyên biệt được ghi nhận trong những corpus hình tượng cụ thể."},
kuhon:{fr:"Système japonais des neuf grades de renaissance d’Amida (九品印).",en:"Japanese system of Amida’s nine grades of rebirth (九品印).",ko:"아미타불 구품왕생을 손모양으로 구분한 일본의 九品印 체계.",ja:"阿弥陀の九品往生を手の形で表す日本の九品印体系。","zh-hant":"以手印表示阿彌陀九品往生的日本九品印體系。",vi:"Hệ Cửu phẩm ấn của Nhật Bản, biểu thị chín bậc vãng sinh của A Di Đà."},
mandala:{fr:"Pratique tibétaine d’offrande du maṇḍala, notamment avant ou après un enseignement.",en:"Tibetan mandala-offering practice, including before or after teachings.",ko:"가르침 전후 등에 행하는 티베트 만다라 공양 수행.",ja:"教えの前後などに行うチベットの曼荼羅供養。","zh-hant":"藏傳佛教中於教法前後等場合進行的曼荼羅供養。",vi:"Thực hành cúng dường maṇḍala của Phật giáo Tây Tạng, kể cả trước hoặc sau thời pháp."}
};

const GESTURE={
open:{fr:"Une main est levée, paume ouverte vers l’extérieur, doigts étendus.",en:"One hand is raised with the open palm facing outward and the fingers extended.",ko:"한 손을 들어 손바닥을 바깥쪽으로 향하고 손가락을 편다.",ja:"片手を上げ、掌を外側に向け、指を伸ばす。","zh-hant":"舉起一手，掌心向外，手指伸展。",vi:"Giơ một tay, lòng bàn tay hướng ra ngoài, các ngón duỗi."},
down:{fr:"La main est abaissée, paume tournée vers l’extérieur, doigts dirigés vers le bas.",en:"The hand is lowered, palm outward, with the fingers pointing down.",ko:"손을 내려 손바닥을 바깥으로 향하고 손가락은 아래로 뻗는다.",ja:"手を下げ、掌を外に向け、指先を下方へ伸ばす。","zh-hant":"手向下伸，掌心向外，手指指向下方。",vi:"Hạ tay xuống, lòng bàn tay hướng ra ngoài, các ngón chỉ xuống."},
earth:{fr:"La main droite passe devant le genou ; les doigts s’orientent vers la terre.",en:"The right hand reaches across the knee, with the fingers directed toward the earth.",ko:"오른손을 무릎 앞으로 내려 손가락이 땅을 향하게 한다.",ja:"右手を膝前へ下ろし、指先を大地へ向ける。","zh-hant":"右手越過膝前下垂，手指指向大地。",vi:"Tay phải đưa qua đầu gối, các ngón hướng xuống đất."},
meditation:{fr:"Les deux mains reposent dans le giron, paumes vers le haut, l’une sur l’autre.",en:"Both hands rest in the lap, palms upward, one placed over the other.",ko:"두 손을 무릎 위에 포개고 손바닥을 위로 향한다.",ja:"両手を膝上で重ね、掌を上に向ける。","zh-hant":"雙手置於膝上相疊，掌心向上。",vi:"Hai tay đặt trong lòng, lòng bàn tay ngửa, tay này chồng lên tay kia."},
teaching:{fr:"Les deux mains se tiennent devant la poitrine ; pouce et index dessinent un cercle.",en:"Both hands are held before the chest; thumb and index finger form a circle.",ko:"두 손을 가슴 앞에 두고 엄지와 검지가 원을 이룬다.",ja:"両手を胸前に置き、親指と人差し指で輪を作る。","zh-hant":"雙手置於胸前，拇指與食指相接成圓。",vi:"Hai tay đặt trước ngực; ngón cái và ngón trỏ chạm nhau thành vòng tròn."},
circle:{fr:"Une main est levée ; le pouce et l’index se rejoignent en cercle, les autres doigts restent étendus.",en:"One hand is raised; thumb and index finger meet in a circle while the other fingers remain extended.",ko:"한 손을 들고 엄지와 검지를 맞대어 원을 만들며 나머지 손가락은 편다.",ja:"片手を上げ、親指と人差し指で輪を作り、他の指を伸ばす。","zh-hant":"舉起一手，拇指與食指相接成圓，其餘手指伸展。",vi:"Giơ một tay; ngón cái và ngón trỏ chạm nhau thành vòng tròn, các ngón khác duỗi."},
prayer:{fr:"Les deux paumes se rejoignent devant la poitrine ; dans certaines traditions, un léger espace est conservé entre elles.",en:"The palms meet before the chest; in some traditions a small hollow is kept between them.",ko:"두 손바닥을 가슴 앞에서 합장하며, 전승에 따라 손바닥 사이에 작은 공간을 둔다.",ja:"胸前で両掌を合わせ、伝承によっては掌の間にわずかな空間を残す。","zh-hant":"雙掌於胸前相合；部分傳統會在掌心之間留有空隙。",vi:"Hai lòng bàn tay chắp trước ngực; trong một số truyền thống để một khoảng rỗng nhỏ giữa hai lòng bàn tay."},
raigo:{fr:"Une main est levée et l’autre abaissée ; pouce et doigt associé se rejoignent en cercle.",en:"One hand is raised and the other lowered; thumb and the selected finger meet in a circle.",ko:"한 손은 들고 다른 손은 내리며 엄지와 정해진 손가락을 맞대어 원을 만든다.",ja:"一方の手を上げ、他方を下げ、親指と所定の指で輪を作る。","zh-hant":"一手上舉、一手下垂，拇指與指定手指相接成圓。",vi:"Một tay giơ lên, tay kia hạ xuống; ngón cái chạm ngón quy định thành vòng tròn."},
miracle:{fr:"La main ouverte est tenue légèrement à l’écart du corps, doigts orientés vers le haut.",en:"The open hand is held slightly away from the body, with the fingers pointing upward.",ko:"편 손을 몸 옆으로 약간 벌려 손가락을 위로 향하게 한다.",ja:"開いた手を身体の横へやや離して置き、指先を上に向ける。","zh-hant":"張開的手稍離身體，手指向上。",vi:"Bàn tay mở được đưa hơi ra khỏi thân, các ngón hướng lên."},
wisdom:{fr:"Un index vertical est entièrement enveloppé par l’autre main fermée.",en:"One upright index finger is completely enclosed by the other hand.",ko:"세운 검지를 다른 손으로 완전히 감싼다.",ja:"立てた人差し指をもう一方の拳で包み込む。","zh-hant":"一手食指豎起，另一手拳將其完全包覆。",vi:"Một ngón trỏ dựng thẳng được bàn tay kia nắm bao quanh."},
cross:{fr:"Les avant-bras se croisent devant la poitrine ; les mains peuvent tenir le vajra et la cloche.",en:"The forearms cross before the chest; the hands may hold a vajra and bell.",ko:"두 팔을 가슴 앞에서 교차하며 손에는 금강저와 방울을 들 수 있다.",ja:"両前腕を胸前で交差し、金剛杵と鈴を持つことがある。","zh-hant":"雙前臂於胸前交叉，手中可持金剛杵與鈴。",vi:"Hai cẳng tay bắt chéo trước ngực; tay có thể cầm chày kim cương và chuông."},
interlock:{fr:"Les mains sont rapprochées devant la poitrine avec des doigts précisément entrelacés ou verrouillés.",en:"The hands meet before the chest with selected fingers precisely interlocked.",ko:"두 손을 가슴 앞에서 맞대어 지정된 손가락을 서로 걸어 잠근다.",ja:"胸前で両手を合わせ、所定の指を組み合わせて固定する。","zh-hant":"雙手於胸前相合，指定手指互相鉤合。",vi:"Hai tay gặp nhau trước ngực, các ngón được quy định đan hoặc móc chính xác."},
flame:{fr:"Les deux mains sont élevées vers le front, paumes tournées vers l’extérieur ; pouces et index se touchent.",en:"Both hands are raised toward the forehead, palms outward, with thumbs and index fingers touching.",ko:"두 손을 이마 쪽으로 들어 손바닥을 바깥으로 하고 엄지와 검지를 맞댄다.",ja:"両手を額の前に上げ、掌を外に向け、親指と人差し指を接する。","zh-hant":"雙手舉至額前，掌心向外，拇指與食指相接。",vi:"Hai tay đưa lên trán, lòng bàn tay hướng ra ngoài, ngón cái và ngón trỏ chạm nhau."},
nagaraja:{fr:"Les deux mains sont en poing au niveau du cœur, avec les deux index dressés verticalement.",en:"Both hands form fists at heart level, with both index fingers pointing straight upward.",ko:"두 손을 가슴 높이에서 주먹 쥐고 두 검지를 곧게 위로 세운다.",ja:"胸前で両手を拳にし、両人差し指をまっすぐ上に立てる。","zh-hant":"雙手於胸前握拳，兩根食指垂直向上。",vi:"Hai tay nắm lại ở ngang tim, hai ngón trỏ dựng thẳng lên."},
point:{fr:"La main forme un poing tandis que l’index pointe avec force vers l’extérieur.",en:"The hand forms a fist while the index finger points forcefully outward.",ko:"주먹을 쥔 채 검지를 강하게 바깥으로 뻗는다.",ja:"拳を作り、人差し指を力強く外方へ突き出す。","zh-hant":"手握拳，食指有力地向外指向。",vi:"Tay nắm lại, ngón trỏ chỉ mạnh ra ngoài."},
embrace:{fr:"Les bras se croisent ou s’ouvrent en geste d’étreinte, sans nécessairement tenir d’attribut.",en:"The arms cross or open in an embracing pose, without necessarily holding attributes.",ko:"두 팔을 교차하거나 포옹하듯 펼치며 반드시 지물을 들지는 않는다.",ja:"両腕を交差、または抱擁するように開き、必ずしも持物を伴わない。","zh-hant":"雙臂交叉或作環抱姿勢，不一定持有法器。",vi:"Hai tay bắt chéo hoặc mở như động tác ôm, không nhất thiết cầm pháp khí."},
mandala:{fr:"Les deux mains s’entrecroisent selon une configuration complexe ; les annulaires dressés figurent l’axe central du mont Meru.",en:"The hands interlace in a complex configuration; the raised ring fingers symbolize the central Mount Meru.",ko:"두 손가락을 복잡하게 교차하며 세운 약지가 중심 수미산을 상징한다.",ja:"両手の指を複雑に組み、立てた薬指で中央の須弥山を表す。","zh-hant":"雙手手指複雜交錯，豎起的無名指象徵中央須彌山。",vi:"Các ngón hai tay đan phức tạp; hai ngón áp út dựng lên tượng trưng núi Tu-di ở trung tâm."}
};

const sources={
met:{label:"The Metropolitan Museum of Art — Recognizing the Gods",url:"https://www.metmuseum.org/essays/recognizing-the-gods"},
smithMudra:{label:"National Museum of Asian Art — mudra glossary",url:"https://asia.si.edu/glossary/mudra/"},
smithAbhaya:{label:"National Museum of Asian Art — abhaya mudra",url:"https://asia.si.edu/glossary/abhaya-mudra/"},
smithEarth:{label:"National Museum of Asian Art — bhumisparsha mudra",url:"https://asia.si.edu/glossary/bhumisparsha-mudra/"},
har:{label:"Himalayan Art Resources — Hand Gestures & Mudras",url:"https://www.himalayanart.org/search/set.cfm?setID=2306"},
jaanus:{label:"JAANUS — Amida kubon-in / kuhon-in",url:"https://www.aisf.or.jp/~jaanus/deta/a/amidakubonin.htm"},
mandala:{label:"Study Buddhism — Mandala hand mudra",url:"https://studybuddhism.com/en/advanced-studies/prayers-rituals/preliminaries/explanation-of-the-six-preparatory-practices/six-preparatory-practices-the-last-two-practices"}
};

const entries=[
{id:"abhaya",canonical:"Abhaya-mudrā",names:{fr:"Geste d’absence de crainte",en:"Fearlessness gesture",ko:"시무외인 · 施無畏印",ja:"施無畏印 · semui-in","zh-hant":"施無畏印",vi:"Ấn vô úy"},category:"core",tradition:"pan",diagram:{kind:"open"},meaning:"fearlessness",gesture:"open",context:"shakyamuni",source:"smithAbhaya"},
{id:"varada",canonical:"Varada-mudrā",names:{fr:"Geste du don",en:"Gift-giving gesture",ko:"여원인 · 與願印",ja:"与願印 · yogan-in","zh-hant":"與願印",vi:"Ấn thí nguyện"},category:"core",tradition:"pan",diagram:{kind:"down"},meaning:"generosity",gesture:"down",context:"five",source:"met"},
{id:"bhumisparsha",canonical:"Bhūmisparśa-mudrā",names:{fr:"Prise de la terre à témoin",en:"Earth-touching gesture",ko:"촉지인 · 觸地印",ja:"触地印 · sokuchi-in","zh-hant":"觸地印",vi:"Ấn xúc địa"},category:"core",tradition:"pan",diagram:{kind:"earth"},meaning:"earth",gesture:"earth",context:"shakyamuni",source:"smithEarth"},
{id:"dhyana",canonical:"Dhyāna-mudrā",names:{fr:"Geste de méditation",en:"Meditation gesture",ko:"선정인 · 禪定印",ja:"禅定印 · zenjō-in","zh-hant":"禪定印",vi:"Ấn thiền định"},category:"core",tradition:"pan",diagram:{kind:"meditation"},meaning:"meditation",gesture:"meditation",context:"five",source:"met"},
{id:"dharmachakra",canonical:"Dharmacakra-mudrā",names:{fr:"Geste de la roue du Dharma",en:"Turning-the-Wheel gesture",ko:"전법륜인 · 轉法輪印",ja:"転法輪印 · tenbōrin-in","zh-hant":"轉法輪印",vi:"Ấn chuyển pháp luân"},category:"core",tradition:"mahayana",diagram:{kind:"teaching",finger:"index"},meaning:"wheel",gesture:"teaching",context:"teaching",source:"met"},
{id:"vitarka",canonical:"Vitarka / Vyākhyāna-mudrā",names:{fr:"Geste d’exposition de l’enseignement",en:"Teaching / discussion gesture",ko:"설법인 · 說法印",ja:"説法印 · seppō-in","zh-hant":"說法印",vi:"Ấn thuyết pháp"},category:"core",tradition:"mahayana",diagram:{kind:"circle",finger:"index"},meaning:"exposition",gesture:"circle",context:"teaching",source:"met"},
{id:"anjali",canonical:"Añjali-mudrā",names:{fr:"Geste d’hommage",en:"Gesture of reverence",ko:"합장인 · 合掌印",ja:"合掌印 · gasshō-in","zh-hant":"合掌印",vi:"Ấn hiệp chưởng"},category:"core",tradition:"pan",diagram:{kind:"prayer"},meaning:"reverence",gesture:"prayer",context:"shakyamuni",source:"har"},
{id:"raigo",canonical:"Raigō-in · 来迎印",names:{fr:"Geste d’accueil d’Amida",en:"Amida welcoming gesture",ko:"아미타불 영접 수인",ja:"来迎印 · raigō-in","zh-hant":"阿彌陀來迎印",vi:"Ấn tiếp dẫn của A Di Đà"},category:"regional",tradition:"japan",diagram:{kind:"raigo",finger:"index"},meaning:"welcome",gesture:"raigo",context:"amida",source:"jaanus"},
{id:"miracles",canonical:"Display of Miracles",names:{fr:"Geste de manifestation des miracles",en:"Display-of-Miracles gesture",ko:"신통 시현 수인",ja:"神変示現の手勢","zh-hant":"神變示現手勢",vi:"Thủ thế thị hiện thần thông"},category:"regional",tradition:"mahayana",diagram:{kind:"miracle"},meaning:"miracles",gesture:"miracle",context:"shakyamuni",source:"har"},
{id:"blessing",canonical:"Blessing / Explication",names:{fr:"Bénédiction / explication",en:"Blessing / explication gesture",ko:"가피·해설 수인",ja:"加持・解説の手勢","zh-hant":"加持／解說手勢",vi:"Thủ thế gia trì / giảng giải"},category:"regional",tradition:"vajrayana",diagram:{kind:"circle",finger:"index"},meaning:"blessing",gesture:"circle",context:"teaching",source:"har"},
{id:"mida-join",canonical:"Mida jō-in · 弥陀定印",names:{fr:"Sceau de méditation d’Amida",en:"Amida meditation seal",ko:"아미타 선정인",ja:"弥陀定印 · Mida jō-in","zh-hant":"阿彌陀定印",vi:"Ấn thiền định của A Di Đà"},category:"regional",tradition:"japan",diagram:{kind:"kuhon-meditation",finger:"index"},meaning:"amidaMeditation",gesture:"meditation",context:"amida",source:"jaanus"},
{id:"seppo-in",canonical:"Seppō-in · 説法印",names:{fr:"Sceau de prédication",en:"Preaching seal",ko:"설법인",ja:"説法印 · seppō-in","zh-hant":"說法印",vi:"Ấn thuyết pháp"},category:"regional",tradition:"japan",diagram:{kind:"teaching",finger:"index"},meaning:"preaching",gesture:"teaching",context:"amida",source:"jaanus"},
{id:"vajra-wisdom",canonical:"Vajra / Essence of Enlightenment",names:{fr:"Geste vajra de l’essence de l’Éveil",en:"Vajra / Essence-of-Enlightenment gesture",ko:"지권인 · 智拳印",ja:"智拳印 · chiken-in","zh-hant":"智拳印",vi:"Trí quyền ấn"},category:"tantric",tradition:"vajrayana",diagram:{kind:"wisdom"},meaning:"essence",gesture:"wisdom",context:"vajrayana",source:"har"},
{id:"vajra-embrace",canonical:"Vajra embrace / Vajrahūṃkāra",names:{fr:"Étreinte vajra",en:"Vajra-embrace gesture",ko:"금강 포옹 수인",ja:"金剛抱擁の印","zh-hant":"金剛抱持印",vi:"Ấn ôm kim cương"},category:"tantric",tradition:"vajrayana",diagram:{kind:"cross"},meaning:"vajraUnion",gesture:"cross",context:"vajrayana",source:"har"},
{id:"demon-subduing",canonical:"Demon-subduing gesture",names:{fr:"Geste de subjugation des démons",en:"Demon-subduing gesture",ko:"항마·조복 수인",ja:"降魔・調伏の手勢","zh-hant":"降魔／降伏手勢",vi:"Thủ thế hàng ma"},category:"tantric",tradition:"vajrayana",diagram:{kind:"interlock"},meaning:"subjugation",gesture:"interlock",context:"vajrayana",source:"har"},
{id:"flaming",canonical:"Flaming / Ḍākinī gesture",names:{fr:"Geste flamboyant / ḍākinī",en:"Flaming / dakini gesture",ko:"다키니 화염 수인",ja:"ダーキニーの火焔手勢","zh-hant":"空行母火焰手勢",vi:"Thủ thế lửa / ḍākinī"},category:"tantric",tradition:"vajrayana",diagram:{kind:"flame"},meaning:"flame",gesture:"flame",context:"vajrayana",source:"har"},
{id:"nagaraja",canonical:"Nāgarāja gesture",names:{fr:"Geste du Buddha Nāgarāja",en:"Nagaraja Buddha gesture",ko:"나가라자 불 수인",ja:"ナーガラージャ仏の印","zh-hant":"龍王佛手印",vi:"Thủ ấn Phật Nāgarāja"},category:"tantric",tradition:"vajrayana",diagram:{kind:"nagaraja"},meaning:"nagaraja",gesture:"nagaraja",context:"special",source:"har"},
{id:"tarjani",canonical:"Tarjanī / Wrathful pointing",names:{fr:"Geste de menace / pointage courroucé",en:"Wrathful pointing gesture",ko:"분노의 지시 수인",ja:"忿怒の指示手勢","zh-hant":"忿怒指示手勢",vi:"Thủ thế chỉ trỏ phẫn nộ"},category:"tantric",tradition:"vajrayana",diagram:{kind:"point"},meaning:"wrathful",gesture:"point",context:"special",source:"har"},
{id:"embrace",canonical:"Embracing gesture",names:{fr:"Geste d’étreinte",en:"Embracing gesture",ko:"포옹 수인",ja:"抱擁の手勢","zh-hant":"抱持手勢",vi:"Thủ thế ôm"},category:"tantric",tradition:"vajrayana",diagram:{kind:"embrace"},meaning:"embrace",gesture:"embrace",context:"vajrayana",source:"har"},
{id:"humkara",canonical:"Hūṃkāra gesture",names:{fr:"Geste Hūṃkāra",en:"Humkara gesture",ko:"훔카라 수인",ja:"フーンカーラの印","zh-hant":"吽迦羅手印",vi:"Thủ ấn Hūṃkāra"},category:"tantric",tradition:"vajrayana",diagram:{kind:"interlock"},meaning:"humkara",gesture:"interlock",context:"special",source:"har"},
{id:"mandala-offering",canonical:"Maṇḍala-offering mudrā",names:{fr:"Mudrā d’offrande du maṇḍala",en:"Mandala-offering mudra",ko:"만다라 공양 수인",ja:"曼荼羅供養の印","zh-hant":"曼荼羅供養手印",vi:"Thủ ấn cúng dường maṇḍala"},category:"tantric",tradition:"vajrayana",diagram:{kind:"mandala"},meaning:"mandala",gesture:"mandala",context:"mandala",source:"mandala"}
];

const gradeData=[
{g:"upper",b:"upper",jp:"上品上生",base:"meditation",finger:"index"},
{g:"upper",b:"middle",jp:"上品中生",base:"meditation",finger:"middle"},
{g:"upper",b:"lower",jp:"上品下生",base:"meditation",finger:"ring"},
{g:"middle",b:"upper",jp:"中品上生",base:"teaching",finger:"index"},
{g:"middle",b:"middle",jp:"中品中生",base:"teaching",finger:"middle"},
{g:"middle",b:"lower",jp:"中品下生",base:"teaching",finger:"ring"},
{g:"lower",b:"upper",jp:"下品上生",base:"raigo",finger:"index"},
{g:"lower",b:"middle",jp:"下品中生",base:"raigo",finger:"middle"},
{g:"lower",b:"lower",jp:"下品下生",base:"raigo",finger:"ring"}
];

const levels={
fr:{upper:"supérieur",middle:"moyen",lower:"inférieur",grade:"grade",birth:"naissance",name:"Amida kuhon-in"},
en:{upper:"upper",middle:"middle",lower:"lower",grade:"grade",birth:"birth",name:"Amida kuhon-in"},
ko:{upper:"상",middle:"중",lower:"하",grade:"품",birth:"생",name:"아미타 구품인"},
ja:{upper:"上",middle:"中",lower:"下",grade:"品",birth:"生",name:"阿弥陀九品印"},
"zh-hant":{upper:"上",middle:"中",lower:"下",grade:"品",birth:"生",name:"阿彌陀九品印"},
vi:{upper:"thượng",middle:"trung",lower:"hạ",grade:"phẩm",birth:"sinh",name:"Cửu phẩm ấn A Di Đà"}
};

function kuhonMeaning(g,b){
 const l=levels[locale];
 if(locale==="fr")return `Grade ${l[g]}, naissance ${l[b]} : l’un des neuf niveaux de renaissance dans la Terre pure d’Amida.`;
 if(locale==="en")return `${l[g][0].toUpperCase()+l[g].slice(1)} grade, ${l[b]} birth: one of the nine grades of rebirth in Amida's Pure Land.`;
 if(locale==="ko")return `${l[g]}${l.grade}${l[b]}${l.birth}: 아미타 정토의 구품왕생 가운데 하나.`;
 if(locale==="ja")return `${l[g]}${l.grade}${l[b]}${l.birth}：阿弥陀浄土への九品往生の一つ。`;
 if(locale==="zh-hant")return `${l[g]}${l.grade}${l[b]}${l.birth}：阿彌陀淨土九品往生之一。`;
 return `${l.grade} ${l[g]}, ${l.birth} ${l[b]}: một trong chín bậc vãng sinh về Tịnh độ A Di Đà.`;
}

function kuhonName(g,b,jp){
 const l=levels[locale];
 if(locale==="fr")return `Grade ${l[g]}, naissance ${l[b]}`;
 if(locale==="en")return `${l[g][0].toUpperCase()+l[g].slice(1)} grade, ${l[b]} birth`;
 if(locale==="ko")return `${l[g]}${l.grade}${l[b]}${l.birth}인`;
 if(locale==="ja")return `${jp}印`;
 if(locale==="zh-hant")return `${jp}印`;
 return `Ấn ${l[g]} ${l.grade}, ${l[b]} ${l.birth}`;
}

const kuhonRoman=[
 "jōbon jōshō-in","jōbon chūshō-in","jōbon geshō-in",
 "chūbon jōshō-in","chūbon chūshō-in","chūbon geshō-in",
 "gebon jōshō-in","gebon chūshō-in","gebon geshō-in"
];

gradeData.forEach((k,i)=>entries.push({
 id:`kuhon-${i+1}`,
 canonical:k.jp+"印",
 names:{fr:k.jp,en:k.jp,ko:k.jp,ja:k.jp,"zh-hant":k.jp,vi:k.jp},
 displayName:kuhonName(k.g,k.b,k.jp),
 traditional:k.jp+"印 · "+kuhonRoman[i],
 category:"pureland",
 tradition:"japan",
 diagram:{kind:`kuhon-${k.base}`,finger:k.finger},
 dynamicMeaning:()=>kuhonMeaning(k.g,k.b),
 gesture:k.base==="meditation"?"meditation":k.base==="teaching"?"teaching":"raigo",
 context:"kuhon",
 source:"jaanus"
}));


const openHand=(x,y,s=1,mirror=1,rotate=0,contact=null,back=false)=>{
  const cls=back?"mudra-hand-back":"mudra-hand";
  const tips={
    index:{x:-8,y:-84},
    middle:{x:14,y:-100},
    ring:{x:35,y:-91},
    little:{x:54,y:-68}
  };
  const p=tips[contact]||tips.index;
  const contactMarkup=contact
    ? '<path class="mudra-line" style="stroke:#9a8059;stroke-width:4.5" d="M-58 2 Q-42 -26 '+p.x+' '+p.y+'"/>'+
      '<circle class="mudra-contact" cx="-58" cy="2" r="6"/>'+
      '<circle class="mudra-contact" cx="'+p.x+'" cy="'+p.y+'" r="6"/>'
    : "";
  return '<g transform="translate('+x+' '+y+') rotate('+rotate+') scale('+(s*mirror)+' '+s+')">'+
    '<path class="mudra-wrist" d="M-27 72 L-26 48 C-17 43 18 43 31 49 L31 72 Z"/>'+
    '<path class="'+cls+'" d="M-27 51 C-38 35 -42 15 -38 -5 L-31 -58 C-29 -73 -18 -74 -15 -59 L-11 -17 L-8 -85 C-7 -102 5 -105 9 -87 L12 -15 L17 -98 C19 -116 32 -116 36 -96 L36 -13 L43 -88 C45 -104 58 -102 60 -84 L56 -8 L64 -68 C67 -82 79 -77 78 -62 L71 2 C69 21 64 39 52 54 C37 73 22 82 1 82 C-12 82 -21 68 -27 51 Z"/>'+
    '<path class="mudra-hand" d="M-34 7 C-43 0 -52 -2 -61 4 C-72 12 -70 25 -61 29 C-52 33 -45 26 -37 18 L-18 0"/>'+
    '<path class="mudra-crease" d="M-18 26 C-3 15 19 14 38 23 M-13 42 C4 34 22 35 38 43 M-3 55 C9 51 22 52 32 57"/>'+
    '<path class="mudra-joint" d="M-8 -45 L7 -45 M18 -55 L34 -55 M40 -47 L55 -47 M59 -32 L72 -31"/>'+
    (back
      ? '<ellipse class="mudra-nail" cx="-1" cy="-70" rx="6" ry="10"/><ellipse class="mudra-nail" cx="27" cy="-82" rx="6" ry="10"/><ellipse class="mudra-nail" cx="50" cy="-72" rx="5.5" ry="9"/>'
      : '<path class="mudra-crease" d="M-22 12 C-11 2 -2 -4 7 -5"/>')+
    contactMarkup+
  '</g>';
};

const fist=(x,y,s=1,mirror=1,index=false,rotate=0)=>{
  return '<g transform="translate('+x+' '+y+') rotate('+rotate+') scale('+(s*mirror)+' '+s+')">'+
    '<path class="mudra-wrist" d="M-31 54 L-28 31 L29 31 L34 56 Z"/>'+
    '<path class="mudra-hand" d="M-34 26 C-40 9 -36 -8 -24 -18 C-12 -28 4 -30 20 -26 C36 -22 46 -12 45 2 C44 16 38 27 30 35 C18 47 -20 47 -34 26 Z"/>'+
    '<path class="mudra-hand-back" d="M-26 -13 C-17 -24 -7 -24 1 -17 C8 -26 19 -25 26 -18 C35 -22 44 -16 44 -7 C44 3 37 9 29 12 L-18 12 C-27 8 -31 0 -26 -13 Z"/>'+
    '<path class="mudra-joint" d="M-18 -10 L-17 8 M1 -13 L1 9 M20 -11 L19 9 M35 -5 L32 10"/>'+
    '<path class="mudra-crease" d="M-24 19 C-5 13 14 14 30 21"/>'+
    (index
      ? '<path class="mudra-hand" d="M-9 -18 L-8 -86 C-8 -103 5 -105 9 -88 L12 -18 Z"/><path class="mudra-joint" d="M-7 -54 L10 -54"/>'
      : "")+
  '</g>';
};

const sideHand=(x,y,s=1,mirror=1,rotate=0)=>{
  return '<g transform="translate('+x+' '+y+') rotate('+rotate+') scale('+(s*mirror)+' '+s+')">'+
   '<path class="mudra-wrist" d="M-19 68 L-18 45 L18 45 L20 68 Z"/>'+
   '<path class="mudra-hand" d="M-18 47 C-23 28 -22 5 -18 -18 L-11 -83 C-9 -99 4 -99 7 -83 L11 -31 L15 -88 C17 -102 29 -99 30 -84 L28 -20 L34 -71 C36 -84 47 -81 47 -67 L43 -8 C42 15 38 35 29 50 C20 64 -11 64 -18 47 Z"/>'+
   '<path class="mudra-hand" d="M-14 10 C-28 4 -34 12 -31 22 C-29 31 -20 32 -11 26 L5 15"/>'+
   '<path class="mudra-crease" d="M-10 31 C1 25 13 25 24 31"/>'+
  '</g>';
};

const cuppedHand=(x,y,s=1,mirror=1,upper=false)=>{
 return '<g transform="translate('+x+' '+y+') scale('+(s*mirror)+' '+s+')">'+
  '<path class="mudra-wrist" d="M-78 20 L-58 8 L-42 35 L-64 47 Z"/>'+
  '<path class="mudra-hand" d="M-60 8 C-40 -4 -17 -10 7 -9 L70 -7 C88 -6 91 7 74 11 L28 18 L78 23 C95 25 95 39 77 42 L9 41 C-13 41 -35 36 -55 27 C-67 22 -70 14 -60 8 Z"/>'+
  '<path class="mudra-hand" d="M-37 7 C-27 -7 -15 -18 -3 -23 C7 -27 14 -20 10 -11 L-1 7"/>'+
  '<path class="mudra-crease" d="M-24 20 C2 12 31 13 55 20 M-18 30 C4 25 27 26 47 31"/>'+
  (upper?'<path class="mudra-guide" d="M-46 0 Q0 -20 54 -5"/>':'')+
 '</g>';
};

const interlockedHands=(x,y,s=1)=>{
 let fingers="";
 const xs=[-42,-18,6,30];
 xs.forEach((px,i)=>{
   fingers+='<rect class="'+(i%2===0?'mudra-hand':'mudra-hand-back')+'" x="'+px+'" y="'+(-58+i*4)+'" width="17" height="78" rx="8" transform="rotate('+(i%2===0?10:-10)+' '+(px+8)+' -18)"/>';
   fingers+='<rect class="'+(i%2===0?'mudra-hand-back':'mudra-hand')+'" x="'+(px+10)+'" y="-8" width="17" height="78" rx="8" transform="rotate('+(i%2===0?-12:12)+' '+(px+18)+' 25)"/>';
 });
 return '<g transform="translate('+x+' '+y+') scale('+s+')">'+
   '<path class="mudra-wrist" d="M-78 50 L-55 25 L-23 47 L-43 69 Z"/>'+
   '<path class="mudra-wrist" d="M78 50 L55 25 L23 47 L43 69 Z"/>'+
   fingers+
   '<path class="mudra-crease" d="M-55 22 Q0 52 55 22"/>'+
 '</g>';
};

function svg(body){
 return '<svg viewBox="0 0 300 250" aria-hidden="true" focusable="false">'+body+'</svg>';
}

function renderDiagram(d){
 const f=d.finger||"index";
 if(d.kind==="open")return svg(openHand(150,126,1.05,1,0,null,false));
 if(d.kind==="down")return svg(openHand(150,126,1.05,1,180,null,false));
 if(d.kind==="earth")return svg(
   '<path class="mudra-guide" d="M28 211 H272"/>'+
   '<path class="mudra-arrow" d="M248 205 l13 6 -13 6 z"/>'+
   openHand(168,128,.92,1,145,null,false)
 );
 if(d.kind==="circle")return svg(openHand(150,127,1.03,1,0,f,false));
 if(d.kind==="miracle")return svg(openHand(151,130,1.0,1,-16,null,false));
 if(d.kind==="prayer")return svg(
   sideHand(126,126,.92,1,-3)+
   sideHand(174,126,.92,-1,3)+
   '<path class="mudra-guide" d="M150 45 V198"/>'+
   '<circle class="mudra-contact" cx="150" cy="114" r="6"/>'
 );
 if(d.kind==="meditation"||d.kind==="kuhon-meditation"){
   const contact=d.kind==="kuhon-meditation"?f:null;
   const cx=contact==="index"?118:contact==="middle"?150:182;
   return svg(
     cuppedHand(134,130,.80,1,false)+
     cuppedHand(166,147,.80,-1,true)+
     (contact?'<circle class="mudra-contact" cx="'+cx+'" cy="143" r="7"/><circle class="mudra-contact" cx="'+(300-cx)+'" cy="143" r="7"/>':"")
   );
 }
 if(d.kind==="teaching"||d.kind==="kuhon-teaching")return svg(
   openHand(105,135,.78,1,-12,f,false)+
   openHand(195,135,.78,-1,12,f,false)+
   '<path class="mudra-guide" d="M138 122 Q150 110 162 122"/>'
 );
 if(d.kind==="raigo"||d.kind==="kuhon-raigo")return svg(
   openHand(105,100,.76,1,-7,f,false)+
   openHand(203,163,.72,1,165,f,false)+
   '<path class="mudra-guide" d="M145 112 Q172 132 187 150"/>'
 );
 if(d.kind==="wisdom")return svg(
   fist(140,157,.96,1,true,0)+
   fist(166,158,.80,-1,false,0)+
   '<circle class="mudra-contact" cx="144" cy="73" r="7"/>'
 );
 if(d.kind==="cross")return svg(
   '<path class="mudra-wrist" d="M46 204 L91 155 L115 178 L70 224 Z"/>'+
   '<path class="mudra-wrist" d="M254 204 L209 155 L185 178 L230 224 Z"/>'+
   fist(203,98,.62,1,false,-38)+
   fist(97,98,.62,-1,false,38)+
   '<path class="mudra-guide" d="M82 184 L218 55 M218 184 L82 55"/>'
 );
 if(d.kind==="interlock")return svg(
   interlockedHands(150,137,1.02)+
   '<circle class="mudra-contact" cx="150" cy="132" r="7"/>'
 );
 if(d.kind==="flame")return svg(
   openHand(109,142,.72,1,-9,"index",false)+
   openHand(191,142,.72,-1,9,"index",false)+
   '<path class="mudra-line" style="fill:#f4e7d5;stroke:#9a8059" d="M150 34 C132 58 137 72 150 88 C167 68 166 51 150 34 Z"/>'
 );
 if(d.kind==="nagaraja")return svg(
   fist(111,162,.82,1,true,0)+
   fist(189,162,.82,-1,true,0)+
   '<path class="mudra-guide" d="M150 55 V185"/>'
 );
 if(d.kind==="point")return svg(
   fist(151,134,1.02,1,true,86)+
   '<path class="mudra-arrow" d="M260 121 l17 9 -17 9 z"/>'
 );
 if(d.kind==="embrace")return svg(
   '<path class="mudra-wrist" d="M35 214 Q78 150 135 100 L151 122 Q94 169 58 230 Z"/>'+
   '<path class="mudra-wrist" d="M265 214 Q222 150 165 100 L149 122 Q206 169 242 230 Z"/>'+
   openHand(186,90,.50,1,56,null,false)+
   openHand(114,90,.50,-1,-56,null,false)
 );
 if(d.kind==="mandala")return svg(
   interlockedHands(150,150,.92)+
   '<path class="mudra-hand" d="M132 142 L137 58 C138 43 149 42 151 58 L151 142 Z"/>'+
   '<path class="mudra-hand" d="M149 142 L153 58 C154 43 165 43 166 59 L165 142 Z"/>'+
   '<circle class="mudra-contact" cx="150" cy="143" r="7"/>'
 );
 return svg(openHand(150,126,1.05,1,0,null,false));
}

const traditionalTerms={
 abhaya:"Abhaya-mudrā",
 varada:"Varada-mudrā",
 bhumisparsha:"Bhūmisparśa-mudrā",
 dhyana:"Dhyāna-mudrā",
 dharmachakra:"Dharmacakra-mudrā",
 vitarka:"Vitarka-mudrā · Vyākhyāna-mudrā",
 anjali:"Añjali-mudrā",
 raigo:"来迎印 · raigō-in",
 "mida-join":"弥陀定印 · mida-no-jōin",
 "seppo-in":"説法印 · seppō-in",
 "vajra-wisdom":"智拳印 · chiken-in",
 "vajra-embrace":"Vajrahūṃkāra",
 tarjani:"Tarjanī-mudrā",
 humkara:"Hūṃkāra",
 "mandala-offering":"Maṇḍala-mudrā"
};
function traditionalTerm(e){return e.traditional||traditionalTerms[e.id]||"";}
function localName(e){return e.displayName||e.names[locale]||e.canonical;}
function meaning(e){return e.dynamicMeaning?e.dynamicMeaning():(TEXT[e.meaning]?.[locale]||"");}
function gesture(e){return GESTURE[e.gesture]?.[locale]||"";}
function context(e){return CONTEXT[e.context]?.[locale]||"";}
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const norm=s=>String(s??"").toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’ʻʼ]/g,"'").trim();

root.innerHTML=`
<div class="mudra-toolbar">
<label class="mudra-control"><span>${UI.search}</span><input id="mudra-search" type="search" autocomplete="off" placeholder="${UI.placeholder}"></label>
<label class="mudra-control"><span>${UI.category}</span><select id="mudra-category"><option value="">${UI.all}</option>${Object.entries(UI.cats).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></label>
<label class="mudra-control"><span>${UI.tradition}</span><select id="mudra-tradition"><option value="">${UI.all}</option>${Object.entries(UI.trad).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></label>
<button class="mudra-reset" id="mudra-reset" type="button">${UI.reset}</button>
</div>
<div class="mudra-results-head"><div class="mudra-count" id="mudra-count"></div><div class="mudra-legend">${UI.legend}</div></div>
<div class="mudra-grid" id="mudra-grid"></div>
<div class="mudra-empty" id="mudra-empty" hidden>${UI.empty}</div>
<p class="mudra-source-note">${UI.sourceNote}</p>
<dialog class="mudra-dialog" id="mudra-dialog"><div id="mudra-dialog-content"></div></dialog>
`;

const search=document.getElementById("mudra-search");
const category=document.getElementById("mudra-category");
const tradition=document.getElementById("mudra-tradition");
const reset=document.getElementById("mudra-reset");
const grid=document.getElementById("mudra-grid");
const count=document.getElementById("mudra-count");
const empty=document.getElementById("mudra-empty");
const dialog=document.getElementById("mudra-dialog");
const dialogContent=document.getElementById("mudra-dialog-content");

function showEntry(index){
 const e=entries[index];
 const s=sources[e.source];
 dialogContent.innerHTML=`<div class="mudra-dialog-shell">
 <button class="mudra-dialog-close" type="button" aria-label="${UI.close}">×</button>
 <div class="mudra-dialog-visual">${renderDiagram(e.diagram)}</div>
 <div class="mudra-dialog-copy">
  <div class="mudra-dialog-kicker">${UI.cats[e.category]} · ${UI.trad[e.tradition]}</div>
  <h2>${esc(localName(e))}</h2>
  ${traditionalTerm(e)?`<p class="mudra-dialog-local">${esc(traditionalTerm(e))}</p>`:""}
  <div class="mudra-detail-row"><span class="mudra-detail-label">${UI.meaning}</span><p>${esc(meaning(e))}</p></div>
  <div class="mudra-detail-row"><span class="mudra-detail-label">${UI.gesture}</span><p>${esc(gesture(e))}</p></div>
  <div class="mudra-detail-row"><span class="mudra-detail-label">${UI.context}</span><p>${esc(context(e))}</p></div>
  <div class="mudra-detail-row mudra-source"><span class="mudra-detail-label">${UI.source}</span><p><a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></p></div>
 </div></div>`;
 dialogContent.querySelector(".mudra-dialog-close").addEventListener("click",()=>dialog.close());
 dialog.showModal();
}
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});

function render(list){
 grid.innerHTML=list.map(({e,index},i)=>`<button class="mudra-card" type="button" data-index="${index}">
  <div class="mudra-figure">${renderDiagram(e.diagram)}</div>
  <div class="mudra-card-body">
   <div class="mudra-card-top"><div><h2>${esc(localName(e))}</h2>${traditionalTerm(e)?`<p class="mudra-local-name">${esc(traditionalTerm(e))}</p>`:""}</div><span class="mudra-number">${String(index+1).padStart(2,"0")}</span></div>
   <p class="mudra-meaning">${esc(meaning(e))}</p>
   <div class="mudra-tags"><span class="mudra-tag">${UI.cats[e.category]}</span><span class="mudra-tag">${UI.trad[e.tradition]}</span></div>
   <div class="mudra-open">${UI.open} →</div>
  </div>
 </button>`).join("");
 grid.querySelectorAll(".mudra-card").forEach(card=>card.addEventListener("click",()=>showEntry(Number(card.dataset.index))));
 count.textContent=list.length===1?UI.one:UI.many.replace("{n}",String(list.length));
 empty.hidden=list.length!==0;
 grid.hidden=list.length===0;
}

function apply(){
 const q=norm(search.value);
 const cat=category.value;
 const tr=tradition.value;
 const list=entries.map((e,index)=>({e,index})).filter(({e})=>{
   if(cat&&e.category!==cat)return false;
   if(tr&&e.tradition!==tr)return false;
   if(!q)return true;
   const hay=[e.canonical,localName(e),traditionalTerm(e),meaning(e),gesture(e),context(e),UI.cats[e.category],UI.trad[e.tradition]].map(norm).join(" ");
   return hay.includes(q);
 });
 render(list);
}
search.addEventListener("input",apply);
category.addEventListener("change",apply);
tradition.addEventListener("change",apply);
reset.addEventListener("click",()=>{search.value="";category.value="";tradition.value="";apply();search.focus();});
render(entries.map((e,index)=>({e,index})));
})();