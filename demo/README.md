# Kaptha Email Editor - Demos

This folder contains demo applications showing how to integrate `@actovision/kaptha-email-editor` in different frameworks.

## Available Demos

### [React Demo](./react)
A React application using Vite that demonstrates the basic integration of the email editor.

**Features:**
- Vite for fast development
- TypeScript support
- Simple React integration
- Export and save functionality

**Quick Start:**
```bash
cd react
npm install
npm run dev
```

### [Next.js Demo](./nextjs)
A Next.js 14 App Router application showing how to use the editor in a server-side rendered environment.

**Features:**
- Next.js 14 with App Router
- TypeScript support
- Client-side component usage
- Production-ready setup

**Quick Start:**
```bash
cd nextjs
npm install
npm run dev
```

## Common Usage

All demos follow the same basic pattern:

```tsx
import EmailEditor from '@actovision/kaptha-email-editor';

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
      height="600px"
      onExport={handleExport}
      onSave={handleSave}
      initialTemplate={{
        name: "My Email Template",
        category: "custom",
        components: [],
      }}
    />
  );
}
```

## Installation

Install the package in your project:

```bash
npm install @actovision/kaptha-email-editor
```

## Documentation

For more information, visit the [main repository](https://github.com/Actovision-ORG/kaptha-email-editor).

## Support

- GitHub Issues: [Report a bug](https://github.com/Actovision-ORG/kaptha-email-editor/issues)
- Email: hello@kaptha.com
