import { useRef, useEffect } from 'react';

export function useAlarmAudio() {
  const audioContextRef = useRef(null);
  const lullabyRef = useRef({ oscillators: [], intervalId: null, playing: false });
  const voiceRef = useRef(null);

  // --- Sélection d'une voix française plus naturelle ---
  useEffect(() => {
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const enhanced = voices.find(
        (v) => v.lang.startsWith('fr') && /google|natural|enhanced|premium/i.test(v.name)
      );
      const anyFrench = voices.find((v) => v.lang.startsWith('fr'));
      voiceRef.current = enhanced || anyFrench || null;
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text, creepy = false) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    if (voiceRef.current) {
      utterance.voice = voiceRef.current;
    }

    if (creepy) {
      // Voix grave, lente, légèrement cassée -> effet "animatronique"
      utterance.pitch = 0.15;
      utterance.rate = 0.72;
      utterance.volume = 1;
    } else {
      utterance.pitch = 1.05;
      utterance.rate = 0.92;
      utterance.volume = 1;
    }

    window.speechSynthesis.speak(utterance);
  };

  // --- Son hypnotique normal / dissonant (creepy) ---
  const startHypnoticSound = (creepy = false) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    stopHypnoticSound();

    const ctx = audioContextRef.current;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(creepy ? 0.07 : 0.1, ctx.currentTime);
    gain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = creepy ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(creepy ? 55 : 110, ctx.currentTime);
    osc.connect(gain);
    osc.start();

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(creepy ? 0.15 : 0.5, ctx.currentTime);
    lfoGain.gain.setValueAtTime(creepy ? 8 : 20, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    ctx.activeOsc = osc;
    ctx.activeLfo = lfo;

    // En mode creepy : un second oscillateur très proche en fréquence
    // crée un battement dissonant, malsain, façon animatronique cassé
    if (creepy) {
      const detuneOsc = ctx.createOscillator();
      const detuneGain = ctx.createGain();
      detuneOsc.type = 'sawtooth';
      detuneOsc.frequency.setValueAtTime(58, ctx.currentTime);
      detuneGain.gain.setValueAtTime(0.05, ctx.currentTime);
      detuneOsc.connect(detuneGain);
      detuneGain.connect(ctx.destination);
      detuneOsc.start();
      ctx.activeDetuneOsc = detuneOsc;
    }
  };

  const stopHypnoticSound = () => {
    const ctx = audioContextRef.current;
    if (ctx) {
      if (ctx.activeOsc) {
        try { ctx.activeOsc.stop(); } catch (e) {}
        ctx.activeOsc = null;
      }
      if (ctx.activeLfo) {
        try { ctx.activeLfo.stop(); } catch (e) {}
        ctx.activeLfo = null;
      }
      if (ctx.activeDetuneOsc) {
        try { ctx.activeDetuneOsc.stop(); } catch (e) {}
        ctx.activeDetuneOsc = null;
      }
    }
  };

  const changeFrequency = (step) => {
    const ctx = audioContextRef.current;
    if (ctx && ctx.activeOsc) {
      const targetFrequency = Math.max(40, 90 - step * 10);
      ctx.activeOsc.frequency.setValueAtTime(targetFrequency, ctx.currentTime);
    }
  };

  // --- Berceuse ---
  const lullabyNotes = [261.63, 293.66, 329.63, 349.23, 392.0, 349.23, 329.63, 293.66];
  const noteDuration = 0.55;

  const playLullabySequenceOnce = () => {
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    lullabyNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      const startTime = now + i * noteDuration;
      const endTime = startTime + noteDuration;

      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.08);
      gain.gain.linearRampToValueAtTime(0, endTime - 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(endTime);

      lullabyRef.current.oscillators.push(osc);
    });
  };

  const startLullaby = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    stopHypnoticSound();
    stopLullaby();

    lullabyRef.current.playing = true;
    playLullabySequenceOnce();

    const totalDurationMs = lullabyNotes.length * noteDuration * 1000;
    lullabyRef.current.intervalId = setInterval(() => {
      if (lullabyRef.current.playing) {
        playLullabySequenceOnce();
      }
    }, totalDurationMs);
  };

  const stopLullaby = () => {
    if (lullabyRef.current.intervalId) {
      clearInterval(lullabyRef.current.intervalId);
      lullabyRef.current.intervalId = null;
    }
    lullabyRef.current.playing = false;
    lullabyRef.current.oscillators.forEach((osc) => {
      try { osc.stop(); } catch (e) {}
    });
    lullabyRef.current.oscillators = [];
  };

  return {
    speak,
    startHypnoticSound,
    stopHypnoticSound,
    changeFrequency,
    startLullaby,
    stopLullaby,
  };
}