import KapthaEmailEditor from '@actovision/kaptha-email-editor';
// @ts-ignore - CustomBlock in v2.1.0, will work when published to npm
import type { CustomBlock } from '@actovision/kaptha-email-editor';
import './App.css';

function App() {
  const handleReady = () => {
    console.log('Editor ready!');
  };

  const handleDesignChange = (design: any) => {
    console.log('Design changed:', design);
    // You can save to your backend here
  };

  // Define custom blocks
  const customBlocks: CustomBlock[] = [
    {
      id: 'hero-section',
      name: 'Hero Section',
      category: 'marketing',
      components: [
        {
          id: 'text-hero-1',
          type: 'text' as any,
          props: {
            text: '<h1>Welcome to Our Newsletter</h1>',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a202c',
            align: 'center'
          }
        },
        {
          id: 'text-hero-2',
          type: 'text' as any,
          props: {
            text: '<p>Stay updated with our latest news and updates.</p>',
            fontSize: '16px',
            color: '#718096',
            align: 'center'
          }
        },
        {
          id: 'button-hero',
          type: 'button' as any,
          props: {
            text: 'Get Started',
            href: 'https://example.com',
            backgroundColor: '#3182ce',
            textColor: '#ffffff',
            align: 'center'
          }
        }
      ]
    },
    {
      id: 'promo-banner',
      name: 'Promo Banner',
      category: 'marketing',
      components: [
        {
          id: 'text-promo',
          type: 'text' as any,
          props: {
            text: '<h2>Special Offer - 50% Off!</h2>',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#e53e3e',
            padding: '20px'
          }
        },
        {
          id: 'button-promo',
          type: 'button' as any,
          props: {
            text: 'Shop Now',
            href: 'https://example.com/sale',
            backgroundColor: '#ffffff',
            textColor: '#e53e3e',
            align: 'center'
          }
        }
      ]
    },
    {
      id: 'footer-block',
      name: 'Footer',
      category: 'footer',
      components: [
        {
          id: 'social-footer',
          type: 'social' as any,
          props: {
            links: [
              { platform: 'facebook', url: 'https://facebook.com/yourpage' },
              { platform: 'twitter', url: 'https://twitter.com/yourhandle' },
              { platform: 'instagram', url: 'https://instagram.com/yourpage' }
            ],
            iconSize: '32px',
            align: 'center'
          }
        },
        {
          id: 'text-footer',
          type: 'text' as any,
          props: {
            text: '<p>© 2024 Your Company. All rights reserved.</p>',
            fontSize: '12px',
            color: '#a0aec0',
            align: 'center'
          }
        }
      ]
    }
  ];

  return (
    <div className="App">
      <header>
        <h1>Kaptha Email Editor - React Demo (v2.1.0)</h1>
        <p>Build beautiful emails with drag and drop - now with Custom Blocks!</p>
      </header>
      <main>
        <KapthaEmailEditor
          {...{
            apiKey: "kpt_dev_ws001_demo12345678",
            minHeight: "calc(100vh - 120px)",
            customBlocks: customBlocks,
            onReady: handleReady,
            onDesignChange: handleDesignChange
          } as any}
        />
      </main>
    </div>
  );
}

export default App;
