# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2025-11-29

### Added
- Comprehensive PropertyEditor controls for all 11 component types
- Text controls: fontFamily, fontWeight, color, lineHeight, align
- Button controls: backgroundColor, color, borderRadius, padding (vertical/horizontal), align
- Image controls: src with upload modal, width, alt text, link URL, live preview
- Divider controls: borderColor, borderWidth, style (solid/dashed/dotted)
- Video controls: src, poster, width, height, align, controls checkbox
- Timer controls: targetDate, format, expiredText, colors, alignment
- HTML controls: code editor, align, padding, backgroundColor
- Section controls: backgroundColor, padding
- Columns advanced controls:
  - Column count selector (2-4) with automatic content migration
  - Quick layout presets (50-50, 70-30, 30-70, etc.) for all column counts
  - Individual column width percentages with real-time validation
  - Per-column settings: backgroundColor, padding, alignment
- Social controls: alignment, icon size, platform management for 10+ platforms
  - Supported platforms: Facebook, Twitter, Instagram, LinkedIn, YouTube, GitHub, Pinterest, TikTok, Snapchat, Reddit

### Fixed
- Resolved build errors preventing dev server from starting
- Fixed corrupted PropertyEditor causing esbuild syntax errors
- Corrected JSX structure in component property inputs
- Ensured all property controls render without TypeScript errors

### Changed
- Enhanced property editor structure for better maintainability
- Improved type safety across all component inputs
- Optimized column preset system for better UX
- Added validation feedback for column width totals

---


## [1.0.5] - 2025-11-29

### Changed
- Updated README documentation to display correctly on NPM

---

## [1.0.3] - 2025-11-29

### Changed
- **Breaking CDN Change**: React and ReactDOM are now external dependencies
- CDN bundle size reduced by 44%: 321KB → 181KB (95KB → 50KB gzipped)
- Updated documentation to reflect new CDN usage pattern requiring React scripts
- CDN users must now include React and ReactDOM scripts before EmailBuilder

### Added
- Bundle size comparison section in README
- "Why external React?" explanation in documentation
- Updated CDN usage examples showing React script includes

### Benefits
- Smaller bundle downloads (50KB vs 95KB gzipped)
- Better browser caching (React cached separately)
- Share React across multiple libraries
- Users can choose their preferred React version
- Standard CDN distribution pattern

### Migration Guide
**For npm users**: No changes required - continues to work the same way

**For CDN users**: Add React scripts before EmailBuilder:
```html
<!-- Add these BEFORE the EmailBuilder script -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Then EmailBuilder -->
<script src="https://code.kaptha.dev/core/editor.js"></script>
```

---

## [1.0.2] - 2025-11-29

### Changed
- Updated peer dependencies to support React 19.x
- Now supports React ^18.0.0 || ^19.0.0 and React DOM ^18.0.0 || ^19.0.0
- Improved README.md documentation and formatting

### Fixed
- Resolved dependency conflict with React 19.2.0 projects
- Fixed documentation clarity and structure

---

## [1.0.1] - 2025-11-27

### Changed 
- Updated README to remove comparisons to third-party tools

### Fixed
- Improved documentation clarity

---

## [1.0.0] - 2025-11-27 [YANKED]

### Added
- Initial release
- React wrapper component that loads EmailBuilder from CDN
- TypeScript definitions
- Automatic CDN script loading
- Support for custom props (height, onExport, initialTemplate)

### Notes
- Version 1.0.0 was unpublished and replaced with 1.0.1

---

[1.0.3]: https://github.com/Actovision-ORG/kaptha-email-editor/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/Actovision-ORG/kaptha-email-editor/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Actovision-ORG/kaptha-email-editor/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Actovision-ORG/kaptha-email-editor/releases/tag/v1.0.0
