/* ============================================================
   app.js – 어디서 만날까? v3
   태그 재설계 + 100곳 이상 + 카카오 주소검색
   ============================================================ */

// ──── 1. 프리셋 출발지 (API 없을 때 폴백) ────
const PRESET_ORIGINS = [
  {name:"서울",lat:37.5665,lng:126.978},{name:"부산",lat:35.1796,lng:129.0756},
  {name:"대구",lat:35.8714,lng:128.6014},{name:"인천",lat:37.4563,lng:126.7052},
  {name:"광주",lat:35.1595,lng:126.8526},{name:"대전",lat:36.3504,lng:127.3845},
  {name:"울산",lat:35.5384,lng:129.3114},{name:"세종",lat:36.48,lng:127.2589},
  {name:"수원",lat:37.2636,lng:127.0286},{name:"성남",lat:37.4201,lng:127.1265},
  {name:"고양",lat:37.6584,lng:126.832},{name:"용인",lat:37.2411,lng:127.1776},
  {name:"창원",lat:35.2281,lng:128.6812},{name:"청주",lat:36.6424,lng:127.489},
  {name:"천안",lat:36.8151,lng:127.1139},{name:"전주",lat:35.8242,lng:127.148},
  {name:"포항",lat:36.019,lng:129.3435},{name:"제주",lat:33.4996,lng:126.5312},
  {name:"춘천",lat:37.8813,lng:127.7298},{name:"원주",lat:37.3422,lng:127.9202},
  {name:"강릉",lat:37.7519,lng:128.8761},{name:"속초",lat:38.207,lng:128.5918},
  {name:"여수",lat:34.7604,lng:127.6622},{name:"순천",lat:34.9506,lng:127.4873},
  {name:"목포",lat:34.8118,lng:126.3922},{name:"안동",lat:36.5684,lng:128.7294},
  {name:"경주",lat:35.8562,lng:129.2247},{name:"통영",lat:34.8544,lng:128.4331},
  {name:"군산",lat:35.9676,lng:126.7368},{name:"김해",lat:35.2285,lng:128.8894},
  {name:"평택",lat:36.9921,lng:127.1127},{name:"파주",lat:37.7599,lng:126.7802},
  {name:"양양",lat:38.0753,lng:128.6189},{name:"김천",lat:36.1398,lng:128.1136},
  {name:"구미",lat:36.1196,lng:128.3441},
];

// ──── 2. 여행지 데이터 (100곳+) ────
// where: 어디로(필터) / what: 뭐하지(가점) / season: 시즌
const D = (name,region,lat,lng,where,what,season,fun,food,group,intro,reason,acts,foods,stayKw) =>
  ({name,region,lat,lng,where,what,season,scores:{fun,food,group},intro,reason,activities:acts,foods,stayKeyword:stayKw});

const DESTINATIONS = [
// ── 강원도 ──
D("강릉 경포","강원 강릉",37.7943,128.908,
  ["바다"],["서핑","먹방","카페"],["여름","사계절"],
  88,90,85,"동해 바다와 커피거리, 먹거리가 함께하는 강원 대표 여행지",
  "바다+커피+횟집 조합이 강력, 단체 숙소 풍부",
  ["경포해변 서핑","안목커피거리","경포대 산책","오죽헌"],
  ["초당순두부","장칼국수","물회","감자옹심이"],"강릉 경포 단체 펜션"),
D("속초·양양","강원 속초/양양",38.19,128.59,
  ["바다","산"],["서핑","먹방","카페"],["여름","사계절"],
  90,88,80,"서핑 메카+설악산+중앙시장 야시장",
  "서핑+설악산+야시장으로 3박도 빡빡",
  ["양양 서핑","설악산 케이블카","속초 중앙시장","영금정 일출"],
  ["속초 닭강정","아바이순대","물회","장칼국수"],"양양 서핑 단체숙소"),
D("춘천","강원 춘천",37.8813,127.7298,
  ["호수강"],["래프팅","먹방","놀이공원"],["사계절"],
  75,85,78,"닭갈비+막국수의 성지, 레고랜드와 의암호",
  "서울 1시간, 자연과 먹거리 동시 만족",
  ["의암호 카누","레고랜드","남이섬","김유정문학촌"],
  ["닭갈비","막국수","감자전","메밀국수"],"춘천 남이섬 펜션"),
D("강촌","강원 춘천",37.8175,127.628,
  ["계곡","호수강"],["래프팅","레일바이크"],["여름"],
  78,68,88,"레일바이크+번지점프+계곡 펜션의 MT 성지",
  "레일바이크+번지점프+계곡으로 단체 MT 완벽",
  ["강촌 레일바이크","번지점프","삼악산","구곡폭포"],
  ["닭갈비","막국수","감자전","메밀국수"],"강촌 단체 펜션 족구장"),
D("평창","강원 평창",37.3705,128.3906,
  ["산"],["스키"],["여름","겨울"],
  72,65,82,"고원 리조트와 목장, 사계절 자연 힐링",
  "양떼목장+리조트 풀빌라로 단체 힐링",
  ["대관령 양떼목장","오대산 월정사","용평리조트","하늘목장"],
  ["한우구이","메밀전병","황태해장국","감자옹심이"],"평창 풀빌라 단체"),
D("홍천","강원 홍천",37.697,127.8885,
  ["계곡"],["래프팅","워터파크"],["여름"],
  70,60,88,"수도권 접근성 최고 계곡+펜션 성지",
  "서울 1시간대, 계곡 독채 펜션 무한 선택지",
  ["용소계곡 물놀이","비발디파크 오션월드","공작산 트레킹","수타사"],
  ["한우구이","잣두부","메밀국수","닭볶음탕"],"홍천 계곡 독채 펜션"),
D("가평","경기 가평",37.8315,127.5096,
  ["계곡","호수강"],["래프팅","레일바이크","카페"],["여름","사계절"],
  82,62,92,"수도권 1박 MT 성지, 족구+바비큐+계곡",
  "서울 1시간, 족구+바비큐+계곡 풀세트 펜션 천국",
  ["제이드가든","쁘띠프랑스","번지점프","유명산계곡"],
  ["잣두부","닭갈비","송어회","흑돼지구이"],"가평 단체 펜션 족구장"),
D("정선","강원 정선",37.3809,128.6609,
  ["산","계곡"],["레일바이크","패러글라이딩"],["사계절"],
  75,68,70,"스카이워크, 레일바이크, 5일장",
  "스카이워크+레일바이크+정선5일장 색다른 재미",
  ["병방치 스카이워크","레일바이크","정선5일장","아우라지"],
  ["곤드레밥","메밀전병","한우구이","올챙이국수"],"정선 단체 펜션"),
D("영월","강원 영월",37.1837,128.4617,
  ["계곡","호수강"],["래프팅"],["여름","가을"],
  72,62,68,"동강래프팅, 별마로천문대, 청령포",
  "동강래프팅+별마로천문대+청령포 이색 체험",
  ["동강래프팅","별마로천문대","청령포","선돌"],
  ["곤드레밥","다슬기수제비","메밀전병","한우구이"],"영월 단체 펜션"),
D("동해·삼척","강원 동해/삼척",37.5245,129.1143,
  ["바다","계곡"],["스노클링"],["여름"],
  78,72,70,"무릉계곡+환선굴+해안 드라이브",
  "동굴+계곡+바다를 한 번에, 한적하고 자연 가득",
  ["무릉계곡","환선굴","추암촛대바위","장호항 스노클링"],
  ["곰치국","물회","해산물구이","메밀국수"],"삼척 바다 펜션"),
D("인제","강원 인제",38.069,128.17,
  ["계곡","산"],["래프팅"],["여름"],
  72,58,65,"내린천 래프팅+자작나무숲의 깊은 강원",
  "내린천 래프팅+자작나무숲 탐험 여행",
  ["내린천 래프팅","원대리 자작나무숲","방태산","백담사"],
  ["황태해장국","감자전","산채비빔밥","메밀국수"],"인제 래프팅 단체 펜션"),
D("고성","강원 고성",38.3807,128.4676,
  ["바다"],["스노클링"],["여름"],
  75,68,65,"통일전망대+화진포, 최북단 해변",
  "한적한 동해 북부+통일전망대 이색 코스",
  ["통일전망대","화진포해변","송지호","DMZ뮤지엄"],
  ["물회","해산물구이","두부요리","감자전"],"고성 바다 펜션"),
D("태백","강원 태백",37.1642,128.9856,
  ["산"],["스키"],["겨울","여름"],
  65,58,62,"태백산 눈축제+검룡소+하이원",
  "태백산 눈축제+하이원리조트로 겨울 여행",
  ["태백산","검룡소","하이원리조트","태백 석탄박물관"],
  ["한우구이","닭갈비","감자전","메밀국수"],"태백 하이원 단체"),
D("화천","강원 화천",38.1062,127.7085,
  ["호수강","시골"],["낚시"],["겨울"],
  62,58,65,"산천어축제+파로호의 강원 오지",
  "겨울 산천어축제+여름 물놀이 축제 이색 체험",
  ["산천어축제","파로호","평화의댐","붕어섬"],
  ["산천어회","감자전","닭볶음탕","산채비빔밥"],"화천 단체 숙소"),
D("횡성","강원 횡성",37.4913,127.9847,
  ["산","시골"],["먹방"],["사계절"],
  65,75,75,"횡성한우+숲체원의 중부 강원",
  "횡성한우 먹방+독채 펜션으로 단체 힐링",
  ["숲체원","풍수원성당","횡성호수길","청태산자연휴양림"],
  ["횡성한우","산채비빔밥","메밀국수","한우국밥"],"횡성 독채 펜션"),
D("양평","경기 양평",37.4917,127.4876,
  ["호수강","시골"],["카페"],["사계절"],
  68,65,80,"두물머리+세미원, 조용한 힐링 정석",
  "서울 근교 풀빌라 다양, 커플~단체 만족",
  ["두물머리 일출","세미원","양평 레일바이크","용문사"],
  ["한우구이","닭백숙","두부요리","산채정식"],"양평 풀빌라 단체"),
D("포천","경기 포천",37.8948,127.2003,
  ["계곡","산"],["카페"],["여름","가을"],
  72,58,85,"아트밸리+허브아일랜드+계곡",
  "서울 1시간, 단체 펜션 가성비+놀거리 다양",
  ["포천아트밸리","허브아일랜드","산정호수","비둘기낭폭포"],
  ["이동갈비","메밀국수","잣두부","한우구이"],"포천 단체 펜션 바비큐"),
// ── 충청도 ──
D("단양","충북 단양",36.9845,128.3657,
  ["산","계곡"],["패러글라이딩"],["사계절"],
  82,72,78,"소백산+도담삼봉+패러글라이딩 중부 성지",
  "패러글라이딩+만천하스카이워크 알찬 코스",
  ["만천하스카이워크","패러글라이딩","고수동굴","도담삼봉"],
  ["마늘떡갈비","다슬기해장국","산채비빔밥","한우구이"],"단양 단체 펜션"),
D("충주","충북 충주",36.991,127.926,
  ["호수강","시골"],["온천"],["사계절"],
  65,62,75,"충주호+수안보온천, 조용한 힐링",
  "온천+호수 조합으로 가성비 힐링",
  ["충주호 유람선","수안보온천","탄금대","중앙탑"],
  ["사과한우","올갱이국","떡갈비","산채정식"],"충주 수안보 단체"),
D("대천·보령","충남 보령",36.3335,126.6127,
  ["바다"],["먹방","워터파크"],["여름"],
  80,78,82,"머드축제+대천해수욕장, 여름 단체 1순위",
  "해수욕+머드축제+조개구이 가성비 최강",
  ["대천해수욕장","머드축제","개화예술공원","성주산"],
  ["조개구이","꽃게찜","키조개회","굴국밥"],"대천 단체 펜션"),
D("태안","충남 태안",36.7456,126.2979,
  ["바다"],["서핑","카페"],["여름","가을"],
  72,75,78,"서해 대표 해변, 낙조 절경",
  "만리포·꽃지 낙조+조개구이 가성비 바다",
  ["만리포해변","꽃지해변 낙조","안면도 자연휴양림","해변 ATV"],
  ["꽃게찜","조개구이","새조개","해물칼국수"],"태안 안면도 단체 펜션"),
D("공주·부여","충남 공주/부여",36.4626,127.119,
  ["시골"],["먹방"],["봄","가을"],
  65,70,65,"백제문화유산+공산성, 역사 여행",
  "대전 근교 역사탐방+먹거리, 조용하고 가성비",
  ["공산성","무령왕릉","부소산성","궁남지"],
  ["밤묵","연잎밥","공주국밥","칼국수"],"공주 단체 숙소"),
D("제천","충북 제천",37.1325,128.191,
  ["호수강","산"],["레일바이크"],["사계절"],
  72,65,68,"의림지+청풍호반, 충북 자연 명소",
  "청풍호 유람선+월악산+의림지 힐링 코스",
  ["청풍호 유람선","월악산","의림지","배론성지"],
  ["약선요리","한우구이","메밀국수","산채비빔밥"],"제천 단체 펜션"),
D("서산","충남 서산",36.7849,126.4503,
  ["시골"],["먹방"],["사계절"],
  62,72,62,"해미읍성+천수만, 충남 역사도시",
  "해미읍성+어리굴젓+천수만 이색 코스",
  ["해미읍성","서산마애삼존불","천수만","간월암"],
  ["어리굴젓","꽃게탕","새조개","생선구이"],"서산 단체 숙소"),
D("천안","충남 천안",36.8151,127.1139,
  ["도시"],["먹방","술자리"],["사계절"],
  65,75,72,"호두과자+독립기념관, 중부 교통 요지",
  "중부 어디서든 모이기 쉽고 먹거리 다양",
  ["독립기념관","천안삼거리공원","아라리오갤러리","천안역"],
  ["호두과자","병천순대","한우구이","칼국수"],"천안 단체 숙소"),
D("아산·온천","충남 아산",36.7898,127.0018,
  ["시골"],["온천","먹방"],["사계절"],
  68,72,72,"파라다이스스파도고+현충사 온천도시",
  "온천 스파+현충사+로컬 맛집 가성비 힐링",
  ["파라다이스스파도고","현충사","외암민속마을","아산온천"],
  ["곱창전골","한우구이","꽃게찜","칼국수"],"아산 온천 단체 숙소"),
D("세종","세종",36.48,127.2589,
  ["도시"],["카페"],["사계절"],
  55,60,65,"세종호수공원, 신도시 깔끔한 인프라",
  "중부 모임 접근성 최고, 깔끔한 숙소",
  ["세종호수공원","밀마루전망대","베어트리파크","고복자연공원"],
  ["한우구이","칼국수","카페디저트","파스타"],"세종 단체 숙소"),
D("덕산온천","충남 예산",36.6929,126.6616,
  ["시골"],["온천"],["겨울","사계절"],
  60,65,68,"덕산온천+수덕사, 충남 온천 명소",
  "덕산온천+수덕사+예당호 조용한 온천 힐링",
  ["덕산온천","수덕사","예당호 출렁다리","가야산"],
  ["한우구이","어죽","칼국수","산채비빔밥"],"덕산 온천 단체 숙소"),
D("속리산","충북 보은",36.5322,127.7294,
  ["산"],["먹방"],["가을","사계절"],
  68,58,62,"속리산 법주사+정이품송, 대추의 고장",
  "속리산 등산+법주사+대추한과 자연 여행",
  ["속리산","법주사","정이품송","말티재"],
  ["대추한과","산채비빔밥","버섯전골","도토리묵"],"속리산 단체 펜션"),
D("영동","충북 영동",36.175,127.783,
  ["계곡","시골"],["래프팅"],["여름"],
  58,60,58,"금강 상류 계곡+포도의 고장",
  "금강 물놀이+독채 펜션+과일 체험",
  ["금강 물놀이","포도축제","영국사","월류봉"],
  ["포도","올갱이국","산채비빔밥","한우구이"],"영동 계곡 독채 펜션"),
// ── 경상도 ──
D("경주","경북 경주",35.8562,129.2247,
  ["시골"],["먹방","카페"],["봄","가을","사계절"],
  85,82,82,"천년고도 유적+황리단길, 코스 넘치는 도시",
  "불국사~대릉원~황리단길 하루종일 볼거리",
  ["불국사","대릉원 야경","황리단길","교촌한옥마을"],
  ["경주빵","한우짚불구이","보문단지 맛집","황남빵"],"경주 한옥 단체"),
D("거제","경남 거제",34.8806,128.6211,
  ["바다","섬"],["스노클링","먹방"],["여름"],
  82,78,75,"바람의 언덕+해금강+몽돌해변",
  "해금강 유람선+바람의 언덕+해수욕 환상 조합",
  ["바람의 언덕","해금강 유람선","외도보타니아","학동몽돌해변"],
  ["멍게비빔밥","해물뚝배기","장어구이","조개구이"],"거제 바다 단체 펜션"),
D("통영","경남 통영",34.8544,128.4331,
  ["바다","도시"],["먹방","술자리","카페"],["사계절"],
  85,92,78,"한국의 나폴리, 케이블카+해산물 천국",
  "해산물 먹방+케이블카+동피랑 완벽 코스",
  ["한려수도케이블카","동피랑벽화마을","루지","중앙시장"],
  ["충무김밥","굴구이","해물뚝배기","꿀빵"],"통영 단체 숙소"),
D("부산 해운대","부산",35.1588,129.1604,
  ["바다","도시"],["서핑","먹방","술자리"],["여름","사계절"],
  92,90,88,"해운대·광안리·서면, 대한민국 대표 해양도시",
  "바다+맛집+술집+클럽 한 동네, 밤문화 최강",
  ["해운대해수욕장","광안리 야경","해동용궁사","감천문화마을"],
  ["돼지국밥","밀면","씨앗호떡","회센터"],"해운대 단체 숙소"),
D("부산 서면","부산",35.1575,129.0596,
  ["도시"],["먹방","술자리"],["사계절"],
  85,92,85,"부산 핵심 번화가, 먹거리+술자리 무한",
  "BIFF광장+서면+남포동 먹자골목 동선 편리",
  ["BIFF광장","자갈치시장","서면 먹자골목","용두산공원"],
  ["돼지국밥","씨앗호떡","비빔당면","부산어묵"],"부산 서면 단체"),
D("울산","울산",35.3616,129.3572,
  ["바다"],["먹방"],["사계절"],
  70,75,65,"간절곶 일출+대왕암+태화강",
  "일출+대왕암+고래고기 이색 체험",
  ["간절곶 일출","대왕암공원","태화강국가정원","장생포"],
  ["고래고기","언양불고기","한우국밥","회"],"울산 단체 숙소"),
D("포항","경북 포항",36.019,129.3435,
  ["바다"],["먹방","카페"],["사계절"],
  72,82,68,"호미곶+구룡포+과메기의 도시",
  "호미곶 일출+구룡포+과메기 동해안 이색",
  ["호미곶","구룡포 일본인거리","이가리 닻전망대","영일대해수욕장"],
  ["과메기","물회","대게","모리국수"],"포항 단체 숙소"),
D("안동","경북 안동",36.5684,128.7294,
  ["시골"],["먹방"],["가을","사계절"],
  68,82,62,"하회마을+찜닭+간고등어 전통 도시",
  "하회마을 탈춤+안동찜닭+간고등어 이색 먹방",
  ["하회마을","도산서원","월영교 야경","안동탈춤"],
  ["안동찜닭","간고등어","헛제사밥","안동식혜"],"안동 한옥 단체"),
D("대구","대구",35.8714,128.6014,
  ["도시"],["먹방","술자리","카페"],["사계절"],
  75,85,80,"동성로+서문시장+앞산 야경",
  "서문시장 야시장+동성로+앞산 먹고놀기 최적",
  ["동성로","서문시장 야시장","앞산전망대","김광석길"],
  ["막창","납작만두","뭉티기","동인동찜갈비"],"대구 동성로 단체"),
D("남해","경남 남해",34.8375,127.8925,
  ["바다","섬","시골"],["카페"],["사계절"],
  78,75,72,"독일마을+다랭이마을+상주해변",
  "독일마을+다랭이논+해변 드라이브 힐링",
  ["독일마을","다랭이마을","상주은모래해변","보리암"],
  ["멸치쌈밥","물메기탕","해물뚝배기","갈치조림"],"남해 독채 펜션"),
D("하동","경남 하동",35.0674,127.7514,
  ["산","호수강","시골"],["래프팅","먹방"],["봄","여름"],
  70,78,68,"섬진강 벚꽃길+녹차밭+재첩국",
  "섬진강+녹차밭+재첩국 자연 속 먹방 힐링",
  ["쌍계사","화개장터","하동녹차밭","섬진강 래프팅"],
  ["재첩국","참게장","녹차","산채비빔밥"],"하동 독채 펜션"),
D("진주","경남 진주",35.1801,128.1076,
  ["도시"],["먹방"],["가을","사계절"],
  68,80,70,"진주성+남강유등축제+냉면",
  "진주성 야경+냉면+비빔밥 경남 소도시 먹방",
  ["진주성","남강유등축제","촉석루","진주중앙시장"],
  ["진주냉면","진주비빔밥","한우구이","육전"],"진주 단체 숙소"),
D("거창","경남 거창",35.6867,127.9092,
  ["계곡","산"],["먹방"],["여름"],
  65,58,65,"우두산 출렁다리+거창계곡",
  "우두산 출렁다리+계곡 독채 조용한 힐링",
  ["우두산출렁다리","수승대","거창계곡","월성우주창의과학관"],
  ["사과","한우구이","산채비빔밥","메밀국수"],"거창 계곡 독채 펜션"),
D("영덕·울진","경북 영덕/울진",36.5326,129.3654,
  ["바다","계곡"],["먹방"],["여름","겨울"],
  70,85,62,"대게 본고장+불영계곡+동해안",
  "영덕대게+울진 불영계곡 먹방+자연",
  ["영덕 블루로드","불영계곡","월송정","죽변등대"],
  ["영덕대게","물회","곰치국","해물라면"],"영덕 단체 펜션"),
D("영주","경북 영주",36.8057,128.624,
  ["산","시골"],["먹방"],["가을","사계절"],
  65,75,60,"부석사+소수서원+풍기인삼",
  "부석사 일몰+소수서원+인삼요리 역사·먹방",
  ["부석사","소수서원","무섬마을","풍기인삼시장"],
  ["인삼요리","묵밥","한우구이","산채비빔밥"],"영주 단체 숙소"),
D("문경","경북 문경",36.5866,128.1867,
  ["산"],["레일바이크","먹방"],["가을","사계절"],
  68,62,62,"문경새재+레일바이크+사과",
  "문경새재 트레킹+레일바이크로 가을 추천",
  ["문경새재","문경레일바이크","가은오픈세트장","도자기체험"],
  ["사과","한우구이","산채비빔밥","메밀국수"],"문경 단체 펜션"),
D("상주","경북 상주",36.4107,128.159,
  ["호수강","시골"],["먹방"],["사계절"],
  55,62,58,"자전거의 도시+경천대+감의 고장",
  "경천대+낙동강 자전거+곶감으로 소소한 여행",
  ["경천대","상주 자전거박물관","낙동강 자전거길","북천 코스모스"],
  ["곶감","한우구이","산채비빔밥","칼국수"],"상주 단체 숙소"),
D("청송","경북 청송",36.436,129.0571,
  ["산","계곡"],["먹방"],["가을"],
  65,60,58,"주왕산+주산지+달기약수 숨은 명소",
  "주왕산+주산지+달기약수터 깊은 자연 힐링",
  ["주왕산","주산지","달기약수","객주문학관"],
  ["달기약수백숙","산채비빔밥","한우구이","두부"],"청송 독채 펜션"),
D("봉화","경북 봉화",36.8933,128.7324,
  ["산","시골"],["먹방"],["겨울","가을"],
  62,60,58,"분천역 산타마을+청량산",
  "분천역 산타마을+청량산+송이버섯 산골 힐링",
  ["분천역산타마을","청량산","닭실마을","석천계곡"],
  ["송이버섯구이","한우구이","산채비빔밥","메밀국수"],"봉화 독채 펜션"),
D("합천","경남 합천",35.5656,128.1659,
  ["산","시골"],["먹방"],["봄","가을"],
  62,58,55,"해인사+영상테마파크+황매산",
  "해인사+영상테마파크+황매산 철쭉 힐링",
  ["해인사","합천영상테마파크","황매산","합천호"],
  ["한우구이","산채비빔밥","메밀국수","두부"],"합천 단체 숙소"),
D("산청·함양","경남 산청/함양",35.414,127.8738,
  ["산","계곡"],["온천"],["여름","가을"],
  65,60,62,"지리산 자락+한방+상림숲",
  "지리산 계곡+한방 체험+상림숲 깊은 힐링",
  ["지리산","한방약초마을","함양상림숲","남사예담촌"],
  ["약초정식","산채비빔밥","한우구이","흑돼지"],"산청 지리산 독채"),
D("사천","경남 사천",34.9722,128.0663,
  ["바다","시골"],["카페","먹방"],["사계절"],
  65,75,60,"삼천포대교+비토섬+실안카페거리",
  "삼천포대교+비토섬+실안낙조카페 느린 바다",
  ["삼천포대교","비토섬","실안카페거리","항공우주박물관"],
  ["삼천포어묵","꽃게장","해물탕","회"],"사천 단체 숙소"),
D("김해","경남 김해",35.2285,128.8894,
  ["도시"],["먹방","놀이공원"],["사계절"],
  62,72,65,"롯데워터파크+가야유적+김해공항 근처",
  "롯데워터파크+가야유적으로 부산 근교 대안",
  ["롯데워터파크","김해가야테마파크","봉하마을","신어산"],
  ["뒷고기","돼지국밥","한우구이","칼국수"],"김해 단체 숙소"),
// ── 전라도 ──
D("전주 한옥마을","전북 전주",35.8159,127.153,
  ["도시"],["먹방","술자리","카페"],["사계절"],
  80,95,82,"비빔밥+한옥+막걸리골목 먹방 성지",
  "한옥마을 먹방+막걸리골목+경기전 완벽 코스",
  ["전주한옥마을","경기전","막걸리골목","전동성당"],
  ["비빔밥","콩나물국밥","막걸리+한상","PNB초코파이"],"전주 한옥 단체"),
D("여수","전남 여수",34.7604,127.6622,
  ["바다","도시"],["먹방","술자리","카페"],["사계절"],
  88,90,82,"여수 밤바다+해상케이블카+낭만 도시",
  "밤바다+케이블카+갓김치삼합 로맨틱+먹방",
  ["여수 해상케이블카","오동도","이순신광장 야시장","향일암"],
  ["갓김치삼합","돌산갓김치","서대회무침","굴구이"],"여수 바다 단체"),
D("순천","전남 순천",34.9506,127.4873,
  ["시골"],["먹방","카페"],["봄","가을","사계절"],
  75,78,70,"순천만습지+낙안읍성, 생태 여행 정석",
  "순천만 갈대밭+낙안읍성+국가정원 힐링",
  ["순천만습지","순천만국가정원","낙안읍성","선암사"],
  ["짱뚱어탕","꼬막비빔밥","한정식","녹차"],"순천 단체 숙소"),
D("담양","전남 담양",35.3213,126.9882,
  ["산","시골"],["카페","먹방"],["봄","여름"],
  68,78,70,"죽녹원+메타세콰이아길 힐링 사진 명소",
  "죽녹원+메타세콰이아길+떡갈비 힐링+먹방",
  ["죽녹원","메타세콰이아길","소쇄원","가사문학면"],
  ["대통밥","떡갈비","국수","죽순요리"],"담양 독채 펜션"),
D("군산","전북 군산",35.9676,126.7368,
  ["도시","시골"],["먹방","카페"],["사계절"],
  70,82,68,"근대문화유산+빵집 투어 시간여행 도시",
  "이성당+짬뽕+근대거리 레트로 감성 가득",
  ["경암동 철길마을","근대역사박물관","새만금","선유도"],
  ["이성당 단팥빵","짬뽕","꽃게장","호떡"],"군산 단체 숙소"),
D("목포","전남 목포",34.8118,126.3922,
  ["바다","도시"],["먹방"],["사계절"],
  68,88,65,"세발낙지+홍어, 해산물 먹방 끝판왕",
  "해산물 먹방에 미쳐보고 싶다면 목포",
  ["유달산","목포근대역사관","해상케이블카","갓바위"],
  ["세발낙지","홍어삼합","민어회","꽃게장백반"],"목포 단체 숙소"),
D("보성","전남 보성",34.7714,127.0798,
  ["산","시골"],["카페","온천"],["봄","여름"],
  68,72,60,"녹차밭 전경+율포해수녹차탕 힐링",
  "대한다원 녹차밭+녹차 족욕+꼬막 힐링 코스",
  ["대한다원 녹차밭","율포해수녹차탕","벌교꼬막거리","태백산맥문학관"],
  ["녹차","꼬막비빔밥","한정식","녹차아이스크림"],"보성 단체 숙소"),
D("고창","전북 고창",35.4358,126.7019,
  ["시골"],["먹방"],["가을","사계절"],
  65,75,60,"고창읍성+선운사+풍천장어",
  "고창읍성+선운사+풍천장어 역사+먹방",
  ["고창읍성","선운사","운곡습지","고인돌유적"],
  ["풍천장어","복분자주","해풍쑥떡","백합죽"],"고창 단체 펜션"),
D("정읍·내장산","전북 정읍",35.5698,126.8561,
  ["산"],["먹방"],["가을"],
  68,65,60,"내장산 단풍의 성지",
  "내장산 케이블카+단풍터널 가을 힐링 최강",
  ["내장산","내장산 케이블카","정읍사공원","솔티숲"],
  ["쌍화차","산채비빔밥","칼국수","한우구이"],"내장산 단체 펜션"),
D("부안·변산","전북 부안",35.7294,126.7168,
  ["바다","산"],["먹방"],["여름","가을"],
  65,72,60,"변산반도+채석강+격포해변",
  "변산반도+채석강+격포해변 서해안 자연",
  ["변산반도","채석강","격포해변","새만금"],
  ["바지락칼국수","꽃게장","백합죽","해물탕"],"변산반도 단체 펜션"),
D("광양","전남 광양",34.9407,127.6956,
  ["산","시골"],["먹방"],["봄"],
  62,75,58,"매화마을+백운산+불고기 봄꽃 도시",
  "매화축제+백운산+광양불고기 봄 여행",
  ["매화마을","백운산","섬진강","광양제철소견학"],
  ["광양불고기","재첩국","매실장아찌","산채비빔밥"],"광양 단체 숙소"),
D("완도","전남 완도",34.3108,126.755,
  ["바다","섬"],["먹방"],["여름","사계절"],
  68,80,58,"청산도+전복, 청정 바다 섬",
  "청산도 슬로길+전복요리 느린 여행의 정수",
  ["청산도","완도타워","신지명사십리해변","완도수목원"],
  ["전복삼합","해초비빔밥","전복죽","매생이국"],"완도 단체 숙소"),
D("진도","전남 진도",34.4869,126.2631,
  ["바다","섬"],["먹방"],["봄"],
  65,75,55,"신비의 바닷길+진도개+울돌목",
  "바닷길 축제+진도 홍주+해산물 이색 체험",
  ["신비의바닷길","운림산방","울돌목","쏠비치"],
  ["홍주","전복죽","해산물구이","산낙지"],"진도 단체 숙소"),
D("강진","전남 강진",34.6419,126.7672,
  ["시골"],["먹방","카페"],["봄","가을"],
  60,72,55,"다산초당+가우도+청자의 고장",
  "다산초당+가우도출렁다리+한정식 조용한 힐링",
  ["다산초당","가우도출렁다리","백운동원림","청자박물관"],
  ["한정식","키조개","장어구이","청자아이스크림"],"강진 단체 숙소"),
D("구례","전남 구례",35.2025,127.4627,
  ["산","시골"],["먹방"],["봄","가을"],
  70,72,60,"지리산+산수유마을+화엄사",
  "지리산+산수유축제+화엄사 자연 속 힐링",
  ["지리산","화엄사","산수유마을","섬진강 벚꽃길"],
  ["산채비빔밥","다슬기수제비","흑돼지","한우구이"],"구례 지리산 단체"),
// ── 대도시 ──
D("대전","대전",36.3504,127.3845,
  ["도시"],["먹방","술자리","온천","카페"],["사계절"],
  70,78,75,"성심당+은행동+유성온천 중부 허브",
  "성심당+은행동+유성온천 중부 모임 접근성 최고",
  ["성심당","대전엑스포","유성온천","계족산황토길"],
  ["성심당 튀김소보로","두부두루치기","칼국수","소머리국밥"],"대전 유성 단체"),
D("광주","광주",35.1595,126.8526,
  ["도시"],["먹방","술자리"],["사계절"],
  72,88,78,"무등산+양동시장+1913송정역시장 맛의 도시",
  "상무지구 술자리+양동시장 먹방+무등산 알참",
  ["무등산","양동시장","1913송정역시장","국립아시아문화전당"],
  ["상추튀김","떡갈비","한정식","광주김치"],"광주 상무 단체 숙소"),
D("인천 을왕리","인천",37.4467,126.383,
  ["바다","도시"],["서핑","술자리"],["여름","사계절"],
  72,70,78,"을왕리 해변+영종도 카페거리",
  "서울 1시간 이내 바다+리조트, 당일~1박",
  ["을왕리해수욕장","마시안해변","영종 카페거리","BMW드라이빙"],
  ["조개구이","칼국수","해물탕","중국음식"],"을왕리 단체 펜션"),
// ── 제주 ──
D("제주 동부","제주",33.458,126.93,
  ["바다","산"],["스노클링","카페"],["사계절"],
  90,80,80,"성산일출봉+우도+만장굴 자연 핵심",
  "성산일출봉+우도+비자림 대자연, 독채 풀빌라",
  ["성산일출봉","우도","만장굴","비자림"],
  ["흑돼지구이","해물뚝배기","전복죽","감귤"],"제주 동부 풀빌라 단체"),
D("제주 서부","제주",33.253,126.25,
  ["바다"],["카페","서핑"],["사계절"],
  82,75,82,"협재해변+오설록+한림공원",
  "협재 에메랄드 바다+오설록+풀빌라 럭셔리 힐링",
  ["협재해변","오설록 티뮤지엄","한림공원","곽지해변"],
  ["고기국수","전복죽","흑돼지","딱새우회"],"제주 서부 풀빌라"),
D("서귀포","제주 서귀포",33.2531,126.5653,
  ["바다","산"],["스노클링","카페"],["사계절"],
  88,82,80,"중문관광단지+정방폭포+올레길",
  "중문리조트+폭포+올레길+흑돼지 완벽 코스",
  ["중문관광단지","정방폭포","천지연폭포","주상절리"],
  ["흑돼지구이","갈치조림","전복뚝배기","해물라면"],"서귀포 중문 단체"),
D("제주시내","제주",33.4996,126.5312,
  ["도시"],["먹방","술자리","카페"],["사계절"],
  78,85,80,"탑동+동문시장+용두암 야경",
  "동문시장 야시장+탑동 술집거리+용두암 코스",
  ["동문시장","탑동해안도로","용두암","한라수목원"],
  ["흑돼지","고기국수","해물탕","빙떡"],"제주시 단체 게스트하우스"),
D("우도","제주",33.5057,126.9525,
  ["바다","섬"],["스노클링","카페"],["여름","사계절"],
  78,68,60,"에메랄드 바다+땅콩아이스크림 제주 속 작은 섬",
  "우도봉+서빈백사+산호해변 반나절 섬 투어",
  ["우도봉","서빈백사","산호해변","검멀레해변"],
  ["땅콩아이스크림","해물라면","전복죽","소라구이"],"우도 민박"),
// ── 경기 추가 ──
D("수원","경기 수원",37.2636,127.0286,
  ["도시"],["먹방","술자리"],["사계절"],
  72,85,78,"화성행궁+통닭거리+행리단길",
  "화성행궁 야경+통닭거리+행리단길 먹방 코스",
  ["화성행궁","수원화성","행리단길","광교호수공원"],
  ["수원왕갈비","통닭","순대국","치킨"],"수원 단체 숙소"),
D("이천","경기 이천",37.272,127.4348,
  ["시골"],["온천","먹방"],["사계절"],
  65,80,75,"쌀밥+도자기+스파 가까운 힐링",
  "이천쌀밥+테르메덴 스파+도자기 체험 힐링",
  ["테르메덴","이천세라피아","도자기마을","설봉공원"],
  ["이천쌀밥정식","순두부","한우구이","막걸리"],"이천 스파 단체"),
D("파주","경기 파주",37.7599,126.7802,
  ["시골"],["카페","먹방"],["사계절"],
  65,68,70,"헤이리+DMZ+프리미엄아울렛",
  "헤이리+아울렛+DMZ 문화·쇼핑·역사 동시",
  ["헤이리예술마을","임진각","프로방스마을","감악산"],
  ["장단콩두부","부대찌개","한우구이","카페디저트"],"파주 독채 펜션"),
D("강화도","인천 강화",37.747,126.4877,
  ["바다","섬","시골"],["먹방"],["사계절"],
  70,72,70,"마니산+전등사+젓갈시장 역사+먹방 섬",
  "서울 근교 섬 여행, 마니산+젓갈시장+카페",
  ["마니산","전등사","동막해변","강화올레길"],
  ["장어구이","젓갈","순무김치","밴댕이회"],"강화도 독채 펜션"),
D("용인","경기 용인",37.2321,127.2017,
  ["도시"],["놀이공원","워터파크"],["사계절"],
  82,65,82,"에버랜드+캐리비안베이 놀이공원 성지",
  "에버랜드+캐리비안베이로 단체 놀이 여행",
  ["에버랜드","캐리비안베이","한국민속촌","광교산"],
  ["한우구이","칼국수","카페디저트","치킨"],"용인 단체 숙소"),
D("서천","충남 서천",36.0804,126.6916,
  ["바다","시골"],["먹방"],["여름","가을"],
  60,72,55,"국립생태원+한산소곡주+서해 갯벌",
  "국립생태원+한산소곡주+해산물 가성비 서해",
  ["국립생태원","한산모시마을","마량리동백나무숲","신성리갈대밭"],
  ["한산소곡주","꽃게장","전어구이","해물칼국수"],"서천 단체 숙소"),
D("논산","충남 논산",36.187,127.099,
  ["시골"],["먹방"],["봄"],
  55,72,60,"관촉사+딸기체험+선샤인스튜디오",
  "관촉사+딸기체험+연산역 근대골목 소소한 재미",
  ["관촉사","탑정호","딸기체험","선샤인스튜디오"],
  ["딸기","한우구이","소머리국밥","칼국수"],"논산 단체 숙소"),
D("해남","전남 해남",34.5735,126.5993,
  ["바다","시골"],["먹방"],["가을","겨울"],
  60,72,55,"땅끝마을+두륜산+고구마의 고장",
  "땅끝마을+두륜산+해남 한정식 최남단 여행",
  ["땅끝마을","두륜산","미황사","고천암호"],
  ["한정식","해물탕","고구마","갈치조림"],"해남 단체 숙소"),
D("나주","전남 나주",35.0159,126.7108,
  ["시골"],["먹방"],["사계절"],
  55,75,55,"나주곰탕+영산강+빛가람혁신도시",
  "나주곰탕 먹방+영산강 자전거 소소한 여행",
  ["나주읍성","영산강","빛가람호수공원","금성산"],
  ["나주곰탕","홍어삼합","영산포 홍어거리","한정식"],"나주 단체 숙소"),
D("김포","경기 김포",37.6166,126.7155,
  ["바다"],["먹방"],["사계절"],
  55,70,60,"대명항 포구+애기봉 서울 서쪽 근교",
  "서울 가장 가까운 포구 먹방, 당일치기",
  ["대명항","애기봉전망대","김포아트빌리지","라베니체"],
  ["꽃게장","새우튀김","해물칼국수","조개구이"],"김포 단체 숙소"),
D("화순","전남 화순",35.0644,126.9863,
  ["산","시골"],["온천"],["사계절"],
  60,60,55,"적벽+고인돌+운주사+화순온천",
  "적벽+고인돌+운주사+온천 조용하고 색다른 힐링",
  ["화순적벽","고인돌유적","운주사","화순온천"],
  ["닭발","한우구이","산채비빔밥","도토리묵"],"화순 단체 숙소"),
];

// ──── 3. 유틸리티 ────
const DEFAULT_API_KEY = "6051b53a6dc4ca8d41a7b3c405f67f8d";
function getApiKey(){ return localStorage.getItem("kakaoApiKey") || DEFAULT_API_KEY }
function saveApiKey(k){ localStorage.setItem("kakaoApiKey",k.trim()) }

function haversine(lat1,lng1,lat2,lng2){
  const R=6371,dLat=(lat2-lat1)*Math.PI/180,dLng=(lng2-lng1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
function roadDist(lat1,lng1,lat2,lng2){ return haversine(lat1,lng1,lat2,lng2)*1.3 }

// ──── 4. 카카오 주소 검색 (키워드 + 주소 동시) ────
let searchTimer = null;
async function searchAddress(query, apiKey){
  if(!query||query.length<2) return [];
  try{
    // 키워드 검색과 주소 검색을 동시에 시도
    const [kwRes, addrRes] = await Promise.all([
      fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=3`,{
        headers:{"Authorization":`KakaoAK ${apiKey}`}
      }).catch(()=>null),
      fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}&size=3`,{
        headers:{"Authorization":`KakaoAK ${apiKey}`}
      }).catch(()=>null),
    ]);

    const results = [];

    // 주소 검색 결과 먼저 (정확한 주소 우선)
    if(addrRes && addrRes.ok){
      const data = await addrRes.json();
      (data.documents||[]).forEach(d=>{
        results.push({
          name: d.address_name,
          address: d.address_type === "ROAD_ADDR" ? d.road_address?.address_name || d.address_name : d.address_name,
          lat: parseFloat(d.y),
          lng: parseFloat(d.x),
          type: "주소",
        });
      });
    }

    // 키워드 검색 결과 추가
    if(kwRes && kwRes.ok){
      const data = await kwRes.json();
      (data.documents||[]).forEach(d=>{
        // 중복 제거 (같은 좌표 건너뛰기)
        const exists = results.some(r => Math.abs(r.lat - parseFloat(d.y)) < 0.001);
        if(!exists){
          results.push({
            name: d.place_name,
            address: d.address_name,
            lat: parseFloat(d.y),
            lng: parseFloat(d.x),
            type: "장소",
          });
        }
      });
    }

    return results.slice(0, 5);
  }catch{ return [] }
}

// ──── 5. 카카오 모빌리티 API ────
async function fetchKakaoRoute(oLat,oLng,dLat,dLng,key){
  try{
    const res=await fetch(`https://apis-navi.kakaomobility.com/v1/directions?origin=${oLng},${oLat}&destination=${dLng},${dLat}&priority=RECOMMEND`,{
      headers:{"Authorization":`KakaoAK ${key}`}
    });
    if(!res.ok)return null;
    const data=await res.json();
    if(!data.routes||data.routes[0].result_code!==0)return null;
    const s=data.routes[0].summary;
    return{distance:s.distance,duration:s.duration};
  }catch{return null}
}

async function fetchAllDistances(origins,dests,key,onProgress){
  const cache=new Map();let done=0;const total=origins.length*dests.length;
  for(const dest of dests){
    const ps=origins.map(async o=>{
      const r=await fetchKakaoRoute(o.lat,o.lng,dest.lat,dest.lng,key);
      if(r) cache.set(`${o.name}-${dest.name}`,{distKm:Math.round(r.distance/1000*10)/10,durationMin:Math.round(r.duration/60)});
      done++;if(onProgress)onProgress(done,total);
    });
    await Promise.all(ps);
    await new Promise(r=>setTimeout(r,100));
  }
  return cache;
}

// ──── 6. 점수 계산 엔진 ────
function calcScores(origins, whereFilter, whatBonus, season){
  const totalPeople=origins.reduce((s,o)=>s+o.people,0);
  if(!totalPeople) return [];
  const results=[];

  for(const dest of DESTINATIONS){
    // (a) 어디로? 필터: 하나라도 선택했으면, 매칭 안 되면 제외
    if(whereFilter.length>0){
      const match=whereFilter.some(w=>dest.where.includes(w));
      if(!match) continue;
    }

    // (b) 거리 계산
    const distInfos=origins.map(o=>({name:o.name,people:o.people,dist:roadDist(o.lat,o.lng,dest.lat,dest.lng)}));
    const weightedDist=distInfos.reduce((s,d)=>s+d.dist*d.people,0)/totalPeople;
    const distScore=Math.max(0,100-(weightedDist/500)*100);

    // (c) 균형 점수
    const dists=distInfos.map(d=>d.dist);
    const mean=dists.reduce((a,b)=>a+b,0)/dists.length;
    const std=Math.sqrt(dists.reduce((s,d)=>s+(d-mean)**2,0)/dists.length);
    const gap=Math.max(...dists)-Math.min(...dists);
    const balanceScore=Math.max(0,100-(std/150)*100)*0.6+Math.max(0,100-(gap/250)*100)*0.4;

    // (d) 퀄리티
    const{fun,food,group}=dest.scores;
    const quality=(fun+food+group)/3;

    // (e) 뭐하지? 가점
    let whatScore=0;
    for(const w of whatBonus){ if(dest.what.includes(w)) whatScore+=5 }

    // (f) 시즌 가점
    let seasonScore=0;
    if(season){
      if(dest.season.includes(season)||dest.season.includes("사계절")) seasonScore=6;
      else seasonScore=-3;
    }

    // (g) 합산
    let total=balanceScore*0.55+distScore*0.25+quality*0.20+whatScore+seasonScore;
    total=Math.max(0,Math.min(100,total));

    results.push({...dest,distInfos,weightedDist,
      distScore:Math.round(distScore),balanceScore:Math.round(balanceScore),
      qualityScore:Math.round(quality),whatScore,seasonScore,
      total:Math.round(total*10)/10});
  }
  results.sort((a,b)=>b.total-a.total);
  return results;
}

function recalcWithRealDist(results,origins,cache){
  const totalPeople=origins.reduce((s,o)=>s+o.people,0);
  for(const r of results){
    let ok=true;
    for(const info of r.distInfos){
      const c=cache.get(`${info.name}-${r.name}`);
      if(c){info.realDist=c.distKm;info.durationMin=c.durationMin}else ok=false;
    }
    if(!ok) continue;
    const rd=r.distInfos.map(d=>d.realDist);
    const wd=r.distInfos.reduce((s,d)=>s+d.realDist*d.people,0)/totalPeople;
    const ds=Math.max(0,100-(wd/500)*100);
    const mn=rd.reduce((a,b)=>a+b,0)/rd.length;
    const std=Math.sqrt(rd.reduce((s,d)=>s+(d-mn)**2,0)/rd.length);
    const gap=Math.max(...rd)-Math.min(...rd);
    const bs=Math.max(0,100-(std/150)*100)*0.6+Math.max(0,100-(gap/250)*100)*0.4;
    r.distScore=Math.round(ds);r.balanceScore=Math.round(bs);r.useRealDist=true;
    const{fun,food,group}=r.scores;const q=(fun+food+group)/3;
    let t=bs*0.55+ds*0.25+q*0.20+r.whatScore+r.seasonScore;
    r.total=Math.round(Math.max(0,Math.min(100,t))*10)/10;
  }
  results.sort((a,b)=>b.total-a.total);
}

// ──── 7. 카카오맵 지도 ────
let kakaoMapLoaded=false,kakaoMapInstance=null;
function loadKakaoMapSDK(key){
  return new Promise((res,rej)=>{
    if(kakaoMapLoaded){res();return}
    const s=document.createElement("script");
    s.src=`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    s.onload=()=>kakao.maps.load(()=>{kakaoMapLoaded=true;res()});
    s.onerror=rej;document.head.appendChild(s);
  });
}
async function showResultsOnMap(results,key){
  const mc=document.querySelector("#mapCard");
  try{
    await loadKakaoMapSDK(key);mc.classList.remove("hidden");
    const container=document.querySelector("#kakaoMap");
    kakaoMapInstance=new kakao.maps.Map(container,{center:new kakao.maps.LatLng(36.5,127.8),level:12});
    const bounds=new kakao.maps.LatLngBounds();
    results.forEach((r,i)=>{
      const pos=new kakao.maps.LatLng(r.lat,r.lng);bounds.extend(pos);
      new kakao.maps.CustomOverlay({map:kakaoMapInstance,position:pos,yAnchor:0.5,
        content:`<div style="background:${i<3?'#FF6B35':'#1B2A4A'};color:#fff;font-weight:800;font-size:12px;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);font-family:sans-serif">${i+1}</div>`
      });
    });
    kakaoMapInstance.setBounds(bounds,50);
  }catch{mc.classList.add("hidden")}
}

// ──── 8. UI ────
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
let originIdCounter=0;

function createOriginRow(defaultName="서울",defaultLat=37.5665,defaultLng=126.978,defaultPeople=3){
  const id=originIdCounter++;
  const row=document.createElement("div");
  row.className="origin-row";row.dataset.id=id;
  row.dataset.lat=defaultLat;row.dataset.lng=defaultLng;row.dataset.placeName=defaultName;

  const wrap=document.createElement("div");wrap.className="origin-search-wrap";
  const input=document.createElement("input");
  input.type="text";input.value=defaultName;input.placeholder="출발지 검색 (예: 강남역)";
  input.setAttribute("aria-label","출발지");
  if(defaultName) input.classList.add("has-value");

  const acList=document.createElement("div");acList.className="autocomplete-list";
  wrap.append(input,acList);

  // 자동완성 이벤트
  input.addEventListener("input",()=>{
    input.classList.remove("has-value");
    row.dataset.lat="";row.dataset.lng="";row.dataset.placeName="";
    clearTimeout(searchTimer);
    const q=input.value.trim();
    if(q.length<2){acList.classList.remove("show");acList.innerHTML="";return}
    const key=getApiKey();
    if(!key){showPresetDropdown(acList,q,row,input);return}
    searchTimer=setTimeout(async()=>{
      const results=await searchAddress(q,key);
      if(!results.length){showPresetDropdown(acList,q,row,input);return}
      acList.innerHTML=results.map((r,i)=>`<div class="autocomplete-item" data-i="${i}"><div class="ac-name">${r.name}${r.type?` <span style="font-size:0.65rem;color:#9CA3AF">${r.type}</span>`:""}</div>${r.address!==r.name?`<div class="ac-addr">${r.address}</div>`:""}</div>`).join("");
      acList.classList.add("show");
      acList.querySelectorAll(".autocomplete-item").forEach((el,i)=>{
        el.addEventListener("click",()=>{
          const r=results[i];
          input.value=r.name;input.classList.add("has-value");
          row.dataset.lat=r.lat;row.dataset.lng=r.lng;row.dataset.placeName=r.name;
          acList.classList.remove("show");
        });
      });
    },300);
  });

  input.addEventListener("blur",()=>setTimeout(()=>acList.classList.remove("show"),200));

  // 프리셋 폴백
  function showPresetDropdown(list,q,row,input){
    const filtered=PRESET_ORIGINS.filter(o=>o.name.includes(q));
    if(!filtered.length){list.classList.remove("show");return}
    list.innerHTML=filtered.slice(0,5).map((o,i)=>`<div class="autocomplete-item" data-i="${i}"><div class="ac-name">${o.name}</div></div>`).join("");
    list.classList.add("show");
    list.querySelectorAll(".autocomplete-item").forEach((el,i)=>{
      el.addEventListener("click",()=>{
        const o=filtered[i];input.value=o.name;input.classList.add("has-value");
        row.dataset.lat=o.lat;row.dataset.lng=o.lng;row.dataset.placeName=o.name;
        list.classList.remove("show");
      });
    });
  }

  const numInput=document.createElement("input");numInput.type="number";numInput.min=1;numInput.max=99;numInput.value=defaultPeople;
  numInput.setAttribute("aria-label","인원수");
  const unit=document.createElement("span");unit.className="unit";unit.textContent="명";
  const removeBtn=document.createElement("button");removeBtn.type="button";removeBtn.className="btn-remove";
  removeBtn.textContent="✕";removeBtn.addEventListener("click",()=>{row.remove();updateRemoveButtons()});

  row.append(wrap,numInput,unit,removeBtn);
  return row;
}

function updateRemoveButtons(){
  const rows=$$("#originList .origin-row");
  rows.forEach(r=>r.querySelector(".btn-remove").style.display=rows.length<=1?"none":"flex");
}

function initOrigins(){
  const list=$("#originList");
  list.appendChild(createOriginRow("서울",37.5665,126.978,3));
  list.appendChild(createOriginRow("부산",35.1796,129.0756,3));
  updateRemoveButtons();
}

function getInputs(){
  const origins=[];
  $$("#originList .origin-row").forEach(row=>{
    const lat=parseFloat(row.dataset.lat);
    const lng=parseFloat(row.dataset.lng);
    const name=row.dataset.placeName||row.querySelector("input[type='text']").value;
    const people=parseInt(row.querySelector("input[type='number']").value,10)||1;
    if(lat&&lng) origins.push({name,lat,lng,people});
  });
  const whereFilter=[];$$("#whereGroup input:checked").forEach(cb=>whereFilter.push(cb.value));
  const whatBonus=[];$$("#whatGroup input:checked").forEach(cb=>whatBonus.push(cb.value));
  const seasonEl=document.querySelector("#seasonGroup input[name='season']:checked");
  const season=seasonEl?seasonEl.value:"";
  const count=parseInt($("#recCount").value,10);
  return{origins,whereFilter,whatBonus,season,count};
}

function renderResults(results){
  const section=$("#resultSection"),list=$("#resultList");list.innerHTML="";
  if(!results.length){
    list.innerHTML=`<div class="card" style="text-align:center;padding:2rem"><p style="font-size:1.1rem;font-weight:600;color:var(--gray-500)">조건에 맞는 여행지가 없습니다 😢</p><p style="font-size:0.85rem;color:var(--gray-400);margin-top:0.5rem">'어디로?' 필터를 줄이거나 해제해보세요.</p></div>`;
    section.classList.remove("hidden");return;
  }
  const whereEmoji={"바다":"🏖️","계곡":"🏞️","산":"⛰️","섬":"🏝️","호수강":"🌊","도시":"🏙️","시골":"🌾"};
  const whatEmoji={"서핑":"🏄","래프팅":"🚣","스노클링":"🤿","스키":"⛷️","패러글라이딩":"🪂","레일바이크":"🚃","먹방":"🍽️","술자리":"🍻","카페":"☕","온천":"♨️","놀이공원":"🎠","워터파크":"🏊"};
  const seasonEmoji={"봄":"🌸","여름":"☀️","가을":"🍂","겨울":"❄️","사계절":"🗓️"};

  results.forEach((r,i)=>{
    const rank=i+1;
    const medal=rank===1?"gold":rank===2?"silver":rank===3?"bronze":"";
    const wTags=r.where.map(w=>`<span class="tag">${whereEmoji[w]||""} ${w}</span>`).join("");
    const aTags=r.what.map(w=>`<span class="tag what">${whatEmoji[w]||""} ${w}</span>`).join("");
    const sTags=r.season.map(s=>`<span class="tag season">${seasonEmoji[s]||""} ${s}</span>`).join("");

    const distRows=r.distInfos.map(d=>{
      if(d.realDist!=null){
        const h=Math.floor(d.durationMin/60),m=d.durationMin%60;
        const t=h>0?`${h}시간 ${m}분`:`${m}분`;
        return`<tr><td>${d.name} (${d.people}명)</td><td class="api-dist">${d.realDist}km <span class="drive-badge">🚗 ${t}</span></td></tr>`;
      }
      return`<tr><td>${d.name} (${d.people}명)</td><td class="fallback-dist">약 ${Math.round(d.dist)}km (추정)</td></tr>`;
    }).join("");

    const card=document.createElement("div");card.className="result-card";card.style.setProperty("--i",i);
    card.innerHTML=`
      <div class="card-top">
        <div class="rank-badge ${medal}">${rank}</div>
        <div class="card-title-area"><div class="card-name">${r.name}</div><div class="card-region">${r.region}</div></div>
        <div class="card-score"><div class="score-value">${r.total}</div><div class="score-label">총점</div></div>
      </div>
      <div class="score-bars">
        <div class="bar-item"><span class="bar-label">균형</span><div class="bar-track"><div class="bar-fill green" style="width:${r.balanceScore}%"></div></div></div>
        <div class="bar-item"><span class="bar-label">거리</span><div class="bar-track"><div class="bar-fill" style="width:${r.distScore}%"></div></div></div>
        <div class="bar-item"><span class="bar-label">놀거리</span><div class="bar-track"><div class="bar-fill orange" style="width:${r.scores.fun}%"></div></div></div>
        <div class="bar-item"><span class="bar-label">먹거리</span><div class="bar-track"><div class="bar-fill orange" style="width:${r.scores.food}%"></div></div></div>
      </div>
      <p class="card-desc">${r.intro}</p>
      <div class="card-reason">💡 ${r.reason}</div>
      <table class="dist-table"><tr><th>출발지</th><th>거리</th></tr>${distRows}</table>
      <div class="detail-block"><div class="detail-title">🎢 놀거리</div><div class="detail-list">${r.activities.join(" · ")}</div></div>
      <div class="detail-block"><div class="detail-title">🍜 먹거리</div><div class="detail-list">${r.foods.join(" · ")}</div></div>
      <div class="detail-block"><div class="detail-title">🔍 숙소 검색</div><div class="detail-list">${r.stayKeyword}</div></div>
      <div class="tag-row">${wTags}${aTags}${sTags}</div>`;
    list.appendChild(card);
  });
  section.classList.remove("hidden");
  section.scrollIntoView({behavior:"smooth",block:"start"});
}

function buildCopyText(results,origins){
  const total=origins.reduce((s,o)=>s+o.people,0);
  const oStr=origins.map(o=>`${o.name}(${o.people}명)`).join(", ");
  let t=`🗺️ 어디서 만날까? 추천 결과\n👥 ${oStr} (총 ${total}명)\n${"─".repeat(24)}\n\n`;
  results.forEach((r,i)=>{
    const m=i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}위`;
    t+=`${m} ${r.name} (${r.total}점)\n📍 ${r.region}\n📝 ${r.intro}\n💡 ${r.reason}\n`;
    r.distInfos.forEach(d=>{
      if(d.realDist!=null){const h=Math.floor(d.durationMin/60),mn=d.durationMin%60;t+=`  🚗 ${d.name}: ${d.realDist}km (${h>0?h+"시간 ":""}${mn}분)\n`}
      else t+=`  🚗 ${d.name}: 약 ${Math.round(d.dist)}km\n`;
    });
    t+=`🎢 ${r.activities.join(", ")}\n🍜 ${r.foods.join(", ")}\n🔍 숙소: ${r.stayKeyword}\n\n`;
  });
  t+=`${"─".repeat(24)}\n✈️ "어디서 만날까?" 앱으로 추천받았어요!`;
  return t;
}

function showToast(msg){
  const t=$("#toast");t.textContent=msg;t.classList.remove("hidden");t.classList.add("show");
  setTimeout(()=>{t.classList.remove("show");setTimeout(()=>t.classList.add("hidden"),300)},2000);
}

function updateApiBadge(){
  const b=$("#apiBadge"),key=getApiKey();
  if(key){b.textContent="ON";b.classList.add("on")}else{b.textContent="OFF";b.classList.remove("on")}
  const custom=localStorage.getItem("kakaoApiKey");
  if(!custom&&DEFAULT_API_KEY){$("#apiStatus").textContent="✅ 기본 API 키 내장 — 바로 사용 가능";$("#apiStatus").className="api-status success"}
}

// ──── 9. 초기화 ────
let lastResults=[],lastOrigins=[];

function init(){
  initOrigins();
  $("#addOriginBtn").addEventListener("click",()=>{
    $("#originList").appendChild(createOriginRow("",0,0,2));updateRemoveButtons();
    // 새 행의 인풋에 포커스
    const rows=$$("#originList .origin-row");
    const lastRow=rows[rows.length-1];
    lastRow.querySelector("input[type='text']").focus();
  });

  // API 토글
  $("#apiToggleBtn").addEventListener("click",()=>{
    const body=$("#apiBody"),btn=$("#apiToggleBtn");
    const h=body.classList.contains("hidden");body.classList.toggle("hidden");
    btn.textContent=h?"닫기":"설정";
  });
  $("#kakaoApiKey").value=localStorage.getItem("kakaoApiKey")||"";
  updateApiBadge();

  $("#saveKeyBtn").addEventListener("click",async()=>{
    const key=$("#kakaoApiKey").value.trim(),st=$("#apiStatus");
    if(!key){saveApiKey("");updateApiBadge();st.textContent="키 제거됨. 기본 키 사용.";st.className="api-status";return}
    st.textContent="확인 중…";st.className="api-status";
    const test=await fetchKakaoRoute(37.5665,126.978,36.3504,127.3845,key);
    if(test){saveApiKey(key);updateApiBadge();st.textContent=`✅ 성공! 서울→대전 ${(test.distance/1000).toFixed(1)}km`;st.className="api-status success"}
    else{st.textContent="❌ 실패. 키를 확인해주세요.";st.className="api-status error"}
  });

  // 추천 버튼
  $("#searchBtn").addEventListener("click",async()=>{
    const{origins,whereFilter,whatBonus,season,count}=getInputs();
    if(!origins.length){showToast("출발지를 선택해주세요!");return}
    const section=$("#resultSection"),loading=$("#loading"),resultList=$("#resultList"),mapCard=$("#mapCard"),btn=$("#searchBtn");

    let scored=calcScores(origins,whereFilter,whatBonus,season);
    const apiKey=getApiKey();
    if(apiKey&&scored.length>0){
      const candidates=scored.slice(0,count+3);
      btn.disabled=true;btn.textContent="거리 계산 중… 🔄";
      section.classList.remove("hidden");resultList.innerHTML="";mapCard.classList.add("hidden");loading.classList.remove("hidden");
      const cache=await fetchAllDistances(origins,candidates,apiKey,(done,total)=>{
        loading.querySelector("p").textContent=`도로 거리 계산 중… (${done}/${total})`;
      });
      recalcWithRealDist(candidates,origins,cache);scored=candidates;
      loading.classList.add("hidden");btn.disabled=false;btn.textContent="여행지 추천받기 ✈️";
    }
    lastResults=scored.slice(0,count);lastOrigins=origins;
    renderResults(lastResults);
    if(apiKey&&lastResults.length>0) showResultsOnMap(lastResults,apiKey);
  });

  // 복사
  $("#copyBtn").addEventListener("click",()=>{
    if(!lastResults.length)return;
    const text=buildCopyText(lastResults,lastOrigins);
    navigator.clipboard.writeText(text).then(()=>showToast("클립보드에 복사! 📋")).catch(()=>{
      const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);showToast("클립보드에 복사! 📋");
    });
  });
}

document.addEventListener("DOMContentLoaded",init);
