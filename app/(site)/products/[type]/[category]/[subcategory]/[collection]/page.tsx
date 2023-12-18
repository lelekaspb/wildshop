import {
  getCollectionBySlug,
  getProductsByReference,
  getSubcategoryBySlug,
  getCategoryBySlug,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";

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
  const subcategory = await getSubcategoryBySlug(params.subcategory);
  const category = await getCategoryBySlug(params.category);
  const type = await getTypeBySlug(params.type);

  const products = await getProductsByReference(collection._id);

  return (
    <div>
      <section className={styles.bredcrumbs}>
        <Breadcrumbs
          typeSlug={params.type}
          typeTitle={type.title}
          categorySlug={params.category}
          categoryTitle={category.title}
          subcategorySlug={params.subcategory}
          subcategoryTitle={subcategory.title}
          collectionSlug={params.collection}
          collectionTitle={collection.title}
        />
      </section>
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
    </div>
  );
}
