# @actovision/kaptha-email-editor

[![npm version](https://badge.fury.io/js/%40actovision%2Fkaptha-email-editor.svg)](https://www.npmjs.com/package/@actovision/kaptha-email-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Actovision-ORG/kaptha-email-editor?utm_source=oss&utm_medium=github&utm_campaign=Actovision-ORG%2Fkaptha-email-editor&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

> React wrapper for Kaptha Email Editor - A powerful drag-and-drop email builder with framework-agnostic API

A lightweight React component that loads Kaptha Email Editor from CDN using a clean, framework-agnostic API. Build beautiful, responsive email templates with drag-and-drop functionality.

## ✨ Features

- **🔑 API Key Authentication** - Secure access with API key validation
- **📦 CDN-Based** - Loads optimized bundle from CDN (212KB, 57KB gzipped)
- **🎯 Framework-Agnostic Core** - Industry-standard architecture separating core API from React wrapper
- **🎨 Drag-and-Drop** - Intuitive email builder interface powered by react-dnd
- **📦 Custom Blocks** - Add reusable pre-built component groups to Elements panel
- **📧 MJML Export** - Production-ready responsive emails
- **🔧 TypeScript** - Full type safety included
- **🚀 Efficient** - Share React across your app
- **⚡ React 18 & 19** - Tested with both React 18 and 19

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

## 🎨 Custom Blocks

Add reusable pre-built component groups to the Elements panel:

```tsx
import KapthaEmailEditor from '@actovision/kaptha-email-editor';

function App() {
  // Define custom blocks
  const customBlocks = [
    {
      id: 'hero-section',
      name: 'Hero Section',
      category: 'marketing',
      thumbnail: 'https://example.com/hero-thumb.png', // optional
      components: [
        {
          id: 'text-hero-1',
          type: 'text',
          props: {
            text: '<h1>Welcome to Our Newsletter</h1>',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a202c',
            align: 'center'
          }
        },
        {
          id: 'text-hero-2',
          type: 'text',
          props: {
            text: '<p>Stay updated with our latest news and updates.</p>',
            fontSize: '16px',
            color: '#718096',
            align: 'center'
          }
        },
        {
          id: 'button-hero',
          type: 'button',
          props: {
            text: 'Get Started',
            href: 'https://example.com',
            backgroundColor: '#3182ce',
            textColor: '#ffffff',
            align: 'center'
          }
        }
      ]
    },
    {
      id: 'footer-block',
      name: 'Footer',
      category: 'footer',
      components: [
        {
          id: 'social-footer',
          type: 'social',
          props: {
            links: [
              { platform: 'facebook', url: 'https://facebook.com/yourpage' },
              { platform: 'twitter', url: 'https://twitter.com/yourhandle' }
            ],
            iconSize: '32px',
            align: 'center'
          }
        },
        {
          id: 'text-footer',
          type: 'text',
          props: {
            text: '<p>© 2024 Your Company. All rights reserved.</p>',
            fontSize: '12px',
            color: '#a0aec0',
            align: 'center'
          }
        }
      ]
    }
  ];

  return (
    <KapthaEmailEditor
      apiKey="kpt_dev_ws001_demo12345678"
      minHeight="600px"
      customBlocks={customBlocks}
      onReady={() => console.log('Editor ready!')}
    />
  );
}

export default App;
```

Custom blocks appear in the Elements panel with a Package icon and can be dragged onto the canvas. When dropped, all components in the block are inserted as a group.

## 🔑 API Keys

### Free Development Key (Available Now!)

You can start building immediately with our free development key:

```text
kpt_dev_ws001_demo12345678
```

**This key is:**
- ✅ Free to use for development and testing
- ✅ Works on any domain (unrestricted)
- ✅ Available until our API key management console launches
- ✅ Perfect for evaluation and prototyping

### Get Your Own API Key

For production use and custom domain restrictions, contact us at: **[hello@kaptha.com](mailto:hello@kaptha.com)**

API keys follow this format: `kpt_{tier}_ws{workspaceId}_{hash}`

## 📚 API Reference

### `<KapthaEmailEditor>`

**Props:**

```typescript
interface KapthaEmailEditorProps {
  // Required
  apiKey: string;
  
  // Optional
  workspaceId?: string;
  minHeight?: string; // default: '600px'
  customBlocks?: CustomBlock[]; // Custom reusable component groups
  onLoad?: () => void;
  onReady?: () => void;
  onDesignChange?: (design: EmailDesign) => void;
  initialDesign?: EmailDesign;
  className?: string;
  style?: React.CSSProperties;
}

interface CustomBlock {
  id: string;                    // Unique identifier
  name: string;                  // Display name in Elements panel
  category?: string;             // Optional category for grouping
  thumbnail?: string;            // Optional thumbnail URL
  components: EmailComponent[];  // Array of components to insert
}
```

**Editor Methods (via ref):**

```typescript
interface EditorMethods {
  loadDesign: (design: EmailDesign) => void;
  saveDesign: () => EmailDesign;
  exportHtml: () => Promise<{ html: string; mjml: string }>;
  exportMjml: () => string;
  exportJson: () => EmailDesign;
  destroy: () => void;
}
```

**Usage Example:**

```tsx
import KapthaEmailEditor, { EditorMethods, EmailDesign } from '@actovision/kaptha-email-editor';
import { useRef } from 'react';

function App() {
  const editorRef = useRef<EditorMethods>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const design = editorRef.current.saveDesign();
      console.log('Saved design:', design);
      // Save to your backend
    }
  };

  const handleExport = async () => {
    if (editorRef.current) {
      const { html, mjml } = await editorRef.current.exportHtml();
      console.log('Exported HTML:', html);
      console.log('Exported MJML:', mjml);
      // Send to your backend
    }
  };

  const handleLoadTemplate = () => {
    if (editorRef.current) {
      const template: EmailDesign = {
        components: [
          {
            type: 'text',
            props: {
              content: 'Hello World!',
              fontSize: '24px',
              color: '#333333'
            }
          }
        ]
      };
      editorRef.current.loadDesign(template);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleSave}>Save Design</button>
        <button onClick={handleExport}>Export HTML</button>
        <button onClick={handleLoadTemplate}>Load Template</button>
      </div>
      
      <KapthaEmailEditor
        ref={editorRef}
        apiKey="kpt_dev_ws001_demo12345678"
        minHeight="600px"
        onReady={() => console.log('Editor ready!')}
        onDesignChange={(design) => console.log('Design changed:', design)}
      />
    </div>
  );
}
```

## 🔧 CDN Usage (Vanilla JavaScript)

For plain HTML/JavaScript without npm:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://code.kaptha.dev/core/builder.css">
</head>
<body>
  <div id="editor"></div>

  <!-- Include React first -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- Then Kaptha Email Editor (212KB, 57KB gzipped) -->
  <script src="https://code.kaptha.dev/core/builder.js"></script>

  <script>
    // Use framework-agnostic API
    const editor = kapthaEmailEditor.init({
      id: 'editor',
      apiKey: 'kpt_dev_ws001_demo12345678',
      minHeight: '600px',
      onReady: () => {
        console.log('Editor ready!');
      }
    });

    // Export HTML
    async function exportHTML() {
      const { html, mjml } = await editor.exportHtml();
      console.log('HTML:', html);
      console.log('MJML:', mjml);
    }
  </script>
</body>
</html>
```

## 🏗️ Architecture

This package follows industry best practices with a **two-layer architecture**:

1. **Core API (Framework-Agnostic)** - `kapthaEmailEditor.init()` loaded from CDN
2. **React Wrapper** - Thin React component that uses the core API

**Benefits:**
- ✅ Clean separation of concerns
- ✅ Framework-agnostic core can be used with any framework
- ✅ Small wrapper packages for each framework
- ✅ Easy to add support for Vue, Angular, Svelte, etc.
- ✅ Industry-standard two-layer architecture

## 📦 Bundle Sizes

- **CDN Bundle**: 212KB (57KB gzipped) - excludes React/ReactDOM
- **npm Package**: ~3KB wrapper + CDN loader
- **Total**: Depends on your React version (typically ~130KB for React 18)

**Why external React?**
- Share React across multiple libraries
- Use your preferred React version
- Better browser caching
- Smaller individual bundle sizes
- Standard CDN pattern

## 🔧 Version Pinning

By default, the wrapper loads the latest stable version from the root CDN path. You can pin to a specific version using the `KAPTHA_VERSION` environment variable:

### Default (Auto-updates)
```bash
npm run build
# Loads: https://code.kaptha.dev/core/builder.js (latest stable)
```

### Pin to Specific Version
```bash
# Pin to exact version
KAPTHA_VERSION=1.0.1 npm run build
# Loads: https://code.kaptha.dev/core/v1.0.1/builder.js

# With 'v' prefix also works
KAPTHA_VERSION=v1.0.1 npm run build

# Use edge/latest builds (most recent, may be unstable)
KAPTHA_VERSION=latest npm run build
# Loads: https://code.kaptha.dev/core/latest/builder.js
```

### Use Cases
- 🔒 **Production Stability** - Lock to a tested version
- 🧪 **Testing** - Verify against specific core version  
- 🐛 **Rollback** - Revert to previous version if needed
- 📦 **Reproducible Builds** - Same version across all environments

### Example Configuration

**Next.js (package.json):**
```json
{
  "scripts": {
    "build": "next build",
    "build:pinned": "KAPTHA_VERSION=1.0.1 next build"
  }
}
```

**Vite (package.json):**
```json
{
  "scripts": {
    "build": "vite build",
    "build:v1": "KAPTHA_VERSION=1.0.1 vite build"
  }
}
```

**Docker:**
```dockerfile
ENV KAPTHA_VERSION=1.0.1
RUN npm run build
```

## 🎨 Available Components

The builder includes 11 pre-built components:

1. **Text** - Rich text with font size, color, alignment
2. **Button** - Call-to-action buttons with custom styling
3. **Image** - Responsive images with upload support
4. **Video** - Video embeds with poster images
5. **Timer** - Countdown timers with target dates
6. **HTML** - Custom HTML blocks
7. **Divider** - Horizontal dividers
8. **Spacer** - Vertical spacing control
9. **Social** - Social media icons (10+ platforms)
10. **Columns** - Multi-column layouts (2-4 columns)
11. **Section** - Container sections with backgrounds

## 🔐 Security

- **API Key Validation** - All requests require valid API keys
- **Domain Whitelisting** - Restrict usage to specific domains
- **Secure by Default** - Keys validated on every init

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 TypeScript Support

Full TypeScript definitions included:

```typescript
import KapthaEmailEditor, { EditorMethods, EmailDesign } from '@actovision/kaptha-email-editor';
```

## 🔄 Migration from v1.x

**Breaking Changes in v2.0.0:**

1. **API Key Required** - All usage now requires an API key
2. **New API** - Uses `kapthaEmailEditor.init()` instead of direct component mounting
3. **CDN URLs Changed** - `editor.js` → `builder.js`, `editor.css` → `builder.css`
4. **React Version** - Changed from `^18.0.0 || ^19.0.0` to `>=18.0.0`

**Migration Example:**

```tsx
// v1.x (OLD)
<EmailEditor
  height="600px"
  onExport={(html, mjml) => {}}
/>

// v2.0.0 (NEW)
<KapthaEmailEditor
  ref={editorRef}
  apiKey="your-api-key"
  minHeight="600px"
/>
```

## 📝 Changelog

See [CHANGELOG.md](https://github.com/Actovision-ORG/kaptha-email-editor/blob/main/CHANGELOG.md) for release history.

## 🤝 Contributing

Contributions welcome! Please read our [contributing guidelines](https://github.com/Actovision-ORG/kaptha-email-editor/blob/main/CONTRIBUTING.md).

## 📄 License

MIT © [Actovision](https://github.com/Actovision-ORG)

## 💬 Support

- 📖 [Documentation](https://github.com/Actovision-ORG/kaptha-email-editor-core)
- 🐛 [Issue Tracker](https://github.com/Actovision-ORG/kaptha-email-editor/issues)
- 💬 [Discussions](https://github.com/Actovision-ORG/kaptha-email-editor/discussions)
- ✉️ Email: hello@kaptha.com

---

Made with ❤️ by [Actovision](https://github.com/Actovision-ORG)
