import {
  getCollectionBySlug,
  getProductsByReference,
  getSubcategoryBySlug,
  getCategoryBySlug,
  getTypeBySlug,
  createNotification,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import Breadcrumbs from "./Breadcrumbs";
import ProductMug from "@/app/components/product/mugs/ProductMug";
import { notFound } from "next/navigation";
import SubscribeModal from "@/app/components/modals/SubscribeModal";
import AddToCartModal from "@/app/components/modals/AddToCartModal";
import { Product } from "@/sanity/types/Product";

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
  if (params.collection == "all") {
    const subcategory = await getSubcategoryBySlug(params.subcategory);
    return {
      title: `${process.env.SHOP_NAME} | ${subcategory.title} - Alle`,
    };
  }
  const collection = await getCollectionBySlug(params.collection);
  if (collection) {
    return {
      title: `${process.env.SHOP_NAME} | ${collection.title}`,
    };
  } else {
    return {
      title: `${process.env.SHOP_NAME}`,
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
  if (
    !type ||
    !category ||
    !subcategory ||
    (!collection && params.collection != "all")
  )
    notFound();

  let products: Product[] = [];
  if (params.collection == "all") {
    products = await getProductsByReference(subcategory._id);
  } else {
    products = await getProductsByReference(collection._id);
  }

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
          collectionTitle={collection ? collection.title : "Alle"}
        />
      </section>
      <section className={styles.heading}>
        <h1 className={styles.heading_text}>
          {collection ? collection.title : `${subcategory.title} Produkter`}
        </h1>
      </section>

      {products.length > 0 && (
        <>
          {" "}
          <section className={styles.list}>
            {products.map((product, index) => (
              <ProductMug
                key={`${index}-${product._id}`}
                product={product}
                path={`/products/${params.type}/${params.category}/${params.subcategory}/${params.collection}`}
              />
            ))}
          </section>
          <AddToCartModal />
          <SubscribeModal gibberer={createNotification} />
        </>
      )}

      {products.length == 0 && <p>Ingen produkter her</p>}
    </div>
  );
}
