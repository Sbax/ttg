export const getRandomFromArray = (array) => shuffle(array)[0];

export const getRandomBetween = (min = 1, max = 20) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomFromObject = (object) => {
  const keys = Object.keys(object);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return object[randomKey];
};

export const incrementRandomProperty = (object, value) => {
  const keys = Object.keys(object);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  object[randomKey] += value;
};

export const diceNotation = (string) => {
  const [count, faces] = string.split("d").map((n) => parseInt(n));

  return Array.from({ length: count }, () => getRandomBetween(1, faces)).reduce(
    (sum, item) => {
      sum += item;
      return sum;
    },
    0
  );
};

export const shuffle = (array) =>
  array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);

export const getBrush = () => {
  const brushes = [9, 10];
  return brushes[Math.floor(Math.random() * brushes.length)];
};

export const brushStroke = ({ color, ...style }, brush, size = 35) => ({
  backgroundImage: `url("https://s2.svgbox.net/pen-brushes.svg?ic=brush-${brush}&color=${color.replace(
    "#",
    ""
  )}")`,
  backgroundSize: `100% 35%`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center 120%",
  ...style,
});
