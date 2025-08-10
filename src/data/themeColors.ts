export const themeColors = [
  { name: "Green", hex: "#277C78" },
  { name: "Yellow", hex: "#F2CDAC" },
  { name: "Cyan", hex: "#82C9D7" },
  { name: "Navy", hex: "#626070" },
  { name: "Red", hex: "#C94736" },
  { name: "Purple", hex: "#826CB0" },
  { name: "Pink", hex: "#AF81BA" },
  { name: "Turquoise", hex: "#597C7C" },
  { name: "Brown", hex: "#93674F" },
  { name: "Magenta", hex: "#934F6F" },
  { name: "Blue", hex: "#3F82B2" },
  { name: "Navy Grey", hex: "#97A0AC" },
  { name: "Army Green", hex: "#7F9161" },
  { name: "Gold", hex: "#CAB361" },
  { name: "Orange", hex: "#BE6C49" },
] as const;

type HexColor = (typeof themeColors)[number]["hex"];
type ColorName = (typeof themeColors)[number]["name"];

export const themeColorsMap = new Map<HexColor, ColorName>(
  themeColors.map(({ hex, name }) => [hex, name]),
);
