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

- Simple React integration with CDN-based core editor
- TypeScript support
- Fast development with Vite
- Custom blocks and templates
- Design change callbacks
- Automatic cache busting for CDN resources

## Usage

```tsx
import KapthaEmailEditor from '@actovision/kaptha-email-editor';

function App() {
  const handleReady = () => {
    console.log('Editor ready!');
  };

  const handleDesignChange = (design: any) => {
    console.log('Design changed:', design);
    // Save to your backend here
  };

  const customBlocks = [
    {
      id: 'custom-1',
      name: 'Custom Block',
      category: 'Custom',
      components: [
        {
          id: 'text-1',
          type: 'text',
          props: {
            text: '<h1>Custom Content</h1>',
            fontSize: '24px'
          }
        }
      ]
    }
  ];

  return (
    <KapthaEmailEditor
      apiKey="your-api-key"
      onReady={handleReady}
      onDesignChange={handleDesignChange}
      customBlocks={customBlocks}
      minHeight="600px"
    />
  );
}
```

### Required Props
- `apiKey`: Your Kaptha API key (format: `kpt_dev_ws001_...` or `kpt_prod_...`)

### Optional Props
- `onReady`: Callback when editor is fully initialized
- `onDesignChange`: Callback when design changes (includes full design object)
- `initialDesign`: Load editor with existing design
- `customBlocks`: Add custom reusable block templates
- `minHeight`: Minimum height of editor container (default: `600px`)

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
