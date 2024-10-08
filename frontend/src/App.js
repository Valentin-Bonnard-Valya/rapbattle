import React, { useState } from 'react';
import './App.css';

function App() {
  const [rapLines, setRapLines] = useState([]);
  const [theme, setTheme] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleStartBattle = async () => {
    setRapLines([]);
    setIsTyping(true);

    const response = await fetch(`http://localhost:3000/rap-battle/stream?theme=${theme}`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      accumulatedText += decoder.decode(value);

      const cleanedText = accumulatedText
        .replace(/\s+\n/g, ' ')
        .replace(/\n+/g, '\n')
        .trim();

      if (cleanedText.endsWith('.') || cleanedText.endsWith('?') || cleanedText.endsWith('!')) {
        setRapLines((prev) => [...prev, cleanedText]);
        accumulatedText = '';
      }
    }
    setIsTyping(false);
  };

  return (
    <div className="app-container">
      <h1>AI Rap Battle</h1>
      <input
        type="text"
        placeholder="Enter a theme for the rap battle..."
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="theme-input"
      />
      <button onClick={handleStartBattle} className="start-button">Start Rap Battle</button>

      <div className="rap-lines">
        {rapLines.map((line, index) => (
          <div
            key={index}
            className="rap-line"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
        {isTyping && <div className="loader">...</div>} {}
      </div>
    </div>
  );
}

export default App;
