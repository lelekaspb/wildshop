import {
  getCategoryBySlug,
  getProductBySlug,
  getSubcategoryBySlug,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import Breadcrumbs from "./Breadcrumbs";
import ProductPage from "@/app/components/product/pages/ProductPage";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: {
    type: string;
    category: string;
    subcategory: string;
    product: string;
  };
}) {
  const product = await getProductBySlug(params.product);
  if (product) {
    return {
      title: `Wild Orchid Professional | ${product.title}`,
    };
  } else {
    return {
      title: `Wild Orchid Professional`,
    };
  }
}

export default async function SubcategoryProduct({
  params,
}: {
  params: {
    type: string;
    category: string;
    subcategory: string;
    product: string;
  };
}) {
  const subcategory = await getSubcategoryBySlug(params.subcategory);
  const category = await getCategoryBySlug(params.category);
  const type = await getTypeBySlug(params.type);
  const product = await getProductBySlug(params.product);
  if (!type || !category || !subcategory || !product) notFound();

  return (
    <div className={styles.subcategory_product_page}>
      <section className={styles.bredcrumbs}>
        <Breadcrumbs
          typeSlug={params.type}
          typeTitle={type.title}
          categorySlug={params.category}
          categoryTitle={category.title}
          subcategorySlug={params.subcategory}
          subcategoryTitle={subcategory.title}
          productSlug={product.slug}
          productTitle={product.title}
        />
      </section>
      <ProductPage product={product} />
    </div>
  );
}
