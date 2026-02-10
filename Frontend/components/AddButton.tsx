import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Package } from "phosphor-react-native";
import { useTheme } from "@/hooks/useTheme";
import { fontSizes } from "@/styles/fontSizes";
import { borderRadius } from "@/styles/borderRadius";

interface AddButtonProps {
  onPress?: () => void;
}

export function AddButton({ onPress }: AddButtonProps) {
  const colors = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.addButton, { backgroundColor: colors.theme }]}>
      <Text style={styles.addButtonText}> Adicionar itens</Text>
      <Package size={16} color="#FFFFFF" weight="bold" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    gap: 6,
    paddingHorizontal: 12,
    borderRadius: borderRadius.xl,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  addButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: fontSizes.md,
    color: "#FFFFFF",
  },
});
