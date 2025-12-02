import EmailEditor from '@actovision/kaptha-email-editor';
import './App.css';

function App() {
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
    <div className="App">
      <header>
        <h1>Kaptha Email Editor - React Demo</h1>
        <p>Build beautiful emails with drag and drop</p>
      </header>
      <main>
        <EmailEditor
          height="calc(100vh - 120px)"
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
  );
}

export default App;
