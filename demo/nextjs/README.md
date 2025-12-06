# Kaptha Email Editor - Next.js Demo

This demo shows how to integrate `@actovision/kaptha-email-editor` in a Next.js 14 application with App Router.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Features

- Next.js 14 App Router
- Client-side rendering with 'use client'
- TypeScript support
- Custom blocks and design callbacks
- Automatic CDN loading

## Usage

Since Kaptha Email Editor uses browser-specific APIs, you need to use the `'use client'` directive:

```tsx
'use client';

import KapthaEmailEditor from '@actovision/kaptha-email-editor';

export default function Page() {
  const handleReady = () => {
    console.log('Editor ready!');
  };

  return (
    <KapthaEmailEditor
      apiKey="your-api-key"
      onReady={handleReady}
      minHeight="600px"
    />
  );
}
```

## Build for Production

```bash
npm run build
npm start
```

## Notes

- The editor must be used in a Client Component (`'use client'`)
- Make sure your API key is properly configured
- CDN resources are automatically cached with date-based versioning
