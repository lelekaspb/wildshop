import { getProductBySlug } from "@/sanity/sanity-utils";

export default async function CollectionProduct({
  params,
}: {
  params: {
    type: string;
    category: string;
    subcategory: string;
    collection: string;
    product: string;
  };
}) {
  const product = await getProductBySlug(params.product);

  return (
    <main>
      <h2>Product</h2>
      <p>
        {product.title} of collection {params.collection} - {product.amount}{" "}
        pieces
      </p>
    </main>
  );
}
