import { useRef } from 'react';

export function useAlarmAudio() {
  const audioContextRef = useRef(null);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.pitch = 0.8;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const startHypnoticSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    stopHypnoticSound();

    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    const lfo = audioContextRef.current.createOscillator();
    const lfoGain = audioContextRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, audioContextRef.current.currentTime);
    
    lfo.frequency.setValueAtTime(0.5, audioContextRef.current.currentTime);
    lfoGain.gain.setValueAtTime(20, audioContextRef.current.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    gain.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.start();
    lfo.start();
    
    audioContextRef.current.activeOsc = osc;
    audioContextRef.current.activeLfo = lfo;
  };

  const stopHypnoticSound = () => {
    if (audioContextRef.current) {
      if (audioContextRef.current.activeOsc) {
        try { audioContextRef.current.activeOsc.stop(); } catch (e) {}
        audioContextRef.current.activeOsc = null;
      }
      if (audioContextRef.current.activeLfo) {
        try { audioContextRef.current.activeLfo.stop(); } catch (e) {}
        audioContextRef.current.activeLfo = null;
      }
    }
  };

  const changeFrequency = (step) => {
    if (audioContextRef.current && audioContextRef.current.activeOsc) {
      const targetFrequency = Math.max(40, 90 - (step * 10));
      audioContextRef.current.activeOsc.frequency.setValueAtTime(targetFrequency, audioContextRef.current.currentTime);
    }
  };

  return { speak, startHypnoticSound, stopHypnoticSound, changeFrequency };
}