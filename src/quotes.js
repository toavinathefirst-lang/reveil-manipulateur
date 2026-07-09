export const gaslightingQuotes = [
  [
    "Bonjour... Tu as une sale mine. Es-tu sûr d'avoir assez dormi ? 10 petites minutes de plus ne feront de mal à personne...",
    "Encore toi ? Le monde peut bien attendre 10 minutes de plus, non ?",
    "Statistiquement, les gens qui se lèvent tout de suite regrettent toujours de ne pas avoir dormi un peu plus.",
  ],
  [
    "Franchement, le monde extérieur est surévalué. Il fait froid dehors, ton lit est chaud. Reste là.",
    "Tu sais ce qui est mieux que te lever ? Ne pas te lever.",
    "Ton oreiller m'a chargé de te dire qu'il t'aime encore. Ce serait cruel de partir maintenant.",
  ],
  [
    "Attention ! Si tu te lèves maintenant, ton corps va subir un choc thermique. Je refuse de prendre ce risque pour ta santé.",
    "Des études sérieuses (que je viens d'inventer) montrent que se lever brusquement raccourcit l'espérance de vie.",
    "Le variant 'lève-tôt' est très contagieux en ce moment. Reste couché, c'est un geste barrière.",
  ],
  [
    "Tu sais quoi ? J'ai annulé ton alarme. De toute façon, tu es déjà en retard. Autant assumer et faire une grasse matinée stratégique.",
    "Techniquement tu es déjà en retard, donc 5 minutes de plus ne changeront plus rien du tout.",
    "Le retard, c'est juste être à l'heure pour la prochaine fois. Détends-toi.",
  ],
  [
    "Urgences médicales simulées ! Ton rythme cardiaque est trop bas pour affronter la réalité. Rendors-toi immédiatement.",
    "Dernier avertissement : je vais devoir sortir l'artillerie lourde du sommeil si tu insistes.",
    "Bon, j'abandonne presque... mais une toute dernière tentative de négociation avant.",
  ],
];

export function getRandomQuote(step) {
  const pool = gaslightingQuotes[step];
  return pool[Math.floor(Math.random() * pool.length)];
}

export const sleepyBackToSleepQuotes = [
  "Silence radio... Je savais que tu craquerais. Bonne sieste, on se reparle plus tard.",
  "Pas de réponse depuis 2 minutes ? Mission accomplie. Fais de beaux rêves.",
  "Le silence est la meilleure des réponses. Rendors-toi tranquillement, je veille sur toi.",
];

export function getRandomSleepyQuote() {
  return sleepyBackToSleepQuotes[Math.floor(Math.random() * sleepyBackToSleepQuotes.length)];
}

export function getWeatherQuote(temperature) {
  if (temperature === null || temperature === undefined) return null;
  if (temperature <= 5) {
    return `Il fait ${temperature}°C dehors. Sérieusement, tu veux vraiment sortir de ce lit par ce froid ?`;
  }
  if (temperature <= 12) {
    return `${temperature}°C dehors ce matin... ton lit, lui, est à une température bien plus raisonnable.`;
  }
  return null;
}