# @kaptha/email-editor

[![npm version](https://badge.fury.io/js/%40kaptha-email-editor.svg)](https://www.npmjs.com/package/@kaptha/email-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> React wrapper for EmailEditor v1 - Production-ready email builder with React DnD and MJML

A lightweight React component that loads EmailEditor from CDN. Build beautiful, responsive email templates with drag-and-drop functionality.

## Features

✨ **CDN-Based** - Loads optimized bundle from CDN (181KB, 50KB gzipped)  
📦 **Small Bundle** - React external, only builder code included  
🎨 **Drag-and-Drop** - Intuitive email builder interface powered by react-dnd  
📧 **MJML Export** - Production-ready responsive emails  
🔧 **TypeScript** - Full type safety included  
🚀 **Efficient** - Share React across your app  
🏷️ **11 Components** - Text, button, image, video, timer, HTML, divider, spacer, social, columns, section  
✏️ **Advanced Property Controls** - Comprehensive editors for all component types with presets and validation  
↩️ **Undo/Redo** - Full history tracking with 50-state limit  
🎨 **Design System** - Customizable color palettes and typography  
💾 **Templates** - Pre-built templates (newsletter, welcome email)  
📐 **Layout System** - Multi-column layouts (2-4 columns) with quick presets and per-column styling  
🖼️ **Rich Media** - Image upload modal, video embeds, 10+ social platforms

## Installation

```bash
npm install @kaptha/email-editor react react-dom
```

## Quick Start

```tsx
import EmailEditor from '@kaptha/email-editor';

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

export default App;
```

That's it! The component will automatically load the EmailEditor from CDN.

## API

### `<EmailEditor>`

**Props:**
- `height?: string` - Builder height (default: `"600px"`)
- `onExport?: (html: string, mjml: string) => void` - Export callback
- `initialTemplate?: EmailTemplate` - Starting template
- `onSave?: (template: EmailTemplate) => void` - Save callback
- `onChange?: (components: EmailComponent[]) => void` - Change callback
- `style?: React.CSSProperties` - Custom inline styles

**Example:**
```tsx
import EmailEditor from '@kaptha/email-editor';

function App() {
  const handleExport = (html: string, mjml: string) => {
    console.log('HTML:', html);
    console.log('MJML:', mjml);
    // Save to your backend
  };

  const handleSave = (template: any) => {
    console.log('Template saved:', template);
    // Save to your backend
  };

  return (
    <EmailEditor
      height="100vh"
      onExport={handleExport}
      onSave={handleSave}
      initialTemplate={{
        name: 'My Email',
        category: 'custom',
        components: []
      }}
    />
  );
}
```

## Available Components

The builder includes 11 pre-built components:

1. **Text** - Rich text with font size, color, alignment, and padding
2. **Button** - Call-to-action buttons with custom styling and border radius
3. **Image** - Responsive images with URL, alt text, and width
4. **Video** - Video embeds with poster image and controls
5. **Timer** - Countdown timers with target date and format
6. **HTML** - Custom HTML blocks for advanced users
7. **Divider** - Horizontal dividers with custom color and width
8. **Spacer** - Vertical spacing control with adjustable height
9. **Social** - Social media icons (Facebook, Twitter, Instagram, LinkedIn, YouTube, GitHub, etc.)
10. **Columns** - Multi-column layouts (2, 3, or 4 columns)
11. **Section** - Container sections with background colors and padding

## Key Features

### Drag-and-Drop Interface
- Intuitive drag-and-drop powered by react-dnd
- Nested drop zones for columns and sections
- Visual feedback with toast notifications
- Smart targeting prevents event bubbling

### Undo/Redo System
- Full history tracking with 50-state limit
- Navigate through all changes
- Immutable state updates

### Design System
- Customizable color palettes
- Typography controls
- Consistent styling across components

### Template System
- Pre-built templates (newsletter, welcome email)
- Save and load custom templates
- Template selector interface

### Export Options
- Export to MJML format
- Convert to production-ready HTML
- Visual feedback during export

## CDN URLs

The component loads these resources automatically:

- **JS**: https://code.kaptha.dev/core/editor.js (181KB, 50KB gzipped)
- **CSS**: https://code.kaptha.dev/core/editor.css

## How It Works

This package:
1. Loads the EmailEditor script from CDN on mount
2. Injects the CSS automatically
3. Renders the builder in your React app
4. Provides TypeScript definitions

**Benefits:**
- ✅ No large dependencies in your bundle
- ✅ Fast loading from global CDN
- ✅ Uses your existing React installation
- ✅ No React version conflicts
- ✅ Smaller bundle size (44% reduction vs bundling React)
- ✅ Better caching (React cached separately)
- ✅ Simple React API

## Direct CDN Usage (No npm)

For plain HTML/JavaScript without npm:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://code.kaptha.dev/core/editor.css">
</head>
<body>
  <div id="root"></div>

  <!-- Include React first -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- Then EmailEditor (181KB, 50KB gzipped) -->
  <script src="https://code.kaptha.dev/core/editor.js"></script>

  <script>
    // Uses global React and ReactDOM
    const { EmailEditor } = window.KapthaEmailEditor;

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(EmailEditor, {
      height: '100vh',
      onExport: (html, mjml) => {
        console.log('Exported:', html, mjml);
      }
    }));
  </script>
</body>
</html>
```

## TypeScript Support

Full TypeScript definitions included:

```tsx
import EmailEditor from '@kaptha/email-editor';

// Props are fully typed
const builder = (
  <EmailEditor
    height="100vh"
    onExport={(html: string, mjml: string) => {
      // Typed parameters
    }}
    onSave={(template: any) => {
      // Template is typed
    }}
  />
);
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Bundle Size

- **CDN Bundle**: 181KB (50KB gzipped) - excludes React/ReactDOM
- **npm Package**: ~2KB wrapper + CDN loader
- **Total**: Depends on your React version (typically ~130KB for React 18)

**Why external React?**
- Share React across multiple libraries
- Use your preferred React version
- Better browser caching
- Smaller individual bundle sizes
- Standard CDN pattern

## Contributing

Contributions welcome! Please read our [contributing guidelines](https://github.com/Actovision-ORG/kaptha-email-editor/blob/main/CONTRIBUTING.md).

## License

MIT © [Actovision](https://github.com/Actovision-ORG)

## Support

- 📖 [Documentation](https://github.com/Actovision-ORG/kaptha-email-editor-core)
- 🐛 [Issue Tracker](https://github.com/Actovision-ORG/kaptha-email-editor/issues)
- 💬 [Discussions](https://github.com/Actovision-ORG/kaptha-email-editor/discussions)

## Changelog

See [CHANGELOG.md](https://github.com/Actovision-ORG/kaptha-email-editor/blob/main/CHANGELOG.md) for release history.

---

Made with ❤️ by [Actovision](https://github.com/Actovision-ORG)
