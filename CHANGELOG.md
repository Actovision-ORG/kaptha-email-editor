# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
<script src="https://static.gooups.dev/assets/builder.js"></script>
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

[1.0.3]: https://github.com/Actovision-ORG/emailbuilder-v1/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/Actovision-ORG/emailbuilder-v1/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Actovision-ORG/emailbuilder-v1/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Actovision-ORG/emailbuilder-v1/releases/tag/v1.0.0
