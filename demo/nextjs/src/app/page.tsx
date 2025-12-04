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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Kaptha Email Editor - Next.js Demo (v2.0.0)</h1>
        <p>Build beautiful emails with drag and drop</p>
      </header>
      <main className={styles.main}>
        <KapthaEmailEditor
          apiKey="kpt_dev_ws001_demo12345678"
          minHeight="calc(100vh - 140px)"
          onReady={handleReady}
          onDesignChange={handleDesignChange}
        />
      </main>
    </div>
  )
}
