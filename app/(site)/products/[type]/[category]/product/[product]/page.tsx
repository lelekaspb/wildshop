import {
  getCategoryBySlug,
  getProductBySlug,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import NotFound from "@/app/components/shared/NotFound/NotFound";
import Breadcrumbs from "./Breadcrumbs";

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

  return (
    <div>
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
      <h2>Product</h2>
      <p>
        {product.title} of category {params.category} - {product.amount} pieces
      </p>
    </div>
  );
}
