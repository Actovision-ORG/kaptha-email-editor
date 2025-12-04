import KapthaEmailEditor from '@actovision/kaptha-email-editor';
import './App.css';

function App() {
  const handleReady = () => {
    console.log('Editor ready!');
  };

  const handleDesignChange = (design: any) => {
    console.log('Design changed:', design);
    // You can save to your backend here
  };

  return (
    <div className="App">
      <header>
        <h1>Kaptha Email Editor - React Demo (v2.0.0)</h1>
        <p>Build beautiful emails with drag and drop</p>
      </header>
      <main>
        <KapthaEmailEditor
          apiKey="kpt_dev_ws001_demo12345678"
          minHeight="calc(100vh - 120px)"
          onReady={handleReady}
          onDesignChange={handleDesignChange}
        />
      </main>
    </div>
  );
}

export default App;
