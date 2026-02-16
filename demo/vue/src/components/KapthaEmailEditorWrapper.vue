<template>
  <div ref="containerRef" :style="{ minHeight: minHeight }">
    <div v-if="!loaded" style="padding: 20px; text-align: center; color: #666;">
      Loading Kaptha Email Editor...
    </div>
    <div v-else-if="validationStatus === 'validating'" style="padding: 20px; text-align: center; color: #666;">
      Validating API key...
    </div>
    <div v-else-if="error" style="padding: 20px; color: #e53e3e; border: 1px solid #fc8181; border-radius: 6px; background-color: #fff5f5;">
      <strong>Error loading Kaptha Email Editor:</strong> {{ error }}
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
  onError?: (error: Error) => void;
  initialDesign?: any;
  customBlocks?: any[];
  minHeight?: string;
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const editorInstance = ref<any>(null);
const loaded = ref(false);
const validationStatus = ref<'validating' | 'success' | 'error'>('validating');
const error = ref<string | null>(null);

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

    loaded.value = true;

    // Create editor instance using synchronous API
    // Validation happens in background, onReady is called after validation
    editorInstance.value = window.KapthaEmailEditor.createEditor({
      container: containerRef.value,
      apiKey: props.apiKey,
      onReady: () => {
        validationStatus.value = 'success';
        props.onReady?.();
      },
      onChange: props.onDesignChange,
      initialDesign: props.initialDesign,
      customBlocks: props.customBlocks,
      onError: (err: Error) => {
        validationStatus.value = 'error';
        error.value = err.message || 'Failed to initialize editor';
        if (props.onError) {
          props.onError(err);
        }
      },
    });
  } catch (err: any) {
    validationStatus.value = 'error';
    error.value = err.message || 'Failed to load editor resources';
    if (props.onError) {
      props.onError(err);
    }
    console.error('Failed to initialize editor:', err);
  }
});

onBeforeUnmount(() => {
  if (editorInstance.value?.destroy) {
    editorInstance.value.destroy();
  }
});
</script>
