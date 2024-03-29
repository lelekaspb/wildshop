import { getProductBySlug, createNotification } from "@/sanity/sanity-utils";
import Breadcrumbs from "./Breadcrumbs";
import styles from "./page.module.css";
import ProductPage from "@/app/components/product/pages/ProductPage";
import { notFound } from "next/navigation";
import SubscribeModal from "@/app/components/modals/SubscribeModal";
import AddToCartModal from "@/app/components/modals/AddToCartModal";

export async function generateMetadata({
  params,
}: {
  params: { product: string };
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

export default async function SaleProduct({
  params,
}: {
  params: {
    product: string;
  };
}) {
  const product = await getProductBySlug(params.product);
  if (!product) notFound();

  return (
    <div className={styles.sale_product_page}>
      <section className={styles.bredcrumbs}>
        <Breadcrumbs productSlug={product.slug} productTitle={product.title} />
      </section>
      <ProductPage product={product} />
      <AddToCartModal />
      <SubscribeModal gibberer={createNotification} />
    </div>
  );
}
