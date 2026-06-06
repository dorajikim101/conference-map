# 🚀 Conference Map — Quick Start / Pick-up Guide

> **다음 세션에서 이 파일만 읽으면 바로 작업 재개 가능**

## 프로젝트 한 줄 요약

크립토 컨퍼런스 의사결정 대시보드. 이벤트별 티어(S/A/B), 사이드이벤트 추이, 예산, 핵심 기업/인물, 아카이브 비교를 한 화면에서 볼 수 있음.

## 핵심 링크

| 항목 | URL |
|------|-----|
| **GitHub** | https://github.com/dorajikim101/conference-map |
| **프로덕션** | https://conference-map.vercel.app |
| **릴리즈** | https://github.com/dorajikim101/conference-map/releases |

## 인증

| 서비스 | 위치 | 비고 |
|--------|------|------|
| **GitHub** | `~/.config/gh/hosts.yml` | 계정 `dorajikim101`, gh CLI 인증 완료 |
| **Vercel** | `/home/node/.openclaw/vercel-token` | prefix `vcp_` |
| **DB** | 없음 | 모든 데이터 `src/lib/events.ts` 하드코딩 |
| **.env** | 없음 | 외부 API 키 없음 |

## 기술 스택

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **UI:** Radix UI (scroll-area, tooltip) + shadcn/ui 패턴
- **Hosting:** Vercel (GitHub → 자동 배포 아님, `vercel --prod` 수동 배포)
- **데이터:** 정적 (events.ts 하드코딩, DB/API 없음)

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 페이지 (전체 레이아웃)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Tailwind 글로벌
├── components/
│   ├── EventList.tsx     # 좌측 타임라인 (S/A/B 레인)
│   ├── EventDetail.tsx   # 우측 상세 패널
│   ├── EventCharts.tsx   # 사이드이벤트 꺾은선 그래프
│   ├── EventFeed.tsx     # 사이드이벤트 피드
│   ├── SummaryPanel.tsx  # 요약 패널
│   ├── CompanySection.tsx # 핵심 기업/인물
│   ├── ArchiveCard.tsx   # 작년 아카이브 카드
│   ├── CostTooltip.tsx   # 예산 툴팁
│   ├── TopBar.tsx        # 상단 바
│   ├── Sidebar.tsx       # 사이드바
│   └── ui/               # shadcn/ui 컴포넌트
├── lib/
│   ├── events.ts         # ★ 전체 이벤트 데이터 (S/A/B 티어, 사이드이벤트, 비용, 기업정보)
│   ├── format.ts         # 포맷 유틸
│   └── utils.ts          # 공통 유틸
docs/
├── CHANGELOG.md          # v1.1.1~v1.1.5 변경 이력
├── handoff.md            # v1 UI/레이아웃 핸드오프
├── round2-handoff.md     # v2 개발 핸드오프
├── versioning.md         # 버전 관리 정책
├── QUICKSTART.md         # ← 이 파일
└── releases/             # 버전별 릴리즈 노트
```

## 현재 버전: v1.1.5 (2026-05-28)

### 타임라인 핵심 동작
- **왼쪽:** S tier 이벤트 (메인 라인)
- **오른쪽:** A/B tier 이벤트 (보조 라인)
- **날짜 동기화:** S 라인 실제 카드 위치 기준으로 A/B, 월마커, TODAY 선 보간
- A 카드는 확장/축소 (뷰포트 안에 있으면 확장)
- B 카드는 항상 미니 사이즈

### 최근 커밋 (HEAD)
- `76af242` fix: S-lane anchored date-to-Y mapping + chart padding tweak

## 데이터 업데이트 워크플로우

1. `src/lib/events.ts` 수정 (이벤트 추가/수정)
2. `npx tsc --noEmit` — 타입 체크
3. `npm run build` — 빌드 확인
4. `vercel --prod --token "$(cat /home/node/.openclaw/vercel-token)"` — 배포
5. `git add -A && git commit && git push` — GitHub 동기화
6. 필요시 버전 bump (versioning.md 기준 따를 것)

## 외부 데이터 소스 (런타임 아닌 수집 단계)

| 소스 | 용도 |
|------|------|
| **Luma** (`luma.com`) | 사이드이벤트 링크/카운트 |
| **cryptonomads.org** | 신규 이벤트 발견 (Puppeteer 스크래핑) |
| **Unsplash** | 이벤트 썸네일 이미지 (공개 CDN) |
| **Google Flights** | 항공권 예산 링크 |

## 알려진 이슈 / TODO

- [ ] **README.md 없음** — 프로젝트 루트에 README 필요
- [ ] 월마커 중복/정렬 개선 여지
- [ ] 모바일 대응 미흡 (데스크탑 중심)
- [ ] 자동 데이터 업데이트 파이프라인 없음 (수동)

## 빠른 재시작 체크리스트

```
git clone https://github.com/dorajikim101/conference-map.git
cd conference-map
npm install
npx tsc --noEmit      # 타입 체크
npm run build          # 빌드
npm run dev            # 로컬 개발 서버
```

배포:
```bash
VERCEL_TOKEN=$(cat /home/node/.openclaw/vercel-token)
vercel --prod --token "$VERCEL_TOKEN"
```
