import { useInfiniteQuery } from "@tanstack/react-query";
import { Platform } from "react-native";

const BASE_URL = "http://localhost:3000";

export interface Product {
  id: number;
  name: string;
  image: string;
}

interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

async function fetchProducts(page: number): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/api/products?page=${page}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return res.json();
}

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    enabled: false, // Não buscar automaticamente
    select: (data) => ({
      pages: data.pages,
      products: data.pages.flatMap((page) => page.data),
    }),
  });
}
