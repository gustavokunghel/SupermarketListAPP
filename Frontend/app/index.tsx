import { useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ShoppingCart } from "phosphor-react-native";
import { useShallow } from "zustand/shallow";
import { useTheme } from "@/hooks/useTheme";
import { CartItem, useCartStore } from "@/store/useProductStore";
import { ItemRowCard } from "@/components/ItemRowCard";
import { AddButton } from "@/components/AddButton";
import { fontSizes } from "@/styles/fontSizes";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Index() {
  const colors = useTheme();
  const router = useRouter();
  const HandleNavigation = () => router.push("/list");

  const { items, increment, decrement } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      increment: state.increment,
      decrement: state.decrement,
    })),
  );

  const cartItems = useMemo(
    () => Object.values(items).filter((item) => item.quantity > 0),
    [items],
  );

  const totalItems = useMemo(
    () => Object.values(items).reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <ItemRowCard
        imageUri={item.image}
        title={item.name}
        subtitle={`${item.quantity} ${item.quantity === 1 ? "unidade" : "unidades"}`}
        quantity={item.quantity}
        showBadge
        onDecrement={() => decrement(item.id)}
        onIncrement={() => increment({ id: item.id, name: item.name, image: item.image })}
      />
    ),
    [increment, decrement],
  );

  const keyExtractor = useCallback((item: CartItem) => String(item.id), []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <View style={[styles.header, { backgroundColor: colors.theme }]}>
        <Text style={styles.title}>Lista de Compras</Text>

        <View style={styles.headerContent}>
          <Text style={styles.headerSubtitle}>
            {totalItems} {totalItems === 1 ? "item" : "itens"} na lista
          </Text>
          <ShoppingCart size={16} color="#FFFFFF" weight="bold" />
        </View>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <ShoppingCart size={64} color={colors.textSecondary} weight="thin" />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Lista vazia</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Adicione produtos para montar sua lista de compras
          </Text>
          <AddButton onPress={HandleNavigation} />
        </View>
      ) : (
        <>
          <FlashList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <SafeAreaView
            edges={["bottom"]}
            style={{ backgroundColor: colors.background, height: 90 }}
          />
          <View style={[styles.bottomBar, { borderTopColor: colors.border }]}>
            <AddButton onPress={HandleNavigation} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    gap: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: fontSizes.xxl,
    color: "#FFFFFF",
    textAlign: "left",
  },
  headerSubtitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: fontSizes.md,
    color: "rgba(255,255,255,0.75)",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    paddingBottom: 80,
  },
  emptyTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: fontSizes.xl,
  },
  emptySubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: fontSizes.md,
    paddingBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,

    borderTopWidth: 0,
    alignItems: "center",
  },
});
