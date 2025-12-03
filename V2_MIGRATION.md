# Kaptha Email Editor v2.0.0 - Wrapper Package Migration

## Overview

The `@actovision/kaptha-email-editor` wrapper package has been updated to v2.0.0 to align with the new framework-agnostic architecture implemented in `kaptha-email-editor-core`.

## Architecture Changes

### Old v1.x Architecture
```
npm package → Loads CDN → Directly mounts React component
                         (window.KapthaEmailEditor.EmailEditor)
```

**Issues:**
- Exposed React components directly from CDN
- Framework-specific approach
- Limited flexibility for other frameworks
- Callbacks-based API

### New v2.0.0 Architecture
```
npm package → Loads CDN → Uses framework-agnostic API
                         (kapthaEmailEditor.init())
                       → API mounts React component internally
```

**Benefits:**
- ✅ Framework-agnostic core API
- ✅ Industry-standard two-layer architecture
- ✅ Easy to add Vue, Angular, Svelte wrappers
- ✅ Imperative ref-based API (cleaner than callbacks)
- ✅ API key validation and security
- ✅ Forward compatible React versions (>=18.0.0)

## What Changed

### 1. Component Name
```tsx
// OLD
import EmailEditor from '@actovision/kaptha-email-editor';

// NEW
import KapthaEmailEditor from '@actovision/kaptha-email-editor';
```

### 2. Props Interface
```tsx
// OLD (v1.x)
interface EmailEditorProps {
  height?: string;
  onExport?: (html: string, mjml: string) => void;
  initialTemplate?: any;
  onSave?: (template: any) => void;
  onChange?: (components: any[]) => void;
}

// NEW (v2.0.0)
interface KapthaEmailEditorProps {
  apiKey: string;                           // REQUIRED
  workspaceId?: string;
  minHeight?: string;                        // was 'height'
  displayMode?: 'email' | 'web';
  onLoad?: () => void;
  onReady?: () => void;                     // was 'onLoad'
  onDesignChange?: (design: EmailDesign) => void; // was 'onChange'
  initialDesign?: EmailDesign;              // was 'initialTemplate'
  className?: string;
  style?: React.CSSProperties;
}
```

### 3. API Pattern
```tsx
// OLD (v1.x) - Callbacks
<EmailEditor
  height="600px"
  onExport={(html, mjml) => {
    console.log(html, mjml);
  }}
/>

// NEW (v2.0.0) - Ref-based
const editorRef = useRef<EditorMethods>(null);

const handleExport = async () => {
  const { html, mjml } = await editorRef.current.exportHtml();
  console.log(html, mjml);
};

<KapthaEmailEditor
  ref={editorRef}
  apiKey="kpt_dev_ws001_demo12345678"
  minHeight="600px"
/>
```

### 4. Editor Methods
```typescript
// NEW: Available via ref
interface EditorMethods {
  loadDesign: (design: EmailDesign) => void;
  saveDesign: () => EmailDesign;
  exportHtml: () => Promise<{ html: string; mjml: string }>;
  exportMjml: () => string;
  exportJson: () => EmailDesign;
  destroy: () => void;
}
```

### 5. CDN URLs
```
OLD: https://code.kaptha.dev/core/editor.js
NEW: https://code.kaptha.dev/core/builder.js

OLD: https://code.kaptha.dev/core/editor.css
NEW: https://code.kaptha.dev/core/builder.css
```

### 6. React Version
```json
// OLD
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}

// NEW
"peerDependencies": {
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

## Files Modified

1. **src/index.tsx** (Complete rewrite)
   - Implements framework-agnostic API usage
   - Uses `kapthaEmailEditor.init()` instead of direct component mounting
   - Added forwardRef pattern for editor methods
   - Added API key validation
   - Dynamic ReactDOM import to avoid top-level await issues

2. **package.json**
   - Version: 1.1.0 → 2.0.0
   - Updated description
   - Changed React peer deps to >=18.0.0
   - Added more keywords

3. **README.md** (Complete rewrite)
   - New API documentation
   - Migration guide from v1.x
   - TypeScript examples
   - CDN usage examples
   - API key setup instructions
   - Architecture explanation

4. **CHANGELOG.md**
   - Added comprehensive v2.0.0 entry
   - Breaking changes documentation
   - Migration guide
   - Benefits explanation

## Migration Examples

### Basic Usage

**v1.x:**
```tsx
import EmailEditor from '@actovision/kaptha-email-editor';

function App() {
  return (
    <EmailEditor 
      height="100vh"
      onExport={(html, mjml) => {
        console.log('HTML:', html);
        console.log('MJML:', mjml);
      }}
    />
  );
}
```

**v2.0.0:**
```tsx
import KapthaEmailEditor, { EditorMethods } from '@actovision/kaptha-email-editor';
import { useRef } from 'react';

function App() {
  const editorRef = useRef<EditorMethods>(null);

  const handleExport = async () => {
    if (editorRef.current) {
      const { html, mjml } = await editorRef.current.exportHtml();
      console.log('HTML:', html);
      console.log('MJML:', mjml);
    }
  };

  return (
    <>
      <KapthaEmailEditor
        ref={editorRef}
        apiKey="kpt_dev_ws001_demo12345678"
        minHeight="100vh"
        onReady={() => console.log('Editor ready!')}
      />
      <button onClick={handleExport}>Export</button>
    </>
  );
}
```

### With Initial Template

**v1.x:**
```tsx
<EmailEditor
  initialTemplate={{
    name: 'My Email',
    category: 'custom',
    components: []
  }}
/>
```

**v2.0.0:**
```tsx
<KapthaEmailEditor
  ref={editorRef}
  apiKey="kpt_dev_ws001_demo12345678"
  initialDesign={{
    components: [
      {
        type: 'text',
        props: {
          content: '<h1>Hello World</h1>',
          fontSize: '24px'
        }
      }
    ]
  }}
/>
```

### Save Functionality

**v1.x:**
```tsx
<EmailEditor
  onSave={(template) => {
    console.log('Saved:', template);
  }}
/>
```

**v2.0.0:**
```tsx
const editorRef = useRef<EditorMethods>(null);

const handleSave = () => {
  if (editorRef.current) {
    const design = editorRef.current.saveDesign();
    console.log('Saved:', design);
  }
};

<KapthaEmailEditor ref={editorRef} apiKey="..." />
<button onClick={handleSave}>Save</button>
```

## API Keys

### Getting an API Key

Email: **hello@kaptha.com**

### API Key Format

```
kpt_{tier}_ws{workspaceId}_{hash}
```

Examples:
- `kpt_dev_ws001_demo12345678` - Development (unrestricted)
- `kpt_free_ws002_a1b2c3d4e5f6` - Free tier (localhost only)
- `kpt_free_ws003_x1y2z3a4b5c6` - Free tier (demo domains)
- `kpt_pro_ws004_h8i9j0k1l2m3` - Pro tier (Acme Corp)

### Domain Validation

API keys can be restricted to specific domains:
- `*` - Unrestricted (dev keys only)
- `*.domain.com` - Wildcard subdomains
- `example.com` - Exact domain match
- `file://` - Local file testing (treated as localhost)

## TypeScript Support

Full TypeScript definitions included:

```typescript
import KapthaEmailEditor, { 
  EditorMethods, 
  EmailDesign,
  KapthaEmailEditorProps 
} from '@actovision/kaptha-email-editor';
```

## Testing

### Build Test
```bash
npm run build
```

### Manual Test
Open `test-wrapper-v2.html` in a browser to test the wrapper with all features:
- API key selection
- Save/Load design
- Export HTML/MJML
- Load template
- Destroy editor

## Deployment Checklist

- [x] Update src/index.tsx with new API
- [x] Update package.json version and dependencies
- [x] Update README.md with new documentation
- [x] Update CHANGELOG.md with v2.0.0 entry
- [x] Create test file (test-wrapper-v2.html)
- [x] Build package successfully
- [x] Verify no TypeScript errors
- [ ] Test with real React app
- [ ] Publish to npm

## Next Steps

1. **Test in Real Application**
   - Create test React app
   - Install wrapper package locally
   - Test all methods
   - Verify API key validation

2. **Publish to npm**
   ```bash
   npm login
   npm publish
   ```

3. **Update Examples**
   - Update demo/react example
   - Update demo/nextjs example
   - Create migration examples

4. **Documentation**
   - Update main repo README
   - Add migration guide
   - Create video tutorial

## Benefits of v2.0.0

### For Developers
- ✅ Cleaner imperative API (ref-based vs callbacks)
- ✅ Better TypeScript support
- ✅ Forward compatible React versions
- ✅ Industry-standard pattern
- ✅ API key-based authentication

### For Architecture
- ✅ Framework-agnostic core
- ✅ Easy to add Vue/Angular/Svelte wrappers
- ✅ Clean separation of concerns
- ✅ Better maintainability
- ✅ Future-proof design

### For Security
- ✅ API key validation
- ✅ Domain whitelisting
- ✅ Workspace isolation
- ✅ Development vs production keys

## Notes

- **Breaking Change**: This is a major version bump (1.x → 2.0.0)
- **Migration Required**: Users must update their code
- **Documentation**: Comprehensive migration guide provided
- **Testing**: Manual test file included (test-wrapper-v2.html)
- **Compatibility**: React >=18.0.0 (forward compatible)

---

**Updated:** 2025-01-XX  
**Status:** Ready for Testing  
**Next:** Test in real React app, then publish to npm
