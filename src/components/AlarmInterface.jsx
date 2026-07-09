import React from 'react';
import { Clock, Moon, VolumeX, BedDouble, AlertCircle, Thermometer, Eye } from 'lucide-react';

export default function AlarmInterface({
  isRinging,
  alarmTime,
  setAlarmTime,
  isAlarmSet,
  setIsAlarmSet,
  manipulationText,
  negotiationStep,
  handleSuccumb,
  handleAttemptToWakeUp,
  weather,
  isCreepy,
}) {
  if (!isRinging) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-medium text-slate-300">Heure de réveil</span>
          </div>
          <input
            type="time"
            value={alarmTime}
            disabled={isAlarmSet}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50 text-sm font-bold"
          />
        </div>

        <button
          onClick={() => setIsAlarmSet(!isAlarmSet)}
          disabled={!alarmTime}
          className={`w-full py-4 rounded-xl font-medium tracking-wide transition-all duration-300 shadow-lg ${
            isAlarmSet
              ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {isAlarmSet ? 'Annuler le piège' : "Programmer l'arnaque"}
        </button>

        {isAlarmSet && (
          <div className="flex items-center gap-2 justify-center text-xs text-indigo-400 bg-indigo-500/5 py-2 rounded-lg border border-indigo-500/10">
            <Moon className="w-3.5 h-3.5 animate-pulse" /> Prêt à saboter ton réveil à {alarmTime}...
          </div>
        )}

        {weather && (
          <div className="flex items-center gap-2 justify-center text-[11px] text-slate-500">
            <Thermometer className="w-3.5 h-3.5" /> Il fait {weather.temperature}°C dehors actuellement
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        className={`rounded-2xl p-6 text-center shadow-inner relative overflow-hidden border transition-colors duration-700 ${
          isCreepy
            ? 'bg-gradient-to-br from-rose-950/60 to-black border-rose-900/50'
            : 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-500/20'
        }`}
      >
        <div className="absolute top-2 right-2 flex gap-1">
          <span className={`w-2 h-2 rounded-full animate-ping ${isCreepy ? 'bg-rose-600' : 'bg-indigo-500'}`} />
        </div>
        {isCreepy ? (
          <Eye className="w-10 h-10 text-rose-500 mx-auto mb-4 animate-pulse" />
        ) : (
          <BedDouble className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
        )}
        <p
          className={`text-sm font-medium leading-relaxed italic ${
            isCreepy ? 'text-rose-200' : 'text-slate-200'
          }`}
        >
          "{manipulationText}"
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleSuccumb}
          className={`w-full py-4 font-semibold rounded-xl shadow-lg transition-all text-white ${
            isCreepy
              ? 'bg-gradient-to-r from-rose-800 to-red-900 hover:from-rose-700 hover:to-red-800'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
          }`}
        >
          <Moon className="w-5 h-5 inline mr-2" /> Tu as raison, je me rendors (10 min...)
        </button>

        <button
          onClick={handleAttemptToWakeUp}
          className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 font-medium text-xs rounded-xl border border-slate-700/60 transition-all"
        >
          <VolumeX className="w-4 h-4 inline mr-2" /> Non ! Je DOIS me lever (Tentative {negotiationStep + 1}/5)
        </button>
      </div>

      <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
        <AlertCircle className="w-3 h-3" /> Info : La résistance est inutile. Ton lit t'aime.
      </div>
    </div>
  );
}