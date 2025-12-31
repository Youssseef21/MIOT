import React, { useState, useEffect, useRef } from 'react';
import '../styles/voiceControl.css';
import { sendVoiceCommand } from '../services/api';

const VoiceControl = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState('🎤 Initializing...');
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const restartTimeoutRef = useRef(null);
  const manuallyStoppedRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setFeedback('❌ Speech Recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
      setFeedback('🎤 Listening...');
      setTranscript('');
      setInterimTranscript('');
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += transcriptSegment + ' ';
        } else {
          interim += transcriptSegment;
        }
      }

      if (final) {
        const finalText = (transcript + final).trim();
        setTranscript(finalText);
        sendToNodeRED(final.trim());
      } else {
        setInterimTranscript(interim);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setFeedback(`❌ ${event.error}`);
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      setIsListening(false);
      // Only auto-restart if not manually stopped
      if (manuallyStoppedRef.current) {
        setFeedback('🔇 Stopped');
        return;
      }
      // Auto-restart after 500ms
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      restartTimeoutRef.current = setTimeout(() => {
        if (!manuallyStoppedRef.current && !isListeningRef.current) {
          try {
            recognition.start();
          } catch (e) {
            console.log('Start error:', e);
          }
        }
      }, 500);
    };

    // Start listening immediately
    try {
      recognition.start();
    } catch (e) {
      console.log('Initial start error:', e);
    }

    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      manuallyStoppedRef.current = true;
      try {
        recognition.stop();
      } catch (e) {
        console.log('Stop error:', e);
      }
    };
  }, []);

  const sendToNodeRED = async (text) => {
    if (!text || text.length < 2) return;

    setIsProcessing(true);
    setFeedback('🔄 Processing...');

    try {
      const data = await sendVoiceCommand(text);

      if (data.ok) {
        setFeedback(`✅ Executed: ${data.command}`);
        if (onCommand) onCommand(data.command);
        // Clear after 2 seconds
        setTimeout(() => {
          setFeedback('🎤 Listening...');
          setTranscript('');
        }, 2000);
      } else if (data.error) {
        setFeedback(`⚠️ ${data.error}`);
        setTimeout(() => {
          setFeedback('🎤 Listening...');
        }, 2000);
      }
    } catch (error) {
      setFeedback(`❌ Connection error`);
      console.error('Voice API error:', error);
      setTimeout(() => {
        setFeedback('🎤 Listening...');
      }, 2000);
    }

    setIsProcessing(false);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListeningRef.current) {
      // Stop listening
      manuallyStoppedRef.current = true;
      try {
        recognitionRef.current.stop();
        isListeningRef.current = false;
        setIsListening(false);
        setFeedback('🔇 Stopped');
      } catch (e) {
        console.error('Stop error:', e);
      }
    } else {
      // Start listening
      manuallyStoppedRef.current = false;
      try {
        recognitionRef.current.start();
        isListeningRef.current = true;
        setIsListening(true);
        setFeedback('🎤 Listening...');
      } catch (e) {
        console.error('Start error:', e);
        setFeedback('❌ Failed to start');
      }
    }
  };

  return (
    <div className="voice-control-widget">
      <div className={`voice-badge ${isListening ? 'listening' : ''}`}>
        <button 
          className="voice-button"
          onClick={toggleListening}
          title={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? '🎤' : '🔇'}
        </button>
        <div className="voice-status">
          <div className="status-text">{feedback}</div>
          {interimTranscript && (
            <div className="interim-text">"{interimTranscript}"</div>
          )}
          {transcript && (
            <div className="final-text">Last: "{transcript.substring(0, 50)}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceControl;
