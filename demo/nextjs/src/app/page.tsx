'use client'

import KapthaEmailEditor from '@actovision/kaptha-email-editor';
import styles from './page.module.css'

export default function Home() {
  const handleReady = () => {
    console.log('Editor ready!');
  };

  const handleDesignChange = (design: any) => {
    console.log('Design changed:', design);
    // You can save to your backend here
  };

  // Define custom blocks
  const customBlocks = [
    {
      id: 'welcome-block',
      name: 'Welcome',
      category: 'greetings',
      components: [
        {
          id: 'text-welcome-1',
          type: 'text' as any,
          props: {
            text: '<h1>Welcome!</h1>',
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#2d3748',
            align: 'center'
          }
        },
        {
          id: 'text-welcome-2',
          type: 'text' as any,
          props: {
            text: '<p>Thank you for joining us. We are excited to have you!</p>',
            fontSize: '16px',
            color: '#4a5568',
            align: 'center'
          }
        }
      ]
    },
    {
      id: 'cta-block',
      name: 'CTA',
      category: 'marketing',
      components: [
        {
          id: 'button-cta',
          type: 'button' as any,
          props: {
            text: 'Take Action Now',
            href: 'https://example.com',
            backgroundColor: '#48bb78',
            textColor: '#ffffff',
            borderRadius: '8px',
            padding: '16px 32px',
            align: 'center'
          }
        }
      ]
    },
    {
      id: 'contact-block',
      name: 'Contact',
      category: 'footer',
      components: [
        {
          id: 'text-contact',
          type: 'text' as any,
          props: {
            text: '<p>Questions? Contact us at support@example.com</p>',
            fontSize: '14px',
            color: '#666666',
            align: 'center'
          }
        },
        {
          id: 'divider-contact',
          type: 'divider' as any,
          props: {
            color: '#e0e0e0',
            height: '1px'
          }
        }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Kaptha Email Editor - Next.js Demo (v2.1.0)</h1>
        <p>Build beautiful emails with drag and drop - now with Custom Blocks!</p>
      </header>
      <main className={styles.main}>
        {/* @ts-ignore - customBlocks support in v2.1.0, will work when published to npm */}
        <KapthaEmailEditor
          apiKey="kpt_dev_ws001_demo12345678"
          minHeight="calc(100vh - 140px)"
          customBlocks={customBlocks}
          onReady={handleReady}
          onDesignChange={handleDesignChange}
        />
      </main>
    </div>
  )
}
