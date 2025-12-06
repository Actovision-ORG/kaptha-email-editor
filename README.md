# @actovision/kaptha-email-editor

[![npm version](https://badge.fury.io/js/%40actovision%2Fkaptha-email-editor.svg)](https://www.npmjs.com/package/@actovision/kaptha-email-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Actovision-ORG/kaptha-email-editor?utm_source=oss&utm_medium=github&utm_campaign=Actovision-ORG%2Fkaptha-email-editor&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

> React wrapper for Kaptha Email Editor - A powerful drag-and-drop email builder with framework-agnostic core API

A lightweight React component that loads Kaptha Email Editor from CDN using a self-contained JavaScript bundle. Build beautiful, responsive email templates with drag-and-drop functionality - **no React version conflicts**.

## ✨ Features

- **🔑 API Key Authentication** - Secure access with API key validation
- **📦 CDN-Based** - Self-contained bundle (113KB gzipped) with React bundled internally
- **🎯 Zero React Conflicts** - Works with React 18 and React 19 without version conflicts
- **🎨 Drag-and-Drop** - Intuitive email builder interface with react-dnd included
- **📦 Custom Blocks** - Add reusable pre-built component groups to Elements panel
- **📧 MJML Export** - Production-ready responsive emails
- **🔧 TypeScript** - Full type safety included
- **🚀 Framework Agnostic** - Core API can be used in any JavaScript framework
- **⚡ Battle-Tested** - Verified with React 18.3.1 and React 19.2.0

## 📋 Requirements

- React ^18.0.0 || ^19.0.0
- React DOM ^18.0.0 || ^19.0.0
- API key (get yours at: hello@kaptha.com)

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
      />
      <button onClick={handleExport}>Export</button>
    </>
  );
}

export default App;
```

## 📚 API Reference

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `apiKey` | `string` | ✅ Yes | - | Your API key from hello@kaptha.com |
| `minHeight` | `string` | No | `'600px'` | Minimum height of the editor |
| `customBlocks` | `CustomBlock[]` | No | `[]` | Custom reusable blocks |
| `initialDesign` | `EmailDesign` | No | - | Initial email design to load |
| `onReady` | `() => void` | No | - | Called when editor is ready |
| `onDesignChange` | `(design: EmailDesign) => void` | No | - | Called when design changes |
| `onLoad` | `() => void` | No | - | Called when CDN resources load |

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

This package uses a **framework-agnostic core with React wrapper** architecture for maximum compatibility:

### How It Works

1. **CDN Bundle** (`editor.js`): Self-contained JavaScript bundle with React bundled internally
   - Size: 391KB raw (113KB gzipped)
   - Includes: React, ReactDOM, react-dnd, react-dnd-html5-backend
   - URL: `https://code.kaptha.dev/core/embed/editor.js`

2. **React Wrapper** (this package): Lightweight component that loads and wraps the core API
   - Size: ~5KB wrapper code
   - Loads core bundle from CDN automatically
   - Provides React-friendly props and ref interface

### Benefits

- **Zero Version Conflicts**: Parent app and core bundle use separate React instances
- **Smaller App Bundles**: Core editor loaded from CDN, not bundled with your app
- **Framework Flexibility**: Core API can be used directly in Vue, Angular, etc.
- **Automatic Updates**: CDN bundle updates don't require npm update

### Bundle Sizes

- **React Wrapper**: ~5KB (this npm package)
- **CDN Bundle**: 391KB (113KB gzipped) - includes everything
- **Total Download**: ~113KB gzipped for first load (cached thereafter)

## 🔧 Direct CDN Usage

For non-React projects or direct usage:

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
    const editor = window.KapthaEmailEditor.createEditor({
      container: document.getElementById('editor-container'),
      apiKey: 'kpt_dev_ws001_demo12345678',
      minHeight: '600px',
      onReady: () => console.log('Ready!')
    });
  </script>
</body>
</html>
```

## 🐛 Troubleshooting

### Editor not loading

- Check browser console for errors
- Verify API key is valid
- Ensure internet connection (CDN access required)

### React version conflicts

- This package is designed to avoid conflicts by bundling React internally
- Works with both React 18 and React 19 parent apps

### TypeScript errors

- Ensure `@types/react` and `@types/react-dom` are installed
- Check that TypeScript version is 4.7+

## 📄 License

MIT © [Actovision](https://github.com/Actovision-ORG)

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📞 Support

- **Email**: hello@kaptha.com
- **Issues**: [GitHub Issues](https://github.com/Actovision-ORG/kaptha-email-editor/issues)
- **Docs**: [Full Documentation](https://github.com/Actovision-ORG/kaptha-email-editor-core)

## 🔗 Related Packages

- [kaptha-email-editor-core](https://github.com/Actovision-ORG/kaptha-email-editor-core) - Core editor with framework-agnostic API
