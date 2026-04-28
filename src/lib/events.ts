export type Tier = "S" | "A" | "B";

export type EventStatus = "upcoming" | "live" | "completed" | "cancelled";

export type EventCost = {
  flight: number;
  hotel: number;
  transport: number;
  meals: number;
  ticket: number;
  total: number;
  note?: string;
};

export type Company = {
  name: string;
  tags: string[];
  people: string[];
  role: string;
  isNew?: boolean;
};

export type EventData = {
  id: string;
  name: string;
  city: string;
  country: string;
  date: string;
  endDate?: string;
  days: number;
  venue?: string;
  tier: Tier;
  autoTier: Tier;
  tierScore: number;
  tierReasons: string[];
  gradient: string;
  status: EventStatus;
  cancelReason?: string;
  cost: EventCost;
  summary: Record<"features" | "difference" | "pros" | "risks" | "expectations", string[]>;
  feed: { label: string; time: string; type: string }[];
  archive: {
    year: string;
    attendees: string;
    sideEvents: number;
    sponsors: number;
    media: number;
    note: string;
  };
  kpis: { label: string; value: string; detail: string }[];
  budget: { label: string; value: number }[];
  sideEventTrend: { label: string; value: number }[];
  actions: string[];
  companies: Company[];
};

const eventData: EventData[] = [
  {
    id: "bitcoin-2026",
    name: "Bitcoin 2026",
    city: "Las Vegas",
    country: "United States",
    date: "2026-04-27",
    endDate: "2026-04-29",
    days: 3,
    venue: "The Venetian",
    tier: "S",
    autoTier: "S",
    tierScore: 95,
    tierReasons: ["세계 최대 비트코인 이벤트", "500+ 연사", "5,000+ 기업 참여"],
    gradient: "from-orange-100 via-white to-amber-100",
    status: "live",
    cost: { flight: 1050, hotel: 1380, transport: 200, meals: 480, ticket: 899, total: 4009, note: "Pro Pass 기준. General Admission은 ~$349" },
    summary: {
      features: ["세계 최대 규모 비트코인 컨퍼런스", "채굴, 에너지, 정책, 기업 트랙 등 다양한 트랙 구성", "5,000+ 기업, 500+ 연사 참여"],
      difference: ["비트코인 단일 자산 집중 - 다른 프로토콜 없음", "채굴 및 에너지 인프라에 특화", "정책 및 국가 채택 논의가 핵심"],
      pros: ["비트코인 생태계 전체를 아우르는 최고의 자리", "채굴/에너지/정책 네트워킹 기회 풍부", "글로벌 미디어 관심도 높음"],
      risks: ["비트코인 외 프로토콜 관련성 낮음", "VIP/Whale Pass가 접근성 제한할 수 있음", "라스베이거스 호텔 가격 변동 큼"],
      expectations: ["채굴 인프라 파트너십 논의", "국가/기업 비트코인 자산 전략", "정책 및 규제 동향 파악"],
    },
    feed: [
      { label: "Pro Day 진행 중 (Day 1)", time: "현재", type: "라이브" },
      { label: "채굴 트랙 스피커 확정", time: "3시간 전", type: "연사" },
      { label: "엔터프라이즈 홀 오픈", time: "5시간 전", type: "운영" },
    ],
    archive: {
      year: "2025",
      attendees: "35K+",
      sideEvents: 180,
      sponsors: 300,
      media: 120,
      note: "2025년 아카이브는 채굴, 트레저리 채택, 미국 정책 관심에서 가장 강한 시그널을 보임",
    },
    kpis: [
      { label: "미팅 적합도", value: "높음", detail: "채굴/정책/인프라" },
      { label: "아카이브 성장", value: "+22%", detail: "참석자 YoY" },
      { label: "업데이트 주기", value: "3시간", detail: "행사 진행 중" },
    ],
    budget: [
      { label: "항공권", value: 1050 },
      { label: "숙박", value: 1380 },
      { label: "티켓", value: 899 },
      { label: "현지비", value: 680 },
    ],
    sideEventTrend: [
      { label: "2023", value: 110 },
      { label: "2024", value: 155 },
      { label: "2025", value: 180 },
    ],
    actions: ["행사 진행 중 - 라이브 피드 모니터링", "엔터프라이즈 트랙 세션 확인", "채굴 스폰서 부스 방문 계획"],
    companies: [
      { name: "Blockstream", tags: ["Bitcoin", "Infra"], people: ["Partnership Lead"], role: "인프라 파트너십", isNew: true },
      { name: "Marathon Digital", tags: ["Mining"], people: ["IR Lead"], role: "채굴 시장 동향" },
      { name: "Strike", tags: ["Payments"], people: ["BD Lead"], role: "결제 레일" },
      { name: "Galaxy Digital", tags: ["Finance", "Mining"], people: ["Research Lead"], role: "시장 분석" },
    ],
  },
  {
    id: "token2049-dubai",
    name: "TOKEN2049 Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    date: "2026-04-29",
    endDate: "2026-04-30",
    days: 2,
    venue: "Madinate Jumeirah (예상)",
    tier: "S",
    autoTier: "S",
    tierScore: 90,
    tierReasons: ["글로벌 최대 크립토 이벤트 시리즈", "15,000+ 참석자 예상", "4,000+ 기업"],
    gradient: "from-amber-100 via-white to-cyan-100",
    status: "cancelled",
    cancelReason: "이란-중동 분쟁으로 인한 안전 문제로 2027년 4월로 연기",
    cost: { flight: 760, hotel: 1280, transport: 160, meals: 330, ticket: 799, total: 3329 },
    summary: {
      features: ["글로벌 최대 규모 크립토 이벤트", "자본 및 거래소 집중 참여", "프리미엄 스폰서 밀도 높음"],
      difference: ["기관 중심, 개발자 중심 아님", "중동/북아프리카 진출 시그널 강함", "시니어 BD에 적합"],
      pros: ["짧은 일정으로 효율적", "펀드/거래소 밀도 높음", "두바이 호스피탈리티 생태계 우수"],
      risks: ["2026년 행사 취소 - 2027년으로 연기", "프리미엄 패스 업셀로 접근성 제한 가능", "호텔 가격 빠르게 변동"],
      expectations: ["2027년 재개 시 참고용", "거래소 파트너십 사전 식별", "중동 확장 대화"],
    },
    feed: [
      { label: "2027년 4월로 연기 확정", time: "2026-03-14", type: "공지" },
      { label: "이란 미사일 위협으로 안전 우려", time: "2026-03-13", type: "안전" },
      { label: "행사 티켓 매진 후 취소", time: "2026-03-12", type: "운영" },
    ],
    archive: {
      year: "2025",
      attendees: "15K+",
      sideEvents: 186,
      sponsors: 210,
      media: 88,
      note: "2025년 아카이브는 자본, 거래소, 시장 구조, 중동 정책 대화에 강점",
    },
    kpis: [
      { label: "미팅 적합도", value: "높음", detail: "자본/거래소" },
      { label: "아카이브 성장", value: "+24%", detail: "스폰서 YoY" },
      { label: "상태", value: "취소", detail: "2027년 연기" },
    ],
    budget: [
      { label: "항공권", value: 760 },
      { label: "숙박", value: 1280 },
      { label: "티켓", value: 799 },
      { label: "현지비", value: 490 },
    ],
    sideEventTrend: [
      { label: "2023", value: 90 },
      { label: "2024", value: 150 },
      { label: "2025", value: 186 },
    ],
    actions: ["2027년 일정 모니터링", "중동 파트너 리스트 사전 확보", "대체 행사 검토"],
    companies: [
      { name: "OKX", tags: ["Exchange", "Sponsor"], people: ["Institutional Lead"], role: "유동성" },
      { name: "Animoca Brands", tags: ["Gaming", "Investor"], people: ["Portfolio Lead"], role: "포트폴리오 접근" },
      { name: "Cypher Capital", tags: ["VC", "MENA"], people: ["Managing Partner"], role: "지역 전략" },
      { name: "Chainalysis", tags: ["Compliance", "Data"], people: ["Policy Lead"], role: "규제 시그널" },
    ],
  },
  {
    id: "consensus-miami",
    name: "Consensus Miami",
    city: "Miami",
    country: "United States",
    date: "2026-05-05",
    endDate: "2026-05-07",
    days: 3,
    venue: "Miami Beach Convention Center",
    tier: "S",
    autoTier: "S",
    tierScore: 93,
    tierReasons: ["CoinDesk 주최 플래그십", "20,000+ 참석자 예상", "100+ 국가 참여"],
    gradient: "from-sky-100 via-white to-blue-100",
    status: "upcoming",
    cost: { flight: 1100, hotel: 1500, transport: 180, meals: 420, ticket: 999, total: 4199, note: "Pro Pass 기준" },
    summary: {
      features: ["CoinDesk 주최 북미 최대 크립토 컨퍼런스", "크립토·금융·테크·정책 리더 20,000+ 집결", "마이애미 비치 컨벤션 센터"],
      difference: ["AI 에이전트 상거래(Agentic Commerce) 트랙 신설", "기관 통합(Institutional Integration)에 집중", "코인데스크 저널리즘 기반 독립적 프로그래밍"],
      pros: ["미주 최대 규모 크립토 집회", "투자 유치, BD, 정책 네트워킹 기회 풍부", "다양한 트랙으로 포괄적 시야 확보"],
      risks: ["프리미엄 패스 가격 높음", "마이애미 호텔 예약 경쟁 치열", "행사 규모가 커서 타겟팅 어려울 수 있음"],
      expectations: ["기관 채택 동향 파악", "AI+크립토 교차 분야 탐색", "규제/정책 업데이트"],
    },
    feed: [
      { label: "얼리버드 가격 5/1 마감 예정", time: "3일 전", type: "비용" },
      { label: "새 스피커 배치 발표", time: "5일 전", type: "연사" },
      { label: "사이드 이벤트 목록 업데이트", time: "1주 전", type: "사이드 이벤트" },
    ],
    archive: {
      year: "2025",
      attendees: "14,771",
      sideEvents: 250,
      sponsors: 180,
      media: 130,
      note: "2025 토론토에서 102개국 참가. 거래, DeFi, 기관 채택, AI+크립토가 핵심",
    },
    kpis: [
      { label: "미팅 적합도", value: "매우 높음", detail: "전 분야" },
      { label: "아카이브 성장", value: "+35%", detail: "참석자 YoY" },
      { label: "업데이트 주기", value: "1일", detail: "14일 이내" },
    ],
    budget: [
      { label: "항공권", value: 1100 },
      { label: "숙박", value: 1500 },
      { label: "티켓", value: 999 },
      { label: "현지비", value: 600 },
    ],
    sideEventTrend: [
      { label: "2023", value: 160 },
      { label: "2024", value: 210 },
      { label: "2025", value: 250 },
    ],
    actions: ["5/1까지 얼리버드 등록", "기관/VC 타겟 리스트 사전 작성", "마이애미 숙박 빠르게 예약"],
    companies: [
      { name: "Coinbase", tags: ["Exchange", "Institutional"], people: ["Institutional Head"], role: "유동성/수탁", isNew: true },
      { name: "a16z crypto", tags: ["VC", "Research"], people: ["Investment Partner"], role: "시장 리서치" },
      { name: "Circle", tags: ["Stablecoin", "Payments"], people: ["Policy Lead"], role: "스테이블코인 규제" },
      { name: "Paradigm", tags: ["VC", "DeFi"], people: ["Research Partner"], role: "DeFi 전략" },
    ],
  },
  {
    id: "daf-abu-dhabi",
    name: "Digital Assets Forum Abu Dhabi",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    date: "2026-05-13",
    endDate: "2026-05-13",
    days: 1,
    venue: "Abu Dhabi (상세 미정)",
    tier: "A",
    autoTier: "A",
    tierScore: 80,
    tierReasons: ["$15조 AUM 기관 모임", "700+ 시니어 참가자", "전용 프라이빗 포럼"],
    gradient: "from-emerald-100 via-white to-teal-100",
    status: "upcoming",
    cost: { flight: 780, hotel: 640, transport: 140, meals: 280, ticket: 1200, total: 3040, note: "기관용 초대장 기준. 일반 참가 어려울 수 있음" },
    summary: {
      features: ["자산운용사, 은행, 규제기관이 모이는 프라이빗 포럼", "$15조 이상 AUM 대표 참석", "의도적으로 소규모·고밀도 구성"],
      difference: ["전시/엑스포 없이 순수 기관 중심", "결정권자가 한자리에 모이는 구조", "자본 대화에 최적화"],
      pros: ["높은 품질의 1:1 미팅 보장", "실제 자본 배분 논의 가능", "중동/글로벌 기관 네트워크 접근"],
      risks: ["초대장 전용 - 접근성 제한", "1일 일정으로 타이트", "중동 지정학적 리스크"],
      expectations: ["기관 자본 파트너십 논의", "중동 규제 환경 이해", "토큰화 자산 기회 탐색"],
    },
    feed: [
      { label: "참가자 명단 업데이트", time: "1주 전", type: "참가자" },
      { label: "아부다비 비자 정보 안내", time: "2주 전", type: "여행" },
      { label: "포럼 아젠다 확정", time: "3주 전", type: "아젠다" },
    ],
    archive: {
      year: "2025",
      attendees: "700+",
      sideEvents: 15,
      sponsors: 42,
      media: 28,
      note: "소규모 기관 포럼. 자본 대화, 토큰화, 규제 프레임워크에 집중",
    },
    kpis: [
      { label: "미팅 적합도", value: "높음", detail: "기관 자본" },
      { label: "아카이브 성장", value: "+15%", detail: "AUM 대표 YoY" },
      { label: "업데이트 주기", value: "3일", detail: "30일 이내" },
    ],
    budget: [
      { label: "항공권", value: 780 },
      { label: "숙박", value: 640 },
      { label: "티켓", value: 1200 },
      { label: "현지비", value: 420 },
    ],
    sideEventTrend: [
      { label: "2023", value: 8 },
      { label: "2024", value: 12 },
      { label: "2025", value: 15 },
    ],
    actions: ["초대장 수령 여부 확인", "기관 타겟 리스트 사전 공유", "중동 규제 브리핑 준비"],
    companies: [
      { name: "ADGM", tags: ["Regulator", "Abu Dhabi"], people: ["CEO"], role: "규제 프레임워크", isNew: true },
      { name: "BlackRock Digital", tags: ["Asset Manager"], people: ["Digital Assets Head"], role: "기관 자본" },
      { name: "FalconX", tags: ["Broker", "Institutional"], people: ["Institutional Sales"], role: "유동성" },
      { name: "Mubadala", tags: ["Sovereign Fund"], people: ["Tech Investment Lead"], role: "국부펀드 파트너십" },
    ],
  },
  {
    id: "crypto-valley-2026",
    name: "Crypto Valley Conference",
    city: "Rotkreuz",
    country: "Switzerland",
    date: "2026-05-28",
    endDate: "2026-05-29",
    days: 2,
    venue: "Rotkreuz, Switzerland",
    tier: "B",
    autoTier: "B",
    tierScore: 72,
    tierReasons: ["스위스 크립토 밸리 기반", "기술 중심 고밀도", "프로토콜 엔지니어 집중"],
    gradient: "from-red-100 via-white to-neutral-100",
    status: "upcoming",
    cost: { flight: 850, hotel: 920, transport: 160, meals: 380, ticket: 499, total: 2809 },
    summary: {
      features: ["스위스 '크립토 밸리' 기반 기술 컨퍼런스", "프로토콜 엔지니어, 연구자, 규제자 집중", "심층 기술 대화 중심"],
      difference: ["홍보보다 기술 심도에 집중", "소규모·고품질 참가자", "학술+실무 혼합"],
      pros: ["실제 프로덕션급 시스템 구축자들과 대화", "스위스 규제 환경 이해 기회", "조용하고 집중적인 네트워킹"],
      risks: ["규모가 작아 BD 기회 제한적", "숙박 옵션이 제한적일 수 있음", "다른 S/A급 행사 대비 시그널 밀도 낮음"],
      expectations: ["프로토콜 레벨 기술 논의", "규제/컴플라이언스 인사이트", "유럽 시장 진출 참고"],
    },
    feed: [
      { label: "CFP(발표 제안) 마감 임박", time: "2주 전", type: "아젠다" },
      { label: "숙박 할인 코드 공개", time: "3주 전", type: "비용" },
      { label: "연사 라인업 1차 발표", time: "1개월 전", type: "연사" },
    ],
    archive: {
      year: "2025",
      attendees: "500+",
      sideEvents: 12,
      sponsors: 35,
      media: 18,
      note: "기술 심도가 높은 소규모 컨퍼런스. 인터오퍼러빌리티, 토큰화, 규제가 주요 주제",
    },
    kpis: [
      { label: "미팅 적합도", value: "중간", detail: "기술/규제" },
      { label: "아카이브 성장", value: "+8%", detail: "참석자 YoY" },
      { label: "업데이트 주기", value: "7일", detail: "30일 이상" },
    ],
    budget: [
      { label: "항공권", value: 850 },
      { label: "숙박", value: 920 },
      { label: "티켓", value: 499 },
      { label: "현지비", value: 540 },
    ],
    sideEventTrend: [
      { label: "2023", value: 8 },
      { label: "2024", value: 10 },
      { label: "2025", value: 12 },
    ],
    actions: ["기술 트랙 세션 리뷰", "스위스 규제 업데이트 확인", "유럽 파트너 사전 컨택"],
    companies: [
      { name: "Ethereum Foundation", tags: ["Protocol", "Research"], people: ["Researcher"], role: "프로토콜 개발" },
      { name: "Sygnum Bank", tags: ["Banking", "Crypto"], people: ["Digital Assets Lead"], role: "기관 은행" },
      { name: "SEBA Bank", tags: ["Banking", "Custody"], people: ["Custody Head"], role: "수탁 솔루션" },
      { name: "Zug Cantonal Office", tags: ["Regulator"], people: ["Digital Policy Lead"], role: "규제 인사이트" },
    ],
  },
];

export const events = [...eventData].sort((a, b) => {
  if (a.status === "cancelled" && b.status !== "cancelled") {
    return 1;
  }

  if (a.status !== "cancelled" && b.status === "cancelled") {
    return -1;
  }

  return a.date.localeCompare(b.date);
});
