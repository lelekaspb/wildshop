import { getProductBySlug } from "@/sanity/sanity-utils";

export default async function NewProduct({
  params,
}: {
  params: {
    product: string;
  };
}) {
  const product = await getProductBySlug(params.product);

  return (
    <main>
      <h2>Product</h2>
      <p>
        {product.title} - {product.amount} pieces
      </p>
    </main>
  );
}
