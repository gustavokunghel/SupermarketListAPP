import { useColorScheme } from "react-native";
import { lightColors, darkColors, ThemeColors } from "@/styles";

export function useTheme(): ThemeColors {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkColors : lightColors;
}
