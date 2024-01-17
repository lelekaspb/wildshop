import {
  getCollectionBySlug,
  getProductsByReference,
  getSubcategoryBySlug,
  getCategoryBySlug,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import Breadcrumbs from "./Breadcrumbs";
import ProductMug from "@/app/components/product/mugs/ProductMug";
import { notFound } from "next/navigation";

export async function generateMetadata({
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
  if (collection) {
    return {
      title: `Wild Orchid Professional | ${collection.title}`,
    };
  } else {
    return {
      title: `Wild Orchid Professional`,
    };
  }
}

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
  if (!type || !category || !subcategory || !collection) notFound();

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
      <section className={styles.heading}>
        <h1 className={styles.heading_text}>{collection.title}</h1>
      </section>

      {products.length > 0 && (
        <section className={styles.list}>
          {products.map((product, index) => (
            <ProductMug
              key={`${index}-${product._id}`}
              product={product}
              path={`/products/${params.type}/${params.category}/${params.subcategory}/${params.collection}`}
            />
          ))}
        </section>
      )}

      {products.length == 0 && <p>Ingen produkter her</p>}
    </div>
  );
}
