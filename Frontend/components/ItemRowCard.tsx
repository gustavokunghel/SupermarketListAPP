import { memo } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Minus, Plus } from "phosphor-react-native";
import { useTheme } from "@/hooks/useTheme";
import { fontSizes } from "@/styles/fontSizes";
import { borderRadius } from "@/styles/borderRadius";

export type ItemRowCardProps = {
  imageUri: string;
  title: string;
  subtitle?: string;
  quantity: number;
  showBadge?: boolean;
  decrementDisabled?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
};

export const ItemRowCard = memo(function ItemRowCard({
  imageUri,
  title,
  subtitle,
  quantity,
  showBadge,
  decrementDisabled = false,
  onDecrement,
  onIncrement,
}: ItemRowCardProps) {
  const colors = useTheme();
  const shouldShowBadge = showBadge ?? quantity > 0;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
        },
      ]}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        {shouldShowBadge && (
          <View style={[styles.badge, { backgroundColor: colors.theme }]}>
            <Text style={styles.badgeText}>{quantity}</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
        {!!subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          disabled={decrementDisabled}
          onPress={onDecrement}
          activeOpacity={0.3}
          style={[
            styles.button,
            {
              backgroundColor: decrementDisabled
                ? colors.buttonBackground
                : colors.theme + "18",
            },
          ]}>
          <Minus
            size={18}
            color={decrementDisabled ? colors.textSecondary : colors.theme}
            weight="bold"
          />
        </TouchableOpacity>

        <Text style={[styles.quantity, { color: colors.text }]}>{quantity}</Text>

        <TouchableOpacity
          onPress={onIncrement}
          activeOpacity={0.3}
          style={[styles.button, { backgroundColor: colors.theme + "18" }]}>
          <Plus size={16} color={colors.theme} weight="bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 9,
    marginVertical: 5,
    borderRadius: borderRadius.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.xl,
    backgroundColor: "#E0E0E0",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: fontSizes.xs,
    color: "#FFFFFF",
  },
  info: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10,
    gap: 2,
  },
  name: {
    fontFamily: "Inter_500Medium",
    fontSize: fontSizes.md,
  },
  subtitle: {
    fontFamily: "Inter_500Regular",
    fontSize: fontSizes.xs,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  button: {
    width: 26,
    height: 26,
    borderRadius: borderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontFamily: "Inter_700Bold",
    fontSize: fontSizes.md,
    textAlign: "center",
    paddingHorizontal: 4,
  },
});
