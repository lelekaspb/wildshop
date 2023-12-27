import {
  getCategoryBySlug,
  getProductBySlug,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import Breadcrumbs from "./Breadcrumbs";
import ProductPage from "@/app/components/product/pages/ProductPage";
import { notFound } from "next/navigation";

export default async function CategoryProduct({
  params,
}: {
  params: {
    type: string;
    category: string;
    product: string;
  };
}) {
  const type = await getTypeBySlug(params.type);
  const category = await getCategoryBySlug(params.category);
  const product = await getProductBySlug(params.product);
  if (!type || !category || !product) notFound();

  return (
    <div className={styles.category_product_page}>
      <section className={styles.bredcrumbs}>
        <Breadcrumbs
          typeSlug={params.type}
          typeTitle={type.title}
          categorySlug={params.category}
          categoryTitle={category.title}
          productSlug={product.slug}
          productTitle={product.title}
        />
      </section>
      <ProductPage product={product} />
    </div>
  );
}
