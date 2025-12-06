<template>
  <div ref="containerRef" :style="{ minHeight: minHeight }">
    <div v-if="!loaded" style="padding: 20px; text-align: center; color: #666;">
      Loading Kaptha Email Editor...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

// Declare global KapthaEmailEditor
declare global {
  interface Window {
    KapthaEmailEditor?: any;
  }
}

const props = defineProps<{
  apiKey: string;
  onReady?: () => void;
  onDesignChange?: (design: any) => void;
  initialDesign?: any;
  customBlocks?: any[];
  minHeight?: string;
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const editorInstance = ref<any>(null);
const loaded = ref(false);

const loadScript = (src: string): Promise<void> => {
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
};

const loadStyle = (href: string): void => {
  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

onMounted(async () => {
  const CDN_BASE_URL = 'https://code.kaptha.dev/core/embed';
  const CACHE_VERSION = new Date().toISOString().split('T')[0];

  try {
    loadStyle(`${CDN_BASE_URL}/editor.css?v=${CACHE_VERSION}`);
    await loadScript(`${CDN_BASE_URL}/editor.js?v=${CACHE_VERSION}`);

    if (!window.KapthaEmailEditor || !containerRef.value) {
      throw new Error('Failed to load Kaptha Email Editor');
    }

    editorInstance.value = window.KapthaEmailEditor.createEditor({
      container: containerRef.value,
      apiKey: props.apiKey,
      onReady: () => {
        loaded.value = true;
        props.onReady?.();
      },
      onChange: props.onDesignChange,
      initialDesign: props.initialDesign,
      customBlocks: props.customBlocks,
    });
  } catch (error) {
    console.error('Failed to initialize editor:', error);
  }
});

onBeforeUnmount(() => {
  if (editorInstance.value?.destroy) {
    editorInstance.value.destroy();
  }
});
</script>
