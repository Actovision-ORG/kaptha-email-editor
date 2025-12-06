# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2024-12-06

### ⚠️ BREAKING CHANGES

Major API cleanup and improved developer experience.

#### API Changes
- **Cleaner Global API**: Use `KapthaEmailEditor.createEditor()` directly instead of `window.KapthaEmailEditor.createEditor()`
- Core bundle now exports `KapthaEmailEditor` as a global variable (window prefix still works but deprecated)
- Named export `createEditor` available for module imports

#### Cache Management
- **Automatic Cache Busting**: CDN URLs now include automatic date-based versioning
- Format: `editor.js?v=YYYY-MM-DD` updates daily to prevent stale caches
- Dynamic calculation: `CACHE_VERSION = new Date().toISOString().split('T')[0]`

#### Testing Improvements
- Fixed flaky CDN tests using `waitFor` instead of raw `setTimeout`
- Cache-busting test now uses dynamic date calculation instead of hardcoded date
- All 16 unit tests passing reliably

#### Examples
- Added React example in `kaptha-email-editor-core/examples/react/`
- Demonstrates local development workflow using build artifacts
- Clean API usage without window prefix

### Migration Guide

**Before (v2.x):**
```typescript
const editor = window.KapthaEmailEditor.createEditor({ ... });
```

**After (v3.0.0):**
```typescript
const editor = KapthaEmailEditor.createEditor({ ... });
```

### Changed
- Updated all documentation to use cleaner API (removed `window.` prefix)
- Wrapper package automatically handles cache invalidation
- Published to npm as `@actovision/kaptha-email-editor@3.0.0`

## [2.1.0] - 2024-12-06

### Changed
- **Architecture Refactor**: Simplified to framework-agnostic core bundle
  - Renamed core entry point from `vanillaEditor.ts` to `index.ts`
  - Renamed build config from `vite.config.vanilla.ts` to `vite.config.ts`
  - Removed "vanilla" terminology throughout codebase
  - Updated CDN path from `/core/vanilla/` to `/core/embed/`
  - Self-contained bundle with React bundled internally (391KB, 113KB gzipped)

### Removed
- **Code Cleanup**: Removed 30 files (1,783 deletions)
  - Deleted old UMD build system and configuration
  - Removed old API wrapper files
  - Deleted duplicate example applications
  - Removed test HTML files
  - Cleaned up unused build artifacts

### Fixed
- Simplified package.json scripts (`build`, `dev`, `deploy`)
- Updated all workflow references to new CDN path
- Improved terminology consistency across documentation

## [2.0.9] - 2024-12-04

### Fixed
- **React 19 Support**: Fixed CDN bundle compatibility with React 19
  - Resolved "ReactCurrentOwner undefined" error by ensuring pure React 19 build environment
  - Added cache-busting to CDN URLs to force fresh bundle loading after update
  - CDN bundle now built with React 19.2.1 (deduplicated)
  
### Changed
- CDN URLs now include cache-busting timestamp parameter for reliable updates
- Core workspace upgraded to React 19.2.0 as direct dependency

## [2.0.0] - 2024-12-03

### ⚠️ BREAKING CHANGES

This is a major architecture overhaul following industry best practices. The wrapper now uses a framework-agnostic core API with a clean separation between the core editor and framework-specific wrappers.

#### What Changed

1. **API Key Required**: All usage now requires an API key
   - Get your free key at: hello@kaptha.com
   - Format: `kpt_{tier}_ws{workspaceId}_{hash}`
   - Example: `kpt_dev_ws001_demo12345678`

2. **New API Pattern**: Framework-agnostic core with React wrapper
   - Core API: `window.KapthaEmailEditor.createEditor(config)`
   - React wrapper uses core API internally
   - Component renamed: `EmailEditor` → `KapthaEmailEditor`

3. **CDN URLs**:
   - JavaScript: `https://code.kaptha.dev/core/embed/editor.js`
   - CSS: `https://code.kaptha.dev/core/embed/editor.css`

4. **Props Changed**:
   - Removed: `height`, `onExport`, `initialTemplate`, `onSave`, `onChange`
   - Added: `apiKey` (required), `minHeight`, `onReady`, `onDesignChange`, `initialDesign`
   - Use ref methods instead of callbacks for data operations

5. **React Version Compatibility**:
   - Supports both React 18 and React 19
   - Zero version conflicts due to self-contained bundle architecture

#### Migration Guide

**Before (v1.x):**
```tsx
<EmailEditor
  height="600px"
  onSave={(template) => console.log(template)}
  onChange={(components) => console.log(components)}
/>
```

**After (v2.x):**
```tsx
const editorRef = useRef<EditorMethods>(null);

<KapthaEmailEditor
  ref={editorRef}
  apiKey="kpt_dev_ws001_demo12345678"
  minHeight="600px"
  onReady={() => console.log('Ready!')}
  onDesignChange={(design) => console.log(design)}
/>

// Use ref methods for operations
const design = editorRef.current?.saveDesign();
const { html, mjml } = await editorRef.current?.exportHtml();
```

### Added
- API key authentication system
- Framework-agnostic core API
- Self-contained CDN bundle (113KB gzipped)
- Support for React 18 and React 19
- Improved TypeScript types
- Custom blocks support
- Better error handling

### Removed
- Direct React component approach
- Old `onChange` and `onSave` callbacks
- `height` prop (use `minHeight` instead)
- Built-in React dependency (now bundled in core)

### Migration Path

1. Get an API key from hello@kaptha.com
2. Update imports: `EmailEditor` → `KapthaEmailEditor`
3. Add `apiKey` prop
4. Replace callbacks with ref methods
5. Change `height` to `minHeight`
6. Update CDN URLs if using direct integration

## [1.0.0] - 2024-11-15

### Added
- Initial release
- Drag-and-drop email builder
- MJML export
- React 18 support
- Basic component system
- Template selector
- Property editors
