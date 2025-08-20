import React, { useState, useEffect, useRef } from 'react';
import './SarcasticDrawl.css';

interface SarcasticDrawlProps {
  text: string;
  onComplete?: () => void;
  autoStart?: boolean;
}

const SarcasticDrawl: React.FC<SarcasticDrawlProps> = ({ 
  text, 
  onComplete,
  autoStart = true
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(autoStart);
  const currentIndex = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up any timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Reset text when the input text changes
  useEffect(() => {
    setDisplayText('');
    currentIndex.current = 0;
    if (autoStart) {
      setIsPlaying(true);
    }
  }, [text, autoStart]);

  // Main effect for typing animation
  useEffect(() => {
    if (!isPlaying) return;

    const typeNextCharacter = () => {
      if (currentIndex.current < text.length) {
        const char = text[currentIndex.current];
        setDisplayText(prev => prev + char);
        currentIndex.current += 1;

        // Calculate delay based on character type (similar to C++ logic)
        let delay = 100;
        
        if (char === '\'') {
          delay = 300; // Longer pause at apostrophes
        } else if (char === ' ') {
          delay = 200; // Moderate pause at spaces
        } else if (
          currentIndex.current > 1 && 
          (currentIndex.current === text.length || 
           char === '.' || char === ',' || char === '!' || char === '?')
        ) {
          delay = 500; // Longer pause at end of words or punctuation
        } else {
          // Normal character delay with some randomness
          delay = 100 + (currentIndex.current % 3) * 50;
        }

        // Extra delay for certain vowels
        if (currentIndex.current > 1 && 
            (char === 'e' || char === 'i' || char === 'o')) {
          delay += 150;
        }

        // Schedule the next character
        timeoutRef.current = setTimeout(typeNextCharacter, delay);
      } else {
        // We're done
        setIsPlaying(false);
        if (onComplete) {
          onComplete();
        }
      }
    };

    // Start the typing process
    timeoutRef.current = setTimeout(typeNextCharacter, 500);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, text, onComplete]);

  const handleRestart = () => {
    setDisplayText('');
    currentIndex.current = 0;
    setIsPlaying(true);
  };

  return (
    <div className="sarcastic-drawl-container">
      <div className="sarcastic-text">{displayText}</div>
      <div className="controls">
        {!isPlaying && displayText === text ? (
          <button onClick={handleRestart} className="restart-button">
            Say it again, sarcastically
          </button>
        ) : (
          !autoStart && !isPlaying && (
            <button onClick={() => setIsPlaying(true)} className="start-button">
              Start
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SarcasticDrawl;
