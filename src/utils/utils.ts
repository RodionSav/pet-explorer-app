export const extractAnimalType = (url: string): string | null => {
  const regex = /(dog|cat)/;
  const match = url.match(regex);
  return match ? match[0] : null;
};
