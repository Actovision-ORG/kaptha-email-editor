# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-XX

### ⚠️ BREAKING CHANGES

This is a major architecture overhaul following industry best practices. The wrapper now uses a framework-agnostic core API with a clean separation between the core editor and framework-specific wrappers.

#### What Changed

1. **API Key Required**: All usage now requires an API key
   - Get your free key at: hello@kaptha.com
   - Format: `kpt_{tier}_ws{workspaceId}_{hash}`
   - Example: `kpt_dev_ws001_demo12345678`

2. **New API Pattern**: Framework-agnostic core with React wrapper
   - Core API: `kapthaEmailEditor.init(config)`
   - React wrapper uses core API internally
   - Component renamed: `EmailEditor` → `KapthaEmailEditor`

3. **CDN URLs Changed**:
   - OLD: `https://code.kaptha.dev/core/editor.js`
   - NEW: `https://code.kaptha.dev/core/builder.js`
   - OLD: `https://code.kaptha.dev/core/editor.css`
   - NEW: `https://code.kaptha.dev/core/builder.css`

4. **Props Changed**:
   - Removed: `height`, `onExport`, `initialTemplate`, `onSave`, `onChange`
   - Added: `apiKey` (required), `minHeight`, `onReady`, `onDesignChange`, `initialDesign`
   - Use ref methods instead of callbacks for data operations

5. **React Version Compatibility**:
   - OLD: `^18.0.0 || ^19.0.0`
   - NEW: `>=18.0.0` (forward compatible)

#### Migration Guide

**Old v1.x Usage:**
```tsx
import EmailEditor from '@actovision/kaptha-email-editor';

<EmailEditor
  height="600px"
  onExport={(html, mjml) => {
    console.log(html, mjml);
  }}
/>
```

**New v2.0.0 Usage:**
```tsx
import KapthaEmailEditor, { EditorMethods } from '@actovision/kaptha-email-editor';
import { useRef } from 'react';

const editorRef = useRef<EditorMethods>(null);

const handleExport = async () => {
  if (editorRef.current) {
    const { html, mjml } = await editorRef.current.exportHtml();
    console.log(html, mjml);
  }
};

<KapthaEmailEditor
  ref={editorRef}
  apiKey="kpt_dev_ws001_demo12345678"
  minHeight="600px"
  onReady={() => console.log('Ready!')}
/>
```

### Added

- **Framework-Agnostic Core API**
  - `kapthaEmailEditor.init()` - Initialize editor with config
  - `window.kaptha.init()` - Alternative namespace
  - `window.kaptha.createEditor()` - Alternative method name
  - Exposed globally from CDN for vanilla JS usage

- **API Key Authentication System**
  - Secure API key validation
  - Domain whitelist support (`*`, `*.domain.com`, exact domains)
  - File:// protocol support for local development
  - Automatic workspace ID extraction from API key

- **Editor Methods via Ref**
  - `loadDesign(design)` - Load email template
  - `saveDesign()` - Get current design JSON
  - `exportHtml()` - Export to HTML + MJML
  - `exportMjml()` - Export to MJML only
  - `exportJson()` - Export to JSON format
  - `destroy()` - Clean up editor instance

- **TypeScript Support**
  - Full type definitions for all methods
  - `EditorMethods` interface
  - `EmailDesign` interface
  - `KapthaEmailEditorProps` interface

- **Enhanced Error Handling**
  - API key validation errors with helpful messages
  - Domain whitelist validation
  - Script loading error handling
  - Initialization error handling

### Changed

- **Architecture**: Two-layer system (core API + React wrapper)
- **Bundle Size**: 181KB → 212KB (50KB → 57KB gzipped)
- **Component Name**: `EmailEditor` → `KapthaEmailEditor`
- **Export Pattern**: Named export + default export
- **React Compatibility**: Forward compatible with >=18.0.0
- **CDN Paths**: `editor.js` → `builder.js`, `editor.css` → `builder.css`

### Benefits of New Architecture

✅ **Industry Standard Pattern** - Clean two-layer architecture with framework-agnostic core  
✅ **Framework Agnostic** - Core API works with vanilla JS, Vue, Angular, Svelte  
✅ **Clean Separation** - Core logic separated from framework-specific code  
✅ **Future Proof** - Easy to add support for new frameworks  
✅ **Better Security** - API key validation and domain restrictions  
✅ **Type Safety** - Comprehensive TypeScript definitions  
✅ **Imperative API** - Direct method calls via ref (no callback soup)

### Security

- API keys validated on every initialization
- Domain whitelist enforcement
- Secure key format with workspace isolation
- Development keys for testing (`kpt_dev_*`)

### Documentation

- Complete README overhaul with new API examples
- Migration guide from v1.x to v2.0.0
- TypeScript usage examples
- CDN usage examples (vanilla JS)
- API key setup instructions

---

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
- CDN users must now include React and ReactDOM scripts before EmailEditor

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

**For CDN users**: Add React scripts before EmailEditor:
```html
<!-- Add these BEFORE the EmailEditor script -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Then EmailEditor -->
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
- React wrapper component that loads EmailEditor from CDN
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
