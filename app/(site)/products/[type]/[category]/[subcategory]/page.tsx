import {
  getSubcategoryBySlug,
  getCollectionsForOneSubcategory,
  getProductsByReference,
  client,
  getCategoryBySlug,
  getTypeBySlug,
  createNotification,
} from "@/sanity/sanity-utils";
import { Product } from "@/sanity/types/Product";
import Link from "next/link";
import styles from "./page.module.css";
import NavigationMug from "@/app//components/product/mugs/NavigationMug";
import imageUrlBuilder from "@sanity/image-url";
import Breadcrumbs from "./Breadcrumbs";
import ProductMug from "@/app/components/product/mugs/ProductMug";
import { notFound } from "next/navigation";
import SubscribeModal from "@/app/components/modals/SubscribeModal";

export async function generateMetadata({
  params,
}: {
  params: { type: string; category: string; subcategory: string };
}) {
  const subcategory = await getSubcategoryBySlug(params.subcategory);
  if (subcategory) {
    return {
      title: `Wild Orchid Professional | ${subcategory.title}`,
    };
  } else {
    return {
      title: `Wild Orchid Professional}`,
    };
  }
}

export default async function Subcategory({
  params,
}: {
  params: { type: string; category: string; subcategory: string };
}) {
  const subcategory = await getSubcategoryBySlug(params.subcategory);
  const category = await getCategoryBySlug(params.category);
  const type = await getTypeBySlug(params.type);
  if (!type || !category || !subcategory) notFound();

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
                {collections.map((collection, index) => (
                  <article
                    key={`${index}-${collection._id}`}
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
              <>
                {products.map((product, index) => (
                  <ProductMug
                    key={`${index}-${product._id}`}
                    product={product}
                    path={`/products/${params.type}/${params.category}/${params.subcategory}/product`}
                  />
                ))}
              </>
            )}
          </section>

          {collections.length == 0 && products.length > 0 && (
            <SubscribeModal gibberer={createNotification} />
          )}

          {collections.length == 0 && products.length == 0 && (
            <p>Ingen produkter her</p>
          )}
        </div>
      )}
    </>
  );
}
