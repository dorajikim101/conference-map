# Changelog

All notable Conference Map changes should be documented here.

## [v1.1.1] - 2026-05-26

### Fixed

- Corrected **SEABW 2026** from upcoming to completed and moved it into post-event/archive handling.
- Updated SEABW side-event aggregate from listed examples (`16`) to official visible aggregate (`60+`).
- Corrected **TOKEN2049 Dubai 2026** side-event trend to `0` because the 2026 event did not run.
- Corrected **WebX 2025** archive values to official screenshot/reference figures: `14,115` attendees, `170+` side events, `165` sponsors, `56` media partners.
- Corrected archive semantics for Consensus and EthCC so archive data references prior-year events rather than the current event itself.

### Added

- Added 2026 side-event trend values across event data.
- Added Google Flights links next to non-domestic `항공권` budget rows.
- Added release documentation under `docs/releases/v1.1.1.md`.
- Added versioning policy under `docs/versioning.md`.

### Verified

- `npx tsc --noEmit`
- Vercel production deploy: https://conference-map.vercel.app

## Historical notes

- Latest GitHub Release found during versioning audit: `v0.3.0`.
- `package.json` version before this documentation pass: `1.0.0`.
- Continuous semver-style release documentation was not being maintained before `v1.1.1`.
