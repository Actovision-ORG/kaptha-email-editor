# Kaptha Email Editor - Next.js Demo

This is a Next.js App Router demo application that demonstrates how to use `@actovision/kaptha-email-editor`.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Next.js 14 App Router
- TypeScript support
- Client-side rendering with 'use client'
- Export HTML and MJML
- Save templates

## Usage

Since the email editor needs DOM access, make sure to use it in a client component:

```tsx
'use client'

import EmailEditor from '@actovision/kaptha-email-editor';

export default function Page() {
  const handleExport = (html: string, mjml: string) => {
    console.log('HTML:', html);
    console.log('MJML:', mjml);
  };

  return (
    <EmailEditor
      height="600px"
      onExport={handleExport}
      initialTemplate={{
        name: "My Template",
        category: "custom",
        components: [],
      }}
    />
  );
}
```

## Build

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

## Testing

### E2E Tests with Cypress

Run Cypress in interactive mode:
```bash
npm run test:e2e
```

Run Cypress in headless mode (CI):
```bash
npm run test:e2e:ci
```

**Test Coverage:**
- Next.js App Router compatibility
- Client component rendering
- Editor loading and initialization
- Hydration handling
- Error handling and edge cases
- Responsive design across viewports

### Running Tests in CI

The tests automatically run in GitHub Actions on push and pull requests. Videos and screenshots are saved as artifacts when tests fail.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Kaptha Email Editor](https://github.com/Actovision-ORG/kaptha-email-editor)
- [Cypress Documentation](https://docs.cypress.io)
