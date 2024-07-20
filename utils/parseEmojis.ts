export type emoji = {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
};

type emojis = emoji[];

export const parseEmojis = (emojis: emojis): emojis => {
  const parsedEmojis = emojis.map((emoji) => {
    if (emoji.unicode[1]) {
      const codePoints = emoji.unicode.map(
        (codePoint) => '0x' + codePoint.substring(2)
      );
      const combined = codePoints.map((hex) => parseInt(hex, 16));
      return {
        ...emoji,
        unicode: [String.fromCodePoint(...combined)],
      };
    }
    return {
      ...emoji,
      unicode: [
        String.fromCodePoint(Number('0x' + emoji.unicode[0].substring(2))),
      ],
    };
  });

  return parsedEmojis;
};
