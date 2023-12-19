import { getTypes, client } from "@/sanity/sanity-utils";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import styles from "./page.module.css";
import NavigationMug from "./../components/product/mugs/NavigationMug";

export default async function Home() {
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
          <Link href={`/products/sale`}>
            <NavigationMug image={null} title="Tilbud" />
          </Link>
        </article>
        <article className={styles.product_type}>
          <Link href={`/products/new`}>
            <NavigationMug image={null} title="Ny kollektion" />
          </Link>
        </article>
      </section>

      {/* <div>
        <h2>Product Subcategories</h2>
        {productSubcategories.map((subcategory) => (
          <div key={subcategory._id}>
            {subcategory.title} ({subcategory.name}) belongs to category{" "}
            {subcategory.productCategory.title} (
            {subcategory.productCategory.name})
          </div>
        ))}
      </div>

      <div>
        <h2>Product Collections</h2>
        {productCollections.map((collection) => (
          <div key={collection._id}>
            {collection.title} ({collection.name}) belongs to subcategory{" "}
            {collection.productSubcategory.title} (
            {collection.productSubcategory.name})
          </div>
        ))}
      </div>

      <div>
        <h2>Products</h2>
        {products.map((product) => (
          <div key={product._id} style={{ marginBottom: "10px" }}>
            {product.images
              ? product.images.map((image) => (
                  <img srcSet={urlFor(image).width(200).height(200).url()} />
                ))
              : "ni "}
            {product.title} ({product.slug}) belongs to{" "}
            {product.productCollection
              ? `${product.productCollection.title} -> `
              : ""}
            {product.productSubcategory
              ? `${product.productSubcategory.title} -> `
              : ""}
            {product.productCategory.title} {" -> "}
            {product.productType.title}.
          </div>
        ))}
      </div> */}
    </div>
  );
}
