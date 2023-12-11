import {
  getSubcategoryBySlug,
  getCollectionsForOneSubcategory,
  getProductsByReference,
} from "@/sanity/sanity-utils";
import { Product } from "@/sanity/types/Product";
import Link from "next/link";

export default async function Subcategory({
  params,
}: {
  params: { type: string; category: string; subcategory: string };
}) {
  const subcategory = await getSubcategoryBySlug(params.subcategory);

  const collections = await getCollectionsForOneSubcategory(subcategory._id);
  let products: Product[] = [];
  if (collections.length == 0) {
    products = await getProductsByReference(subcategory._id);
  }

  return (
    <main>
      <h2>Subcategory {subcategory.title}</h2>
      {collections.length > 0 && (
        <div>
          <h3>Collections</h3>
          {collections.map((collection) => (
            <div key={collection._id}>
              <Link
                href={`/products/${params.type}/${params.category}/${params.subcategory}/${collection.slug}`}
              >
                {collection.title} ({collection.slug})
              </Link>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div>
          <h3>Products</h3>
          {products.map((product) => (
            <div key={product._id}>
              <Link
                href={`/products/${params.type}/${params.category}/${params.subcategory}/product/${product.slug}`}
              >
                {product.title} ({product.slug}) - {product.amount} pieces
              </Link>
            </div>
          ))}
        </div>
      )}

      {`Products: ${products.length}`}
    </main>
  );
}
