/**
 * @actovision/kaptha-email-editor - React Wrapper for Kaptha Email Editor
 * 
 * This package provides a React component wrapper that loads Kaptha Email Editor
 * from CDN as a self-contained bundle and provides a React interface.
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
const CDN_BASE_URL = 'https://code.kaptha.dev/core/embed';
// const CDN_BASE_URL = 'http://localhost:5174/public'; // For local development.


//const CACHE_VERSION = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const CACHE_VERSION = Date.now(); // Format: timestamp
const CDN_JS_URL = `${CDN_BASE_URL}/editor.js?v=${CACHE_VERSION}`;
const CDN_CSS_URL = `${CDN_BASE_URL}/editor.css?v=${CACHE_VERSION}`;

export interface EmailDesign {
  components: any[];
}

export interface EditorMethods {
  loadDesign: (design: EmailDesign) => void;
  saveDesign: () => EmailDesign;
  exportHtml: () => Promise<{ html: string; mjml: string }>;
  exportMjml: () => string;
  exportJson: () => EmailDesign;
  setDarkMode: (isDark: boolean) => void;
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
   * Get your free key at: https://app.kaptha.com
   */
  apiKey: string;

  /**
   * Minimum height of the editor
   * @default '600px'
   */
  minHeight?: string;

  /**
   * Enable dark mode
   * @default false
   */
  isDarkMode?: boolean;

  /**
   * Custom blocks to add to the editor
   */
  customBlocks?: CustomBlock[];

  /**
   * Initial design to load
   */
  initialDesign?: EmailDesign;

  /**
   * Show the Export button in the toolbar
   * @default true
   */
  exportButton?: boolean;

  /**
   * Show the Save button in the toolbar
   * @default true
   */
  saveButton?: boolean;

  /**
   * Callback when editor is ready (after API key validation)
   */
  onReady?: () => void;

  /**
   * Callback when design changes
   */
  onDesignChange?: (design: EmailDesign) => void;

  /**
   * Callback when the Save button is clicked
   */
  onSave?: (design: EmailDesign) => void;

  /**
   * Callback when editor loads
   */
  onLoad?: () => void;

  /**
   * Callback when initialization errors occur (e.g., invalid API key)
   */
  onError?: (error: Error) => void;
}

// Script loader utility with API wait
// Declare global type
declare global {
  interface Window {
    KapthaEmailEditor?: any;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const TIMEOUT_MS = 15000; // 15 second timeout
    let resolved = false;

    // Wait for API to be available (handles both new loads and cached scripts)
    const waitForAPI = () => {
      const startTime = Date.now();
      const checkAPI = () => {
        if (resolved) return;
        if (typeof (window as any).KapthaEmailEditor !== 'undefined') {
          resolved = true;
          resolve();
        } else if (Date.now() - startTime > TIMEOUT_MS) {
          resolved = true;
          reject(new Error('Timeout waiting for Kaptha Email Editor API to initialize'));
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
    script.onerror = () => {
      if (!resolved) {
        resolved = true;
        reject(new Error(`Failed to load script: ${src}`));
      }
    };
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
  link.onerror = () => {
    console.warn(`[Kaptha] Failed to load stylesheet: ${href}`);
  };
  document.head.appendChild(link);
}

/**
 * Generate basic HTML from email components (browser fallback when MJML is unavailable)
 */
function generateBasicHTMLFromComponents(components: any[]): string {
  const toHTML = (comp: any): string => {
    if (!comp?.type) return '';
    const p = comp.props || {};
    switch (comp.type) {
      case 'text':
        return `<div style="font-size:${p.fontSize || '16px'};font-weight:${p.fontWeight || '400'};color:${p.color || '#000'};text-align:${p.align || 'left'};padding:${p.padding || '10px'};font-family:${p.fontFamily || 'Arial,sans-serif'};">${p.text || ''}</div>`;
      case 'button':
        return `<div style="text-align:${p.align || 'center'};padding:10px;"><a href="${p.href || '#'}" style="display:inline-block;background-color:${p.backgroundColor || '#007bff'};color:${p.color || '#fff'};padding:${p.padding || '10px 20px'};border-radius:${p.borderRadius || '4px'};text-decoration:none;font-weight:bold;">${p.text || 'Button'}</a></div>`;
      case 'image': {
        const imgHtml = `<img src="${p.src || ''}" alt="${p.alt || 'Image'}" style="width:${p.width || 'auto'};height:${p.height || 'auto'};max-width:100%;" />`;
        const shouldLink = (p.isLinkEnabled ?? !!p.href) && !!p.href;
        const linkedImg = shouldLink ? `<a href="${p.href}"${p.linkTarget === '_blank' ? ' target="_blank"' : ''}>${imgHtml}</a>` : imgHtml;
        return `<div style="text-align:${p.align || 'center'};padding:10px;">${linkedImg}</div>`;
      }
      case 'divider':
        return `<hr style="border-color:${p.borderColor || '#ddd'};border-width:${p.borderWidth || '1px'};border-style:${p.borderStyle || 'solid'};margin:${p.padding || '20px 0'};" />`;
      case 'spacer':
        return `<div style="height:${p.height || '20px'};"></div>`;
      case 'html':
        return `<div style="padding:${p.padding || '10px'};">${p.html || p.code || ''}</div>`;
      case 'columns': {
        const cols = [];
        for (let i = 1; i <= (p.columnCount || 2); i++) {
          const colSettings = (p as any)[`columnSettings${i}`] || {};
          const cc = (comp[`column${i}`] || []).map(toHTML).join('');
          const tdStyle = [
            'vertical-align:top',
            `padding:${colSettings.padding || '10px'}`,
            colSettings.backgroundColor ? `background-color:${colSettings.backgroundColor}` : '',
          ].filter(Boolean).join(';');
          cols.push(`<td style="${tdStyle}">${cc}</td>`);
        }
        return `<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${cols.join('')}</tr></table>`;
      }
      case 'section':
        return `<div style="background-color:${p.backgroundColor || 'transparent'};padding:${p.padding || '20px'};">${(comp.children || []).map(toHTML).join('')}</div>`;
      case 'social': {
        const icons = (p.icons || p.links || []).map((ic: any) => {
          const name = ic.platform || ic.name || 'link';
          return `<a href="${ic.url || ic.href || '#'}" style="display:inline-block;margin:0 8px;" target="_blank"><img src="https://img.icons8.com/color/48/${name}.png" alt="${name}" width="${parseInt(p.iconSize || '32')}" height="${parseInt(p.iconSize || '32')}" style="border:0;" /></a>`;
        }).join('');
        return `<div style="text-align:${p.align || 'center'};padding:${p.padding || '10px'};">${icons}</div>`;
      }
      case 'video':
        return `<div style="text-align:${p.align || 'center'};padding:10px;"><a href="${p.src || '#'}" target="_blank"><img src="${p.poster || p.src || ''}" alt="Video" style="width:${p.width || '100%'};max-width:100%;" /></a></div>`;
      case 'timer': {
        const targetDate = p.targetDate ? new Date(p.targetDate).toLocaleString() : 'Not set';
        return `<div style="text-align:${p.align || 'center'};padding:${p.padding || '10px'};color:${p.color || '#dc3545'};background-color:${p.backgroundColor || 'transparent'};font-weight:bold;">Countdown to: ${targetDate}</div>`;
      }
      case 'accordion': {
        const accItems = (p.items || []).map((item: any) =>
          `<div style="border:1px solid ${p.borderColor || '#dee2e6'};margin-bottom:4px;border-radius:4px;overflow:hidden;"><div style="background-color:${p.titleBackground || '#f8f9fa'};color:${p.titleColor || '#212529'};padding:12px 16px;font-weight:bold;">${item.title}</div><div style="background-color:${p.contentBackground || '#ffffff'};color:${p.contentColor || '#6c757d'};padding:12px 16px;">${item.content}</div></div>`
        ).join('');
        return `<div style="padding:${p.padding || '10px'};">${accItems}</div>`;
      }
      case 'carousel': {
        const slides = (p.items || []).map((item: any) => {
          const caption = item.title ? `<div style="padding:8px;text-align:center;"><strong>${item.title}</strong>${item.description ? `<p style="margin:4px 0;font-size:14px;color:#6c757d;">${item.description}</p>` : ''}</div>` : '';
          return `<div style="text-align:center;"><img src="${item.image}" alt="${item.title || 'Slide'}" style="width:100%;max-width:100%;height:${p.height || 'auto'};object-fit:cover;border-radius:8px;" />${caption}</div>`;
        }).join('');
        return `<div style="padding:${p.padding || '10px'};background-color:${p.backgroundColor || 'transparent'};">${slides}</div>`;
      }
      case 'menu': {
        const textColor = p.textColor || '#ffffff';
        const menuBg = p.backgroundColor || '#4F46E5';
        const sep = p.separator ? `<span style="color:${p.separatorColor || 'rgba(255,255,255,0.2)'};margin:0 4px;">|</span>` : '';
        const links = (p.items || []).map((item: any, idx: number) => {
          const separator = p.layout !== 'vertical' && p.separator && idx < (p.items || []).length - 1 ? sep : '';
          return `<a href="${item.href}" style="color:${textColor};text-decoration:none;padding:8px ${p.layout === 'vertical' ? '0' : '16px'};font-weight:500;${p.layout === 'vertical' ? 'display:block;' : 'display:inline-block;'}">${item.label}</a>${separator}`;
        }).join('');
        return `<div style="background-color:${menuBg};padding:${p.padding || '15px 20px'};text-align:${p.align || 'center'};">${links}</div>`;
      }
      case 'conditional': {
        const variants = p.variants || [];
        const active = variants[p.activeVariant || 0];
        if (active && active.components) return active.components.map(toHTML).join('');
        return (p.fallbackComponents || []).map(toHTML).join('');
      }
      default:
        return '';
    }
  };
  const body = components.map(toHTML).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Email</title></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;"><tr><td align="center" style="padding:20px 0;">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;"><tr><td>${body}</td></tr></table>
  </td></tr></table>
</body>
</html>`;
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
    isDarkMode = false,
    exportButton = true,
    saveButton = true,
    customBlocks,
    initialDesign,
    onReady,
    onDesignChange,
    onSave,
    onLoad,
    onError,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Store callbacks and config in refs so they don't trigger re-initialization
  const onReadyRef = useRef(onReady);
  const onDesignChangeRef = useRef(onDesignChange);
  const onSaveRef = useRef(onSave);
  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);
  const initialDesignRef = useRef(initialDesign);
  const customBlocksRef = useRef(customBlocks);
  const minHeightRef = useRef(minHeight);
  const isDarkModeRef = useRef(isDarkMode);
  const exportButtonRef = useRef(exportButton);
  const saveButtonRef = useRef(saveButton);

  // Sync minHeight
  useEffect(() => { minHeightRef.current = minHeight; }, [minHeight]);

  // Sync isDarkMode changes to the live editor instance
  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
    if (editorInstanceRef.current?.setDarkMode) {
      editorInstanceRef.current.setDarkMode(isDarkMode);
    }
  }, [isDarkMode]);

  // Keep refs in sync with latest props
  useEffect(() => { onReadyRef.current = onReady; }, [onReady]);
  useEffect(() => { onDesignChangeRef.current = onDesignChange; }, [onDesignChange]);
  useEffect(() => { onSaveRef.current = onSave; }, [onSave]);
  useEffect(() => { onLoadRef.current = onLoad; }, [onLoad]);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);
  useEffect(() => { exportButtonRef.current = exportButton; }, [exportButton]);
  useEffect(() => { saveButtonRef.current = saveButton; }, [saveButton]);

  // Expose editor methods to parent via ref
  useImperativeHandle(ref, () => ({
    loadDesign: (design: EmailDesign) => {
      editorInstanceRef.current?.loadDesign(design);
    },
    saveDesign: () => {
      return editorInstanceRef.current?.saveDesign() || { components: [] };
    },
    exportHtml: async () => {
      try {
        return await editorInstanceRef.current?.exportHtml() || { html: '', mjml: '' };
      } catch (error) {
        console.warn('exportHtml failed, falling back to basic HTML generation:', error);
        // Browser fallback: MJML server-side conversion unavailable
        const mjml = editorInstanceRef.current?.exportMjml?.() || '';
        const design: EmailDesign = editorInstanceRef.current?.exportJson?.() || { components: [] };
        const html = generateBasicHTMLFromComponents(design.components);
        return { html, mjml };
      }
    },
    exportMjml: () => {
      return editorInstanceRef.current?.exportMjml() || '';
    },
    exportJson: () => {
      return editorInstanceRef.current?.exportJson() || { components: [] };
    },
    setDarkMode: (isDark: boolean) => {
      editorInstanceRef.current?.setDarkMode(isDark);
    },
    destroy: () => {
      editorInstanceRef.current?.destroy();
      editorInstanceRef.current = null;
      // Clean up injected script and link tags
      const scriptTag = document.querySelector(`script[src="${CDN_JS_URL}"]`);
      if (scriptTag) scriptTag.remove();
      const linkTag = document.querySelector(`link[href="${CDN_CSS_URL}"]`);
      if (linkTag) linkTag.remove();
    },
  }));

  // Load CDN resources (once)
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
          if (onLoadRef.current) {
            onLoadRef.current();
          }
        }
      } catch (err: any) {
        if (mounted) {
          const message = err?.message || 'Failed to load editor';
          setError(message);
          if (onErrorRef.current) {
            onErrorRef.current(err instanceof Error ? err : new Error(message));
          }
        }
      }
    };

    loadResources();

    return () => {
      mounted = false;
    };
  }, []);

  // Initialize editor once loaded — only depends on isLoaded and apiKey
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    // Don't re-create if editor already exists
    if (editorInstanceRef.current) return;

    // Check if API is available
    const KapthaEmailEditor = (window as any).KapthaEmailEditor;
    if (!KapthaEmailEditor) {
      setError('Kaptha Email Editor API not found');
      return;
    }

    // Create editor instance using CDN API (synchronous)
    // Validation happens in background, onReady is called after validation
    editorInstanceRef.current = KapthaEmailEditor.createEditor({
      container: containerRef.current,
      apiKey,
      minHeight: minHeightRef.current,
      isDarkMode: isDarkModeRef.current,
      exportButton: exportButtonRef.current,
      saveButton: saveButtonRef.current,
      customBlocks: customBlocksRef.current,
      initialDesign: initialDesignRef.current,
      onReady: () => {
        onReadyRef.current?.();
      },
      onChange: (design: EmailDesign) => {
        onDesignChangeRef.current?.(design);
      },
      onSave: (design: EmailDesign) => {
        onSaveRef.current?.(design);
      },
      onError: (err: Error) => {
        setError(err.message);
        onErrorRef.current?.(err);
      },
    });

    // Cleanup on unmount
    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, [isLoaded, apiKey]);

  if (error) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        color: '#c53030',
        background: '#fff5f5',
        border: '1px solid #fc8181',
        borderRadius: '8px',
        margin: '10px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '14px',
      }}>
        <strong>Failed to load Kaptha Email Editor</strong>
        <p style={{ margin: '8px 0 0', color: '#742a2a' }}>{error}</p>
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
        // height: minHeightRef.current,
        height: '100%',
        width: '100%',
        position: 'relative'
      }}
    />
  );
});

KapthaEmailEditor.displayName = 'KapthaEmailEditor';

export default KapthaEmailEditor;
