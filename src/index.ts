/**
 * @emailbuilder-v1 - Complete Email Builder Package
 * 
 * This package exports everything you need to build emails:
 * - Core functionality (MJML conversion, types, templates)
 * - React components (EmailBuilder, hooks, context)
 * - React DnD dependencies (included)
 * 
 * @example
 * ```tsx
 * import { EmailBuilder, DndProvider, HTML5Backend } from '@emailbuilder-v1';
 * import '@emailbuilder-v1/react/dist/EmailBuilder.css';
 * 
 * function App() {
 *   return (
 *     <DndProvider backend={HTML5Backend}>
 *       <EmailBuilder height="100vh" />
 *     </DndProvider>
 *   );
 * }
 * ```
 */

// Re-export everything from core
export * from '@emailbuilder-v1/core';

// Re-export everything from react
export * from '@emailbuilder-v1/react';

// Re-export react-dnd for convenience
export { useDrag, useDrop, DndProvider } from 'react-dnd';
export { HTML5Backend } from 'react-dnd-html5-backend';

// Default export for convenience
export { EmailBuilder as default } from '@emailbuilder-v1/react';
