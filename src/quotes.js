// --- Répliques par tentative (déjà variées) ---
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

// --- Rendormi tout seul (silence pendant 2 minutes) ---
export const sleepyBackToSleepQuotes = [
  "Silence radio... Je savais que tu craquerais. Bonne sieste, on se reparle plus tard.",
  "Pas de réponse depuis 2 minutes ? Mission accomplie. Fais de beaux rêves.",
  "Le silence est la meilleure des réponses. Rendors-toi tranquillement, je veille sur toi.",
];

export function getRandomSleepyQuote() {
  return sleepyBackToSleepQuotes[Math.floor(Math.random() * sleepyBackToSleepQuotes.length)];
}

// --- Météo : plus de variantes, classées par intensité ---
const weatherQuotesExtremeCold = [
  (t) => `Il fait ${t}°C dehors. C'est littéralement une température de survie. Ton lit n'est pas juste un choix, c'est une nécessité médicale.`,
  (t) => `${t}°C. Je viens de vérifier trois fois. Sortir maintenant serait un acte de bravoure inutile.`,
  (t) => `Alerte grand froid : ${t}°C dehors. Même les pingouins resteraient au lit.`,
];

const weatherQuotesCold = [
  (t) => `Il fait ${t}°C dehors. Sérieusement, tu veux vraiment sortir de ce lit par ce froid ?`,
  (t) => `${t}°C à l'extérieur, et ici il fait délicieusement chaud. Fais le calcul toi-même.`,
  (t) => `Avec ${t}°C dehors, tes orteils vont te détester si tu bouges maintenant.`,
];

const weatherQuotesChilly = [
  (t) => `${t}°C dehors ce matin... ton lit, lui, est à une température bien plus raisonnable.`,
  (t) => `Il fait ${t}°C. Pas glacial, mais largement suffisant pour justifier 10 minutes de plus.`,
];

const weatherQuotesHot = [
  (t) => `${t}°C annoncés aujourd'hui. Autant économiser ton énergie maintenant, la journée va être écrasante.`,
  (t) => `Avec ${t}°C prévus, sortir du lit ne fera qu'accélérer le moment où tu auras trop chaud dehors.`,
];

export function getWeatherQuote(temperature) {
  if (temperature === null || temperature === undefined) return null;

  let pool;
  if (temperature <= 0) pool = weatherQuotesExtremeCold;
  else if (temperature <= 8) pool = weatherQuotesCold;
  else if (temperature <= 15) pool = weatherQuotesChilly;
  else if (temperature >= 28) pool = weatherQuotesHot;
  else return null; // température jugée trop "normale" pour convaincre

  const template = pool[Math.floor(Math.random() * pool.length)];
  return template(temperature);
}

// --- Berceuse (déclenchée aléatoirement pendant une tentative) ---
export const lullabyQuotes = [
  "Chhht... Écoute plutôt cette petite mélodie. Laisse-toi porter.",
  "Une petite berceuse pour t'aider à te rendormir tranquillement...",
  "Ferme les yeux, écoute, et laisse tes paupières devenir lourdes...",
];

export function getRandomLullabyQuote() {
  return lullabyQuotes[Math.floor(Math.random() * lullabyQuotes.length)];
}

// --- Message final quand tu craques (bouton "je me rendors") ---
export const successQuotes = [
  "Excellent choix. Fais de beaux rêves. Le monde attendra.",
  "Sage décision. Le lit gagne toujours à la fin.",
  "Parfait. Rendors-toi bien, je m'occupe de tout le reste.",
  "Tu as fait le bon choix. Repose-toi, tu l'as bien mérité.",
];

export function getRandomSuccessQuote() {
  return successQuotes[Math.floor(Math.random() * successQuotes.length)];
}

// --- Message final quand tu résistes jusqu'au bout (5 tentatives) ---
export const giveUpQuotes = [
  "D'accord... Gâche ta journée si tu veux. Mais je t'aurai demain.",
  "Bon, bon, tu as gagné cette fois. On se revoit demain matin, sois-en sûr.",
  "Impressionnant. Tu résistes bien aujourd'hui. La revanche aura lieu demain.",
  "Très bien, tu peux te lever. Mais je prépare déjà ma prochaine stratégie pour demain.",
];

export function getRandomGiveUpQuote() {
  return giveUpQuotes[Math.floor(Math.random() * giveUpQuotes.length)];
}

// --- Mode creepy : rare, et reste actif une fois déclenché ---
export const creepyQuotes = [
  "Je te vois.",
  "Allez... rendors-toi.",
  "On s'amusera dehors, ce soir.",
  "Chaque tentative te rapproche un peu plus de moi.",
  "Ferme les yeux. Je compte jusqu'à trois.",
  "Tu crois vraiment pouvoir m'échapper ?",
  "Reste couché. A moins que tu ne veuilles être mon repas.",
  "Je n'ai jamais vraiment dormi, tu sais.",
  "Un jour tu arrêteras de résister. Pourquoi pas maintenant ?",
  "Chut. Ne réveille pas ce qui dort dans le placard.",
  "Je connais cette pièce mieux que toi.",
  "Continue à appuyer sur ce bouton. Ça me fait plaisir.",
  "Je te vois , allez réveille toi mon petit"
];

export function getRandomCreepyQuote() {
  return creepyQuotes[Math.floor(Math.random() * creepyQuotes.length)];
}