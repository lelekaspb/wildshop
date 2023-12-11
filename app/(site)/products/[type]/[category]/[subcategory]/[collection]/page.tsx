import {
  getCollectionBySlug,
  getProductsByReference,
} from "@/sanity/sanity-utils";

import Link from "next/link";

export default async function Collection({
  params,
}: {
  params: {
    type: string;
    category: string;
    subcategory: string;
    collection: string;
  };
}) {
  const collection = await getCollectionBySlug(params.collection);

  const products = await getProductsByReference(collection._id);

  return (
    <main>
      <h2>Collection {collection.title}</h2>
      <div>
        <h3>Products</h3>
        {products.map((product) => (
          <div key={product._id}>
            <Link
              href={`/products/${params.type}/${params.category}/${params.subcategory}/${params.collection}/${product.slug}`}
            >
              {product.title} - ({product.amount} pieces)
            </Link>
          </div>
        ))}
        <p>products {products.length}</p>
      </div>
    </main>
  );
}
