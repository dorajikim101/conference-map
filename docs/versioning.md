# Versioning Policy

Conference Map uses semantic versioning for user-visible dashboard releases.

## Current version source of truth

1. `package.json` `version`
2. `CHANGELOG.md`
3. `docs/releases/vX.Y.Z.md`
4. Git tag / GitHub Release when published

## Version rule

- **MAJOR** (`v2.0.0`): large product direction/schema changes or incompatible data model changes
- **MINOR** (`v1.1.0`): new visible features, new dashboard panels, large event coverage expansion
- **PATCH** (`v1.1.1`): bundled bug fixes, meaningful data refreshes, archive updates that materially change user-facing conclusions, or small UI/UX improvements

## What should NOT bump version

Do **not** create a new semver tag/release for every small correction.

These should usually be handled as normal commits under the current version:

- Single-field conference data corrections
- Side-event count/source corrections for one event
- Typo/copy fixes
- Minor source/reference clarifications
- Reverting an immediately previous mistaken data edit

If the change is small but important, add a short note to `CHANGELOG.md` under the current version or an `Unreleased / data notes` section, then commit and deploy without changing `package.json`.

## Release documentation checklist

For every meaningful production release:

- Update `CHANGELOG.md`
- Add or update `docs/releases/vX.Y.Z.md`
- Update `package.json` / `package-lock.json` version only when bumping version
- Run `npx tsc --noEmit`
- Deploy to Vercel production
- Commit, push, and create a matching Git tag only when publishing a versioned release

## Notes

Before `v1.1.1`, GitHub Releases were not maintained continuously. The latest published GitHub Release found during audit was `v0.3.0`, while `package.json` was `1.0.0`. Starting with `v1.1.1`, release notes should be kept in-repo even if a GitHub Release is delayed.
