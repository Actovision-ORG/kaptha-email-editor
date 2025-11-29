# @actovision/emailbuilder-v1

[![npm version](https://badge.fury.io/js/%40emailbuilder-v1.svg)](https://www.npmjs.com/package/@actovision/emailbuilder-v1)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> React wrapper for EmailBuilder v1 - Production-ready email builder with React DnD and MJML

A lightweight React component that loads EmailBuilder from CDN. Build beautiful, responsive email templates with drag-and-drop functionality.

## Features

✨ **CDN-Based** - Loads optimized bundle from CDN (181KB, 50KB gzipped)
📦 **Small Bundle** - React external, only builder code included
🎨 **Drag-and-Drop** - Intuitive email builder interface
📧 **MJML Export** - Production-ready responsive emails
🔧 **TypeScript** - Full type safety included
🚀 **Efficient** - Share React across your app

## Installation

```bash
npm install @actovision/emailbuilder-v1 react react-dom
```

## Quick Start

```tsx
import EmailBuilder from '@actovision/emailbuilder-v1';

function App() {
  return (
    <EmailBuilder 
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

That's it! The component will automatically load the EmailBuilder from CDN.

## API

### `<EmailBuilder>`

**Props:**
- `height?: string` - Builder height (default: `"600px"`)
- `onExport?: (html: string, mjml: string) => void` - Export callback
- `initialTemplate?: any` - Starting template
- `...props` - Additional props passed to the builder

**Example:**
```tsx
<EmailBuilder
  height="100vh"
  onExport={(html, mjml) => {
    // Handle export
    downloadFile('email.html', html);
  }}
  initialTemplate={{
    components: [],
    styles: {}
  }}
/>
```

## CDN URLs

The component loads these resources automatically:

- **JS**: https://static.gooups.dev/assets/builder.js (181KB, 50KB gzipped)
- **CSS**: https://static.gooups.dev/assets/builder.css

## How It Works

This package:
1. Loads the EmailBuilder script from CDN on mount
2. Injects the CSS automatically
3. Renders the builder in your React app
4. Provides TypeScript definitions

**Benefits:**
- ✅ No large dependencies in your bundle
- ✅ Fast loading from global CDN
- ✅ Uses your existing React installation
- ✅ No React version conflicts
- ✅ Smaller bundle size (44% reduction)
- ✅ Better caching (React cached separately)
- ✅ Simple React API

## Direct CDN Usage (No npm)

For plain HTML/JavaScript without npm:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://static.gooups.dev/assets/builder.css">
</head>
<body>
  <div id="root"></div>

  <!-- Include React first -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

  <!-- Then EmailBuilder (181KB, 50KB gzipped) -->
  <script src="https://static.gooups.dev/assets/builder.js"></script>

  <script>
    // Uses global React and ReactDOM
    const { EmailBuilder } = window.EmailBuilder;

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(EmailBuilder, {
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
import EmailBuilder from '@actovision/emailbuilder-v1';

// Props are fully typed
const builder = (
  <EmailBuilder
    height="100vh"
    onExport={(html: string, mjml: string) => {
      // Typed parameters
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

## Source Code

For the full EmailBuilder source code and development:
- **Core Project**: https://github.com/Actovision-ORG/emailbuilder-v1-core

## Contributing

Contributions welcome! Please read our [contributing guidelines](https://github.com/Actovision-ORG/emailbuilder-v1/blob/main/CONTRIBUTING.md).

## License

MIT © [Actovision](https://github.com/Actovision-ORG)

## Support

- 📖 [Documentation](https://github.com/Actovision-ORG/emailbuilder-v1#readme)
- 🐛 [Issue Tracker](https://github.com/Actovision-ORG/emailbuilder-v1/issues)
- 💬 [Discussions](https://github.com/Actovision-ORG/emailbuilder-v1/discussions)

## Changelog

See [CHANGELOG.md](https://github.com/Actovision-ORG/emailbuilder-v1/blob/main/CHANGELOG.md) for release history.

---

Made with ❤️ by [Actovision](https://github.com/Actovision-ORG)
