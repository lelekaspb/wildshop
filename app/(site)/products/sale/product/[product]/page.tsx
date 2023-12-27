import { getProductBySlug } from "@/sanity/sanity-utils";
import Breadcrumbs from "./Breadcrumbs";
import styles from "./page.module.css";
import ProductPage from "@/app/components/product/pages/ProductPage";
import { notFound } from "next/navigation";

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
    </div>
  );
}
