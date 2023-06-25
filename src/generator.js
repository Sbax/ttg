import generator from "./generator.it.json";
import {
  diceNotation,
  getRandomBetween,
  getRandomFromArray,
  incrementRandomProperty,
  shuffle,
} from "./utils";

const distributePoints = (startingPoints, length) => {
  let remainingPoints = startingPoints;

  const pointsArray = Array.from({ length }, () => {
    const maxPoints = remainingPoints;
    const points = getRandomBetween(0, maxPoints);
    remainingPoints -= points;
    return points;
  });

  pointsArray[pointsArray.length] = remainingPoints;

  return shuffle(pointsArray);
};

const getName = () => getRandomFromArray(generator.names);

export const getCharacter = () => {
  const name = getName();

  // stats
  const [fisico, coordinazione, intelligenza, carisma] = distributePoints(3, 4);
  const stats = { fisico, coordinazione, intelligenza, carisma };

  // skills
  const [allenamento, manualità, arcano, comunicare] = distributePoints(3, 4);
  const skills = {
    allenamento,
    manualità,
    arcano,
    comunicare,
  };

  const race = getRandomFromArray(generator.races);
  stats.fisico += race.fisico || 0;
  stats.coordinazione += race.coordinazione || 0;
  stats.intelligenza += race.intelligenza || 0;
  stats.carisma += race.carisma || 0;

  skills.allenamento += race.allenamento || 0;
  skills.manualità += race.manualità || 0;
  skills.arcano += race.arcano || 0;
  skills.comunicare += race.comunicare || 0;

  if (race.skillBonus) incrementRandomProperty(skills, race.skillBonus);

  const { variants, ...characterClass } = getRandomFromArray(generator.classes);
  const { talents, armor = 0, ...variant } = getRandomFromArray(variants);
  const talent = getRandomFromArray(talents);

  stats.fisico += characterClass.fisico || 0;
  stats.coordinazione += characterClass.coordinazione || 0;
  stats.intelligenza += characterClass.intelligenza || 0;
  stats.carisma += characterClass.carisma || 0;

  skills.allenamento += characterClass.allenamento || 0;
  skills.manualità += characterClass.manualità || 0;
  skills.arcano += characterClass.arcano || 0;
  skills.comunicare += characterClass.comunicare || 0;

  if (characterClass.skillBonus)
    incrementRandomProperty(skills, characterClass.skillBonus);

  const pv = Math.max(diceNotation("1d8"), diceNotation("1d8")) + stats.fisico;
  const ki = diceNotation("1d4") + skills.arcano;

  const slot = 8 + stats.fisico;

  const spell =
    variant.spells &&
    getRandomFromArray(
      [...variant.spells, ...generator.spells].filter(({ cost }) => cost <= ki)
    );

  return {
    name,
    stats,
    skills,
    pv,
    armor,
    ki,
    race,
    characterClass,
    variant,
    talent,
    spell,
    slot,
  };
};
