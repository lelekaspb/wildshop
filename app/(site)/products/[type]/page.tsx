import { ProductCategory } from "@/sanity/types/ProductCategory";
import {
  getTypes,
  getCategoriesForOneType,
  getTypeBySlug,
  client,
} from "@/sanity/sanity-utils";
import NotFound from "@/app/components/shared/NotFound/NotFound";
import Link from "next/link";
import styles from "./page.module.css";
import NavigationMug from "./../../../components/product/mugs/NavigationMug";
import imageUrlBuilder from "@sanity/image-url";
import Breadcrumbs from "./Breadcrumbs";

export async function generateStaticParams() {
  const productTypes = await getTypes();

  return productTypes.map((type) => ({
    type: type.slug,
  }));
}

export default async function Type({ params }: { params: { type: string } }) {
  const type = await getTypeBySlug(params.type);

  let categories: ProductCategory[] = [];
  if (type) {
    categories = await getCategoriesForOneType(type._id);
  }

  const builder = imageUrlBuilder(client);
  const urlFor = (source: string) => {
    return builder.image(source);
  };

  return (
    <>
      {type && (
        <div className={styles.type_page}>
          <section className={styles.breadcrumbs}>
            <Breadcrumbs typeSlug={params.type} typeTitle={type.title} />
          </section>
          <section className={styles.heading}>
            <h1 className={styles.heading_text}>{type.title}</h1>
          </section>
          <section className={styles.list}>
            {categories.map((category) => (
              <article key={category._id} className={styles.product_category}>
                <Link href={`/products/${params.type}/${category.slug}`}>
                  <NavigationMug
                    image={
                      category.image
                        ? urlFor(category.image).width(300).height(300).url()
                        : null
                    }
                    title={category.title}
                  />
                </Link>
              </article>
            ))}
          </section>
        </div>
      )}

      {!type && <NotFound slug={params.type} />}
    </>
  );
}
