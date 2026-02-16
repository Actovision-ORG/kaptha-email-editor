<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  export let apiKey: string;
  export let minHeight: string = '600px';
  export let initialDesign: any = undefined;
  export let customBlocks: any[] = [];

  const dispatch = createEventDispatcher();

  let containerRef: HTMLDivElement;
  let editorInstance: any = null;
  let loaded = false;
  let validationStatus: 'validating' | 'success' | 'error' = 'validating';
  let error: string | null = null;

  // Declare global KapthaEmailEditor
  declare global {
    interface Window {
      KapthaEmailEditor?: any;
    }
  }

  function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadStyle(href: string): void {
    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  onMount(async () => {
    const CDN_BASE_URL = 'https://code.kaptha.dev/core/embed';
    const CACHE_VERSION = new Date().toISOString().split('T')[0];

    try {
      loadStyle(`${CDN_BASE_URL}/editor.css?v=${CACHE_VERSION}`);
      await loadScript(`${CDN_BASE_URL}/editor.js?v=${CACHE_VERSION}`);

      if (!window.KapthaEmailEditor || !containerRef) {
        throw new Error('Failed to load Kaptha Email Editor');
      }

      loaded = true;

      // Create editor instance using synchronous API
      // Validation happens in background, onReady is called after validation
      editorInstance = window.KapthaEmailEditor.createEditor({
        container: containerRef,
        apiKey,
        onReady: () => {
          validationStatus = 'success';
          dispatch('ready');
        },
        onChange: (design: any) => {
          dispatch('designChange', design);
        },
        initialDesign,
        customBlocks,
        onError: (err: Error) => {
          validationStatus = 'error';
          error = err.message || 'Failed to initialize editor';
          dispatch('error', err);
        },
      });
    } catch (err: any) {
      validationStatus = 'error';
      error = err.message || 'Failed to load editor resources';
      dispatch('error', err);
      console.error('Failed to initialize editor:', err);
    }
  });

  onDestroy(() => {
    if (editorInstance?.destroy) {
      editorInstance.destroy();
    }
  });
</script>

<div bind:this={containerRef} style="min-height: {minHeight};">
  {#if !loaded}
    <div style="padding: 20px; text-align: center; color: #666;">
      Loading Kaptha Email Editor...
    </div>
  {:else if validationStatus === 'validating'}
    <div style="padding: 20px; text-align: center; color: #666;">
      Validating API key...
    </div>
  {:else if error}
    <div style="padding: 20px; color: #e53e3e; border: 1px solid #fc8181; border-radius: 6px; background-color: #fff5f5;">
      <strong>Error loading Kaptha Email Editor:</strong> {error}
    </div>
  {/if}
</div>
