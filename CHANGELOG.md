# Changelog — Matrix RFV / RFM (Roos Data Labs)

All notable changes to this project are documented in this file.
This project adheres to Semantic Versioning and Microsoft Power BI Custom Visual Certification Guidelines.

---

## [1.0.0.2] - 2026-10-23

### Changed
- Bumped version to `1.0.0.2` for Microsoft Partner Center re-submission.
- Synchronized sample report showcase (`.pbix` and `.pbip`) with custom visual bundle v1.0.0.2.

---

## [1.0.0.1] - 2026-10-13

### Fixed
- **Policy 1180.2.5 (Context Menu Compliance)**:
  - Added native visual-level context menu support on empty space / background via `selectionManager.showContextMenu({}, coords)`.
  - Maintained specific data-point context menu on bubble selection via `selectionManager.showContextMenu(selectionId, coords)`.
- **Policy 1200.1.1.1 (Code Repository & Certification Branch)**:
  - Added dedicated `certification` branch for Microsoft AppSource Certification review.
  - Excluded build output directory `dist/` and local caches from Git tracking per policy 1200.1.1.
- Updated sample report showcase PBIX and PBIP to bundle v1.0.0.1.

---

## [1.0.0.0] - 2026-10-10

### Added
- Initial public release of Matrix RFV / RFM 5x5 custom visual for Microsoft Power BI.
- 5x5 strategic RFM layout with 11 color-coded quadrants.
- Native bidirectional cross-filtering support.
- Small Multiples with unified bubble radius scale across cards.
- Focus Mode (one-click card maximization with Esc return).
- Glassmorphic dark custom tooltip with measure format string recognition.
- Format pane tri-lingual localization (en-US, pt-BR, es-ES).
- 100% client-side memory execution with zero external network requests.
