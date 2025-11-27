# EmailBuilder Wrapper Package Setup Guide

This package creates a simple `@emailbuilder-v1` wrapper that bundles all dependencies.

## What Changed

### 1. Package Name
- Changed from `@your-org/emailbuilder-wrapper` to `@emailbuilder-v1/emailbuilder-v1`
- This allows publishing as part of the `@emailbuilder-v1` scope

### 2. Package Type
- **Old**: CDN loader that dynamically loaded scripts
- **New**: Proper NPM package that re-exports core + react packages

### 3. Dependencies
Now includes:
- `@emailbuilder-v1/core` - MJML conversion and types
- `@emailbuilder-v1/react` - React components
- `react-dnd` - Drag and drop
- `react-dnd-html5-backend` - HTML5 backend

## Setup Steps

### 1. First, publish the core packages

```bash
cd /Users/suryak/Developer/emailbuilder-v1-core

# Build packages
npm run build

# Publish core
cd packages/core
npm publish --access public

# Publish react
cd ../react
npm publish --access public
```

### 2. Then build and test the wrapper

```bash
cd /Users/suryak/Developer/emailbuilder-wrapper

# Install dependencies (will use published packages)
npm install

# Build the wrapper
npm run build

# Check dist folder
ls -la dist/
```

### 3. Test with the demo

```bash
cd /Users/suryak/Developer/emailbuilder-wrapper-demo

# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:5173
```

### 4. Publish the wrapper package

```bash
cd /Users/suryak/Developer/emailbuilder-wrapper

# Make sure you're logged in to npm
npm login

# Publish
npm publish --access public
```

## Usage After Publishing

Users can then install with:

```bash
npm install @emailbuilder-v1/emailbuilder-v1 react react-dom
```

Or if you want a shorter name, you could publish as `@emailbuilder-v1/complete`:

```tsx
import { EmailBuilder, DndProvider, HTML5Backend } from '@emailbuilder-v1/complete';
```

## Alternative: Simpler Package Name

If you want users to just do `npm install @emailbuilder-v1`, you can:

1. Change package name to just `@emailbuilder-v1` (without the double name)
2. Update package.json:
   ```json
   {
     "name": "@emailbuilder-v1",
     ...
   }
   ```

Then users install with:
```bash
npm install @emailbuilder-v1
```

And import with:
```tsx
import { EmailBuilder, DndProvider, HTML5Backend } from '@emailbuilder-v1';
```

## Files Created/Updated

- ✅ `package.json` - Updated with new dependencies
- ✅ `src/index.ts` - New file that re-exports everything
- ❌ `src/index.tsx` - Removed (old CDN loader)
- ✅ `README.md` - Updated documentation
- ✅ `tsconfig.json` - Already exists
- ✅ Demo `package.json` - Updated to use new package
- ✅ Demo `src/App.tsx` - Updated to use wrapper imports

## Troubleshooting

### If build fails with missing dependencies:
```bash
cd emailbuilder-wrapper
rm -rf node_modules package-lock.json
npm install
npm run build
```

### If demo can't find the package:
```bash
cd emailbuilder-wrapper-demo
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### To use local packages before publishing:
Update wrapper package.json to use local paths:
```json
{
  "dependencies": {
    "@emailbuilder-v1/core": "file:../emailbuilder-v1-core/packages/core",
    "@emailbuilder-v1/react": "file:../emailbuilder-v1-core/packages/react",
    ...
  }
}
```
