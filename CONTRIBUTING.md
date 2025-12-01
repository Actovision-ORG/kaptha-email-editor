# Contributing to @actovision/kaptha-email-editor

Thank you for your interest in contributing! We welcome contributions from the community.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/Actovision-ORG/kaptha-email-editor.git
   cd kaptha-email-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the package**
   ```bash
   npm run build
   ```

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in `src/`

3. Build and test:
   ```bash
   npm run build
   npm run dev  # Test with watch mode
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add image upload component
fix: resolve drag-and-drop issue in Safari
docs: update installation instructions
```

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Ensure builds pass** - run `npm run build`
3. **Update CHANGELOG.md** with your changes
4. **Create a Pull Request** with a clear description

### PR Title Format
```
[type] Brief description

Example: [feat] Add column resize functionality
```

## Code Style

- Use **TypeScript** for all new code
- Follow existing code patterns
- Use **ESM** module syntax (`import/export`)
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Example

```typescript
/**
 * Converts an email template to MJML format
 * @param template - The email template to convert
 * @returns MJML string representation
 */
export function convertToMJML(template: EmailTemplate): string {
  // Implementation
}
```

## Testing

Currently, this package is tested through:
- Manual testing in example projects
- Build verification with TypeScript

Future contributions for automated testing are welcome!

## File Structure

```
kaptha-email-editor/
├── src/
│   └── index.ts          # Main entry point (re-exports)
├── dist/                 # Build output
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript config
└── README.md            # Package documentation
```

## Dependencies

This package re-exports from:
- `@actovision/kaptha-email-editor/core` - Core MJML functionality
- `@actovision/kaptha-email-editor/react` - React components
- `react-dnd` - Drag-and-drop library

If you need to make changes to core functionality, those changes should be made in the [kaptha-email-editor-core](https://github.com/Actovision-ORG/kaptha-email-editor-core) monorepo.

## Reporting Issues

### Bug Reports

Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/environment details
- Code samples if applicable

### Feature Requests

Include:
- Use case description
- Proposed solution
- Alternative solutions considered
- Impact on existing functionality

## Questions?

- Open a [Discussion](https://github.com/Actovision-ORG/kaptha-email-editor/discussions)
- Check existing [Issues](https://github.com/Actovision-ORG/kaptha-email-editor/issues)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
