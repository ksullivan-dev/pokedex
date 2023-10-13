export const capitalize = (value: string, allWords = false): string => {
  if (allWords) {
    return value
      .split(" ")
      .map((word) => capitalize(word))
      .join(" ");
  }
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
