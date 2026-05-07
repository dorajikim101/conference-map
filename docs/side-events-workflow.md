# Side Events Research Workflow

컨퍼런스맵의 모든 이벤트는 추가/수정 시 사이드 이벤트를 반드시 교차 검증한다.

## 필수 확인 순서

각 이벤트마다 아래 3단계를 순서대로 확인한다.

1. **공식 홈페이지**
   - 공식 사이트에 `side events`, `agenda`, `schedule`, `community events`, `side-events` 페이지가 있는지 확인한다.
   - 공식 페이지가 Luma/Notion/외부 캘린더를 iframe으로 임베드하는 경우, 임베드 URL까지 열어 실제 이벤트 목록을 확인한다.

2. **Luma Crypto 허브**
   - `https://luma.com/crypto`에서 해당 행사/도시/주간 캘린더가 있는지 확인한다.
   - 행사별 Luma 캘린더 예: `/ConsensusMiami2026`, `/SEABW_Official`, `/bitcoin-asia`, `/korea-blockchain-week` 등.
   - Luma 검색/캘린더의 RSVP 수, 주최자, 장소, 날짜를 가능한 한 그대로 반영한다.

3. **웹 검색 보완**
   - 검색어 예시:
     - `[event name] side events 2026`
     - `[event name] Luma 2026`
     - `[city] crypto week side events 2026`
   - 공식 홈페이지와 Luma에 없는 행사도 신뢰 가능한 검색 결과에서 확인되면 추가한다.

## 병합 규칙

- 공식 홈페이지, Luma, 검색 결과의 목록을 합친 뒤 중복 제거한다.
- 중복 판정은 이름/주최자/날짜/장소가 같거나 명백히 같은 이벤트일 때 한다.
- `sideEvents.count`는 확인된 총 개수를 넣는다. 전체 목록이 너무 많으면 `items`에는 중요도 높은 5~8개만 넣는다.
- `items`는 실제 확인된 데이터만 사용한다. 더미/추정 이벤트 금지.
- 각 item은 다음 필드를 채운다.

```ts
{ name: string; host: string; date: "YYYY-MM-DD"; desc: string }
```

## 우선순위

`items`에는 아래 순서로 우선 반영한다.

1. 공식/메인 주최 측이 직접 등록한 이벤트
2. 메인 행사와 직접 연결된 official/community calendar 이벤트
3. 신욱님 타겟과 관련 높은 L1, AI, validator, infra, RWA, DePIN 이벤트
4. RSVP/참석자 수가 큰 네트워킹 이벤트
5. VIP dinner, investor forum, builder day, hackathon, afterparty 등 BD 가치가 높은 이벤트

## 업데이트 범위

이벤트를 새로 추가할 때마다 반드시 함께 업데이트한다.

- `sideEventUrl`
- `sideEvents.count`
- `sideEvents.items`
- `sideEventTrend` (가능하면 2024/2025/2026 등 비교)
- `feed`에 사이드 이벤트 업데이트가 의미 있으면 추가

## 검증

수정 후 반드시 실행한다.

```bash
npm run build
```

빌드 성공 후 커밋한다. 배포는 지시가 있을 때만 한다.
