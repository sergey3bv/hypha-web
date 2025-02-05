export const nullToUndefined = <T>(
  data: T | null,
): Exclude<T, null> | undefined => {
  if (data === null) {
    return undefined;
  }

  if (Array.isArray(data)) {
    return data.map((item) => nullToUndefined(item)) as Exclude<T, null>;
  }

  if (typeof data === 'object' && data !== null) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = nullToUndefined(value);
    }
    return result as Exclude<T, null>;
  }

  return data as Exclude<T, null>;
};
