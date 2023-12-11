import { getProductBySlug } from "@/sanity/sanity-utils";

export default async function SaleProduct({
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
        {product.title} - Sale Price: {product.salePrice} dkk - Regular Price:{" "}
        {product.regularPrice} dkk - {product.amount} pieces
      </p>
    </main>
  );
}
