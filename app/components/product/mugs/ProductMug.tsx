import { Product } from "@/sanity/types/Product";
import { client, createNotification } from "@/sanity/sanity-utils";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductMug.module.css";
import SubscribeButton from "../buttons/SubscribeButton";
import placeholder from "@/public/placeholder/photo-on-the-way.svg";
import AddToCartButton from "../buttons/AddToCartButton";

export default function ProductMug(props: { product: Product; path: string }) {
  const builder = imageUrlBuilder(client);
  const urlFor = (source: string) => {
    return builder.image(source);
  };
  const product = props.product;
  const path = props.path;
  let image: string | null = null;
  if (product.images && product.images.length > 0) {
    image = urlFor(product.images[0]).width(300).height(300).url();
  }

  // TODO: adjust with orders table/collection
  const product_amount = product.amount;

  return (
    <article
      className={`${styles.product_mug} ${
        product.sale
          ? styles.sale_product
          : product.new
          ? styles.new_product
          : ""
      } ${product_amount == 0 ? styles.coming_soon_product : ""}`}
    >
      <div className={styles.image_wrapper}>
        <Link href={`${path}/${product.slug}`}>
          <Image
            alt={product.title}
            src={image ? image : placeholder}
            width={300}
            height={300}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Link>
      </div>
      <div className={styles.product_title_wrapper}>
        <p className={styles.product_title}>{product.title}</p>
      </div>
      <div className={styles.product_price_wrapper}>
        {product.sale && (
          <>
            <p className={styles.sale_product_price}>
              <span className={styles.product_price_crossed}>
                {product.regularPrice} kr
              </span>
              <span className={styles.product_price}>
                {product.salePrice} kr
              </span>
            </p>
            <p className={styles.percents}>
              {" "}
              Spar{" "}
              {Math.round(
                ((product.regularPrice - product.salePrice) /
                  product.regularPrice) *
                  100
              )}
              %
            </p>
          </>
        )}
        {!product.sale && (
          <p className={styles.product_price}>{product.regularPrice} kr</p>
        )}
      </div>
      <div className={styles.product_cta_wrapper}>
        {product_amount > 0 && <AddToCartButton product={product} />}
        {product_amount == 0 && (
          <SubscribeButton product={product} gibberer={createNotification} />
        )}
      </div>
    </article>
  );
}
