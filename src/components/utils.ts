export function convertStringToSeedNumber(str: string) {
  return str
    .split('')
    .map((char) => char.charCodeAt(0))
    .reduce((acc, val) => acc + val, 0);
}

export function computeCanvasDimensions(width: number, height: number) {
  return {
    width: width > 600 ? width * 0.5 : width * 0.9,
    height: height * 0.75,
  };
}

function generateRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

export const lightBg = '#f8f8f8';
const darkBg = '#281731';

export function generateColors() {
  return {
    fromColor: generateRandomHexColor(),
    toColor: generateRandomHexColor(),
    bgColor: Math.random() > 0.5 ? lightBg : darkBg,
  };
}
