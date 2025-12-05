/**
 * @actovision/kaptha-email-editor - React Wrapper for Kaptha Email Editor
 * 
 * This package provides a React component wrapper that loads Kaptha Email Editor
 * from CDN as a vanilla JS bundle and provides a React interface.
 * 
 * The CDN bundle is framework-agnostic and includes its own React instance,
 * eliminating React version conflicts.
 * 
 * @example
 * ```tsx
 * import KapthaEmailEditor from '@actovision/kaptha-email-editor';
 * 
 * function App() {
 *   return (
 *     <KapthaEmailEditor
 *       apiKey="kpt_dev_ws001_demo12345678"
 *       minHeight="600px"
 *       onReady={() => console.log('Editor ready!')}
 *     />
 *   );
 * }
 * ```
 */

import * as React from 'react';
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

// CDN Configuration
const CDN_BASE_URL = 'https://code.kaptha.dev/core/vanilla';
const CDN_JS_URL = `${CDN_BASE_URL}/editor.js?v=2024-12-05`;
const CDN_CSS_URL = `${CDN_BASE_URL}/editor.css?v=2024-12-05`;

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

export interface CustomBlock {
  id: string;
  name: string;
  category?: string;
  thumbnail?: string;
  components: any[];
}

interface KapthaEmailEditorProps {
  /**
   * API key (required)
   * Get your free key at: hello@kaptha.com
   */
  apiKey: string;
  
  /**
   * Minimum height of the editor
   * @default '600px'
   */
  minHeight?: string;
  
  /**
   * Custom blocks to add to the editor
   */
  customBlocks?: CustomBlock[];
  
  /**
   * Initial design to load
   */
  initialDesign?: EmailDesign;
  
  /**
   * Callback when editor is ready
   */
  onReady?: () => void;
  
  /**
   * Callback when design changes
   */
  onDesignChange?: (design: EmailDesign) => void;
  
  /**
   * Callback when editor loads
   */
  onLoad?: () => void;
}

// Script loader utility with API wait
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Wait for API to be available (handles both new loads and cached scripts)
    const waitForAPI = () => {
      const checkAPI = () => {
        if ((window as any).KapthaEmailEditor) {
          resolve();
        } else {
          setTimeout(checkAPI, 50);
        }
      };
      checkAPI();
    };

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      // Script exists, just wait for API
      waitForAPI();
      return;
    }

    // Create and load new script
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = waitForAPI;
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

// CSS loader utility
function loadCSS(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Kaptha Email Editor React Component
 * 
 * Loads the editor from CDN and provides a React interface
 */
const KapthaEmailEditor = forwardRef<EditorMethods, KapthaEmailEditorProps>((props, ref) => {
  const {
    apiKey,
    minHeight = '600px',
    customBlocks,
    initialDesign,
    onReady,
    onDesignChange,
    onLoad,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Expose editor methods to parent via ref
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
      editorInstanceRef.current = null;
    },
  }));

  // Load CDN resources
  useEffect(() => {
    let mounted = true;

    const loadResources = async () => {
      try {
        // Load CSS
        loadCSS(CDN_CSS_URL);
        
        // Load JS
        await loadScript(CDN_JS_URL);
        
        if (mounted) {
          setIsLoaded(true);
          if (onLoad) {
            onLoad();
          }
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message);
        }
      }
    };

    loadResources();

    return () => {
      mounted = false;
    };
  }, []);

  // Initialize editor once loaded
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    // Check if vanilla API is available
    if (!(window as any).KapthaEmailEditor) {
      setError('Kaptha Email Editor API not found on window');
      return;
    }

    try {
      // Create editor instance using vanilla API
      editorInstanceRef.current = (window as any).KapthaEmailEditor.createEditor({
        container: containerRef.current,
        apiKey,
        minHeight,
        customBlocks,
        initialDesign,
        onReady: () => {
          if (onReady) {
            onReady();
          }
        },
        onChange: (design: EmailDesign) => {
          if (onDesignChange) {
            onDesignChange(design);
          }
        },
      });
    } catch (err: any) {
      setError(err.message);
    }

    // Cleanup on unmount
    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, [isLoaded, apiKey, minHeight, customBlocks, initialDesign]);

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        color: '#e53e3e', 
        border: '1px solid #fc8181', 
        borderRadius: '6px', 
        backgroundColor: '#fff5f5' 
      }}>
        <strong>Error loading Kaptha Email Editor:</strong> {error}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#666' 
      }}>
        Loading Kaptha Email Editor...
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      style={{ 
        minHeight,
        width: '100%',
        position: 'relative'
      }} 
    />
  );
});

KapthaEmailEditor.displayName = 'KapthaEmailEditor';

export default KapthaEmailEditor;
