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

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom/client';

// Build CDN URLs based on KAPTHA_VERSION or use default (latest stable)
function getCDNUrls() {
  const version = process.env.KAPTHA_VERSION;
  const basePath = 'https://code.kaptha.dev/core';
  
  if (version) {
    // Use specific version path when KAPTHA_VERSION is set (e.g., "1.0.1" or "v1.0.1")
    const cleanVersion = version.startsWith('v') ? version : `v${version}`;
    return {
      js: `${basePath}/${cleanVersion}/editor.js`,
      css: `${basePath}/${cleanVersion}/editor.css`
    };
  }
  
  // Default: latest stable (root path for auto-updates)
  return {
    js: `${basePath}/editor.js`,
    css: `${basePath}/editor.css`
  };
}

const { js: CDN_JS_URL, css: CDN_CSS_URL } = getCDNUrls();

interface EmailEditorProps {
  height?: string;
  onExport?: (html: string, mjml: string) => void;
  initialTemplate?: any;
  [key: string]: any;
}

let scriptsLoaded = false;
let scriptPromise: Promise<void> | null = null;

// Make React and ReactDOM available globally for the CDN script
if (typeof window !== 'undefined') {
  (window as any).React = React;
  (window as any).ReactDOM = ReactDOM;
}

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

    // Load Kaptha Email Editor script
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

  return scriptPromise;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ height = '600px', onExport, initialTemplate, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadScripts()
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      if (!(window as any).KapthaEmailEditor) {
        setError('Email editor library not loaded');
        return;
      }
      
      const EmailEditorComponent = (window as any).KapthaEmailEditor.EmailEditor;
      
      if (!EmailEditorComponent) {
        const availableKeys = Object.keys((window as any).KapthaEmailEditor).join(', ');
        setError(`EmailEditor not found. Available exports: ${availableKeys}`);
        return;
      }
      
      const root = (ReactDOM as any).createRoot(containerRef.current);
      
      root.render(
        (React as any).createElement(EmailEditorComponent, {
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
