'use client'

import EmailEditor from '@actovision/kaptha-email-editor';
import styles from './page.module.css'

export default function Home() {
  const handleExport = (html: string, mjml: string) => {
    console.log('HTML:', html);
    console.log('MJML:', mjml);
    // You can save to your backend here
  };

  const handleSave = (template: any) => {
    console.log('Template saved:', template);
    // You can save to your backend here
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Kaptha Email Editor - Next.js Demo</h1>
        <p>Build beautiful emails with drag and drop</p>
      </header>
      <main className={styles.main}>
        <EmailEditor
          height="calc(100vh - 140px)"
          onExport={handleExport}
          onSave={handleSave}
          initialTemplate={{
            name: "My Email Template",
            category: "custom",
            components: [],
          }}
        />
      </main>
    </div>
  )
}
