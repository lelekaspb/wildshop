import {
  getCategoryBySlug,
  getCollectionBySlug,
  getProductBySlug,
  getSubcategoryBySlug,
  getTypeBySlug,
  createNotification,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import ProductPage from "@/app/components/product/pages/ProductPage";
import Breadcrumbs from "./Breadcrumbs";
import { notFound } from "next/navigation";
import SubscribeModal from "@/app/components/modals/SubscribeModal";
import AddToCartModal from "@/app/components/modals/AddToCartModal";

export async function generateMetadata({
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
  if (product) {
    return {
      title: `${process.env.SHOP_NAME} | ${product.title}`,
    };
  } else {
    return {
      title: `${process.env.SHOP_NAME}`,
    };
  }
}

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
  if (
    !type ||
    !category ||
    !subcategory ||
    (!collection && params.collection != "all") ||
    !product
  )
    notFound();

  return (
    <div className={styles.collection_product_page}>
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
          productSlug={product.slug}
          productTitle={product.title}
        />
      </section>
      <ProductPage product={product} />
      <AddToCartModal />
      <SubscribeModal gibberer={createNotification} />
    </div>
  );
}
