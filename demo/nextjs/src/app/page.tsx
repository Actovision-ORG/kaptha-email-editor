'use client';

import KapthaEmailEditor from '@actovision/kaptha-email-editor';
import { useState, useMemo } from 'react';

// Define custom blocks outside component to prevent recreation on every render
const CUSTOM_BLOCKS = [
  {
    id: 'welcome-block',
    name: 'Welcome Block',
    category: 'Marketing',
    components: [
      {
        id: 'welcome-text',
        type: 'text',
        props: {
          text: '<h1>Welcome to Next.js + Kaptha</h1>',
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#000000',
          align: 'center'
        }
      },
      {
        id: 'welcome-desc',
        type: 'text',
        props: {
          text: '<p>Build beautiful emails with ease.</p>',
          fontSize: '16px',
          color: '#666666',
          align: 'center'
        }
      }
    ]
  }
];

export default function Home() {
  const [design, setDesign] = useState<any>(null);

  const handleReady = () => {
    console.log('Editor ready!');
  };

  const handleDesignChange = (newDesign: any) => {
    console.log('Design changed:', newDesign);
    setDesign(newDesign);
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Kaptha Email Editor - Next.js Demo</h1>
      <KapthaEmailEditor
        apiKey="kpt_dev_ws001_demo12345678"
        onReady={handleReady}
        onDesignChange={handleDesignChange}
        customBlocks={CUSTOM_BLOCKS}
        minHeight="600px"
      />
      {design && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Current Design (Component Count: {design.components?.length || 0})</h3>
        </div>
      )}
    </main>
  );
}
