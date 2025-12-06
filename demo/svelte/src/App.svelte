<script lang="ts">
  import KapthaEmailEditor from './lib/KapthaEmailEditor.svelte';

  let design: any = null;

  function handleReady() {
    console.log('Editor ready!');
  }

  function handleDesignChange(event: CustomEvent<any>) {
    console.log('Design changed:', event.detail);
    design = event.detail;
  }

  const customBlocks = [
    {
      id: 'svelte-welcome',
      name: 'Svelte Welcome Block',
      category: 'Marketing',
      components: [
        {
          id: 'svelte-text-1',
          type: 'text',
          props: {
            text: '<h1>Welcome to Svelte + Kaptha</h1>',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#ff3e00',
            align: 'center'
          }
        },
        {
          id: 'svelte-text-2',
          type: 'text',
          props: {
            text: '<p>Create beautiful emails with Svelte\'s reactive approach.</p>',
            fontSize: '16px',
            color: '#666666',
            align: 'center'
          }
        }
      ]
    }
  ];
</script>

<main>
  <h1>Kaptha Email Editor - Svelte Demo</h1>
  <KapthaEmailEditor
    apiKey="kpt_dev_ws001_demo12345678"
    on:ready={handleReady}
    on:designChange={handleDesignChange}
    {customBlocks}
    minHeight="600px"
  />
  {#if design}
    <div class="design-info">
      <h3>Current Design (Component Count: {design.components?.length || 0})</h3>
    </div>
  {/if}
</main>
