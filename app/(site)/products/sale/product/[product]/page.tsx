import { getProductBySlug } from "@/sanity/sanity-utils";
import Breadcrumbs from "./Breadcrumbs";
import styles from "./page.module.css";

export default async function SaleProduct({
  params,
}: {
  params: {
    product: string;
  };
}) {
  const product = await getProductBySlug(params.product);

  return (
    <div>
      <section className={styles.bredcrumbs}>
        <Breadcrumbs productSlug={product.slug} productTitle={product.title} />
      </section>
      <h2>Product</h2>
      <p>
        {product.title} - Sale Price: {product.salePrice} dkk - Regular Price:{" "}
        {product.regularPrice} dkk - {product.amount} pieces
      </p>
    </div>
  );
}
