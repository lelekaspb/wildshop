import { getProductBySlug } from "@/sanity/sanity-utils";

export default async function CategoryProduct({
  params,
}: {
  params: {
    type: string;
    category: string;
    product: string;
  };
}) {
  const product = await getProductBySlug(params.product);

  return (
    <main>
      <h2>Product</h2>
      <p>
        {product.title} of category {params.category} - {product.amount} pieces
      </p>
    </main>
  );
}
