import {
  getSubcategoryBySlug,
  getCollectionsForOneSubcategory,
  getProductsByReference,
  client,
  getCategoryBySlug,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import { Product } from "@/sanity/types/Product";
import Link from "next/link";
import NotFound from "@/app/components/shared/NotFound/NotFound";
import styles from "./page.module.css";
import NavigationMug from "@/app//components/product/mugs/NavigationMug";
import imageUrlBuilder from "@sanity/image-url";
import Breadcrumbs from "./Breadcrumbs";

export default async function Subcategory({
  params,
}: {
  params: { type: string; category: string; subcategory: string };
}) {
  const subcategory = await getSubcategoryBySlug(params.subcategory);
  const category = await getCategoryBySlug(params.category);
  const type = await getTypeBySlug(params.type);

  const collections = await getCollectionsForOneSubcategory(subcategory._id);
  let products: Product[] = [];
  if (collections.length == 0) {
    products = await getProductsByReference(subcategory._id);
  }

  const builder = imageUrlBuilder(client);
  const urlFor = (source: string) => {
    return builder.image(source);
  };

  return (
    <>
      {subcategory && (
        <div className={styles.subcategory_page}>
          <section className={styles.bredcrumbs}>
            <Breadcrumbs
              typeSlug={params.type}
              typeTitle={type.title}
              categorySlug={params.category}
              categoryTitle={category.title}
              subcategorySlug={params.subcategory}
              subcategoryTitle={subcategory.title}
            />
          </section>
          <section className={styles.heading}>
            <h1 className={styles.heading_text}>{subcategory.title}</h1>
          </section>
          <section className={styles.list}>
            {collections.length > 0 && (
              <>
                {collections.map((collection) => (
                  <article
                    key={collection._id}
                    className={styles.product_collection}
                  >
                    <Link
                      href={`/products/${params.type}/${params.category}/${params.subcategory}/${collection.slug}`}
                    >
                      <NavigationMug
                        image={
                          collection.image
                            ? urlFor(collection.image)
                                .width(300)
                                .height(300)
                                .url()
                            : null
                        }
                        title={collection.title}
                      />
                    </Link>
                  </article>
                ))}
              </>
            )}

            {collections.length == 0 && products.length > 0 && (
              <div>
                <h3>Products</h3>
                {products.map((product) => (
                  <div key={product._id}>
                    <Link
                      href={`/products/${params.type}/${params.category}/${params.subcategory}/product/${product.slug}`}
                    >
                      {product.title} ({product.slug}) - {product.amount} pieces
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {collections.length == 0 && products.length == 0 && (
              <>
                {`Products: ${products.length} OR no products, no collections`}
              </>
            )}
          </section>
        </div>
      )}

      {!subcategory && <NotFound slug={params.subcategory} />}
    </>
  );
}
