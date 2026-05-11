# 컨퍼런스맵 업데이트 워크플로우

## 작업 방식

### 데이터 업데이트 — 로컬 Codex CLI 사용

컨퍼런스맵 이벤트 데이터 업데이트는 **로컬 codex CLI**를 사용한다.

**이유:** ACP 세션은 샌드박스 환경에서 실행되어 로컬 파일 시스템 접근이 불가하다.
로컬 codex CLI는 파일 읽기/쓰기, git, Vercel 배포 모두 가능하다.

**실행 방법:**
```bash
# 신욕님 로컬 터미널에서
cd ~/conference-map  # 또는 프로젝트 경로
codex "오늘 기준으로 이벤트 데이터 업데이트해줘"
```

### 주기적 업데이트 항목

1. **이벤트 상태 (status)** — 오늘 날짜 기준으로 `upcoming` / `live` / `completed` 재확인
2. **Archive 데이터** — 종료된 이벤트의 실제 참석자, 사이드 이벤트, 스폰서 수 업데이트
3. **Feed** — 각 이벤트별 최근 소식 추가
4. **사이드 이벤트** — Luma 등에서 최신 수치 확인
5. **관심 기업** — TARGET_PROFILE 기준으로 새 타겟 발굴하여 companies에 추가
6. **sideEventTrend** — 종료 이벤트는 실적, upcoming은 예상치 업데이트

### 배포

```bash
cd /home/node/.openclaw/workspace-qwenfree/conference-map
git add -A && git commit -m "feat: update event data as of YYYY-MM-DD"
VERCEL_TOKEN=$(cat /home/node/.openclaw/vercel-token) vercel --prod --token "$VERCEL_TOKEN"
```

### ACP 세션은 사용하지 않음

- ❌ `sessions_spawn(runtime="acp", agentId="codex")` → 샌드박스 제한
- ✅ 로컬 `codex` CLI → 파일 접근 가능
- ✅ 감자돌이 직접 수정 → 항상 가능 (백업 방식)

## 주요 파일

- `src/lib/events.ts` — 모든 이벤트 데이터
- `TARGET_PROFILE.md` — 신욕님 타겟 기업 프로필 기준
