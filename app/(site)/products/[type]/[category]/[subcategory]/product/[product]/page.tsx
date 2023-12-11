import { getProductBySlug } from "@/sanity/sanity-utils";

export default async function SubcategoryProduct({
  params,
}: {
  params: {
    type: string;
    category: string;
    subcategory: string;
    product: string;
  };
}) {
  const product = await getProductBySlug(params.product);

  return (
    <main>
      <h2>Product</h2>
      <p>
        {product.title} of subcategory {params.subcategory} - {product.amount}{" "}
        pieces
      </p>
    </main>
  );
}
