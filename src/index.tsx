/**
 * @actovision/kaptha-email-editor - React Wrapper for Kaptha Email Editor
 * 
 * This package provides a React component wrapper that loads Kaptha Email Editor
 * from CDN and uses the framework-agnostic API (kapthaEmailEditor.init()).
 * 
 * @example
 * ```tsx
 * import KapthaEmailEditor from '@actovision/kaptha-email-editor';
 * 
 * function App() {
 *   return (
 *     <KapthaEmailEditor
 *       apiKey="kpt_dev_ws001_demo12345678"
 *       height="600px"
 *       onReady={() => console.log('Editor ready!')}
 *     />
 *   );
 * }
 * ```
 */

import * as React from 'react';
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as ReactDOM from 'react-dom/client';

// Build CDN URLs based on KAPTHA_VERSION or use default (latest stable)
function getCDNUrls() {
  // Safe access to process.env for build-time environment variables
  const version = typeof process !== 'undefined' && process.env ? process.env.KAPTHA_VERSION : undefined;
  const basePath = 'https://code.kaptha.dev/core';
  
  if (version) {
    // Special case: "latest" maps to /latest/ path for edge releases
    if (version === 'latest') {
      return {
        js: `${basePath}/latest/editor.js`,
        css: `${basePath}/latest/editor.css`
      };
    }
    
    // Use specific version path when KAPTHA_VERSION is set (e.g., "1.0.1" or "v1.0.1")
    const cleanVersion = version.startsWith('v') ? version : `v${version}`;
    return {
      js: `${basePath}/${cleanVersion}/editor.js`,
      css: `${basePath}/${cleanVersion}/editor.css`
    };
  }
  
  // Default: latest stable (root path for auto-updates)
  // Add cache-busting parameter to force reload after React 19 update
  const cacheBust = `?v=${Date.now()}`;
  return {
    js: `${basePath}/editor.js${cacheBust}`,
    css: `${basePath}/editor.css${cacheBust}`
  };
}

const { js: CDN_JS_URL, css: CDN_CSS_URL } = getCDNUrls();

export interface EmailDesign {
  components: any[];
}

export interface EditorMethods {
  loadDesign: (design: EmailDesign) => void;
  saveDesign: () => EmailDesign;
  exportHtml: () => Promise<{ html: string; mjml: string }>;
  exportMjml: () => string;
  exportJson: () => EmailDesign;
  destroy: () => void;
}

interface KapthaEmailEditorProps {
  /**
   * API key (required)
   * Get your free key at: hello@kaptha.com
   */
  apiKey: string;
  
  /**
   * Workspace ID (optional, extracted from API key if not provided)
   */
  workspaceId?: string;
  
  /**
   * Minimum height of the editor
   * @default '600px'
   */
  minHeight?: string;
  
  /**
   * Callback when editor loads
   */
  onLoad?: () => void;
  
  /**
   * Callback when editor is ready
   */
  onReady?: () => void;
  
  /**
   * Callback when design changes
   */
  onDesignChange?: (design: EmailDesign) => void;
  
  /**
   * Initial design to load
   */
  initialDesign?: EmailDesign;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
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
    // Expose React and ReactDOM globally for CDN bundle (required for React 19 support)
    if (typeof window !== 'undefined') {
      window.React = React;
      window.ReactDOM = ReactDOM;
    }
    
    // Load CSS
    if (!document.querySelector(`link[href="${CDN_CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CDN_CSS_URL;
      link.crossOrigin = 'anonymous'; // Fix ERR_BLOCKED_BY_ORB
      document.head.appendChild(link);
    }

    // Load Kaptha Email Editor script
    if (!document.querySelector(`script[src="${CDN_JS_URL}"]`)) {
      const script = document.createElement('script');
      script.src = CDN_JS_URL;
      script.crossOrigin = 'anonymous'; // Fix ERR_BLOCKED_BY_ORB
      script.type = 'text/javascript';
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

const KapthaEmailEditor = forwardRef<EditorMethods, KapthaEmailEditorProps>(({
  apiKey,
  workspaceId,
  minHeight = '600px',
  onLoad,
  onReady,
  onDesignChange,
  initialDesign,
  className,
  style
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const editorIdRef = useRef<string>(`kaptha-editor-${Math.random().toString(36).substr(2, 9)}`);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use refs to store latest callback values to avoid editor re-initialization
  // when callbacks change (prevents issues when parent doesn't memoize callbacks)
  const onLoadRef = useRef(onLoad);
  const onReadyRef = useRef(onReady);
  const onDesignChangeRef = useRef(onDesignChange);
  
  useEffect(() => {
    onLoadRef.current = onLoad;
    onReadyRef.current = onReady;
    onDesignChangeRef.current = onDesignChange;
  });

  // Expose editor methods via ref
  useImperativeHandle(ref, () => ({
    loadDesign: (design: EmailDesign) => {
      editorInstanceRef.current?.loadDesign(design);
    },
    saveDesign: () => {
      return editorInstanceRef.current?.saveDesign() || { components: [] };
    },
    exportHtml: async () => {
      return editorInstanceRef.current?.exportHtml() || { html: '', mjml: '' };
    },
    exportMjml: () => {
      return editorInstanceRef.current?.exportMjml() || '';
    },
    exportJson: () => {
      return editorInstanceRef.current?.exportJson() || { components: [] };
    },
    destroy: () => {
      editorInstanceRef.current?.destroy();
    }
  }), []);

  // Load CDN scripts
  useEffect(() => {
    loadScripts()
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err.message));
  }, []);

  // Initialize editor by mounting React component from bundle
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;
    
    // Check for EmailEditor component in the bundle
    const KapthaBundle = (window as any).KapthaEmailEditor;
    if (!KapthaBundle || !KapthaBundle.EmailEditor) {
      setError('[Kaptha] EmailEditor component not found in bundle');
      return;
    }

    try {
      // Create a React root and mount the EmailEditor component
      const root = ReactDOM.createRoot(containerRef.current);
      const editorRef = React.createRef<any>();
      
      root.render(
        React.createElement(KapthaBundle.EmailEditor, {
          ref: editorRef,
          onReady: () => {
            // Store editor methods from component ref
            if (editorRef.current) {
              editorInstanceRef.current = editorRef.current;
            }
            
            // Load initial design after editor is ready
            if (initialDesign && editorRef.current) {
              editorRef.current.loadDesign(initialDesign);
            }
            
            // Call user callbacks
            if (onLoadRef.current) {
              onLoadRef.current();
            }
            if (onReadyRef.current) {
              onReadyRef.current();
            }
          },
          onChange: onDesignChangeRef.current,
          height: minHeight || '600px',
        })
      );

      // Store root for cleanup
      (containerRef.current as any).__reactRoot = root;
    } catch (err: any) {
      setError(err.message);
    }

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        const root = (containerRef.current as any).__reactRoot;
        if (root) {
          root.unmount();
        }
      }
      editorInstanceRef.current = null;
    };
  }, [isLoaded, apiKey, workspaceId, minHeight, initialDesign]);

  if (error) {
    return (
      <div style={{ padding: '20px', color: '#e53e3e', border: '1px solid #fc8181', borderRadius: '6px', backgroundColor: '#fff5f5' }}>
        <strong>Error loading Kaptha Email Editor:</strong> {error}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={{ padding: '20px', color: '#4a5568', border: '1px solid #cbd5e0', borderRadius: '6px', backgroundColor: '#f7fafc' }}>
        Loading Kaptha Email Editor...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={editorIdRef.current}
      className={className}
      style={{
        width: '100%',
        minHeight,
        ...style
      }}
    />
  );
});

KapthaEmailEditor.displayName = 'KapthaEmailEditor';

export default KapthaEmailEditor;

// Type definitions for window
declare global {
  interface Window {
    React: any;
    ReactDOM: any;
    kapthaEmailEditor: any;
    kaptha: any;
  }
}
