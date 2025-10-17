import { useGetProducts } from "~/api/client/products/useGetProducts";

export const useProductFetch = (slug: string) => {
  const product = useGetProducts(slug);

  return {
    product: product.data,
    loading: {
      product: product.isLoading,
    },
  };
};
