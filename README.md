# @actovision/kaptha-email-editor

[![npm version](https://badge.fury.io/js/%40actovision%2Fkaptha-email-editor.svg)](https://www.npmjs.com/package/@actovision/kaptha-email-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Actovision-ORG/kaptha-email-editor?utm_source=oss&utm_medium=github&utm_campaign=Actovision-ORG%2Fkaptha-email-editor&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

## 🆕 Latest Update

**KEBDV-54 | feat: Wrapper Updated**

The React wrapper for Kaptha Email Editor has been updated for improved compatibility and features. See the [latest changelog](./CHANGELOG.md) for details.

> React wrapper for Kaptha Email Editor - A powerful drag-and-drop email builder with framework-agnostic core API

A lightweight React component that loads Kaptha Email Editor from CDN using a self-contained JavaScript bundle. Build beautiful, responsive email templates with drag-and-drop functionality - **no React version conflicts**.

## ✨ Features

- **🔑 API Key Authentication** - Secure access with background validation and retry logic
- **📦 Zero Dependencies** - CDN-based bundle (113KB gzipped) with React bundled internally
- **🎯 Universal Compatibility** - Works with React 18, 19, Vue, Svelte, Angular, and vanilla JS
- **🎨 Drag-and-Drop** - Intuitive visual email builder with 10+ components
- **🧩 Custom Blocks** - Create reusable component groups for your brand
- **📧 MJML Export** - Production-ready responsive HTML emails
- **🔧 TypeScript** - Full type safety with comprehensive interfaces
- **⚡ Industry Standard API** - Synchronous initialization matching email editor best practices

## 📋 Requirements

- React ^18.0.0 || ^19.0.0
- React DOM ^18.0.0 || ^19.0.0
- API key (get yours at: https://app.kaptha.com)

## 📦 Installation

```bash
npm install @actovision/kaptha-email-editor
```

**Note:** React and React DOM are peer dependencies and should already be in your project.

## 🚀 Quick Start

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
        minHeight="600px"
        onReady={() => console.log('Editor ready!')}
        onError={(error) => console.error('Init failed:', error)}
      />
      <button onClick={handleExport}>Export HTML</button>
    </>
  );
}
```

> **Note:** Editor renders immediately. API validation happens in background. Use `onReady` to know when validation completes.

## 📚 API Reference

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `apiKey` | `string` | ✅ Yes | - | Your API key from https://app.kaptha.com |
| `minHeight` | `string` | No | `'600px'` | Minimum height of the editor |
| `customBlocks` | `CustomBlock[]` | No | `[]` | Custom reusable blocks |
| `initialDesign` | `EmailDesign` | No | - | Initial email design to load |
| `onReady` | `() => void` | No | - | Called when editor is ready (after API validation) |
| `onDesignChange` | `(design: EmailDesign) => void` | No | - | Called when design changes |
| `onLoad` | `() => void` | No | - | Called when CDN resources load |
| `onError` | `(error: Error) => void` | No | - | Called on initialization errors (e.g., invalid API key) |

### Ref Methods

Access editor methods via ref:

```tsx
const editorRef = useRef<EditorMethods>(null);

// Load a design
editorRef.current?.loadDesign(design);

// Save current design
const design = editorRef.current?.saveDesign();

// Export to HTML/MJML
const { html, mjml } = await editorRef.current?.exportHtml();

// Export to MJML only
const mjml = editorRef.current?.exportMjml();

// Export to JSON
const json = editorRef.current?.exportJson();

// Destroy editor
editorRef.current?.destroy();
```

### Types

```tsx
interface EmailDesign {
  components: any[];
}

interface CustomBlock {
  id: string;
  name: string;
  category?: string;
  thumbnail?: string;
  components: any[];
}

interface EditorMethods {
  loadDesign: (design: EmailDesign) => void;
  saveDesign: () => EmailDesign;
  exportHtml: () => Promise<{ html: string; mjml: string }>;
  exportMjml: () => string;
  exportJson: () => EmailDesign;
  destroy: () => void;
}
```

## 🎨 Custom Blocks Example

```tsx
const customBlocks = [
  {
    id: 'hero-section',
    name: 'Hero Section',
    category: 'marketing',
    components: [
      {
        id: 'text-1',
        type: 'text',
        props: {
          text: '<h1>Welcome</h1>',
          fontSize: '32px',
          fontWeight: 'bold',
          align: 'center'
        }
      },
      {
        id: 'button-1',
        type: 'button',
        props: {
          text: 'Get Started',
          href: 'https://example.com',
          backgroundColor: '#4F46E5'
        }
      }
    ]
  }
];

<KapthaEmailEditor
  apiKey="your-api-key"
  customBlocks={customBlocks}
/>
```

## 🏗️ Architecture

**Framework-agnostic core + lightweight wrappers** for maximum compatibility:

| Component | Size | Description |
|-----------|------|-------------|
| **CDN Bundle** | 113KB (gzipped) | Self-contained editor with React, react-dnd, all components |
| **React Wrapper** | 5KB | This npm package - loads CDN and provides React API |
| **Total Download** | ~113KB | First load only (cached with automatic versioning) |

### Why This Approach?

✅ **Zero Conflicts** - CDN bundle uses isolated React instance  
✅ **Smaller Builds** - Editor not bundled with your app  
✅ **Framework Agnostic** - Works with React, Vue, Svelte, vanilla JS  
✅ **Auto Cache Busting** - Daily versioning (`editor.js?v=2026-02-16`)  
✅ **Background Validation** - Non-blocking API key checks with retry logic

## 🎯 Framework Examples

See complete working examples in the [`/demo`](./demo) folder:

- **[React](./demo/react)** - Vite + React with TypeScript
- **[Next.js](./demo/nextjs)** - App Router with client components
- **[Vue 3](./demo/vue)** - Composition API with custom wrapper
- **[Svelte](./demo/svelte)** - Reactive components with custom events

Each demo includes:
- Complete working application
- TypeScript support
- Custom blocks examples
- README with setup instructions

## 🔧 Direct CDN Usage

For non-React projects (Vue, Svelte, vanilla JS):

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://code.kaptha.dev/core/embed/editor.css">
</head>
<body>
  <div id="editor-container"></div>
  
  <script src="https://code.kaptha.dev/core/embed/editor.js"></script>
  <script>
    // Synchronous API - editor renders immediately
    const editor = KapthaEmailEditor.createEditor({
      container: document.getElementById('editor-container'),
      apiKey: 'kpt_dev_ws001_demo12345678',
      minHeight: '600px',
      onReady: () => console.log('Ready!'), // Called after validation
      onError: (err) => console.error('Failed:', err)
    });
    
    // Editor instance available immediately
    // Methods work right away (queued internally if needed)
    editor.loadDesign({ components: [] });
  </script>
</body>
</html>
```

> **Industry Standard:** Follows the common email editor API pattern. Editor renders immediately, validation happens in background.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Editor not rendering** | Check console errors, verify CDN access |
| **"Invalid API key" error** | Get valid key from https://app.kaptha.com |
| **Validation slow** | Normal - background validation with retry (up to 7s) |
| **React conflicts** | Not possible - CDN bundle uses isolated React instance |
| **TypeScript errors** | Install `@types/react` and `@types/react-dom` |

### Pattern Comparison

```typescript
// ✅ Correct - Synchronous initialization
const editor = KapthaEmailEditor.createEditor({ 
  apiKey: 'key',
  onReady: () => console.log('Validated'),
  onError: (err) => console.error(err)
});

// ✅ Also works - Chain methods immediately
editor.loadDesign({ components: [] });
```

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for full release history.

### Latest: v3.2.0 (2026-02-16)

**Changed:**
- ⚡ **Synchronous API** - `createEditor()` now returns editor instance immediately
- 🎯 **Industry Standard** - Matches common email editor API patterns
- 🔄 **Background Validation** - API validation with retry logic happens non-blocking
- 🎯 **Better UX** - Editor renders instantly, `onReady` fires after validation

**Migration from v3.0.x:**
```typescript
// Before (v3.0.x) - Also works in v3.2.0!
const editor = KapthaEmailEditor.createEditor({ ... });

// After (v3.2.0) - Same API!
const editor = KapthaEmailEditor.createEditor({ 
  ...,
  onReady: () => console.log('Validated!'), // Called after validation
  onError: (err) => console.error('Failed:', err)
});
```

**No Breaking Changes!** Code written for v3.0.x still works. Just add `onError` callback for better error handling.

## 📄 License

MIT © [Actovision](https://github.com/Actovision-ORG)

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📞 Support

- 📧 **Email**: hello@kaptha.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/Actovision-ORG/kaptha-email-editor/issues)
- 📚 **Docs**: [Full Documentation](https://github.com/Actovision-ORG/kaptha-email-editor-core)
- 🔑 **API Keys**: [Console](https://app.kaptha.com)

