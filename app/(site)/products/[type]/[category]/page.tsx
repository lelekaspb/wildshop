import {
  client,
  getSubcategoriesForOneCategory,
  getCategoryBySlug,
  getProductsByReference,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import Link from "next/link";
import { Product } from "@/sanity/types/Product";
import { ProductSubcategory } from "@/sanity/types/ProductSubcategory";
import NavigationMug from "./../../../../components/product/mugs/NavigationMug";
import imageUrlBuilder from "@sanity/image-url";
import styles from "./page.module.css";
import NotFound from "@/app/components/shared/NotFound/NotFound";
import Breadcrumbs from "./Breadcrumbs";

// export async function generateStaticParams() {
//   const productCategories = await getCategoriesForOneType("nails");

//   return productCategories.map((category) => ({
//     category: category.slug,
//   }));
// }

export default async function Category({
  params,
}: {
  params: { type: string; category: string };
}) {
  const type = await getTypeBySlug(params.type);
  const category = await getCategoryBySlug(params.category);
  let subcategories: ProductSubcategory[] = [];
  let products: Product[] = [];
  if (category) {
    subcategories = await getSubcategoriesForOneCategory(category._id);
    if (subcategories.length == 0) {
      products = await getProductsByReference(category._id);
    }
  }

  const builder = imageUrlBuilder(client);
  const urlFor = (source: string) => {
    return builder.image(source);
  };

  return (
    <>
      {category && (
        <div className={styles.category_page}>
          <section className={styles.bredcrumbs}>
            <Breadcrumbs
              typeSlug={params.type}
              typeTitle={type.title}
              categorySlug={params.category}
              categoryTitle={category.title}
            />
          </section>
          <section className={styles.heading}>
            <h1 className={styles.heading_text}>{category.title}</h1>
          </section>
          <section className={styles.list}>
            {subcategories.length > 0 && (
              <>
                {subcategories.map((subcategory) => (
                  <article
                    key={subcategory._id}
                    className={styles.product_subcategory}
                  >
                    <Link
                      href={`/products/${params.type}/${params.category}/${subcategory.slug}`}
                    >
                      <NavigationMug
                        image={
                          subcategory.image
                            ? urlFor(subcategory.image)
                                .width(300)
                                .height(300)
                                .url()
                            : null
                        }
                        title={subcategory.title}
                      />
                    </Link>
                  </article>
                ))}
              </>
            )}

            {subcategories.length == 0 && products.length > 0 && (
              <>
                {products.map((product) => (
                  <div key={product._id}>
                    <Link
                      href={`/products/${params.type}/${params.category}/product/${product.slug}`}
                    >
                      {product.title} ({product.slug}) - {product.amount} pieces
                    </Link>
                  </div>
                ))}
              </>
            )}

            {subcategories.length == 0 && products.length == 0 && (
              <>
                {`Products: ${products.length} OR no products, no subcategories`}
              </>
            )}
          </section>
        </div>
      )}

      {!category && <NotFound slug={params.category} />}
    </>
  );
}
