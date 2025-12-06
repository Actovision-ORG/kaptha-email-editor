# Kaptha Email Editor - Vue 3 Demo

This demo shows how to integrate `@actovision/kaptha-email-editor` in a Vue 3 application with Composition API.

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

- Vue 3 with Composition API (`<script setup>`)
- TypeScript support
- Reactive design state
- Custom blocks and callbacks
- Automatic CDN loading
- Clean component lifecycle management

## Usage

The demo includes a wrapper component `KapthaEmailEditorWrapper.vue` that handles CDN loading and editor initialization:

```vue
<template>
  <KapthaEmailEditorWrapper
    api-key="your-api-key"
    :on-ready="handleReady"
    :on-design-change="handleDesignChange"
    :custom-blocks="customBlocks"
    min-height="600px"
  />
</template>

<script setup lang="ts">
import KapthaEmailEditorWrapper from './components/KapthaEmailEditorWrapper.vue';

const handleReady = () => {
  console.log('Editor ready!');
};

const handleDesignChange = (design: any) => {
  console.log('Design changed:', design);
};

const customBlocks = [
  {
    id: 'custom-1',
    name: 'Custom Block',
    category: 'Custom',
    components: []
  }
];
</script>
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Architecture

The wrapper component:
- Loads CDN resources (CSS and JS) on mount
- Initializes the editor using `KapthaEmailEditor.createEditor()`
- Handles cleanup on unmount
- Provides Vue-friendly props interface
- Uses date-based cache busting for CDN resources
