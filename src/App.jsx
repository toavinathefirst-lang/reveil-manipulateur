import React, { useState, useEffect } from 'react';
import {
  gaslightingQuotes,
  getRandomQuote,
  getRandomSleepyQuote,
  getWeatherQuote,
  getRandomLullabyQuote,
  getRandomSuccessQuote,
  getRandomGiveUpQuote,
  getRandomCreepyQuote,
} from './quotes';
import { useAlarmAudio } from './hooks/useAlarmAudio';
import { useWeather } from './hooks/useWeather';
import ClockDisplay from './components/ClockDisplay';
import AlarmInterface from './components/AlarmInterface';
import ScreamerOverlay from './components/ScreamerOverlay';

const LULLABY_CHANCE = 0.35;
const CREEPY_CHANCE = 0.07
const SCREAMER_CHANCE = 0.15; // seulement possible si DÉJÀ en mode creepy
const SCREAMER_DURATION_MS = 1300;

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [negotiationStep, setNegotiationStep] = useState(0);
  const [manipulationText, setManipulationText] = useState('');
  const [isCreepy, setIsCreepy] = useState(false);
  const [isScreamerActive, setIsScreamerActive] = useState(false);

  const {
    speak,
    startHypnoticSound,
    stopHypnoticSound,
    changeFrequency,
    startLullaby,
    stopLullaby,
    playScreamerSound,
  } = useAlarmAudio();
  const { weather } = useWeather();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAlarmSet && !isRinging) {
      const currentString = currentTime.toTimeString().slice(0, 5);
      if (currentString === alarmTime) {
        triggerAlarm();
      }
    }
  }, [currentTime, alarmTime, isAlarmSet, isRinging]);

  useEffect(() => {
    if (!isRinging || isScreamerActive) return;
    const timeoutId = setTimeout(() => {
      handleFellAsleep();
    }, 2 * 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, [isRinging, negotiationStep, isScreamerActive]);

  const triggerAlarm = () => {
    setIsRinging(true);
    setNegotiationStep(0);
    setIsCreepy(false);
    setIsScreamerActive(false);

    let text = getRandomQuote(0);
    const weatherLine = weather ? getWeatherQuote(weather.temperature) : null;
    if (weatherLine) {
      text = `${text} ${weatherLine}`;
    }

    setManipulationText(text);
    speak(text, false);
    startHypnoticSound(false);
  };

  const triggerScreamer = () => {
    stopHypnoticSound();
    stopLullaby();
    window.speechSynthesis.cancel();

    setIsScreamerActive(true);
    playScreamerSound();

    setTimeout(() => {
      setIsScreamerActive(false);
      const text = getRandomCreepyQuote();
      setManipulationText(text);
      speak(text, true);
      startHypnoticSound(true);
    }, SCREAMER_DURATION_MS);
  };

  const handleAttemptToWakeUp = () => {
    if (isScreamerActive) return; // on ignore les clics pendant le screamer

    const nextStep = negotiationStep + 1;

    if (nextStep < gaslightingQuotes.length) {
      setNegotiationStep(nextStep);

      const becomingCreepy = isCreepy || Math.random() < CREEPY_CHANCE;

      if (becomingCreepy) {
        // Le screamer ne peut arriver que si on était DÉJÀ en creepy avant ce clic
        if (isCreepy && Math.random() < SCREAMER_CHANCE) {
          triggerScreamer();
          return;
        }

        if (!isCreepy) setIsCreepy(true);
        stopLullaby();
        const text = getRandomCreepyQuote();
        setManipulationText(text);
        speak(text, true);
        startHypnoticSound(true);
        return;
      }

      const triggerLullaby = Math.random() < LULLABY_CHANCE;
      if (triggerLullaby) {
        const text = getRandomLullabyQuote();
        setManipulationText(text);
        speak(text, false);
        startLullaby();
      } else {
        stopLullaby();
        const text = getRandomQuote(nextStep);
        setManipulationText(text);
        speak(text, false);
        changeFrequency(nextStep);
      }
    } else {
      const finalText = getRandomGiveUpQuote();
      setManipulationText(finalText);
      speak(finalText, isCreepy);
      resetAlarm();
    }
  };

  const handleSuccumb = () => {
    if (isScreamerActive) return;
    stopHypnoticSound();
    stopLullaby();
    window.speechSynthesis.cancel();
    const finalText = getRandomSuccessQuote();
    speak(finalText, isCreepy);
    resetAlarm();
  };

  const handleFellAsleep = () => {
    stopHypnoticSound();
    stopLullaby();
    const text = getRandomSleepyQuote();
    setManipulationText(text);
    speak(text, isCreepy);
    resetAlarm();
  };

  const resetAlarm = () => {
    stopHypnoticSound();
    stopLullaby();
    setIsRinging(false);
    setIsAlarmSet(false);
    setNegotiationStep(0);
    setIsCreepy(false);
    setIsScreamerActive(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans antialiased p-4">
      {isScreamerActive && <ScreamerOverlay />}

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      <main className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden z-10">
        <div className="text-center mb-8">
          <h1 className="text-sm font-semibold tracking-wider uppercase text-indigo-400 mb-1">Bonjour</h1>
          <p className="text-xs text-slate-400">Le réveil qui prend soin de ta flemme.</p>
        </div>

        <ClockDisplay currentTime={currentTime} />

        <AlarmInterface
          isRinging={isRinging}
          alarmTime={alarmTime}
          setAlarmTime={setAlarmTime}
          isAlarmSet={isAlarmSet}
          setIsAlarmSet={setIsAlarmSet}
          manipulationText={manipulationText}
          negotiationStep={negotiationStep}
          handleSuccumb={handleSuccumb}
          handleAttemptToWakeUp={handleAttemptToWakeUp}
          weather={weather}
          isCreepy={isCreepy}
        />
      </main>
    </div>
  );
}