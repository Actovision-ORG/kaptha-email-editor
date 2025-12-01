/**
 * @kaptha/email-editor - React Wrapper for Kaptha Email Editor
 * 
 * This package provides a React component wrapper that loads Kaptha Email Editor
 * from CDN.
 * 
 * @example
 * ```tsx
 * import EmailEditor from '@kaptha/email-editor';
 * 
 * function App() {
 *   return (
 *     <EmailEditor
 *       height="100vh"
 *       onExport={(html, mjml) => {
 *         console.log('HTML:', html);
 *         console.log('MJML:', mjml);
 *       }}
 *     />
 *   );
 * }
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';

const CDN_JS_URL = 'https://code.kaptha.dev/core/editor.js';
const CDN_CSS_URL = 'https://code.kaptha.dev/core/editor.css';

interface EmailEditorProps {
  height?: string;
  onExport?: (html: string, mjml: string) => void;
  initialTemplate?: any;
  [key: string]: any;
}

let scriptsLoaded = false;
let scriptPromise: Promise<void> | null = null;

function loadScripts(): Promise<void> {
  if (scriptsLoaded) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    // Load CSS
    if (!document.querySelector(`link[href="${CDN_CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CDN_CSS_URL;
      document.head.appendChild(link);
    }

    // Load React dependencies if not already loaded
    const loadReact = () => {
      return new Promise<void>((resolveReact) => {
        if (window.React && window.ReactDOM) {
          resolveReact();
          return;
        }

        const reactScript = document.createElement('script');
        reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
        reactScript.crossOrigin = 'anonymous';
        
        const reactDomScript = document.createElement('script');
        reactDomScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
        reactDomScript.crossOrigin = 'anonymous';

        reactScript.onload = () => {
          reactDomScript.onload = () => resolveReact();
          document.body.appendChild(reactDomScript);
        };

        document.body.appendChild(reactScript);
      });
    };

    // Load Kaptha Email Editor script
    loadReact().then(() => {
      if (!document.querySelector(`script[src="${CDN_JS_URL}"]`)) {
        const script = document.createElement('script');
        script.src = CDN_JS_URL;
        script.onload = () => {
          scriptsLoaded = true;
          resolve();
        };
        script.onerror = () => reject(new Error('Failed to load Kaptha Email Editor'));
        document.body.appendChild(script);
      } else {
        scriptsLoaded = true;
        resolve();
      }
    });
  });

  return scriptPromise;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ height = '600px', onExport, initialTemplate, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadScripts()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && (window as any).KapthaEmailEditor) {
      const EmailEditorComponent = (window as any).KapthaEmailEditor.EmailEditor;
      const root = (window as any).ReactDOM.createRoot(containerRef.current);
      
      root.render(
        (window as any).React.createElement(EmailEditorComponent, {
          height,
          onExport,
          initialTemplate,
          ...props
        })
      );

      return () => {
        root.unmount();
      };
    }
  }, [isLoaded, height, onExport, initialTemplate, props]);

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error loading Kaptha Email Editor: {error}</div>;
  }

  if (!isLoaded) {
    return <div style={{ padding: '20px' }}>Loading Kaptha Email Editor...</div>;
  }

  return <div ref={containerRef} style={{ height }} />;
};

export default EmailEditor;

// Type definitions for window
declare global {
  interface Window {
    React: any;
    ReactDOM: any;
    KapthaEmailEditor: any;
  }
}
