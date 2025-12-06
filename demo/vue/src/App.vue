<template>
  <div>
    <h1>Kaptha Email Editor - Vue 3 Demo</h1>
    <KapthaEmailEditorWrapper
      api-key="kpt_dev_ws001_demo12345678"
      :on-ready="handleReady"
      :on-design-change="handleDesignChange"
      :custom-blocks="customBlocks"
      min-height="600px"
    />
    <div v-if="design" class="design-info">
      <h3>Current Design (Component Count: {{ design.components?.length || 0 }})</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import KapthaEmailEditorWrapper from './components/KapthaEmailEditorWrapper.vue';

const design = ref<any>(null);

const handleReady = () => {
  console.log('Editor ready!');
};

const handleDesignChange = (newDesign: any) => {
  console.log('Design changed:', newDesign);
  design.value = newDesign;
};

const customBlocks = [
  {
    id: 'vue-welcome',
    name: 'Vue Welcome Block',
    category: 'Marketing',
    components: [
      {
        id: 'vue-text-1',
        type: 'text',
        props: {
          text: '<h1>Welcome to Vue + Kaptha</h1>',
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#42b883',
          align: 'center'
        }
      },
      {
        id: 'vue-text-2',
        type: 'text',
        props: {
          text: '<p>Create beautiful emails with Vue 3 and Composition API.</p>',
          fontSize: '16px',
          color: '#666666',
          align: 'center'
        }
      }
    ]
  }
];
</script>
