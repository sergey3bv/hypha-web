export const truncateWithEllipsis: (
  inputText: string,
  maxLength: number
) => string = (inputText, maxLength) => {
  if (inputText.length > maxLength) {
    return inputText.slice(0, maxLength) + '...';
  }
  return inputText;
};
