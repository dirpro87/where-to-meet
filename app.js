/* ============================================================
   app.js – 어디서 만날까? 전국 여행지 추천 앱
   ============================================================ */

// ──────────────────────────────────────────────
// 1. 출발지 데이터 (전국 주요 도시 35개)
//    name: 표시명, lat/lng: 위도경도
// ──────────────────────────────────────────────
const ORIGINS = [
  { name: "서울", lat: 37.5665, lng: 126.978 },
  { name: "부산", lat: 35.1796, lng: 129.0756 },
  { name: "대구", lat: 35.8714, lng: 128.6014 },
  { name: "인천", lat: 37.4563, lng: 126.7052 },
  { name: "광주", lat: 35.1595, lng: 126.8526 },
  { name: "대전", lat: 36.3504, lng: 127.3845 },
  { name: "울산", lat: 35.5384, lng: 129.3114 },
  { name: "세종", lat: 36.48, lng: 127.2589 },
  { name: "수원", lat: 37.2636, lng: 127.0286 },
  { name: "성남", lat: 37.4201, lng: 127.1265 },
  { name: "고양", lat: 37.6584, lng: 126.832 },
  { name: "용인", lat: 37.2411, lng: 127.1776 },
  { name: "창원", lat: 35.2281, lng: 128.6812 },
  { name: "청주", lat: 36.6424, lng: 127.489 },
  { name: "천안", lat: 36.8151, lng: 127.1139 },
  { name: "전주", lat: 35.8242, lng: 127.148 },
  { name: "김해", lat: 35.2285, lng: 128.8894 },
  { name: "포항", lat: 36.019, lng: 129.3435 },
  { name: "제주", lat: 33.4996, lng: 126.5312 },
  { name: "춘천", lat: 37.8813, lng: 127.7298 },
  { name: "원주", lat: 37.3422, lng: 127.9202 },
  { name: "강릉", lat: 37.7519, lng: 128.8761 },
  { name: "속초", lat: 38.207, lng: 128.5918 },
  { name: "여수", lat: 34.7604, lng: 127.6622 },
  { name: "순천", lat: 34.9506, lng: 127.4873 },
  { name: "목포", lat: 34.8118, lng: 126.3922 },
  { name: "안동", lat: 36.5684, lng: 128.7294 },
  { name: "경주", lat: 35.8562, lng: 129.2247 },
  { name: "통영", lat: 34.8544, lng: 128.4331 },
  { name: "군산", lat: 35.9676, lng: 126.7368 },
  { name: "익산", lat: 35.9483, lng: 126.9576 },
  { name: "김천", lat: 36.1398, lng: 128.1136 },
  { name: "양양", lat: 38.0753, lng: 128.6189 },
  { name: "평택", lat: 36.9921, lng: 127.1127 },
  { name: "파주", lat: 37.7599, lng: 126.7802 },
];

// ──────────────────────────────────────────────
// 2. 후보 여행지 데이터 (전국 85개)
//    tags: 여행 타입 태그
//    facilities: 숙소 시설 태그
//    scores: 놀거리/숙소/먹거리/단체여행 점수 (0~100)
// ──────────────────────────────────────────────
const DESTINATIONS = [
  // ── 강원도 ──
  {
    name: "강릉 경포", region: "강원 강릉", lat: 37.7943, lng: 128.9080,
    tags: ["자연계곡", "먹방", "액티비티"],
    facilities: ["바비큐", "수영장"],
    scores: { fun: 88, stay: 82, food: 90, group: 85 },
    intro: "동해 바다와 커피거리, 먹거리가 함께하는 강원 대표 여행지",
    reason: "바다+커피+횟집 조합이 강력하고, 단체 숙소가 풍부합니다",
    activities: ["경포해변 서핑", "안목커피거리", "경포대 산책", "오죽헌 관람"],
    foods: ["초당순두부", "장칼국수", "물회", "감자옹심이"],
    stayKeyword: "강릉 경포 단체 펜션"
  },
  {
    name: "속초·양양", region: "강원 속초/양양", lat: 38.1900, lng: 128.5900,
    tags: ["액티비티", "먹방", "자연계곡"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 90, stay: 78, food: 88, group: 80 },
    intro: "서핑, 설악산, 아바이마을 등 놀거리 폭발 지역",
    reason: "서핑+설악산+중앙시장 야시장으로 3박도 빡빡한 일정",
    activities: ["양양 서핑", "설악산 케이블카", "속초 중앙시장", "영금정 일출"],
    foods: ["속초 닭강정", "아바이순대", "물회", "장칼국수"],
    stayKeyword: "양양 서핑 단체숙소"
  },
  {
    name: "춘천", region: "강원 춘천", lat: 37.8813, lng: 127.7298,
    tags: ["먹방", "액티비티", "자연계곡"],
    facilities: ["바비큐", "족구장"],
    scores: { fun: 75, stay: 70, food: 85, group: 78 },
    intro: "닭갈비+막국수의 성지, 남이섬과 레고랜드",
    reason: "서울에서 가까우면서도 자연과 먹거리 모두 만족",
    activities: ["남이섬", "레고랜드", "의암호 카누", "김유정문학촌"],
    foods: ["닭갈비", "막국수", "감자전", "메밀국수"],
    stayKeyword: "춘천 남이섬 펜션"
  },
  {
    name: "평창", region: "강원 평창", lat: 37.3705, lng: 128.3906,
    tags: ["자연계곡", "숙소에서놀기"],
    facilities: ["바비큐", "독채", "수영장"],
    scores: { fun: 72, stay: 88, food: 65, group: 82 },
    intro: "고원 리조트와 목장, 사계절 자연을 즐기는 힐링 여행지",
    reason: "대관령 양떼목장+리조트 풀빌라로 단체 힐링에 최적",
    activities: ["대관령 양떼목장", "오대산 월정사", "용평리조트", "하늘목장"],
    foods: ["한우구이", "메밀전병", "황태해장국", "감자옹심이"],
    stayKeyword: "평창 풀빌라 단체"
  },
  {
    name: "홍천", region: "강원 홍천", lat: 37.6970, lng: 127.8885,
    tags: ["자연계곡", "숙소에서놀기"],
    facilities: ["바비큐", "족구장", "독채", "수영장"],
    scores: { fun: 70, stay: 85, food: 60, group: 88 },
    intro: "수도권에서 가장 접근성 좋은 계곡+펜션 성지",
    reason: "서울 1시간대, 계곡 독채 펜션이 무한대로 선택지 넓음",
    activities: ["용소계곡 물놀이", "비발디파크", "공작산 트레킹", "수타사"],
    foods: ["한우구이", "잣두부", "메밀국수", "닭볶음탕"],
    stayKeyword: "홍천 계곡 독채 펜션"
  },
  {
    name: "가평", region: "경기 가평", lat: 37.8315, lng: 127.5096,
    tags: ["자연계곡", "숙소에서놀기", "액티비티"],
    facilities: ["바비큐", "족구장", "수영장", "노래방", "독채"],
    scores: { fun: 82, stay: 90, food: 62, group: 92 },
    intro: "수도권 당일치기부터 1박까지, 단체 MT의 성지",
    reason: "서울에서 1시간, 족구+바비큐+계곡 풀세트 펜션 천국",
    activities: ["제이드가든", "남이섬", "쁘띠프랑스", "번지점프", "유명산계곡"],
    foods: ["잣두부", "닭갈비", "송어회", "흑돼지구이"],
    stayKeyword: "가평 단체 펜션 족구장"
  },
  {
    name: "양평", region: "경기 양평", lat: 37.4917, lng: 127.4876,
    tags: ["자연계곡", "숙소에서놀기"],
    facilities: ["바비큐", "독채", "수영장"],
    scores: { fun: 68, stay: 82, food: 65, group: 80 },
    intro: "두물머리와 세미원, 조용한 힐링 여행의 정석",
    reason: "서울 근교 자연 속 풀빌라 다양, 커플~단체 모두 만족",
    activities: ["두물머리 일출", "세미원수생식물원", "양평 레일바이크", "용문사"],
    foods: ["한우구이", "닭백숙", "두부요리", "산채정식"],
    stayKeyword: "양평 풀빌라 단체"
  },
  {
    name: "포천", region: "경기 포천", lat: 37.8948, lng: 127.2003,
    tags: ["자연계곡", "숙소에서놀기", "액티비티"],
    facilities: ["바비큐", "족구장", "독채"],
    scores: { fun: 72, stay: 78, food: 58, group: 85 },
    intro: "아트밸리, 허브아일랜드 등 볼거리+계곡 동시 해결",
    reason: "서울 북쪽 1시간, 단체 펜션 가성비 좋고 놀거리 다양",
    activities: ["포천아트밸리", "허브아일랜드", "산정호수", "비둘기낭폭포"],
    foods: ["이동갈비", "메밀국수", "잣두부", "한우구이"],
    stayKeyword: "포천 단체 펜션 바비큐"
  },
  {
    name: "정선", region: "강원 정선", lat: 37.3809, lng: 128.6609,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 75, stay: 72, food: 68, group: 70 },
    intro: "병방치 스카이워크, 레일바이크, 5일장의 고장",
    reason: "아찔한 스카이워크와 정선5일장 체험이 색다른 재미",
    activities: ["병방치 스카이워크", "레일바이크", "정선5일장", "아우라지"],
    foods: ["곤드레밥", "메밀전병", "한우구이", "올챙이국수"],
    stayKeyword: "정선 단체 펜션"
  },
  {
    name: "동해·삼척", region: "강원 동해/삼척", lat: 37.5245, lng: 129.1143,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐"],
    scores: { fun: 78, stay: 68, food: 72, group: 70 },
    intro: "무릉계곡, 환선굴, 해안 드라이브 명소",
    reason: "천연 동굴+계곡+바다를 한 번에, 한적하고 자연 가득",
    activities: ["무릉계곡", "환선굴", "추암촛대바위", "쏠비치"],
    foods: ["곰치국", "물회", "해산물구이", "메밀국수"],
    stayKeyword: "삼척 바다 펜션"
  },
  // ── 충청도 ──
  {
    name: "대천·보령", region: "충남 보령", lat: 36.3335, lng: 126.6127,
    tags: ["액티비티", "먹방"],
    facilities: ["바비큐", "수영장"],
    scores: { fun: 80, stay: 72, food: 78, group: 82 },
    intro: "머드축제와 대천해수욕장, 여름 단체여행 1순위",
    reason: "해수욕+머드축제+조개구이로 여름 단체여행 가성비 최강",
    activities: ["대천해수욕장", "머드축제", "개화예술공원", "성주산자연휴양림"],
    foods: ["조개구이", "꽃게찜", "키조개회", "굴국밥"],
    stayKeyword: "대천 단체 펜션"
  },
  {
    name: "단양", region: "충북 단양", lat: 36.9845, lng: 128.3657,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 82, stay: 74, food: 72, group: 78 },
    intro: "소백산, 도담삼봉, 패러글라이딩의 중부 액티비티 성지",
    reason: "패러글라이딩+만천하스카이워크+수양개 코스 알참",
    activities: ["만천하스카이워크", "패러글라이딩", "고수동굴", "도담삼봉"],
    foods: ["마늘떡갈비", "다슬기해장국", "산채비빔밥", "한우구이"],
    stayKeyword: "단양 단체 펜션"
  },
  {
    name: "충주", region: "충북 충주", lat: 36.9910, lng: 127.9260,
    tags: ["자연계곡", "숙소에서놀기"],
    facilities: ["바비큐", "족구장"],
    scores: { fun: 65, stay: 72, food: 62, group: 75 },
    intro: "충주호와 수안보온천, 조용한 단체 힐링 여행",
    reason: "중부 접근성 좋고 온천+호수 조합으로 가성비 힐링",
    activities: ["충주호 유람선", "수안보온천", "탄금대", "중앙탑사적공원"],
    foods: ["사과한우", "올갱이국", "떡갈비", "산채정식"],
    stayKeyword: "충주 수안보 단체 숙소"
  },
  {
    name: "태안", region: "충남 태안", lat: 36.7456, lng: 126.2979,
    tags: ["자연계곡", "숙소에서놀기"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 72, stay: 76, food: 75, group: 78 },
    intro: "서해 대표 해변, 조개구이와 낙조의 절경",
    reason: "만리포·꽃지해변 낙조+조개구이로 가성비 바다 여행",
    activities: ["만리포해변", "꽃지해변 낙조", "안면도 자연휴양림", "해변 ATV"],
    foods: ["꽃게찜", "조개구이", "새조개", "해물칼국수"],
    stayKeyword: "태안 안면도 단체 펜션"
  },
  {
    name: "공주·부여", region: "충남 공주/부여", lat: 36.4626, lng: 127.1190,
    tags: ["먹방", "자연계곡"],
    facilities: ["바비큐"],
    scores: { fun: 65, stay: 62, food: 70, group: 65 },
    intro: "백제문화유산과 공산성, 역사 여행의 묘미",
    reason: "대전 근교 역사탐방+먹거리 코스, 조용하고 가성비 좋음",
    activities: ["공산성", "무령왕릉", "부소산성", "궁남지"],
    foods: ["밤묵", "연잎밥", "공주국밥", "칼국수"],
    stayKeyword: "공주 단체 숙소"
  },
  // ── 경상도 ──
  {
    name: "경주", region: "경북 경주", lat: 35.8562, lng: 129.2247,
    tags: ["먹방", "액티비티"],
    facilities: ["바비큐", "수영장"],
    scores: { fun: 85, stay: 80, food: 82, group: 82 },
    intro: "천년고도 유적+한옥+찜질방, 코스가 넘치는 역사 도시",
    reason: "불국사~대릉원~교촌한옥~황리단길 하루종일 볼거리",
    activities: ["불국사", "대릉원 야경", "황리단길", "교촌한옥마을", "문무대왕릉"],
    foods: ["경주빵", "황남빵", "한우짚불구이", "보문단지 맛집"],
    stayKeyword: "경주 한옥 단체 숙소"
  },
  {
    name: "거제", region: "경남 거제", lat: 34.8806, lng: 128.6211,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐", "수영장"],
    scores: { fun: 82, stay: 75, food: 78, group: 75 },
    intro: "바람의 언덕, 해금강, 몽돌해변의 남해안 섬 여행",
    reason: "해금강 유람선+바람의 언덕+해수욕 조합이 환상적",
    activities: ["바람의 언덕", "해금강 유람선", "외도보타니아", "학동몽돌해변"],
    foods: ["멍게비빔밥", "해물뚝배기", "장어구이", "조개구이"],
    stayKeyword: "거제 바다 단체 펜션"
  },
  {
    name: "통영", region: "경남 통영", lat: 34.8544, lng: 128.4331,
    tags: ["먹방", "액티비티", "도시술자리"],
    facilities: ["바비큐"],
    scores: { fun: 85, stay: 72, food: 92, group: 78 },
    intro: "한국의 나폴리, 케이블카와 해산물의 천국",
    reason: "해산물 먹방+케이블카+동피랑벽화마을 완벽 코스",
    activities: ["한려수도케이블카", "동피랑벽화마을", "루지", "중앙시장"],
    foods: ["충무김밥", "굴구이", "해물뚝배기", "꿀빵"],
    stayKeyword: "통영 단체 숙소"
  },
  {
    name: "부산 해운대", region: "부산", lat: 35.1588, lng: 129.1604,
    tags: ["도시술자리", "먹방", "액티비티"],
    facilities: ["수영장", "노래방"],
    scores: { fun: 92, stay: 85, food: 90, group: 88 },
    intro: "해운대·광안리·서면, 대한민국 대표 해양 도시",
    reason: "바다+맛집+술집+클럽이 한 동네에, 단체 밤문화 최강",
    activities: ["해운대해수욕장", "광안리 야경", "해동용궁사", "감천문화마을", "자갈치시장"],
    foods: ["돼지국밥", "밀면", "씨앗호떡", "회센터"],
    stayKeyword: "해운대 단체 숙소"
  },
  {
    name: "부산 서면·남포", region: "부산", lat: 35.1575, lng: 129.0596,
    tags: ["도시술자리", "먹방"],
    facilities: ["노래방"],
    scores: { fun: 85, stay: 78, food: 92, group: 85 },
    intro: "부산의 핵심 번화가, 먹거리+술자리 무한대",
    reason: "BIFF광장+서면+남포동 먹자골목 동선이 편하고 술자리 다양",
    activities: ["BIFF광장", "자갈치시장", "서면 먹자골목", "용두산공원"],
    foods: ["돼지국밥", "씨앗호떡", "비빔당면", "부산어묵"],
    stayKeyword: "부산 서면 모텔 단체"
  },
  {
    name: "울산 간절곶·대왕암", region: "울산", lat: 35.3616, lng: 129.3572,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 70, stay: 65, food: 75, group: 65 },
    intro: "한반도 가장 먼저 해 뜨는 곳, 대왕암공원 산책",
    reason: "일출+대왕암+고래고기 이색 체험, 부산 근교 대안",
    activities: ["간절곶 일출", "대왕암공원", "태화강국가정원", "장생포 고래마을"],
    foods: ["고래고기", "언양불고기", "한우국밥", "회"],
    stayKeyword: "울산 단체 숙소"
  },
  // ── 전라도 ──
  {
    name: "여수", region: "전남 여수", lat: 34.7604, lng: 127.6622,
    tags: ["먹방", "액티비티", "도시술자리"],
    facilities: ["바비큐", "수영장"],
    scores: { fun: 88, stay: 78, food: 90, group: 82 },
    intro: "여수 밤바다, 해상케이블카, 낭만 해양도시",
    reason: "밤바다+해상케이블카+갓김치 삼합으로 로맨틱+먹방 동시",
    activities: ["여수 해상케이블카", "오동도", "이순신광장 야시장", "향일암"],
    foods: ["갓김치삼합", "돌산갓김치", "서대회무침", "굴구이"],
    stayKeyword: "여수 바다 단체 숙소"
  },
  {
    name: "순천", region: "전남 순천", lat: 34.9506, lng: 127.4873,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 75, stay: 68, food: 78, group: 70 },
    intro: "순천만습지와 낙안읍성, 자연 생태 여행의 정석",
    reason: "순천만 갈대밭+낙안읍성+순천만국가정원 힐링 코스",
    activities: ["순천만습지", "순천만국가정원", "낙안읍성", "선암사"],
    foods: ["짱뚱어탕", "꼬막비빔밥", "한정식", "녹차"],
    stayKeyword: "순천 단체 숙소"
  },
  {
    name: "전주 한옥마을", region: "전북 전주", lat: 35.8159, lng: 127.1530,
    tags: ["먹방", "도시술자리"],
    facilities: ["노래방"],
    scores: { fun: 80, stay: 75, food: 95, group: 82 },
    intro: "비빔밥, 한옥, 막걸리골목 – 먹방 여행의 성지",
    reason: "한옥마을 먹방+막걸리골목+경기전 코스 완벽",
    activities: ["전주한옥마을", "경기전", "막걸리골목", "전동성당", "남부시장"],
    foods: ["비빔밥", "콩나물국밥", "막걸리+한상", "PNB초코파이"],
    stayKeyword: "전주 한옥마을 단체 숙소"
  },
  {
    name: "담양", region: "전남 담양", lat: 35.3213, lng: 126.9882,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 68, stay: 72, food: 78, group: 70 },
    intro: "대나무숲 죽녹원과 메타세콰이아길, 힐링 사진 명소",
    reason: "죽녹원+메타세콰이아길+떡갈비로 힐링+먹방 동시",
    activities: ["죽녹원", "메타세콰이아길", "소쇄원", "가사문학면"],
    foods: ["대통밥", "떡갈비", "국수", "죽순요리"],
    stayKeyword: "담양 독채 펜션"
  },
  {
    name: "군산", region: "전북 군산", lat: 35.9676, lng: 126.7368,
    tags: ["먹방", "도시술자리"],
    facilities: [],
    scores: { fun: 70, stay: 62, food: 82, group: 68 },
    intro: "근대문화유산과 빵집 투어, 시간여행 도시",
    reason: "이성당빵+짬뽕+근대거리 산책으로 레트로 감성 가득",
    activities: ["경암동 철길마을", "근대역사박물관", "새만금방조제", "선유도"],
    foods: ["이성당 단팥빵", "중국집 짬뽕", "꽃게장", "호떡"],
    stayKeyword: "군산 단체 숙소"
  },
  {
    name: "목포", region: "전남 목포", lat: 34.8118, lng: 126.3922,
    tags: ["먹방", "도시술자리"],
    facilities: [],
    scores: { fun: 68, stay: 60, food: 88, group: 65 },
    intro: "세발낙지, 홍어, 민어… 해산물 먹방의 끝판왕",
    reason: "해산물 먹방에 미쳐보고 싶다면 목포가 답",
    activities: ["유달산", "목포근대역사관", "해상케이블카", "갓바위"],
    foods: ["세발낙지", "홍어삼합", "민어회", "꽃게장백반"],
    stayKeyword: "목포 단체 숙소"
  },
  // ── 제주 ──
  {
    name: "제주 동부", region: "제주", lat: 33.4580, lng: 126.9300,
    tags: ["자연계곡", "액티비티"],
    facilities: ["수영장", "바비큐", "독채"],
    scores: { fun: 90, stay: 85, food: 80, group: 80 },
    intro: "성산일출봉, 만장굴, 우도 – 제주 자연의 핵심",
    reason: "성산일출봉+우도+비자림 대자연 코스, 독채 풀빌라 다양",
    activities: ["성산일출봉", "우도", "만장굴", "비자림", "섭지코지"],
    foods: ["흑돼지구이", "해물뚝배기", "전복죽", "감귤"],
    stayKeyword: "제주 동부 풀빌라 단체"
  },
  {
    name: "제주 서부", region: "제주", lat: 33.2530, lng: 126.2500,
    tags: ["자연계곡", "숙소에서놀기"],
    facilities: ["수영장", "바비큐", "독채"],
    scores: { fun: 82, stay: 88, food: 75, group: 82 },
    intro: "한림공원, 협재해변, 오설록 – 제주 서쪽의 여유",
    reason: "협재 에메랄드 바다+오설록+풀빌라로 럭셔리 힐링",
    activities: ["협재해변", "오설록 티뮤지엄", "한림공원", "곽지해변"],
    foods: ["고기국수", "전복죽", "흑돼지", "딱새우회"],
    stayKeyword: "제주 서부 풀빌라"
  },
  {
    name: "서귀포", region: "제주 서귀포", lat: 33.2531, lng: 126.5653,
    tags: ["자연계곡", "먹방", "액티비티"],
    facilities: ["수영장", "바비큐", "독채"],
    scores: { fun: 88, stay: 85, food: 82, group: 80 },
    intro: "중문관광단지, 정방폭포, 올레길의 중심",
    reason: "중문리조트+폭포+올레길+흑돼지로 완벽 코스",
    activities: ["중문관광단지", "정방폭포", "천지연폭포", "주상절리", "올레길"],
    foods: ["흑돼지구이", "갈치조림", "전복뚝배기", "해물라면"],
    stayKeyword: "서귀포 중문 단체 리조트"
  },
  {
    name: "제주시내", region: "제주", lat: 33.4996, lng: 126.5312,
    tags: ["먹방", "도시술자리"],
    facilities: ["노래방"],
    scores: { fun: 78, stay: 75, food: 85, group: 80 },
    intro: "탑동 해안도로, 동문시장, 제주 술자리의 중심",
    reason: "동문시장 야시장+탑동 술집거리+용두암 야경 코스",
    activities: ["동문시장", "탑동해안도로", "용두암", "한라수목원"],
    foods: ["흑돼지", "고기국수", "해물탕", "빙떡"],
    stayKeyword: "제주시 단체 게스트하우스"
  },
  // ── 대구·경북 ──
  {
    name: "안동", region: "경북 안동", lat: 36.5684, lng: 128.7294,
    tags: ["먹방"],
    facilities: ["바비큐"],
    scores: { fun: 68, stay: 62, food: 82, group: 62 },
    intro: "하회마을, 찜닭, 간고등어 – 전통과 먹방의 도시",
    reason: "하회마을 탈춤+안동찜닭+간고등어로 이색 먹방 여행",
    activities: ["하회마을", "도산서원", "월영교 야경", "안동탈춤"],
    foods: ["안동찜닭", "간고등어", "헛제사밥", "안동식혜"],
    stayKeyword: "안동 한옥 단체 숙소"
  },
  {
    name: "대구 도심", region: "대구", lat: 35.8714, lng: 128.6014,
    tags: ["먹방", "도시술자리"],
    facilities: ["노래방"],
    scores: { fun: 75, stay: 72, food: 85, group: 80 },
    intro: "동성로, 서문시장, 앞산 야경 – 대구의 알짜 코스",
    reason: "서문시장 야시장+동성로+앞산 야경으로 먹고놀기 최적",
    activities: ["동성로", "서문시장 야시장", "앞산전망대", "김광석길"],
    foods: ["막창", "납작만두", "뭉티기", "동인동찜갈비"],
    stayKeyword: "대구 동성로 단체 숙소"
  },
  {
    name: "포항", region: "경북 포항", lat: 36.0190, lng: 129.3435,
    tags: ["먹방", "자연계곡"],
    facilities: ["바비큐"],
    scores: { fun: 72, stay: 65, food: 82, group: 68 },
    intro: "호미곶, 구룡포 일본인거리, 과메기의 도시",
    reason: "호미곶 일출+구룡포 거리+과메기로 동해안 이색 여행",
    activities: ["호미곶", "구룡포 일본인거리", "이가리 닻전망대", "영일대해수욕장"],
    foods: ["과메기", "물회", "대게", "구룡포모리국수"],
    stayKeyword: "포항 단체 숙소"
  },
  // ── 전국 주요 추가 ──
  {
    name: "대전 도심", region: "대전", lat: 36.3504, lng: 127.3845,
    tags: ["먹방", "도시술자리"],
    facilities: ["노래방"],
    scores: { fun: 70, stay: 68, food: 78, group: 75 },
    intro: "성심당, 둔산동, 유성온천 – 중부 허브 도시",
    reason: "성심당+은행동+유성온천으로 중부 모임에 접근성 최고",
    activities: ["성심당", "대전엑스포과학공원", "유성온천", "계족산황토길"],
    foods: ["성심당 튀김소보로", "두부두루치기", "칼국수", "소머리국밥"],
    stayKeyword: "대전 유성 단체 숙소"
  },
  {
    name: "광주 도심", region: "광주", lat: 35.1595, lng: 126.8526,
    tags: ["먹방", "도시술자리"],
    facilities: ["노래방"],
    scores: { fun: 72, stay: 68, food: 88, group: 78 },
    intro: "무등산, 양동시장, 1913송정역시장 – 맛의 도시",
    reason: "상무지구 술자리+양동시장 먹방+무등산 코스 알참",
    activities: ["무등산", "양동시장", "1913송정역시장", "국립아시아문화전당"],
    foods: ["상추튀김", "광주김치", "떡갈비", "한정식"],
    stayKeyword: "광주 상무 단체 숙소"
  },
  {
    name: "인천 을왕리·영종", region: "인천", lat: 37.4467, lng: 126.3830,
    tags: ["숙소에서놀기", "도시술자리"],
    facilities: ["바비큐", "수영장", "노래방"],
    scores: { fun: 72, stay: 75, food: 70, group: 78 },
    intro: "을왕리 해변, 영종도 카페거리 – 수도권 바다 근교",
    reason: "서울 1시간 이내 바다+리조트, 당일치기~1박 최적",
    activities: ["을왕리해수욕장", "마시안해변", "BMW드라이빙센터", "영종 카페거리"],
    foods: ["조개구이", "칼국수", "해물탕", "중국음식"],
    stayKeyword: "을왕리 단체 펜션"
  },
  // ── 추가 여행지 ──
  {
    name: "남해", region: "경남 남해", lat: 34.8375, lng: 127.8925,
    tags: ["자연계곡", "숙소에서놀기"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 78, stay: 80, food: 75, group: 72 },
    intro: "독일마을, 다랭이마을, 상주은모래해변의 보석 같은 섬",
    reason: "독일마을+다랭이논+해변 드라이브로 힐링 만점",
    activities: ["독일마을", "다랭이마을", "상주은모래해변", "보리암"],
    foods: ["멸치쌈밥", "물메기탕", "해물뚝배기", "갈치조림"],
    stayKeyword: "남해 독채 펜션"
  },
  {
    name: "하동", region: "경남 하동", lat: 35.0674, lng: 127.7514,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 70, stay: 72, food: 78, group: 68 },
    intro: "섬진강 벚꽃길, 녹차밭, 재첩국의 고장",
    reason: "섬진강+녹차밭+재첩국으로 자연 속 먹방 힐링",
    activities: ["쌍계사", "화개장터", "하동녹차밭", "섬진강 래프팅"],
    foods: ["재첩국", "참게장", "녹차", "산채비빔밥"],
    stayKeyword: "하동 독채 펜션"
  },
  {
    name: "영월", region: "강원 영월", lat: 37.1837, lng: 128.4617,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 72, stay: 70, food: 62, group: 68 },
    intro: "동강래프팅, 별마로천문대, 청령포의 강원 소도시",
    reason: "동강래프팅+별마로천문대+청령포로 이색 체험 가득",
    activities: ["동강래프팅", "별마로천문대", "청령포", "선돌"],
    foods: ["곤드레밥", "다슬기수제비", "메밀전병", "한우구이"],
    stayKeyword: "영월 단체 펜션"
  },
  {
    name: "무주", region: "전북 무주", lat: 35.9094, lng: 127.6607,
    tags: ["자연계곡", "숙소에서놀기", "액티비티"],
    facilities: ["바비큐", "족구장", "수영장"],
    scores: { fun: 78, stay: 82, food: 60, group: 85 },
    intro: "덕유산, 무주리조트, 반딧불이 축제의 자연 천국",
    reason: "리조트 시설+계곡+반딧불이 체험으로 단체 MT 강추",
    activities: ["무주리조트", "덕유산 케이블카", "반디랜드", "구천동계곡"],
    foods: ["어죽", "산채비빔밥", "메밀국수", "한우구이"],
    stayKeyword: "무주 리조트 단체"
  },
  {
    name: "영덕·울진", region: "경북 영덕/울진", lat: 36.5326, lng: 129.3654,
    tags: ["먹방", "자연계곡"],
    facilities: ["바비큐"],
    scores: { fun: 70, stay: 62, food: 85, group: 62 },
    intro: "대게의 본고장, 불영계곡과 동해안 비경",
    reason: "영덕대게+울진 불영계곡으로 먹방+자연 동시 공략",
    activities: ["영덕 블루로드", "불영계곡", "월송정", "죽변등대"],
    foods: ["영덕대게", "물회", "곰치국", "해물라면"],
    stayKeyword: "영덕 단체 펜션"
  },
  {
    name: "완도", region: "전남 완도", lat: 34.3108, lng: 126.7550,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 68, stay: 60, food: 80, group: 58 },
    intro: "청산도, 전복, 해조류의 섬 – 완도 청정 바다",
    reason: "청산도 슬로길+전복요리로 느린 여행의 정수",
    activities: ["청산도", "완도타워", "신지명사십리해변", "완도수목원"],
    foods: ["전복삼합", "해초비빔밥", "전복죽", "매생이국"],
    stayKeyword: "완도 단체 숙소"
  },
  {
    name: "진도", region: "전남 진도", lat: 34.4869, lng: 126.2631,
    tags: ["자연계곡", "먹방"],
    facilities: [],
    scores: { fun: 65, stay: 55, food: 75, group: 55 },
    intro: "신비의 바닷길, 진도개, 울돌목의 섬",
    reason: "바닷길 축제+진도 홍주+해산물로 이색 체험",
    activities: ["신비의바닷길", "운림산방", "쏠비치", "울돌목"],
    foods: ["홍주", "전복죽", "해산물구이", "산낙지"],
    stayKeyword: "진도 단체 숙소"
  },
  {
    name: "보성", region: "전남 보성", lat: 34.7714, lng: 127.0798,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 68, stay: 62, food: 72, group: 60 },
    intro: "녹차밭 전경과 율포해수녹차탕, 초록빛 힐링",
    reason: "대한다원 녹차밭+녹차 족욕+꼬막으로 힐링 코스",
    activities: ["대한다원 녹차밭", "율포해수녹차탕", "벌교꼬막거리", "태백산맥문학관"],
    foods: ["녹차", "꼬막비빔밥", "한정식", "녹차아이스크림"],
    stayKeyword: "보성 단체 숙소"
  },
  {
    name: "제천", region: "충북 제천", lat: 37.1325, lng: 128.1910,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐"],
    scores: { fun: 72, stay: 65, food: 65, group: 68 },
    intro: "의림지, 청풍호반, 배론성지의 충북 명소",
    reason: "청풍호 유람선+월악산+의림지로 자연 힐링 코스",
    activities: ["청풍호 유람선", "월악산", "의림지", "배론성지"],
    foods: ["약선요리", "한우구이", "메밀국수", "산채비빔밥"],
    stayKeyword: "제천 단체 펜션"
  },
  {
    name: "서산·해미", region: "충남 서산", lat: 36.7849, lng: 126.4503,
    tags: ["먹방", "자연계곡"],
    facilities: ["바비큐"],
    scores: { fun: 62, stay: 60, food: 72, group: 62 },
    intro: "해미읍성, 서산마애삼존불, 천수만의 충남 역사도시",
    reason: "해미읍성+서산 어리굴젓+천수만 철새도래지 이색 코스",
    activities: ["해미읍성", "서산마애삼존불", "천수만", "간월암"],
    foods: ["어리굴젓", "꽃게탕", "새조개", "생선구이"],
    stayKeyword: "서산 단체 숙소"
  },
  {
    name: "강화도", region: "인천 강화", lat: 37.7470, lng: 126.4877,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 70, stay: 72, food: 72, group: 70 },
    intro: "마니산, 전등사, 젓갈시장의 역사+먹방 섬",
    reason: "서울 근교 섬 여행, 마니산+젓갈시장+카페 코스",
    activities: ["마니산", "전등사", "동막해변", "강화올레길"],
    foods: ["장어구이", "젓갈", "순무김치", "밴댕이회"],
    stayKeyword: "강화도 독채 펜션"
  },
  {
    name: "파주", region: "경기 파주", lat: 37.7599, lng: 126.7802,
    tags: ["숙소에서놀기", "먹방"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 65, stay: 72, food: 68, group: 70 },
    intro: "헤이리예술마을, DMZ, 프리미엄아울렛의 서울 근교",
    reason: "헤이리+아울렛+DMZ로 문화·쇼핑·역사 동시 해결",
    activities: ["헤이리예술마을", "임진각", "프로방스마을", "감악산"],
    foods: ["장단콩두부", "부대찌개", "한우구이", "카페디저트"],
    stayKeyword: "파주 독채 펜션"
  },
  {
    name: "춘천 강촌", region: "강원 춘천", lat: 37.8175, lng: 127.6280,
    tags: ["자연계곡", "숙소에서놀기", "액티비티"],
    facilities: ["바비큐", "족구장", "독채", "수영장"],
    scores: { fun: 78, stay: 82, food: 68, group: 88 },
    intro: "강촌 MT의 추억, 레일바이크와 계곡 펜션",
    reason: "레일바이크+번지점프+계곡 펜션으로 단체 MT 성지",
    activities: ["강촌 레일바이크", "번지점프", "삼악산", "구곡폭포"],
    foods: ["닭갈비", "막국수", "감자전", "메밀국수"],
    stayKeyword: "강촌 단체 펜션 족구장"
  },
  {
    name: "설악·속초", region: "강원 속초", lat: 38.1190, lng: 128.4656,
    tags: ["자연계곡", "액티비티", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 88, stay: 72, food: 82, group: 75 },
    intro: "설악산 국립공원, 대청봉, 케이블카의 명소",
    reason: "설악산 케이블카+비룡폭포+속초 먹거리 완벽 조합",
    activities: ["설악산 케이블카", "비룡폭포", "신흥사", "울산바위"],
    foods: ["속초 닭강정", "아바이순대", "물회", "오징어순대"],
    stayKeyword: "설악 단체 숙소"
  },
  {
    name: "수원", region: "경기 수원", lat: 37.2636, lng: 127.0286,
    tags: ["먹방", "도시술자리"],
    facilities: ["노래방"],
    scores: { fun: 72, stay: 68, food: 85, group: 78 },
    intro: "화성행궁, 통닭거리, 수원 야경의 도시",
    reason: "화성행궁 야경+통닭거리+행리단길로 먹방+술자리 코스",
    activities: ["화성행궁", "수원화성", "행리단길", "광교호수공원"],
    foods: ["수원왕갈비", "통닭", "순대국", "치킨"],
    stayKeyword: "수원 단체 숙소"
  },
  {
    name: "이천", region: "경기 이천", lat: 37.2720, lng: 127.4348,
    tags: ["먹방", "숙소에서놀기"],
    facilities: ["바비큐", "수영장", "노래방"],
    scores: { fun: 65, stay: 75, food: 80, group: 75 },
    intro: "쌀밥, 도자기, 스파 – 가까운 힐링 여행",
    reason: "이천쌀밥+테르메덴 스파+도자기체험으로 조용한 힐링",
    activities: ["테르메덴", "이천세라피아", "도자기마을", "설봉공원"],
    foods: ["이천쌀밥정식", "순두부", "한우구이", "막걸리"],
    stayKeyword: "이천 스파 단체 숙소"
  },
  {
    name: "청평·남이섬", region: "경기 가평", lat: 37.7268, lng: 127.4262,
    tags: ["자연계곡", "숙소에서놀기"],
    facilities: ["바비큐", "수영장", "족구장", "독채"],
    scores: { fun: 75, stay: 85, food: 60, group: 88 },
    intro: "청평호 수상레저와 남이섬 인근 펜션 밀집지역",
    reason: "수도권 접근성+수상레저+독채 펜션으로 단체 MT 인기",
    activities: ["청평호 수상레저", "남이섬", "아침고요수목원", "유명산"],
    foods: ["닭갈비", "송어회", "잣두부", "산채비빔밥"],
    stayKeyword: "청평 단체 펜션 족구장"
  },
  {
    name: "논산", region: "충남 논산", lat: 36.1870, lng: 127.0990,
    tags: ["먹방"],
    facilities: ["바비큐"],
    scores: { fun: 55, stay: 58, food: 72, group: 60 },
    intro: "딸기, 관촉사, 논산훈련소의 추억이 있는 곳",
    reason: "관촉사+딸기체험+연산역 근대골목으로 소소한 재미",
    activities: ["관촉사", "탑정호", "딸기체험", "선샤인스튜디오"],
    foods: ["딸기", "한우구이", "소머리국밥", "칼국수"],
    stayKeyword: "논산 단체 숙소"
  },
  {
    name: "삼척 장호항", region: "강원 삼척", lat: 37.2773, lng: 129.3307,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐"],
    scores: { fun: 78, stay: 65, food: 68, group: 65 },
    intro: "장호항 스노클링, 해신당공원의 동해 보석",
    reason: "투명카약+스노클링+해신당으로 이색 해양 체험",
    activities: ["장호항 스노클링", "해신당공원", "투명카약", "장호비치"],
    foods: ["곰치국", "물회", "해산물구이", "생선회"],
    stayKeyword: "장호항 단체 펜션"
  },
  {
    name: "진주", region: "경남 진주", lat: 35.1801, lng: 128.1076,
    tags: ["먹방", "도시술자리"],
    facilities: ["노래방"],
    scores: { fun: 68, stay: 62, food: 80, group: 70 },
    intro: "진주성, 남강 유등축제, 냉면의 도시",
    reason: "진주성 야경+냉면+비빔밥으로 경남 소도시 먹방",
    activities: ["진주성", "남강유등축제", "촉석루", "진주중앙시장"],
    foods: ["진주냉면", "진주비빔밥", "한우구이", "육전"],
    stayKeyword: "진주 단체 숙소"
  },
  {
    name: "합천", region: "경남 합천", lat: 35.5656, lng: 128.1659,
    tags: ["자연계곡"],
    facilities: ["바비큐"],
    scores: { fun: 62, stay: 58, food: 58, group: 55 },
    intro: "합천 영상테마파크, 해인사, 황매산의 역사 자연도시",
    reason: "해인사+영상테마파크+황매산 철쭉으로 조용한 힐링",
    activities: ["해인사", "합천영상테마파크", "황매산", "합천호"],
    foods: ["한우구이", "산채비빔밥", "메밀국수", "두부"],
    stayKeyword: "합천 단체 숙소"
  },
  {
    name: "아산", region: "충남 아산", lat: 36.7898, lng: 127.0018,
    tags: ["먹방", "숙소에서놀기"],
    facilities: ["수영장", "바비큐", "노래방"],
    scores: { fun: 68, stay: 75, food: 72, group: 72 },
    intro: "아산온천, 현충사, 파라다이스스파도고의 온천도시",
    reason: "온천 스파+현충사+로컬 맛집으로 중부권 가성비 힐링",
    activities: ["파라다이스스파도고", "현충사", "외암민속마을", "아산온천"],
    foods: ["곱창전골", "한우구이", "꽃게찜", "칼국수"],
    stayKeyword: "아산 온천 단체 숙소"
  },
  {
    name: "영주·풍기", region: "경북 영주", lat: 36.8057, lng: 128.6240,
    tags: ["먹방", "자연계곡"],
    facilities: ["바비큐"],
    scores: { fun: 65, stay: 60, food: 75, group: 60 },
    intro: "부석사, 소수서원, 풍기인삼의 고장",
    reason: "부석사 일몰+소수서원+인삼요리로 역사·먹방 동시",
    activities: ["부석사", "소수서원", "무섬마을", "풍기인삼시장"],
    foods: ["인삼요리", "묵밥", "한우구이", "산채비빔밥"],
    stayKeyword: "영주 단체 숙소"
  },
  {
    name: "정읍·내장산", region: "전북 정읍", lat: 35.5698, lng: 126.8561,
    tags: ["자연계곡"],
    facilities: ["바비큐"],
    scores: { fun: 68, stay: 58, food: 65, group: 60 },
    intro: "내장산 단풍, 정읍사, 쌍화차의 도시",
    reason: "내장산 케이블카+단풍터널+쌍화차로 가을 힐링 최강",
    activities: ["내장산", "내장산 케이블카", "정읍사공원", "솔티숲"],
    foods: ["쌍화차", "산채비빔밥", "칼국수", "한우구이"],
    stayKeyword: "내장산 단체 펜션"
  },
  {
    name: "김제·부안", region: "전북 김제/부안", lat: 35.8039, lng: 126.8808,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 65, stay: 60, food: 72, group: 60 },
    intro: "변산반도, 새만금, 격포해변의 서해안 자연",
    reason: "변산반도+채석강+격포해변으로 서해안 자연 여행",
    activities: ["변산반도", "채석강", "격포해변", "새만금방조제"],
    foods: ["바지락칼국수", "꽃게장", "백합죽", "해물탕"],
    stayKeyword: "변산반도 단체 펜션"
  },
  {
    name: "광양", region: "전남 광양", lat: 34.9407, lng: 127.6956,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 62, stay: 58, food: 75, group: 58 },
    intro: "매화마을, 백운산, 불고기의 봄꽃 도시",
    reason: "매화축제+백운산+광양불고기로 봄 여행 추천",
    activities: ["매화마을", "백운산", "섬진강", "광양제철소견학"],
    foods: ["광양불고기", "재첩국", "매실장아찌", "산채비빔밥"],
    stayKeyword: "광양 단체 숙소"
  },
  {
    name: "천안·아산", region: "충남 천안", lat: 36.8151, lng: 127.1139,
    tags: ["먹방", "도시술자리"],
    facilities: ["노래방"],
    scores: { fun: 65, stay: 65, food: 75, group: 72 },
    intro: "호두과자, 독립기념관, 중부 교통의 요지",
    reason: "중부 어디서든 모이기 쉽고, 먹거리+술자리 다양",
    activities: ["독립기념관", "천안삼거리공원", "아라리오갤러리", "천안역 주변"],
    foods: ["호두과자", "병천순대", "한우구이", "칼국수"],
    stayKeyword: "천안 단체 숙소"
  },
  {
    name: "세종시", region: "세종", lat: 36.48, lng: 127.2589,
    tags: ["숙소에서놀기"],
    facilities: ["바비큐", "수영장"],
    scores: { fun: 55, stay: 68, food: 60, group: 65 },
    intro: "세종호수공원, 밀마루전망대, 신도시의 깔끔한 인프라",
    reason: "중부 모임 접근성 최고, 깔끔한 숙소와 공원 산책",
    activities: ["세종호수공원", "밀마루전망대", "베어트리파크", "고복자연공원"],
    foods: ["한우구이", "칼국수", "카페디저트", "파스타"],
    stayKeyword: "세종 단체 숙소"
  },
  {
    name: "속리산·보은", region: "충북 보은", lat: 36.5322, lng: 127.7294,
    tags: ["자연계곡"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 68, stay: 65, food: 58, group: 62 },
    intro: "속리산 법주사, 정이품송, 대추의 고장",
    reason: "속리산 등산+법주사+대추한과로 조용한 자연 여행",
    activities: ["속리산", "법주사", "정이품송", "말티재"],
    foods: ["대추한과", "산채비빔밥", "버섯전골", "도토리묵"],
    stayKeyword: "속리산 단체 펜션"
  },
  {
    name: "김포·대명항", region: "경기 김포", lat: 37.6166, lng: 126.7155,
    tags: ["먹방"],
    facilities: [],
    scores: { fun: 55, stay: 55, food: 70, group: 60 },
    intro: "대명항 포구, 애기봉 전망대, 서울 서쪽 근교",
    reason: "서울에서 가장 가까운 포구 먹방, 당일치기 최적",
    activities: ["대명항", "애기봉전망대", "김포아트빌리지", "라베니체"],
    foods: ["꽃게장", "새우튀김", "해물칼국수", "조개구이"],
    stayKeyword: "김포 단체 숙소"
  },
  {
    name: "거창", region: "경남 거창", lat: 35.6867, lng: 127.9092,
    tags: ["자연계곡"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 65, stay: 68, food: 58, group: 65 },
    intro: "우두산 출렁다리, 거창계곡, 사과의 고장",
    reason: "우두산 출렁다리+계곡 독채 펜션으로 조용한 힐링",
    activities: ["우두산출렁다리", "수승대", "거창계곡", "월성우주창의과학관"],
    foods: ["사과", "한우구이", "산채비빔밥", "메밀국수"],
    stayKeyword: "거창 계곡 독채 펜션"
  },
  {
    name: "고성", region: "강원 고성", lat: 38.3807, lng: 128.4676,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 75, stay: 70, food: 68, group: 65 },
    intro: "통일전망대, 화진포해변, 송지호의 최북단 해변",
    reason: "한적한 동해 북부+통일전망대+화진포 이색 코스",
    activities: ["통일전망대", "화진포해변", "송지호", "DMZ뮤지엄"],
    foods: ["물회", "해산물구이", "두부요리", "감자전"],
    stayKeyword: "고성 바다 펜션"
  },
  {
    name: "화순", region: "전남 화순", lat: 35.0644, lng: 126.9863,
    tags: ["자연계곡"],
    facilities: ["바비큐"],
    scores: { fun: 60, stay: 58, food: 60, group: 55 },
    intro: "적벽, 고인돌유적, 운주사의 자연+역사 도시",
    reason: "적벽+고인돌+운주사로 조용하고 색다른 힐링 코스",
    activities: ["화순적벽", "고인돌유적", "운주사", "세량지"],
    foods: ["닭발", "한우구이", "산채비빔밥", "도토리묵"],
    stayKeyword: "화순 단체 숙소"
  },
  {
    name: "청송", region: "경북 청송", lat: 36.4360, lng: 129.0571,
    tags: ["자연계곡"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 65, stay: 62, food: 60, group: 58 },
    intro: "주왕산, 주산지, 달기약수의 경북 숨은 명소",
    reason: "주왕산+주산지+달기약수터로 깊은 자연 속 힐링",
    activities: ["주왕산", "주산지", "달기약수", "객주문학관"],
    foods: ["달기약수백숙", "산채비빔밥", "한우구이", "두부"],
    stayKeyword: "청송 독채 펜션"
  },
  {
    name: "서천·한산", region: "충남 서천", lat: 36.0804, lng: 126.6916,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 60, stay: 55, food: 72, group: 55 },
    intro: "국립생태원, 한산소곡주, 서해 갯벌의 고장",
    reason: "국립생태원+한산소곡주+해산물로 가성비 서해 여행",
    activities: ["국립생태원", "한산모시마을", "마량리동백나무숲", "신성리갈대밭"],
    foods: ["한산소곡주", "꽃게장", "전어구이", "해물칼국수"],
    stayKeyword: "서천 단체 숙소"
  },
  {
    name: "사천", region: "경남 사천", lat: 34.9722, lng: 128.0663,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 65, stay: 58, food: 75, group: 60 },
    intro: "삼천포대교, 비토섬, 실안카페거리의 남해안 소도시",
    reason: "삼천포대교+비토섬+실안낙조카페로 느린 바다 여행",
    activities: ["삼천포대교", "비토섬", "실안카페거리", "항공우주박물관"],
    foods: ["삼천포어묵", "꽃게장", "해물탕", "회"],
    stayKeyword: "사천 단체 숙소"
  },
  {
    name: "봉화", region: "경북 봉화", lat: 36.8933, lng: 128.7324,
    tags: ["자연계곡"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 62, stay: 65, food: 60, group: 58 },
    intro: "닭실마을, 청량산, 분천역 산타마을의 산골도시",
    reason: "분천역 산타마을+청량산+송이버섯으로 깊은 산골 힐링",
    activities: ["분천역산타마을", "청량산", "닭실마을", "석천계곡"],
    foods: ["송이버섯구이", "한우구이", "산채비빔밥", "메밀국수"],
    stayKeyword: "봉화 독채 펜션"
  },
  {
    name: "양구·인제", region: "강원 양구/인제", lat: 38.1095, lng: 128.0614,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 72, stay: 68, food: 58, group: 65 },
    intro: "내린천 래프팅, 펀치볼, 자작나무숲의 깊은 강원 오지",
    reason: "내린천 래프팅+자작나무숲+DMZ 펀치볼로 탐험 여행",
    activities: ["내린천 래프팅", "원대리자작나무숲", "펀치볼", "방태산"],
    foods: ["황태해장국", "감자전", "산채비빔밥", "메밀국수"],
    stayKeyword: "인제 래프팅 단체 펜션"
  },
  {
    name: "문경", region: "경북 문경", lat: 36.5866, lng: 128.1867,
    tags: ["자연계곡", "액티비티"],
    facilities: ["바비큐"],
    scores: { fun: 68, stay: 60, food: 62, group: 62 },
    intro: "문경새재, 레일바이크, 도자기체험의 산골 도시",
    reason: "문경새재 트레킹+레일바이크+사과로 가을 여행 추천",
    activities: ["문경새재", "문경레일바이크", "가은오픈세트장", "도자기체험"],
    foods: ["사과", "한우구이", "산채비빔밥", "메밀국수"],
    stayKeyword: "문경 단체 펜션"
  },
  {
    name: "옥천·영동", region: "충북 옥천/영동", lat: 36.3069, lng: 127.5713,
    tags: ["자연계곡"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 58, stay: 62, food: 60, group: 58 },
    intro: "금강 상류의 조용한 계곡, 포도와 감의 고장",
    reason: "금강 물놀이+독채 펜션+과일체험으로 가성비 힐링",
    activities: ["금강 물놀이", "장계관광지", "정지용문학관", "포도축제"],
    foods: ["포도", "올갱이국", "산채비빔밥", "한우구이"],
    stayKeyword: "옥천 계곡 독채 펜션"
  },
  {
    name: "고창", region: "전북 고창", lat: 35.4358, lng: 126.7019,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐"],
    scores: { fun: 65, stay: 58, food: 75, group: 60 },
    intro: "고창읍성, 선운사, 복분자와 풍천장어의 고장",
    reason: "고창읍성+선운사+풍천장어로 역사+먹방 코스",
    activities: ["고창읍성", "선운사", "운곡습지", "고인돌유적"],
    foods: ["풍천장어", "복분자주", "해풍쑥떡", "백합죽"],
    stayKeyword: "고창 단체 펜션"
  },
  {
    name: "영천", region: "경북 영천", lat: 35.9733, lng: 128.9385,
    tags: ["먹방"],
    facilities: ["바비큐"],
    scores: { fun: 55, stay: 55, food: 68, group: 55 },
    intro: "은해사, 보현산천문대, 와인의 도시",
    reason: "영천 와이너리+보현산 별보기+한우로 이색 체험",
    activities: ["은해사", "보현산천문대", "영천와이너리", "영천시장"],
    foods: ["와인", "한우구이", "산채비빔밥", "칼국수"],
    stayKeyword: "영천 단체 숙소"
  },
  {
    name: "횡성", region: "강원 횡성", lat: 37.4913, lng: 127.9847,
    tags: ["자연계곡", "먹방"],
    facilities: ["바비큐", "족구장", "독채"],
    scores: { fun: 65, stay: 72, food: 75, group: 75 },
    intro: "횡성한우, 풍수원성당, 숲체원의 중부 강원",
    reason: "횡성한우 먹방+독채 펜션+숲체원으로 단체 힐링",
    activities: ["숲체원", "풍수원성당", "횡성호수길", "청태산자연휴양림"],
    foods: ["횡성한우", "산채비빔밥", "메밀국수", "한우국밥"],
    stayKeyword: "횡성 독채 펜션 족구장"
  },
  {
    name: "산청·함양", region: "경남 산청/함양", lat: 35.4140, lng: 127.8738,
    tags: ["자연계곡"],
    facilities: ["바비큐", "독채"],
    scores: { fun: 65, stay: 68, food: 60, group: 62 },
    intro: "지리산 자락, 한방약초마을, 상림숲의 힐링 지역",
    reason: "지리산 계곡+한방체험+상림숲 산책으로 깊은 힐링",
    activities: ["지리산", "한방약초마을", "함양상림숲", "남사예담촌"],
    foods: ["약초정식", "산채비빔밥", "한우구이", "흑돼지"],
    stayKeyword: "산청 지리산 독채 펜션"
  },
  {
    name: "울릉도", region: "경북 울릉", lat: 37.4845, lng: 130.9057,
    tags: ["자연계곡", "액티비티"],
    facilities: [],
    scores: { fun: 85, stay: 58, food: 78, group: 55 },
    intro: "대한민국 최동단 섬, 성인봉과 독도의 관문",
    reason: "성인봉+해안산책로+오징어로 잊지 못할 섬 모험",
    activities: ["성인봉", "독도 전망", "해안산책로", "봉래폭포"],
    foods: ["오징어내장탕", "홍합밥", "따개비밥", "약소고기"],
    stayKeyword: "울릉도 단체 숙소"
  },
];

// ──────────────────────────────────────────────
// 3. 유틸리티 함수
// ──────────────────────────────────────────────

/**
 * Haversine 공식: 두 위도/경도 사이의 직선 거리(km)
 */
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371; // 지구 반경 km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * 직선 거리를 도로 추정 거리로 보정 (직선 × 1.3)
 */
function roadDist(lat1, lng1, lat2, lng2) {
  return haversine(lat1, lng1, lat2, lng2) * 1.3;
}

// ──────────────────────────────────────────────
// 4. 점수 계산 엔진
// ──────────────────────────────────────────────

/**
 * 추천 점수를 계산하고 정렬하여 반환한다.
 * @param {Array} origins  - [{ name, lat, lng, people }]
 * @param {Array} styles   - 선택된 여행 성향 배열
 * @param {Array} requiredFacilities - 필수 숙소 조건 배열
 * @param {boolean} strict - true면 조건 미충족 시 제외, false면 감점
 * @returns {Array} 점수순 정렬된 후보 배열
 */
function calcScores(origins, styles, requiredFacilities, strict) {
  const totalPeople = origins.reduce((s, o) => s + o.people, 0);
  if (totalPeople === 0) return [];

  const results = [];

  for (const dest of DESTINATIONS) {
    // ── (a) 필수 시설 검사 ──
    const missingFacilities = requiredFacilities.filter(
      f => !dest.facilities.includes(f)
    );
    if (strict && missingFacilities.length > 0) continue; // 제외

    // ── (b) 출발지별 거리 계산 ──
    const distInfos = origins.map(o => ({
      name: o.name,
      people: o.people,
      dist: roadDist(o.lat, o.lng, dest.lat, dest.lng),
    }));

    // 인원 가중 평균 이동거리
    const weightedDist =
      distInfos.reduce((s, d) => s + d.dist * d.people, 0) / totalPeople;

    // 이동거리 점수: 0km→100, 500km 이상→0 (선형)
    const distScore = Math.max(0, 100 - (weightedDist / 500) * 100);

    // ── (c) 이동 균형 점수 (핵심 지표) ──
    // 출발지별 거리의 표준편차가 작을수록 높은 점수
    // + 최대거리-최소거리 차이도 반영하여 극단적 편차 페널티
    const dists = distInfos.map(d => d.dist);
    const meanDist = dists.reduce((a, b) => a + b, 0) / dists.length;
    const variance = dists.reduce((s, d) => s + (d - meanDist) ** 2, 0) / dists.length;
    const stdDev = Math.sqrt(variance);
    const maxMinGap = Math.max(...dists) - Math.min(...dists);
    // 표준편차 기반 점수 (0→100, 150km 이상→0)
    const stdScore = Math.max(0, 100 - (stdDev / 150) * 100);
    // 최대-최소 차이 기반 점수 (0→100, 250km 이상→0)
    const gapScore = Math.max(0, 100 - (maxMinGap / 250) * 100);
    // 두 점수를 6:4 비율로 합산
    const balanceScore = stdScore * 0.6 + gapScore * 0.4;

    // ── (d) 기본 점수 ──
    const { fun, stay, food, group } = dest.scores;

    // ── (e) 여행 성향 보너스 ──
    let styleBonus = 0;
    const matchedTags = [];
    for (const style of styles) {
      if (dest.tags.includes(style)) {
        styleBonus += 8; // 매칭 태그당 8점 보너스
        matchedTags.push(style);
      }
    }

    // ── (f) 시설 미충족 감점 (strict=false일 때) ──
    const facilityPenalty = strict ? 0 : missingFacilities.length * 12;

    // ── (g) 최종 점수 합산 ──
    // 이동균형 45% + 이동거리 15% + 놀거리 10% + 숙소 10% + 먹거리 5% + 단체 15%
    let total =
      balanceScore * 0.45 +
      distScore * 0.15 +
      fun * 0.10 +
      stay * 0.10 +
      food * 0.05 +
      group * 0.15 +
      styleBonus -
      facilityPenalty;

    total = Math.max(0, Math.min(100, total));

    results.push({
      ...dest,
      distInfos,
      weightedDist,
      distScore: Math.round(distScore),
      balanceScore: Math.round(balanceScore),
      styleBonus,
      facilityPenalty,
      matchedTags,
      total: Math.round(total * 10) / 10,
    });
  }

  // 점수 내림차순 정렬
  results.sort((a, b) => b.total - a.total);
  return results;
}

// ──────────────────────────────────────────────
// 5. UI 렌더링
// ──────────────────────────────────────────────

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// --- 출발지 관리 ---
let originIdCounter = 0;

/** 출발지 행 HTML 생성 */
function createOriginRow(defaultCity = "서울", defaultPeople = 3) {
  const id = originIdCounter++;
  const row = document.createElement("div");
  row.className = "origin-row";
  row.dataset.id = id;

  // 출발지 select
  const select = document.createElement("select");
  select.setAttribute("aria-label", "출발지 선택");
  for (const o of ORIGINS) {
    const opt = document.createElement("option");
    opt.value = o.name;
    opt.textContent = o.name;
    if (o.name === defaultCity) opt.selected = true;
    select.appendChild(opt);
  }

  // 인원수 input
  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.max = 99;
  input.value = defaultPeople;
  input.setAttribute("aria-label", "인원수");

  const unit = document.createElement("span");
  unit.className = "unit";
  unit.textContent = "명";

  // 삭제 버튼
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn-remove";
  removeBtn.textContent = "✕";
  removeBtn.setAttribute("aria-label", "출발지 삭제");
  removeBtn.addEventListener("click", () => {
    row.remove();
    updateRemoveButtons();
  });

  row.append(select, input, unit, removeBtn);
  return row;
}

/** 삭제 버튼: 행이 1개일 때 숨김 */
function updateRemoveButtons() {
  const rows = $$("#originList .origin-row");
  rows.forEach(r => {
    r.querySelector(".btn-remove").style.display = rows.length <= 1 ? "none" : "flex";
  });
}

/** 출발지 초기화 */
function initOrigins() {
  const list = $("#originList");
  list.appendChild(createOriginRow("서울", 3));
  list.appendChild(createOriginRow("부산", 3));
  updateRemoveButtons();
}

// --- 출발지 추가 버튼 ---
function bindAddOrigin() {
  $("#addOriginBtn").addEventListener("click", () => {
    const list = $("#originList");
    list.appendChild(createOriginRow("대전", 2));
    updateRemoveButtons();
  });
}

// --- 현재 입력 값 수집 ---
function getInputs() {
  const origins = [];
  $$("#originList .origin-row").forEach(row => {
    const name = row.querySelector("select").value;
    const people = parseInt(row.querySelector("input").value, 10) || 1;
    const found = ORIGINS.find(o => o.name === name);
    if (found) origins.push({ ...found, people });
  });

  const styles = [];
  $$("#travelStyleGroup input:checked").forEach(cb => styles.push(cb.value));

  const facilities = [];
  $$("#facilityGroup input:checked").forEach(cb => facilities.push(cb.value));

  const strict = $("#strictFilter").checked;
  const count = parseInt($("#recCount").value, 10);

  return { origins, styles, facilities, strict, count };
}

// --- 결과 카드 렌더링 ---
function renderResults(results) {
  const section = $("#resultSection");
  const list = $("#resultList");
  list.innerHTML = "";

  if (results.length === 0) {
    list.innerHTML = `<div class="card" style="text-align:center;padding:2rem;">
      <p style="font-size:1.1rem;font-weight:600;color:var(--gray-500);">
        조건에 맞는 여행지가 없습니다 😢
      </p>
      <p style="font-size:0.85rem;color:var(--gray-400);margin-top:0.5rem;">
        필수 숙소 조건을 줄이거나 "감점만" 옵션을 사용해보세요.
      </p>
    </div>`;
    section.classList.remove("hidden");
    return;
  }

  results.forEach((r, i) => {
    const rank = i + 1;
    const medalClass = rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "";

    // 태그 생성
    const tagTypeMap = {
      "숙소에서놀기": "🏠 숙소놀기",
      "액티비티": "🏄 액티비티",
      "먹방": "🍽️ 먹방",
      "자연계곡": "🌿 자연/계곡",
      "도시술자리": "🍻 도시술자리",
    };
    const typeTags = r.tags.map(t => `<span class="tag">${tagTypeMap[t] || t}</span>`).join("");
    const facilityTags = r.facilities.map(f => `<span class="tag facility">${f}</span>`).join("");

    // 거리 테이블 행
    const distRows = r.distInfos.map(d =>
      `<tr><td>${d.name} (${d.people}명)</td><td>약 ${Math.round(d.dist)}km</td></tr>`
    ).join("");

    const card = document.createElement("div");
    card.className = "result-card";
    card.style.setProperty("--i", i);

    card.innerHTML = `
      <!-- 상단: 순위 + 이름 + 점수 -->
      <div class="card-top">
        <div class="rank-badge ${medalClass}">${rank}</div>
        <div class="card-title-area">
          <div class="card-name">${r.name}</div>
          <div class="card-region">${r.region}</div>
        </div>
        <div class="card-score">
          <div class="score-value">${r.total}</div>
          <div class="score-label">총점</div>
        </div>
      </div>

      <!-- 점수 바 -->
      <div class="score-bars">
        <div class="bar-item">
          <span class="bar-label">이동</span>
          <div class="bar-track"><div class="bar-fill" style="width:${r.distScore}%"></div></div>
        </div>
        <div class="bar-item">
          <span class="bar-label">균형</span>
          <div class="bar-track"><div class="bar-fill green" style="width:${r.balanceScore}%"></div></div>
        </div>
        <div class="bar-item">
          <span class="bar-label">놀거리</span>
          <div class="bar-track"><div class="bar-fill orange" style="width:${r.scores.fun}%"></div></div>
        </div>
        <div class="bar-item">
          <span class="bar-label">숙소</span>
          <div class="bar-track"><div class="bar-fill" style="width:${r.scores.stay}%"></div></div>
        </div>
        <div class="bar-item">
          <span class="bar-label">먹거리</span>
          <div class="bar-track"><div class="bar-fill orange" style="width:${r.scores.food}%"></div></div>
        </div>
        <div class="bar-item">
          <span class="bar-label">단체</span>
          <div class="bar-track"><div class="bar-fill green" style="width:${r.scores.group}%"></div></div>
        </div>
      </div>

      <!-- 소개 & 추천이유 -->
      <p class="card-desc">${r.intro}</p>
      <div class="card-reason">💡 ${r.reason}</div>

      <!-- 출발지별 거리 -->
      <table class="dist-table">
        <tr><th>출발지</th><th>추정 거리</th></tr>
        ${distRows}
      </table>

      <!-- 놀거리 -->
      <div class="detail-block">
        <div class="detail-title">🎢 놀거리</div>
        <div class="detail-list">${r.activities.join(" · ")}</div>
      </div>

      <!-- 먹거리 -->
      <div class="detail-block">
        <div class="detail-title">🍜 먹거리</div>
        <div class="detail-list">${r.foods.join(" · ")}</div>
      </div>

      <!-- 숙소 검색 키워드 -->
      <div class="detail-block">
        <div class="detail-title">🔍 숙소 검색</div>
        <div class="detail-list">${r.stayKeyword}</div>
      </div>

      <!-- 태그 -->
      <div class="tag-row">${typeTags}${facilityTags}</div>
    `;

    list.appendChild(card);
  });

  section.classList.remove("hidden");

  // 결과로 스크롤
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// --- 클립보드 복사용 텍스트 생성 ---
function buildCopyText(results, origins) {
  const totalPeople = origins.reduce((s, o) => s + o.people, 0);
  const originStr = origins.map(o => `${o.name}(${o.people}명)`).join(", ");

  let text = `🗺️ 어디서 만날까? 추천 결과\n`;
  text += `👥 ${originStr} (총 ${totalPeople}명)\n`;
  text += `${"─".repeat(24)}\n\n`;

  results.forEach((r, i) => {
    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}위`;
    text += `${medal} ${r.name} (${r.total}점)\n`;
    text += `📍 ${r.region}\n`;
    text += `📝 ${r.intro}\n`;
    text += `💡 ${r.reason}\n`;
    r.distInfos.forEach(d => {
      text += `  🚗 ${d.name}: 약 ${Math.round(d.dist)}km\n`;
    });
    text += `🎢 ${r.activities.join(", ")}\n`;
    text += `🍜 ${r.foods.join(", ")}\n`;
    text += `🔍 숙소: ${r.stayKeyword}\n\n`;
  });

  text += `${"─".repeat(24)}\n`;
  text += `✈️ "어디서 만날까?" 앱으로 추천받았어요!`;
  return text;
}

// --- 토스트 표시 ---
function showToast(msg) {
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 2000);
}

// ──────────────────────────────────────────────
// 6. 이벤트 바인딩 & 초기화
// ──────────────────────────────────────────────

let lastResults = [];
let lastOrigins = [];

function init() {
  initOrigins();
  bindAddOrigin();

  // 추천 버튼
  $("#searchBtn").addEventListener("click", () => {
    const { origins, styles, facilities, strict, count } = getInputs();
    if (origins.length === 0) {
      showToast("출발지를 추가해주세요!");
      return;
    }
    const scored = calcScores(origins, styles, facilities, strict);
    lastResults = scored.slice(0, count);
    lastOrigins = origins;
    renderResults(lastResults);
  });

  // 복사 버튼
  $("#copyBtn").addEventListener("click", () => {
    if (lastResults.length === 0) return;
    const text = buildCopyText(lastResults, lastOrigins);
    navigator.clipboard.writeText(text).then(() => {
      showToast("클립보드에 복사되었습니다! 📋");
    }).catch(() => {
      // 폴백: textarea 방식
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast("클립보드에 복사되었습니다! 📋");
    });
  });
}

// DOM 로드 후 초기화
document.addEventListener("DOMContentLoaded", init);
