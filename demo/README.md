# Kaptha Email Editor - Demos

This folder contains demo applications showing how to integrate `@actovision/kaptha-email-editor` in different frameworks.

## Available Demos

### [React Demo](./react)
A React application using Vite that demonstrates the basic integration of the email editor.

**Features:**
- Vite for fast development
- TypeScript support
- Custom blocks and callbacks
- CDN-based core editor

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
- Client-side component usage (`'use client'`)
- Production-ready setup

**Quick Start:**
```bash
cd nextjs
npm install
npm run dev
```

### [Vue 3 Demo](./vue)
A Vue 3 application with Composition API demonstrating the editor integration.

**Features:**
- Vue 3 with `<script setup>` syntax
- TypeScript support
- Reactive design state
- Custom wrapper component
- Vite for fast development

**Quick Start:**
```bash
cd vue
npm install
npm run dev
```

### [Svelte Demo](./svelte)
A Svelte 4 application showing reactive integration with the email editor.

**Features:**
- Svelte 4 with TypeScript
- Custom events for callbacks
- Reactive state management
- Clean component lifecycle
- Vite for fast development

**Quick Start:**
```bash
cd svelte
npm install
npm run dev
```

## Common Usage Patterns

### React / Next.js

```tsx
import KapthaEmailEditor from '@actovision/kaptha-email-editor';

function App() {
  const handleReady = () => {
    console.log('Editor ready!');
  };

  const handleDesignChange = (design: any) => {
    console.log('Design changed:', design);
    // Save to your backend
  };

  return (
    <KapthaEmailEditor
      apiKey="kpt_dev_ws001_demo12345678"
      onReady={handleReady}
      onDesignChange={handleDesignChange}
      minHeight="600px"
    />
  );
}
```

### Vue 3

```vue
<template>
  <KapthaEmailEditorWrapper
    api-key="kpt_dev_ws001_demo12345678"
    :on-ready="handleReady"
    :on-design-change="handleDesignChange"
    min-height="600px"
  />
</template>

<script setup lang="ts">
const handleReady = () => {
  console.log('Editor ready!');
};

const handleDesignChange = (design: any) => {
  console.log('Design changed:', design);
};
</script>
```

### Svelte

```svelte
<script lang="ts">
  import KapthaEmailEditor from './lib/KapthaEmailEditor.svelte';

  function handleReady() {
    console.log('Editor ready!');
  }

  function handleDesignChange(event: CustomEvent<any>) {
    console.log('Design changed:', event.detail);
  }
</script>

<KapthaEmailEditor
  apiKey="kpt_dev_ws001_demo12345678"
  on:ready={handleReady}
  on:designChange={handleDesignChange}
  minHeight="600px"
/>
```
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

## Testing

Both demos include comprehensive E2E tests using Cypress:

### Running Tests Locally

**React Demo:**
```bash
cd react
npm run test:e2e        # Interactive mode
npm run test:e2e:ci     # Headless mode
```

**Next.js Demo:**
```bash
cd nextjs
npm run test:e2e        # Interactive mode
npm run test:e2e:ci     # Headless mode
```

### CI/CD

Tests run automatically on GitHub Actions for all pull requests and commits to main. Test videos and screenshots are saved as artifacts for debugging failures.

**Test Coverage:**
- ✅ Editor loading and initialization
- ✅ CDN script and stylesheet loading
- ✅ Error handling and recovery
- ✅ Responsive design validation
- ✅ React/Next.js integration
- ✅ Client-side rendering verification
