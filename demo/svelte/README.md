# Kaptha Email Editor - Svelte Demo

This demo shows how to integrate `@actovision/kaptha-email-editor` in a Svelte 4 application.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Features

- Svelte 4 with TypeScript
- Reactive design state
- Custom events for callbacks
- Custom blocks support
- Automatic CDN loading
- Clean component lifecycle

## Usage

The demo includes a wrapper component `KapthaEmailEditor.svelte` that handles CDN loading and editor initialization:

```svelte
<script lang="ts">
  import KapthaEmailEditor from './lib/KapthaEmailEditor.svelte';

  let design: any = null;

  function handleReady() {
    console.log('Editor ready!');
  }

  function handleDesignChange(event: CustomEvent<any>) {
    design = event.detail;
  }

  const customBlocks = [
    {
      id: 'custom-1',
      name: 'Custom Block',
      category: 'Custom',
      components: []
    }
  ];
</script>

<KapthaEmailEditor
  apiKey="your-api-key"
  on:ready={handleReady}
  on:designChange={handleDesignChange}
  {customBlocks}
  minHeight="600px"
/>
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Type Checking

```bash
npm run check
```

## Architecture

The wrapper component:
- Loads CDN resources (CSS and JS) on mount
- Initializes the editor using `KapthaEmailEditor.createEditor()`
- Handles cleanup on destroy
- Dispatches Svelte custom events for callbacks
- Uses date-based cache busting for CDN resources
- Fully reactive with Svelte's reactivity system
