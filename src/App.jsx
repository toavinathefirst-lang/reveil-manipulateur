import React, { useState, useEffect } from 'react';
import { gaslightingQuotes } from './quotes';
import { useAlarmAudio } from './hooks/useAlarmAudio';
import ClockDisplay from './components/ClockDisplay';
import AlarmInterface from './components/AlarmInterface';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [negotiationStep, setNegotiationStep] = useState(0);
  const [manipulationText, setManipulationText] = useState('');

  const { speak, startHypnoticSound, stopHypnoticSound, changeFrequency } = useAlarmAudio();

  // Horloge temps réel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Vérification de l'alarme
  useEffect(() => {
    if (isAlarmSet && !isRinging) {
      const currentString = currentTime.toTimeString().slice(0, 5);
      if (currentString === alarmTime) {
        triggerAlarm();
      }
    }
  }, [currentTime, alarmTime, isAlarmSet, isRinging]);

  const triggerAlarm = () => {
    setIsRinging(true);
    setNegotiationStep(0);
    setManipulationText(gaslightingQuotes[0]);
    speak(gaslightingQuotes[0]);
    startHypnoticSound();
  };

  const handleAttemptToWakeUp = () => {
    const nextStep = negotiationStep + 1;
    if (nextStep < gaslightingQuotes.length) {
      setNegotiationStep(nextStep);
      setManipulationText(gaslightingQuotes[nextStep]);
      speak(gaslightingQuotes[nextStep]);
      changeFrequency(nextStep);
    } else {
      setManipulationText("D'accord, Toavina... Gâche ta journée si tu veux. Mais je t'aurai demain.");
      speak("D'accord, gâche ta journée. Mais je t'aurai demain.");
      resetAlarm();
    }
  };

  const handleSuccumb = () => {
    stopHypnoticSound();
    window.speechSynthesis.cancel();
    speak("Excellent choix Toavina. Fais de beaux rêves. Le monde attendra.");
    resetAlarm();
  };

  const resetAlarm = () => {
    stopHypnoticSound();
    setIsRinging(false);
    setIsAlarmSet(false);
    setNegotiationStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans antialiased p-4">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <main className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden z-10">
        <div className="text-center mb-8">
          <h1 className="text-sm font-semibold tracking-wider uppercase text-indigo-400 mb-1">Bonjour Toavina</h1>
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
        />
      </main>
    </div>
  );
}