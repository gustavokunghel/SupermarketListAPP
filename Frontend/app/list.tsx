import { useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { CaretDown, ArrowLeft, Package } from "phosphor-react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { useProducts, Product } from "@/hooks/useProducts";
import { useCartStore } from "@/store/useProductStore";
import { ItemRowCard } from "@/components/ItemRowCard";
import { fontSizes } from "@/styles/fontSizes";
import { borderRadius } from "@/styles/borderRadius";
import { StatusBar } from "expo-status-bar";

interface ProductWithQuantity extends Product {
  quantity: number;
}

function ListFooter({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}) {
  const colors = useTheme();

  if (!hasNextPage) return null;

  if (isFetchingNextPage) {
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.theme} />
      </View>
    );
  }

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={onLoadMore} style={[styles.loadMoreButton, {}]}>
        <CaretDown size={32} color={colors.theme} weight="bold" />
      </TouchableOpacity>
    </View>
  );
}

export default function List() {
  const colors = useTheme();
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useProducts();

  const items = useCartStore((state) => state.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);

  const getQuantity = useCallback((id: number) => items[id]?.quantity || 0, [items]);

  const totalItems = useMemo(
    () => Object.values(items).reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const productsWithQuantity = useMemo(() => {
    if (!data?.products) return [];
    return data.products.map((p) => ({
      ...p,
      quantity: getQuantity(p.id),
    }));
  }, [data?.products, getQuantity]);

  const renderItem = useCallback(
    ({ item }: { item: ProductWithQuantity }) => (
      <ItemRowCard
        imageUri={item.image}
        title={item.name}
        subtitle={
          item.quantity > 0 ? `${item.quantity} na lista` : "Toque + para adicionar"
        }
        quantity={item.quantity}
        decrementDisabled={item.quantity <= 0}
        onDecrement={() => decrement(item.id)}
        onIncrement={() => increment({ id: item.id, name: item.name, image: item.image })}
      />
    ),
    [increment, decrement],
  );

  const keyExtractor = useCallback((item: ProductWithQuantity) => String(item.id), []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!data && !isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style="light" />

        <View style={[styles.header, { backgroundColor: colors.theme }]}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#FFFFFF" weight="bold" />
            </TouchableOpacity>
            <Text style={styles.title}>Adicionar Itens</Text>
          </View>
        </View>

        <View style={styles.emptyState}>
          <Package size={64} color={colors.textSecondary} weight="thin" />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Produtos disponíveis
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Carregue os produtos para adicionar à sua lista
          </Text>
          <TouchableOpacity
            onPress={() => fetchNextPage()}
            style={[styles.loadMoreButton, { backgroundColor: colors.theme }]}>
            <CaretDown size={20} color="#FFFFFF" weight="bold" />
            <Text style={styles.loadMoreText}>Carregar produtos</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.theme} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Carregando produtos...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.theme }]}>
          Erro ao carregar: {error?.message || "Erro desconhecido"}
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          style={[styles.retryButton, { backgroundColor: colors.theme }]}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <View style={[styles.header, { backgroundColor: colors.theme }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFFFFF" weight="bold" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Adicionar Itens</Text>
            <Text style={styles.headerSubtitle}>
              {totalItems} {totalItems === 1 ? "item" : "itens"} na lista
            </Text>
          </View>
        </View>
      </View>

      <FlashList
        data={productsWithQuantity}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={
          <ListFooter
            hasNextPage={hasNextPage ?? false}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={handleLoadMore}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: fontSizes.xl,
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: fontSizes.sm,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingBottom: 80,
  },
  emptyTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: fontSizes.xl,
    marginTop: 16,
  },
  emptySubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: fontSizes.md,
    textAlign: "center",
    paddingHorizontal: 48,
    marginBottom: 24,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: fontSizes.sm,
  },
  loadMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: borderRadius.lg,
  },
  loadMoreText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: fontSizes.md,
    color: "#FFFFFF",
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.92 }],
  },
  loadingText: {
    fontFamily: "Inter_500Medium",
    fontSize: fontSizes.md,
  },
  errorText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: fontSizes.md,
    textAlign: "center",
    paddingHorizontal: 32,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
  },
  retryText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: fontSizes.sm,
    color: "#FFFFFF",
  },
});
