import React, { useState } from 'react';
import SarcasticDrawl from './components/SarcasticDrawl';
import './App.css';

function App() {
  const [customText, setCustomText] = useState<string>('');
  const [currentText, setCurrentText] = useState<string>("They're not even hiding it");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim()) {
      setCurrentText(customText.trim());
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 300); // Reset for animation effect
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sarcastic Drawl</h1>
        <p className="subtitle">Say it like you mean it... sarcastically</p>
      </header>

      <main>
        <SarcasticDrawl 
          text={currentText} 
          key={currentText} // Force re-render when text changes
        />

        <div className="custom-input">
          <form onSubmit={handleSubmit}>
            <label htmlFor="custom-text">Try your own sarcastic phrase:</label>
            <div className="input-container">
              <input
                id="custom-text"
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter something to say sarcastically..."
                className={submitted ? 'submitted' : ''}
              />
              <button type="submit">Say it</button>
            </div>
          </form>
        </div>
      </main>

      <footer>
        <p>Inspired by the C++ Sarcastic Drawl project | React Edition</p>
      </footer>
    </div>
  );
}

export default App;
