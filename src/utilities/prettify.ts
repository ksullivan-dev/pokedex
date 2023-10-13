/**
 * Replaces dashes, underscores, dots and slashes with space
 */
export const prettify = (value: string): string => {
  const replacements = new RegExp(/[-_.\\/]/g);

  return value.replaceAll(replacements, " ");
};
