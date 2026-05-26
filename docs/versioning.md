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
- **PATCH** (`v1.1.1`): data corrections, archive updates, small UI/UX links, source/reference fixes

## Release documentation checklist

For every meaningful production deploy:

- Update `CHANGELOG.md`
- Add or update `docs/releases/vX.Y.Z.md`
- Update `package.json` / `package-lock.json` version
- Run `npx tsc --noEmit`
- Deploy to Vercel production
- Commit, push, and create a matching Git tag when stable

## Notes

Before `v1.1.1`, GitHub Releases were not maintained continuously. The latest published GitHub Release found during audit was `v0.3.0`, while `package.json` was `1.0.0`. Starting with `v1.1.1`, release notes should be kept in-repo even if a GitHub Release is delayed.
