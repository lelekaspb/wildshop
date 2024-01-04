import { getTypes, client } from "@/sanity/sanity-utils";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import styles from "./page.module.css";
import NavigationMug from "./../components/product/mugs/NavigationMug";
// import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  // console.log(params.slug);
  // const slugs = ["cart", "contact", "products"];
  // if (!slugs.includes(params.slug)) notFound();

  const productTypes = await getTypes();
  const builder = imageUrlBuilder(client);
  const urlFor = (source: string) => {
    return builder.image(source);
  };

  return (
    <div className={styles.home_page}>
      <section className={styles.heading}>
        <h1 className={styles.heading_text}>Produkter</h1>
      </section>
      <section className={styles.list}>
        {productTypes.map((type, index) => (
          <article key={`${index}-${type._id}`} className={styles.product_type}>
            <Link href={`/products/${type.slug}`}>
              <NavigationMug
                image={
                  type.image
                    ? urlFor(type.image).width(300).height(300).url()
                    : null
                }
                title={type.title}
              />
            </Link>
          </article>
        ))}
        <article className={styles.product_type}>
          <Link href={`/products/new`}>
            <NavigationMug image={null} title="Ny kollektion" />
          </Link>
        </article>
        <article className={styles.product_type}>
          <Link href={`/products/sale`}>
            <NavigationMug image={null} title="Tilbud" />
          </Link>
        </article>
      </section>
    </div>
  );
}
