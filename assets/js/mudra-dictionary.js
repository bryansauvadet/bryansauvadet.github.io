(() => {
"use strict";
const root=document.getElementById("mudra-dictionary");
if(!root)return;
const locale=root.dataset.locale||"fr";

const UI={
fr:{search:"Recherche",placeholder:"Nom, signification, contexte…",category:"Catégorie",tradition:"Tradition",all:"Tous",reset:"Réinitialiser",one:"1 mudrā",many:"{n} mudrā",open:"Voir la fiche",meaning:"Signification",gesture:"Description du geste",context:"Contexte iconographique",source:"Source de référence",close:"Fermer",legend:"30 fiches · noms multilingues · exemples iconographiques",empty:"Aucun mudrā ne correspond à ces filtres.",sourceNote:"Terminologie et formes varient selon les corpus. Les fiches distinguent les gestes iconographiques généraux, les usages tantriques et les systèmes régionaux japonais.",cats:{core:"Fondamental",regional:"Asie orientale",tantric:"Tantrique / Vajrayāna",pureland:"Amida · 九品印"},trad:{pan:"Bouddhisme ancien / Mahāyāna",mahayana:"Mahāyāna",vajrayana:"Vajrayāna",japan:"Japon · Terre pure"}},
en:{search:"Search",placeholder:"Name, meaning, context…",category:"Category",tradition:"Tradition",all:"All",reset:"Reset",one:"1 mudra",many:"{n} mudras",open:"View entry",meaning:"Meaning",gesture:"Gesture description",context:"Iconographic context",source:"Reference source",close:"Close",legend:"30 entries · multilingual names · iconographic examples",empty:"No mudra matches these filters.",sourceNote:"Terminology and forms vary across corpora. Entries distinguish general iconographic gestures, tantric uses, and regional Japanese systems.",cats:{core:"Foundational",regional:"East Asian",tantric:"Tantric / Vajrayana",pureland:"Amida · 九品印"},trad:{pan:"Early Buddhism / Mahayana",mahayana:"Mahayana",vajrayana:"Vajrayana",japan:"Japan · Pure Land"}},
ko:{search:"검색",placeholder:"명칭, 의미, 도상 맥락…",category:"분류",tradition:"전통",all:"전체",reset:"초기화",one:"1개 수인",many:"{n}개 수인",open:"상세 보기",meaning:"의미",gesture:"손 자세",context:"도상적 맥락",source:"참고 자료",close:"닫기",legend:"30개 항목 · 다국어 명칭 · 도상 예시",empty:"조건에 맞는 수인이 없습니다.",sourceNote:"명칭과 형태는 자료와 전승에 따라 달라질 수 있습니다. 이 사전은 일반 도상 수인, 탄트라 계통의 용례, 일본의 지역적 체계를 구분합니다.",cats:{core:"기본 도상",regional:"동아시아",tantric:"밀교 / 금강승",pureland:"아미타 · 九品印"},trad:{pan:"초기불교 / 대승",mahayana:"대승불교",vajrayana:"금강승",japan:"일본 · 정토교"}},
ja:{search:"検索",placeholder:"名称・意味・図像文脈…",category:"分類",tradition:"伝統",all:"すべて",reset:"リセット",one:"1件",many:"{n}件",open:"詳細を見る",meaning:"意味",gesture:"手の形",context:"図像上の文脈",source:"参考資料",close:"閉じる",legend:"30項目 · 多言語名称 · 図像例",empty:"条件に一致する印相はありません。",sourceNote:"名称と形は資料・伝承によって異なります。本辞典では一般的な図像の印相、密教的用法、日本の地域的体系を区別しています。",cats:{core:"基本図像",regional:"東アジア",tantric:"密教 / 金剛乗",pureland:"阿弥陀 · 九品印"},trad:{pan:"初期仏教 / 大乗",mahayana:"大乗仏教",vajrayana:"金剛乗",japan:"日本 · 浄土教"}},
"zh-hant":{search:"搜尋",placeholder:"名稱、意義、圖像脈絡…",category:"類別",tradition:"傳統",all:"全部",reset:"重設",one:"1種手印",many:"{n}種手印",open:"查看條目",meaning:"意義",gesture:"手勢說明",context:"圖像脈絡",source:"參考資料",close:"關閉",legend:"30個條目 · 多語名稱 · 圖像實例",empty:"沒有符合條件的手印。",sourceNote:"名稱與形式可能隨文獻與傳承而異。本辭典區分一般圖像手印、密教用法與日本地區性體系。",cats:{core:"基本圖像",regional:"東亞",tantric:"密教 / 金剛乘",pureland:"阿彌陀 · 九品印"},trad:{pan:"早期佛教 / 大乘",mahayana:"大乘佛教",vajrayana:"金剛乘",japan:"日本 · 淨土教"}},
vi:{search:"Tìm kiếm",placeholder:"Tên, ý nghĩa, bối cảnh…",category:"Phân loại",tradition:"Truyền thống",all:"Tất cả",reset:"Đặt lại",one:"1 thủ ấn",many:"{n} thủ ấn",open:"Xem chi tiết",meaning:"Ý nghĩa",gesture:"Mô tả thủ thế",context:"Bối cảnh hình tượng",source:"Nguồn tham khảo",close:"Đóng",legend:"30 mục · tên đa ngôn ngữ · ví dụ hình tượng",empty:"Không có thủ ấn phù hợp với bộ lọc.",sourceNote:"Thuật ngữ và hình thức có thể thay đổi theo văn bản và truyền thừa. Từ điển phân biệt các thủ ấn hình tượng phổ quát, cách dùng Mật giáo và các hệ thống khu vực của Nhật Bản.",cats:{core:"Căn bản",regional:"Đông Á",tantric:"Mật giáo / Kim Cương thừa",pureland:"A Di Đà · 九品印"},trad:{pan:"Phật giáo sớm / Đại thừa",mahayana:"Đại thừa",vajrayana:"Kim Cương thừa",japan:"Nhật Bản · Tịnh độ"}}
}[locale]||null;
const PHOTO_UI={
fr:{source:"Wikimedia Commons · image libre / domaine public",note:"Recadrage visuel pour mettre le geste en évidence. La licence et l’attribution exactes sont indiquées sur la fiche source."},
en:{source:"Wikimedia Commons · freely licensed / public domain",note:"The image is visually cropped to emphasize the gesture. Exact licence and attribution are provided on the source page."},
ko:{source:"Wikimedia Commons · 자유 이용 / 퍼블릭 도메인",note:"수인을 명확히 보기 위해 화면상 확대·재구성했습니다. 정확한 라이선스와 출처 표기는 원본 파일 페이지에서 확인할 수 있습니다."},
ja:{source:"Wikimedia Commons · 自由利用／パブリックドメイン",note:"印相を見やすくするため画面上でトリミング・拡大しています。正確なライセンスと帰属表示は元ファイルのページに記載されています。"},
"zh-hant":{source:"Wikimedia Commons · 自由授權／公有領域",note:"畫面經裁切放大以突顯手印。確切授權與署名資訊請參閱原始檔案頁面。"},
vi:{source:"Wikimedia Commons · giấy phép tự do / phạm vi công cộng",note:"Ảnh được cắt và phóng trên màn hình để nhấn mạnh thủ ấn. Giấy phép và thông tin ghi công chính xác nằm trên trang nguồn."}
}[locale];


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

const L=(fr,en,ko,ja,zh,vi)=>({fr,en,ko,ja,"zh-hant":zh,vi});

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


function replaceEntry(id,data){
 const i=entries.findIndex(e=>e.id===id);
 if(i>=0) entries[i]={...entries[i],...data};
}

replaceEntry("miracles",{canonical:"Prātihārya-mudrā"});
replaceEntry("blessing",{canonical:"Vyākhyāna-mudrā"});
replaceEntry("mida-join",{canonical:"弥陀定印 · Mida jō-in"});
replaceEntry("seppo-in",{canonical:"説法印 · Seppō-in"});
replaceEntry("vajra-wisdom",{canonical:"Bodhyaṅgī-mudrā · 智拳印"});
replaceEntry("vajra-embrace",{canonical:"Vajrahūṃkāra-mudrā"});
replaceEntry("demon-subduing",{canonical:"Bhūtadāmara-mudrā"});
replaceEntry("tarjani",{canonical:"Tarjanī-mudrā"});
replaceEntry("mandala-offering",{canonical:"Maṇḍala-mudrā"});

// Replace entries whose previous labels were too speculative for a photographic database.
replaceEntry("raigo",{
 canonical:"Pṛthvī-mudrā",
 names:L("Geste de la terre","Earth gesture","지인 · 地印","地印 · chi-in","地印","Địa ấn"),
 displayName:null, category:"regional", tradition:"vajrayana",
 meaningText:L("Stabilité, enracinement et contact avec l’élément terre.","Stability, grounding, and connection with the earth element.","안정·기반·대지 요소와의 연결.","安定・大地との結びつき。","穩定、扎根與大地元素的連結。","Sự ổn định, tiếp đất và liên hệ với yếu tố đất."),
 gestureText:L("Le pouce et l’annulaire se rejoignent tandis que les autres doigts restent étendus.","Thumb and ring finger meet while the other fingers remain extended.","엄지와 약지를 맞대고 나머지 손가락은 편다.","親指と薬指を合わせ、他の指を伸ばす。","拇指與無名指相接，其餘手指伸展。","Ngón cái chạm ngón áp út, các ngón còn lại duỗi."),
 contextText:L("Geste attesté dans des contextes bouddhiques himalayens et dans des pratiques méditatives indiennes.","Attested in Himalayan Buddhist contexts and Indian meditative practice.","히말라야 불교와 인도 명상 전통에서 확인된다.","ヒマラヤ仏教とインドの瞑想実践に見られる。","見於喜馬拉雅佛教與印度冥想實踐。","Gặp trong bối cảnh Phật giáo Himalaya và thực hành thiền Ấn Độ.")
});
replaceEntry("flaming",{
 canonical:"Karaṇa-mudrā",
 names:L("Geste d’expulsion des obstacles","Gesture for dispelling obstacles","가라나 수인","迦羅拏印 · karana-in","迦羅拏印","Karaṇa ấn"),
 displayName:null, category:"tantric", tradition:"vajrayana",
 meaningText:L("Éloignement des obstacles et des influences nuisibles.","Dispelling obstacles and harmful influences.","장애와 해로운 영향을 물리침.","障碍や有害な影響を退ける。","驅除障礙與有害影響。","Xua đuổi chướng ngại và ảnh hưởng bất lợi."),
 gestureText:L("L’index et l’auriculaire sont dressés ; les autres doigts sont repliés selon la variante.","Index and little finger are raised while the other fingers fold according to the variant.","검지와 새끼손가락을 세우고 나머지 손가락은 접는다.","人差し指と小指を立て、他の指を折る。","食指與小指豎起，其餘手指屈曲。","Ngón trỏ và ngón út dựng lên, các ngón khác gập lại."),
 contextText:L("Fréquent dans l’iconographie protectrice et courroucée du bouddhisme tantrique.","Common in protective and wrathful tantric Buddhist iconography.","밀교의 수호·분노존 도상에 자주 나타난다.","密教の守護尊・忿怒尊図像に多い。","常見於密教護法與忿怒尊圖像。","Thường gặp trong hình tượng hộ pháp và phẫn nộ tôn Mật giáo.")
});
replaceEntry("nagaraja",{
 canonical:"Buddhaśramaṇa-mudrā",
 names:L("Geste du renonçant bouddhique","Buddhist ascetic gesture","불교 수행자 수인","仏教沙門印","佛教沙門印","Ấn sa-môn Phật giáo"),
 displayName:null, category:"regional", tradition:"mahayana",
 meaningText:L("Geste associé à la figure du renonçant et à certains bodhisattva.","Gesture associated with the renunciant and certain bodhisattvas.","출가 수행자와 일부 보살의 도상에 관련된다.","出家修行者や一部の菩薩に結びつく。","與出家修行者及部分菩薩相關。","Gắn với hình tượng người xuất gia và một số Bồ-tát."),
 gestureText:L("La main est levée près de la tête, paume tournée vers le haut, doigts joints et étendus.","The hand is raised near the head, palm upward, fingers extended and joined.","손을 머리 가까이 들고 손바닥을 위로 향하며 손가락을 모아 편다.","手を頭部近くに上げ、掌を上へ向け、指をそろえて伸ばす。","手舉至頭部附近，掌心向上，手指併攏伸展。","Tay giơ gần đầu, lòng bàn tay hướng lên, các ngón duỗi và khép."),
 contextText:L("Attesté notamment dans l’iconographie népalaise de Vasudhārā et d’autres figures mahāyāna.","Attested especially in Nepalese images of Vasudhara and other Mahayana figures.","특히 네팔의 바수다라 및 대승 도상에서 확인된다.","特にネパールのヴァスダーラーなどの大乗図像に見られる。","尤見於尼泊爾財續母等大乘圖像。","Đặc biệt gặp trong hình tượng Vasudhārā Nepal và các hình tượng Đại thừa.")
});
replaceEntry("embrace",{
 canonical:"Mettākaruṇā-mudrā",
 names:L("Geste de bienveillance et compassion","Loving-kindness and compassion gesture","자비 수인","慈悲印","慈悲印","Từ bi ấn"),
 displayName:null, category:"regional", tradition:"mahayana",
 meaningText:L("Bienveillance (maitrī/metta) et compassion (karuṇā).","Loving-kindness (maitri/metta) and compassion (karuna).","자애와 자비.","慈愛と慈悲。","慈愛與慈悲。","Từ ái và từ bi."),
 gestureText:L("Les bras tombent de part et d’autre du corps ; les mains sont ouvertes, légèrement détachées, paumes vers l’intérieur.","The arms hang at the sides; hands are open, slightly away from the body, palms inward.","두 팔을 몸 옆에 내리고 손을 펴서 약간 벌리며 손바닥을 안쪽으로 향한다.","両腕を体側に下ろし、手を開いてやや離し、掌を内側へ向ける。","雙臂垂於身側，手掌張開稍離身體，掌心向內。","Hai tay buông hai bên thân, bàn tay mở và hơi tách khỏi cơ thể, lòng bàn tay hướng vào."),
 contextText:L("Particulièrement attesté dans la statuaire bouddhique d’Asie du Sud-Est.","Especially attested in Southeast Asian Buddhist sculpture.","동남아시아 불교 조각에서 특히 확인된다.","東南アジアの仏教彫刻に特に見られる。","尤見於東南亞佛教造像。","Đặc biệt gặp trong điêu khắc Phật giáo Đông Nam Á.")
});
replaceEntry("humkara",{
 canonical:"Uttarabodhi-mudrā",
 names:L("Geste de l’éveil suprême","Gesture of supreme awakening","최상보리 수인","最上菩提印","最上菩提印","Ấn tối thượng bồ-đề"),
 displayName:null, category:"tantric", tradition:"vajrayana",
 meaningText:L("Éveil suprême et accomplissement de la connaissance éveillée.","Supreme awakening and fulfillment of awakened knowledge.","최상의 깨달음과 지혜의 성취.","最上の覚りと智慧の成就。","最高覺悟與覺智成就。","Giác ngộ tối thượng và thành tựu trí giác."),
 gestureText:L("Les deux mains se rejoignent ; certains doigts sont entrelacés tandis que les index sont dressés ensemble selon la variante.","The hands join; selected fingers interlace while the index fingers rise together according to the variant.","두 손을 합치고 일부 손가락을 엮으며 검지를 함께 세운다.","両手を合わせ、指を組み、人差し指をそろえて立てる。","雙手相合，部分手指交纏，食指並列豎起。","Hai tay kết lại, một số ngón đan nhau, hai ngón trỏ cùng dựng lên."),
 contextText:L("Geste ésotérique associé notamment à Vairocana dans certaines traditions d’Asie orientale.","Esoteric gesture associated especially with Vairochana in some East Asian traditions.","동아시아 밀교 전통에서 비로자나불과 관련된다.","東アジア密教で大日如来などに結びつく。","在東亞密教中尤與毘盧遮那佛相關。","Trong Mật giáo Đông Á, đặc biệt gắn với Đại Nhật Như Lai.")
});


replaceEntry("raigo",{
 canonical:"Raigō-in",
 names:L("Geste d’accueil d’Amida","Amida welcoming gesture","내영인","来迎印","來迎印","Lai nghinh ấn"),
 displayName:null, category:"regional", tradition:"japan",
 meaningText:L("Accueil du fidèle par Amitābha au moment de la venue vers la Terre pure.","Amitabha welcoming the devotee at the moment of rebirth in the Pure Land.","아미타불이 왕생자를 정토로 맞이하는 뜻.","阿弥陀が往生者を浄土へ迎えることを表す。","表示阿彌陀佛迎接往生者進入淨土。","Biểu thị Phật A Di Đà tiếp dẫn người vãng sinh về Tịnh độ."),
 gestureText:L("Une main est levée et l’autre abaissée ; le pouce touche un doigt déterminé selon la variante.","One hand is raised and the other lowered; the thumb touches a selected finger according to the variant.","한 손은 들고 다른 손은 내리며 엄지가 전승에 따라 정해진 손가락과 맞닿는다.","一方の手を上げ、他方を下げ、親指を所定の指に接する。","一手上舉、一手下垂，拇指依不同形式與指定手指相接。","Một tay giơ lên, tay kia hạ xuống; ngón cái chạm một ngón quy định tùy biến thể."),
 contextText:L("Spécifique à l’iconographie japonaise d’Amida et aux images de la descente d’Amitābha (raigō), particulièrement dans le bouddhisme de la Terre pure.","Specific to Japanese Amida iconography and images of Amitabha's welcoming descent (raigo), especially in Pure Land Buddhism.","일본 정토교의 아미타불과 내영도 도상에 특징적이다.","日本浄土教の阿弥陀像・来迎図に特徴的な印相。","日本淨土教阿彌陀佛像與來迎圖中的代表性手印。","Đặc trưng cho hình tượng A Di Đà và tranh lai nghinh trong Tịnh độ tông Nhật Bản.")
});

const supplementalEntries=[
 {id:"mahakaruna",canonical:"Mahākaruṇā-mudrā",names:L("Geste de grande compassion","Great-compassion gesture","대비 수인","大悲印","大悲印","Đại bi ấn"),category:"regional",tradition:"mahayana",
  meaningText:L("Expression de la grande compassion bouddhique.","Expression of great Buddhist compassion.","불교의 대비를 나타낸다.","仏教の大悲を表す。","表現佛教的大悲。","Biểu hiện lòng đại bi Phật giáo."),
  gestureText:L("Configuration de main codifiée dans des traditions régionales ; la forme exacte doit être lue avec la source iconographique.","A codified hand configuration in regional traditions; the exact form should be read with the iconographic source.","지역 전통의 정형화된 손모양으로 도상 자료와 함께 판독해야 한다.","地域伝承の定型的な手形で、図像資料と併読する必要がある。","地域傳統中的規範手勢，需配合圖像來源判讀。","Thủ thế quy phạm trong các truyền thống khu vực; cần đọc cùng nguồn hình tượng."),
  contextText:L("Présent dans des corpus bouddhiques d’Asie du Sud et du Sud-Est.","Found in South and Southeast Asian Buddhist corpora.","남아시아·동남아시아 불교 자료에 나타난다.","南アジア・東南アジアの仏教資料に見られる。","見於南亞與東南亞佛教資料。","Gặp trong tư liệu Phật giáo Nam Á và Đông Nam Á.")},
 {id:"patra",canonical:"Pātra-mudrā",names:L("Geste de la feuille / paume ouverte","Leaf / open-palm gesture","파트라 수인","葉印","葉印","Pātra ấn"),category:"regional",tradition:"pan",
  meaningText:L("Geste descriptif fondé sur l’ouverture de la main.","Descriptive gesture based on the opening of the hand.","손바닥을 펼치는 형태에 기초한 수인.","開いた掌を基本とする手勢。","以張開手掌為基礎的手勢。","Thủ thế dựa trên lòng bàn tay mở."),
  gestureText:L("Les doigts s’écartent et forment une silhouette en feuille.","The fingers spread to form a leaf-like silhouette.","손가락을 벌려 잎과 같은 형태를 만든다.","指を広げ、葉のような形を作る。","手指張開，形成葉片般輪廓。","Các ngón xòe ra tạo hình giống chiếc lá."),
  contextText:L("Terme attesté dans des répertoires gestuels indiens et bouddhiques régionaux.","Attested in Indian and regional Buddhist gesture repertoires.","인도 및 지역 불교 손짓 체계에서 확인된다.","インドおよび地域的な仏教の手勢体系に見られる。","見於印度與地區佛教手勢體系。","Gặp trong các hệ thống thủ thế Ấn Độ và Phật giáo khu vực.")},
 {id:"vismaya",canonical:"Vismaya-mudrā",names:L("Geste d’émerveillement","Wonder gesture","경이 수인","驚嘆印","驚嘆印","Ấn kinh ngạc"),category:"regional",tradition:"pan",
  meaningText:L("Émerveillement, étonnement ou manifestation d’une réaction.","Wonder, astonishment, or the display of a reaction.","경이·놀람의 표현.","驚き・感嘆の表現。","驚異、驚嘆的表現。","Biểu hiện kinh ngạc hoặc thán phục."),
  gestureText:L("Geste expressif dont la configuration dépend du corpus iconographique.","An expressive gesture whose exact configuration depends on the iconographic corpus.","도상 자료에 따라 형태가 달라지는 표현적 손짓.","図像資料によって形が異なる表現的な手勢。","形態依圖像資料而異的表現性手勢。","Thủ thế biểu cảm, hình thức thay đổi theo corpus hình tượng."),
  contextText:L("Partagé par plusieurs traditions artistiques de l’Inde.","Shared across several Indian artistic traditions.","여러 인도 미술 전통에 공유된다.","複数のインド美術伝統に共有される。","為多種印度藝術傳統所共有。","Được dùng trong nhiều truyền thống nghệ thuật Ấn Độ.")},
 {id:"jnana",canonical:"Jñāna-mudrā",names:L("Geste de connaissance","Knowledge gesture","지혜 수인","智慧印","智慧印","Trí ấn"),category:"regional",tradition:"pan",
  meaningText:L("Connaissance, contemplation et discipline méditative.","Knowledge, contemplation, and meditative discipline.","지혜·관조·명상 수행.","智慧・観想・瞑想実践。","智慧、觀想與冥想修持。","Trí tuệ, quán chiếu và thực hành thiền."),
  gestureText:L("Le pouce et l’index se rejoignent ; les autres doigts restent étendus.","Thumb and index finger meet while the other fingers remain extended.","엄지와 검지를 맞대고 나머지 손가락은 편다.","親指と人差し指を合わせ、他の指を伸ばす。","拇指與食指相接，其餘手指伸展。","Ngón cái chạm ngón trỏ, các ngón còn lại duỗi."),
  contextText:L("Geste transversal aux traditions méditatives indiennes ; à distinguer des emplois iconographiques spécifiquement bouddhiques.","Shared across Indian meditative traditions; distinguish from specifically Buddhist iconographic uses.","인도 명상 전통 전반에 걸쳐 나타나며 불교 도상 용례와 구분해야 한다.","インドの瞑想伝統に広く見られ、仏教図像上の用法とは区別が必要。","廣見於印度冥想傳統，需與特定佛教圖像用法區分。","Phổ biến trong các truyền thống thiền Ấn Độ; cần phân biệt với cách dùng riêng trong hình tượng Phật giáo.")},
 {id:"sarvatathagata",canonical:"Sarvatathāgatajñāna-mudrā",names:L("Sceau de la connaissance de tous les Tathāgata","Seal of the knowledge of all Tathagatas","일체여래지인 · 一切如來智印","一切如来智印","一切如來智印","Nhất thiết Như Lai trí ấn"),category:"tantric",tradition:"vajrayana",
  meaningText:L("Connaissance de l’ensemble des Tathāgata dans l’ésotérisme bouddhique.","Knowledge of all Tathagatas in esoteric Buddhism.","밀교에서 일체여래의 지혜를 상징한다.","密教で一切如来の智慧を象徴する。","密教中象徵一切如來之智慧。","Biểu trưng trí của tất cả Như Lai trong Mật giáo."),
  gestureText:L("Sceau ésotérique codifié ; sa forme doit être lue dans son mandala et son rituel.","A codified esoteric seal whose form must be read in its mandala and ritual context.","만다라와 의례 맥락에서 판독해야 하는 밀교 인계.","曼荼羅と儀礼の文脈で読むべき密教の印。","需在曼荼羅與儀軌脈絡中判讀的密教手印。","Ấn Mật giáo có quy phạm, cần đọc trong bối cảnh maṇḍala và nghi quỹ."),
  contextText:L("Associé notamment au mandala de la Matrice dans l’ésotérisme est-asiatique.","Associated especially with the Womb Realm Mandala in East Asian esotericism.","동아시아 밀교의 태장계 만다라와 관련된다.","東アジア密教の胎蔵界曼荼羅などに関わる。","尤與東亞密教胎藏界曼荼羅相關。","Đặc biệt liên hệ với Thai Tạng giới maṇḍala trong Mật giáo Đông Á.")},
 {id:"kataka",canonical:"Kataka-mudrā",names:L("Geste de saisie / tenue","Holding gesture","카타카 수인","持物印","持物印","Ấn cầm giữ"),category:"regional",tradition:"pan",
  meaningText:L("Tenue d’un attribut, d’une fleur ou d’une offrande.","Holding an attribute, flower, or offering.","지물·꽃·공양물을 드는 손짓.","持物・花・供物を持つ手勢。","持握法器、花或供物的手勢。","Thủ thế cầm pháp khí, hoa hoặc vật cúng."),
  gestureText:L("Les doigts se courbent pour saisir délicatement un petit attribut.","The fingers curve to hold a small attribute delicately.","손가락을 구부려 작은 지물을 가볍게 잡는다.","指を曲げ、小さな持物を軽く保持する。","手指彎曲，輕握小型法器或花。","Các ngón cong để giữ nhẹ một vật nhỏ."),
  contextText:L("Geste partagé par l’iconographie bouddhique et d’autres traditions indiennes.","Shared by Buddhist iconography and other Indian traditions.","불교 도상과 다른 인도 전통에 공유된다.","仏教図像と他のインド伝統に共有される。","佛教圖像與其他印度傳統皆可見。","Gặp trong hình tượng Phật giáo và các truyền thống Ấn Độ khác.")},
 {id:"gajahasta",canonical:"Gajahasta-mudrā",names:L("Geste de la trompe d’éléphant","Elephant-trunk gesture","가자하스타 수인","象鼻印","象鼻印","Tượng tỵ ấn"),category:"regional",tradition:"pan",
  meaningText:L("Geste dont la ligne du bras et de la main évoque une trompe d’éléphant.","Gesture whose arm-and-hand line evokes an elephant trunk.","팔과 손의 선이 코끼리 코를 연상시키는 손짓.","腕と手の線が象の鼻を思わせる手勢。","手臂與手的線條如象鼻。","Thủ thế có đường tay và cánh tay gợi vòi voi."),
  gestureText:L("Le bras descend en courbe, la main prolongeant le mouvement.","The arm descends in a curve and the hand continues the line.","팔을 곡선으로 내리고 손이 그 흐름을 잇는다.","腕を曲線状に下ろし、手がその流れを延長する。","手臂呈曲線下垂，手掌延續其線條。","Cánh tay hạ theo đường cong, bàn tay nối tiếp chuyển động."),
  contextText:L("Geste issu de l’iconographie indienne, parfois rencontré dans des contextes tantriques.","An Indian iconographic gesture also encountered in some tantric contexts.","인도 도상에서 유래하며 일부 탄트라 맥락에서도 보인다.","インド図像に由来し、一部の密教文脈にも見られる。","源於印度圖像，也見於部分密教脈絡。","Gốc từ hình tượng Ấn Độ, đôi khi gặp trong bối cảnh Mật giáo.")},
 {id:"lalitakshepa",canonical:"Lalitakṣepa-mudrā",names:L("Geste de détente gracieuse","Graceful relaxed gesture","라리타크셰파 수인","優美垂手印","優美垂手印","Ấn buông tay uyển chuyển"),category:"regional",tradition:"pan",
  meaningText:L("Détente, aisance et élégance de la pose.","Relaxation, ease, and elegance of pose.","이완·여유·우아한 자세.","くつろぎ・余裕・優雅な姿勢。","放鬆、從容與優雅姿態。","Sự thư thái và thanh nhã của tư thế."),
  gestureText:L("La main est relâchée, avec un mouvement souple des doigts.","The hand is relaxed with a gentle movement of the fingers.","손을 이완하고 손가락을 부드럽게 둔다.","手を緩め、指を柔らかく保つ。","手掌放鬆，手指柔和下垂。","Bàn tay thư giãn, các ngón buông mềm."),
  contextText:L("Geste descriptif de l’iconographie indienne et bouddhique régionale.","A descriptive gesture in Indian and regional Buddhist iconography.","인도 및 지역 불교 도상의 묘사적 손짓.","インドおよび地域的仏教図像の記述的な手勢。","印度與地區佛教圖像中的描述性手勢。","Thủ thế mô tả trong hình tượng Ấn Độ và Phật giáo khu vực.")},
 {id:"yoga",canonical:"Yoga-mudrā",names:L("Geste de concentration yogique","Yogic concentration gesture","요가 수인","瑜伽印","瑜伽印","Du-già ấn"),category:"regional",tradition:"pan",
  meaningText:L("Concentration corporelle et méditative dans des traditions yogiques.","Bodily and meditative concentration in yogic traditions.","요가 전통의 신체적·명상적 집중.","ヨーガ伝統における身体的・瞑想的集中。","瑜伽傳統中的身體與冥想專注。","Sự tập trung thân-tâm trong truyền thống yoga."),
  gestureText:L("Configuration de mains liée à la discipline méditative ; la forme varie selon la tradition.","A hand configuration tied to meditative discipline; the form varies by tradition.","명상 수행과 관련된 손모양으로 전통에 따라 형태가 다르다.","瞑想修行に関わる手形で、伝統により形が異なる。","與冥想修持相關，形態依傳統而異。","Thủ thế liên quan kỷ luật thiền định, hình thức thay đổi theo truyền thống."),
  contextText:L("Entrée comparative : usage transversal à plusieurs traditions indiennes, y compris certains contextes bouddhiques.","Comparative entry: shared across several Indian traditions, including some Buddhist contexts.","비교 항목으로 여러 인도 전통과 일부 불교 맥락에 걸쳐 사용된다.","比較項目として複数のインド伝統、一部の仏教文脈にまたがる。","比較性條目，跨越多種印度傳統及部分佛教脈絡。","Mục so sánh, dùng trong nhiều truyền thống Ấn Độ, kể cả một số bối cảnh Phật giáo.")}
];
entries.push(...supplementalEntries);


const commonsFile=name=>"https://commons.wikimedia.org/wiki/Special:Redirect/file/"+encodeURIComponent(name)+"?width=1200";
const commonsPage=name=>"https://commons.wikimedia.org/wiki/File:"+encodeURIComponent(name.replace(/ /g,"_"));
const PHOTO={
 abhaya:{file:"Standing Buddha in Abhaya Mudra and Head Enriched by Halo with Scalloped Border - Govind Nagar - Early Kushan Period - ACCN 71-105 - Government Museum - Mathura 2013-02-24 5967.JPG",x:25,y:40,z:3.45},
 varada:{file:"Buddha - Varada Mudra - Bodh Gaya ASI Museum - AN - 1527.jpg",x:31,y:44,z:3.75},
 bhumisparsha:{file:"Buddha in Bhumisparsha Mudra - Pala School - Circa 10th Century AD - Bihar - Indian Museum - Kolkata 2012-11-16 2054.JPG",x:31,y:59,z:3.55},
 dhyana:{file:"Buddha Shakyamuni Seated in Meditation (Dhyanamudra).jpg",x:50,y:73,z:3.35},
 dharmachakra:{file:"Buddha in Dharmacakra mudra MAO Torino.jpg",x:50,y:49,z:3.45},
 vitarka:{file:"Buddha Amida (Amitābha), M.C. 2078(8).jpg",x:48,y:51,z:3.45},
 anjali:{file:"Buddha anjali mudra.JPG",x:50,y:52,z:3.25},
 raigo:{file:"Buddha Amida-IMG 1028.JPG",x:50,y:58,z:3.2},
 miracles:{file:"ပြာဋိဟာရိယမုဒြာ (Pratiharya Mudra).jpg",x:50,y:48,z:3.25},
 blessing:{file:"ဗျာချာနမုဒြာ (Vyakhyāna Mudra).jpg",x:47,y:28,z:4.15},
 "mida-join":{file:"Hands of Amida Buddha at Kōtoku-in.jpg",x:50,y:50,z:1.38},
 "seppo-in":{file:"Dharmachakra Mudra of Buddha.jpg",x:51,y:49,z:3.45},
 "vajra-wisdom":{file:"Buddha Vairocana Mudra.JPG",x:25,y:50,z:1.95},
 "vajra-embrace":{file:"Clevelandart 1985.92.1.jpg",x:50,y:46,z:3.35},
 "demon-subduing":{file:"ဘူတဒါမရ မုဒြာ (Bhútadāmara Mudrā).jpg",x:50,y:45,z:3.45},
 flaming:{file:"Karana.png",x:50,y:42,z:1.34},
 nagaraja:{file:"ဗုဒ္ဓသမဏမုဒြာ (Buddha-sramaņa Mudrā).jpg",x:62,y:38,z:3.85},
 tarjani:{file:"တဇ္ဇနီမုဒြာ (Tarjani Mudra).jpg",x:69,y:34,z:4.35},
 embrace:{file:"Calling for rain 2.jpg",x:50,y:52,z:2.35},
 humkara:{file:"Vairochana copper statue 1 CAC.JPG",x:50,y:34,z:3.55},
 "mandala-offering":{file:"Wonderlane, Mandala Offering Mudra (2).jpg",x:52,y:64,z:1.34},
 mahakaruna:{file:"မဟာကရုဏာမုဒြာ (Mahā karuņā Mudrā).jpg",x:55,y:38,z:4.05},
 patra:{file:"ပတ္တမုဒြာ = ပတ္တဟတ္ထ (Patra Mudrā-Patra Hasta).jpg",x:50,y:69,z:3.25},
 vismaya:{file:"Big temple - stone work - 3.JPG",x:12,y:39,z:3.75},
 jnana:{file:"Gyana (jnana) mudra and rudraksha.jpg",x:50,y:38,z:1.38},
 sarvatathagata:{file:"The Lotus gospel - or, Mahayana Buddhism and its symbolic teachings compared historically and geographically with those of Catholic Christianity (1911) (14579420198).jpg",x:50,y:50,z:2.6},
 kataka:{file:"Vasudhara, Goddess of Abundance, view 2, Nepal, 1082 AD, gilded copper inlaid with semiprecious stones, traces of vermilion - Arthur M. Sackler Gallery - DSC06053.JPG",x:22,y:34,z:3.75},
 gajahasta:{file:"A Tantric Goddess LACMA M.82.42.1 (2 of 5).jpg",x:31,y:57,z:3.35},
 lalitakshepa:{file:"လလိတခေပမုဒြာ (Lalitakshepa Mudra).jpg",x:17,y:57,z:3.6},
 yoga:{file:"ယောဂမုဒြာ (Yoga Mudrā).jpg",x:50,y:50,z:2.75}
};
function photoFor(e){return PHOTO[e.id]||null;}
function renderPhoto(e,full=false){
 const p=photoFor(e);
 if(!p)return "";
 const src=commonsFile(p.file);
 if(full)return '<img class="mudra-full-image" src="'+src+'" alt="" loading="lazy">';
 return '<div class="mudra-photo-crop"><img src="'+src+'" alt="" loading="lazy" style="left:50%;top:50%;width:'+(p.z*100)+'%;height:auto;transform:translate(-'+p.x+'%,-'+p.y+'%)"></div>';
}
function sourceLink(e){
 const p=photoFor(e);
 return p?commonsPage(p.file):"";
}


const LEXICON={
abhaya:{sa:"Abhaya-mudrā",han:"施無畏印",ja:"semui-in",py:"shī wúwèi yìn"},
varada:{sa:"Varada-mudrā",han:"與願印",ja:"yogan-in",py:"yǔyuàn yìn"},
bhumisparsha:{sa:"Bhūmisparśa-mudrā",han:"觸地印",ja:"shokuchi-in",py:"chùdì yìn"},
dhyana:{sa:"Dhyāna-mudrā",han:"禪定印",ja:"zenjō-in",py:"chándìng yìn"},
dharmachakra:{sa:"Dharmacakra-mudrā",han:"轉法輪印",ja:"tenbōrin-in",py:"zhuǎn fǎlún yìn"},
vitarka:{sa:"Vitarka-mudrā / Vyākhyāna-mudrā",han:"說法印",ja:"seppō-in",py:"shuōfǎ yìn"},
anjali:{sa:"Añjali-mudrā",han:"合掌印",ja:"gasshō-in",py:"hézhǎng yìn"},
raigo:{sa:"—",han:"來迎印",ja:"raigō-in",py:"láiyíng yìn"},
miracles:{sa:"Prātihārya-mudrā",han:"神變示現印",ja:"shinpen jigen-in",py:"shénbiàn shìxiàn yìn"},
blessing:{sa:"Vyākhyāna-mudrā",han:"加持印",ja:"kaji-in",py:"jiāchí yìn"},
"mida-join":{sa:"Dhyāna-mudrā",han:"彌陀定印",ja:"mida no jōin",py:"Mítuó dìng yìn"},
"seppo-in":{sa:"Vyākhyāna-mudrā",han:"說法印",ja:"seppō-in",py:"shuōfǎ yìn"},
"vajra-wisdom":{sa:"Jñānamuṣṭi-mudrā / Bodhyagrī-mudrā",han:"智拳印",ja:"chiken-in",py:"zhìquán yìn"},
"vajra-embrace":{sa:"Vajrahūṃkāra-mudrā",han:"金剛抱擁印",ja:"kongō hōyō-in",py:"jīngāng bàoyōng yìn"},
"demon-subduing":{sa:"Bhūtadāmara-mudrā",han:"降魔調伏印",ja:"gōma chōbuku-in",py:"xiángmó tiáofú yìn"},
flaming:{sa:"Karaṇa-mudrā",han:"迦羅拏印",ja:"karana-in",py:"jiāluóná yìn"},
nagaraja:{sa:"Buddhaśramaṇa-mudrā",han:"佛教沙門印",ja:"bukkyō shamon-in",py:"fójiào shāmén yìn"},
tarjani:{sa:"Tarjanī-mudrā",han:"忿怒指示印",ja:"fundo shiji-in",py:"fènnù zhǐshì yìn"},
embrace:{sa:"Maitrīkaruṇā-mudrā",han:"慈悲印",ja:"jihi-in",py:"cíbēi yìn"},
humkara:{sa:"Uttarabodhi-mudrā",han:"最上菩提印",ja:"saijō bodai-in",py:"zuìshàng pútí yìn"},
"mandala-offering":{sa:"Maṇḍala-mudrā",han:"曼荼羅供養印",ja:"mandara kuyō-in",py:"màntúluó gòngyǎng yìn"},
mahakaruna:{sa:"Mahākaruṇā-mudrā",han:"大悲印",ja:"daihi-in",py:"dàbēi yìn"},
patra:{sa:"Pātra-mudrā",han:"葉印",ja:"yō-in",py:"yè yìn"},
vismaya:{sa:"Vismaya-mudrā",han:"驚嘆印",ja:"kyōtan-in",py:"jīngtàn yìn"},
jnana:{sa:"Jñāna-mudrā",han:"智慧印",ja:"chie-in",py:"zhìhuì yìn"},
sarvatathagata:{sa:"Sarvatathāgatajñāna-mudrā",han:"一切如來智印",ja:"issai nyorai chi-in",py:"yīqiè rúlái zhì yìn"},
kataka:{sa:"Kaṭaka-mudrā",han:"持物印",ja:"jimotsu-in",py:"chíwù yìn"},
gajahasta:{sa:"Gajahasta-mudrā",han:"象鼻印",ja:"zōbi-in",py:"xiàngbí yìn"},
lalitakshepa:{sa:"Lalitakṣepa-mudrā",han:"優美垂手印",ja:"yūbi suishu-in",py:"yōuměi chuíshǒu yìn"},
yoga:{sa:"Yoga-mudrā",han:"瑜伽印",ja:"yuga-in",py:"yújiā yìn"}
};

const EXAMPLE_WORK={
abhaya:"Standing Buddha — Government Museum, Mathurā",varada:"Buddha — Archaeological Museum, Bodh Gayā",
bhumisparsha:"Buddha in bhūmisparśa-mudrā — Indian Museum, Kolkata",dhyana:"Buddha Śākyamuni seated in meditation",
dharmachakra:"Buddha in dharmacakra-mudrā — Museo d’Arte Orientale, Turin",vitarka:"Buddha Amida (Amitābha)",
anjali:"Buddha in añjali-mudrā",raigo:"Amida making the raigō gesture — Bern Historical Museum",
miracles:"Buddha displaying Prātihārya-mudrā",blessing:"Buddha displaying Vyākhyāna-mudrā",
"mida-join":"Hands of the Great Buddha Amida — Kōtoku-in, Kamakura","seppo-in":"Buddha displaying the preaching gesture",
"vajra-wisdom":"Buddha Vairocana displaying the wisdom-fist seal","vajra-embrace":"Tantric Buddhist figure — Cleveland Museum of Art",
"demon-subduing":"Figure displaying Bhūtadāmara-mudrā",flaming:"Buddhist sculpture displaying Karaṇa-mudrā — Dr. Ambedkar National Memorial",
nagaraja:"Figure displaying Buddhaśramaṇa-mudrā",tarjani:"Figure displaying Tarjanī-mudrā",
embrace:"Buddhist figure displaying the compassion gesture",humkara:"Vairocana, copper sculpture",
"mandala-offering":"Maṇḍala-offering gesture",mahakaruna:"Figure displaying Mahākaruṇā-mudrā",
patra:"Figure displaying Pātra-mudrā",vismaya:"Sculptural figure displaying Vismaya-mudrā",jnana:"Jñāna-mudrā",
sarvatathagata:"Sarvatathāgatajñāna-mudrā — historical illustration",kataka:"Vasudhārā — Nepal, 1082, National Museum of Asian Art",
gajahasta:"Tantric goddess — Los Angeles County Museum of Art",lalitakshepa:"Figure displaying Lalitakṣepa-mudrā",yoga:"Yoga-mudrā"
};

const TABLE_UI={
fr:{title:"Équivalences linguistiques",sa:"Sanskrit",han:"Sinogrammes",ko:"Coréen (hangŭl)",ja:"Japonais (rōmaji)",vi:"Vietnamien",py:"Chinois (pinyin)",fr:"Français",en:"Anglais",example:"Exemple iconographique",exampleIntro:"Dans cette œuvre, le geste se reconnaît par la configuration des mains décrite ci-dessus."},
en:{title:"Linguistic equivalents",sa:"Sanskrit",han:"Sinographs",ko:"Korean (Hangul)",ja:"Japanese (rōmaji)",vi:"Vietnamese",py:"Chinese (pinyin)",fr:"French",en:"English",example:"Iconographic example",exampleIntro:"In this work, the gesture can be identified from the hand configuration described above."},
ko:{title:"언어별 명칭",sa:"산스크리트어",han:"한자",ko:"한국어 (한글)",ja:"일본어 (로마자)",vi:"베트남어",py:"중국어 (병음)",fr:"프랑스어",en:"영어",example:"도상 예시",exampleIntro:"이 작품에서는 위에서 설명한 손의 구성으로 수인을 확인할 수 있다."},
ja:{title:"各言語の名称",sa:"サンスクリット",han:"漢字",ko:"韓国語（ハングル）",ja:"日本語（ローマ字）",vi:"ベトナム語",py:"中国語（拼音）",fr:"フランス語",en:"英語",example:"図像例",exampleIntro:"この作品では、上記の手指の構成によって印相を確認できる。"},
"zh-hant":{title:"各語言名稱",sa:"梵語",han:"漢字",ko:"韓語（諺文）",ja:"日語（羅馬字）",vi:"越南語",py:"漢語（拼音）",fr:"法語",en:"英語",example:"圖像實例",exampleIntro:"在這件作品中，可依上述手部構型辨識此手印。"},
vi:{title:"Tên gọi theo ngôn ngữ",sa:"Sanskrit",han:"Hán tự",ko:"Tiếng Hàn (Hangul)",ja:"Tiếng Nhật (rōmaji)",vi:"Tiếng Việt",py:"Tiếng Trung (pinyin)",fr:"Tiếng Pháp",en:"Tiếng Anh",example:"Ví dụ hình tượng",exampleIntro:"Trong tác phẩm này, thủ ấn được nhận biết qua cấu hình bàn tay mô tả ở trên."}
}[locale];

const traditionalTerms={
 abhaya:"Abhaya-mudrā",
 varada:"Varada-mudrā",
 bhumisparsha:"Bhūmisparśa-mudrā",
 dhyana:"Dhyāna-mudrā",
 dharmachakra:"Dharmacakra-mudrā",
 vitarka:"Vitarka-mudrā · Vyākhyāna-mudrā",
 anjali:"Añjali-mudrā",
 "mida-join":"弥陀定印 · mida-no-jōin",
 "seppo-in":"説法印 · seppō-in",
 "vajra-wisdom":"智拳印 · chiken-in",
 "vajra-embrace":"Vajrahūṃkāra",
 tarjani:"Tarjanī-mudrā",
 "mandala-offering":"Maṇḍala-mudrā"
};
function traditionalTerm(e){return e.traditional||traditionalTerms[e.id]||e.canonical||"";}
function localName(e){
 const raw=e.names?.[locale]||e.displayName||e.canonical;
 if(locale==="ko"||locale==="ja")return String(raw).split(" · ")[0];
 return raw;
}
function lex(e){return LEXICON[e.id]||{sa:e.canonical||"—",han:"—",ja:"—",py:"—"};}
function koReading(e){return String(e.names?.ko||"—").split(" · ")[0];}
function subtitle(e){const l=lex(e);return [l.sa,l.han].filter(Boolean).join(" · ");}
function lexTable(e){
 const l=lex(e);
 const rows=[
  [TABLE_UI.sa,l.sa],[TABLE_UI.han,l.han],[TABLE_UI.ko,koReading(e)],[TABLE_UI.ja,l.ja],
  [TABLE_UI.vi,e.names?.vi||"—"],[TABLE_UI.py,l.py],[TABLE_UI.fr,e.names?.fr||"—"],[TABLE_UI.en,e.names?.en||"—"]
 ];
 return '<div class="mudra-lexicon"><h3>'+esc(TABLE_UI.title)+'</h3><table><tbody>'+rows.map(([k,v])=>'<tr><th>'+esc(k)+'</th><td>'+esc(v)+'</td></tr>').join("")+'</tbody></table></div>';
}
function exampleNote(e){return TABLE_UI.exampleIntro+" "+context(e);}
function meaning(e){return e.meaningText?.[locale]||(e.dynamicMeaning?e.dynamicMeaning():(TEXT[e.meaning]?.[locale]||""));}
function gesture(e){return e.gestureText?.[locale]||(GESTURE[e.gesture]?.[locale]||"");}
function context(e){return e.contextText?.[locale]||(CONTEXT[e.context]?.[locale]||"");}
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const norm=s=>String(s??"").toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’ʻʼ]/g,"'").trim();

root.innerHTML=`
<div class="mudra-toolbar">
<label class="mudra-control"><span>${UI.search}</span><input id="mudra-search" type="search" autocomplete="off" placeholder="${UI.placeholder}"></label>
<label class="mudra-control"><span>${UI.category}</span><select id="mudra-category"><option value="">${UI.all}</option>${Object.entries(UI.cats).filter(([k])=>entries.some(e=>e.category===k)).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></label>
<label class="mudra-control"><span>${UI.tradition}</span><select id="mudra-tradition"><option value="">${UI.all}</option>${Object.entries(UI.trad).filter(([k])=>entries.some(e=>e.tradition===k)).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></label>
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
 dialogContent.innerHTML=`<div class="mudra-dialog-shell">
 <button class="mudra-dialog-close" type="button" aria-label="${UI.close}">×</button>
 <div class="mudra-dialog-copy">
  <div class="mudra-dialog-kicker">${UI.cats[e.category]} · ${UI.trad[e.tradition]}</div>
  <h2>${esc(localName(e))}</h2>
  <p class="mudra-dialog-local">${esc(subtitle(e))}</p>
  ${lexTable(e)}
  <div class="mudra-detail-row"><span class="mudra-detail-label">${UI.meaning}</span><p>${esc(meaning(e))}</p></div>
  <div class="mudra-detail-row"><span class="mudra-detail-label">${UI.gesture}</span><p>${esc(gesture(e))}</p></div>
  <div class="mudra-detail-row"><span class="mudra-detail-label">${UI.context}</span><p>${esc(context(e))}</p></div>
  <div class="mudra-example">
   <span class="mudra-detail-label">${TABLE_UI.example}</span>
   <div class="mudra-example-grid">
    <a class="mudra-example-image" href="${sourceLink(e)}" target="_blank" rel="noopener">${renderPhoto(e,true)}</a>
    <div class="mudra-example-copy"><h3>${esc(EXAMPLE_WORK[e.id]||localName(e))}</h3><p>${esc(exampleNote(e))}</p></div>
   </div>
  </div>
 </div></div>`;
 dialogContent.querySelector(".mudra-dialog-close").addEventListener("click",()=>dialog.close());
 dialog.showModal();
}
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});

function render(list){
 grid.innerHTML=list.map(({e,index},i)=>`<button class="mudra-card" type="button" data-index="${index}">
  <div class="mudra-figure">${renderPhoto(e)}</div>
  <div class="mudra-card-body">
   <div class="mudra-card-top"><div><h2>${esc(localName(e))}</h2><p class="mudra-local-name">${esc(subtitle(e))}</p></div><span class="mudra-number">${String(index+1).padStart(2,"0")}</span></div>
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
   const l=lex(e); const hay=[e.canonical,localName(e),l.sa,l.han,l.ja,l.py,koReading(e),e.names?.vi,e.names?.fr,e.names?.en,meaning(e),gesture(e),context(e),UI.cats[e.category],UI.trad[e.tradition]].map(norm).join(" ");
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