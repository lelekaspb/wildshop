import {
  getCategoryBySlug,
  getCollectionBySlug,
  getProductBySlug,
  getSubcategoryBySlug,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";

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
  const collection = await getCollectionBySlug(params.collection);
  const subcategory = await getSubcategoryBySlug(params.subcategory);
  const category = await getCategoryBySlug(params.category);
  const type = await getTypeBySlug(params.type);

  const product = await getProductBySlug(params.product);

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
          productSlug={product.slug}
          productTitle={product.title}
        />
      </section>
      <h2>Product</h2>
      <p>
        {product.title} of collection {params.collection} - {product.amount}{" "}
        pieces
      </p>
    </div>
  );
}
