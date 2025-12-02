# Kaptha Email Editor - React Demo

This is a React demo application using Vite that demonstrates how to use `@actovision/kaptha-email-editor`.

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

- Simple React integration
- TypeScript support
- Fast development with Vite
- Export HTML and MJML
- Save templates

## Usage

```tsx
import EmailEditor from '@actovision/kaptha-email-editor';

function App() {
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

## Preview Production Build

```bash
npm run preview
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
- Editor loading and initialization
- External script and style loading
- Error handling and edge cases
- Responsive design across viewports
- React integration and global object exposure

### Running Tests in CI

The tests automatically run in GitHub Actions on push and pull requests. Videos and screenshots are saved as artifacts when tests fail.
