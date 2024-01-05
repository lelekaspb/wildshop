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
import Breadcrumbs from "./Breadcrumbs";
import ProductMug from "@/app/components/product/mugs/ProductMug";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { type: string; category: string };
}) {
  const category = await getCategoryBySlug(params.category);
  return {
    title: `Wild Orchid Professional | ${category.title}`,
  };
}

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
  if (!type || !category) notFound();

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
                {subcategories.map((subcategory, index) => (
                  <article
                    key={`${index}-${subcategory._id}`}
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
                {products.map((product, index) => (
                  <ProductMug
                    key={`${index}-${product._id}`}
                    product={product}
                    path={`/products/${params.type}/${params.category}/product`}
                  />
                ))}
              </>
            )}
          </section>

          {subcategories.length == 0 && products.length == 0 && (
            <p>Ingen produkter her</p>
          )}
        </div>
      )}
    </>
  );
}
