export const fetchEmojis = async () => {
  const response = await fetch('https://emojihub.yurace.pro/api/all');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
