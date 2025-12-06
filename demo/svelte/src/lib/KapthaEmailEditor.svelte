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

      editorInstance = window.KapthaEmailEditor.createEditor({
        container: containerRef,
        apiKey,
        onReady: () => {
          loaded = true;
          dispatch('ready');
        },
        onChange: (design: any) => {
          dispatch('designChange', design);
        },
        initialDesign,
        customBlocks,
      });
    } catch (error) {
      console.error('Failed to initialize editor:', error);
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
  {/if}
</div>
