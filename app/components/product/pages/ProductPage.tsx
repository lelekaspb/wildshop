import ImageCarousel from "@/app/components/product/carousel/ImageCarousel";
import { Product } from "@/sanity/types/Product";
import { PortableText } from "@portabletext/react";
import { client, createNotification } from "@/sanity/sanity-utils";
import imageUrlBuilder from "@sanity/image-url";
import styles from "./ProductPage.module.css";
import AddToCartButton from "@/app/components/product/buttons/AddToCartButton";
import SubscribeButton from "@/app/components/product/buttons/SubscribeButton";

export default function ProductPage(props: { product: Product }) {
  const product = props.product;
  const builder = imageUrlBuilder(client);
  const urlFor = (source: string) => {
    return builder.image(source);
  };

  let images: string[] | null = null;
  if (product.images) {
    images = product.images.map((image) =>
      urlFor(image).width(500).height(500).url()
    );
  }

  // TODO: adjust with orders table/collection
  const product_amount = product.amount;
  return (
    <section className={styles.product_page_content}>
      <section className={styles.image_section}>
        <ImageCarousel images={images} product_title={product.title} />
      </section>
      <section className={styles.product_details}>
        <div className={styles.title_section}>
          <h1 className={styles.heading}>{product.title}</h1>
        </div>

        <div className={styles.price_section}>
          <div className={styles.price_wrapper}>
            {product.sale && product.regularPrice > product.salePrice && (
              <>
                <span className={styles.price_crossed}>
                  {product.regularPrice.toFixed(2)} kr
                </span>
                <span className={styles.price_current}>
                  {product.salePrice.toFixed(2)} kr
                </span>
                <span className={styles.percent}>
                  Spar{" "}
                  {Math.round(
                    ((product.regularPrice - product.salePrice) /
                      product.regularPrice) *
                      100
                  )}{" "}
                  %
                </span>
              </>
            )}

            {!product.sale && (
              <span className={styles.price_current}>
                {product.regularPrice.toFixed(2)} kr
              </span>
            )}
          </div>
          <div className={styles.tax_wrapper}>
            <span className={styles.tax_text}>Moms inkl.</span>
          </div>
        </div>

        <div className={styles.action_section}>
          {product_amount > 0 && (
            <AddToCartButton
              product={product}
              imageUrl={images && images.length > 0 ? images[0] : null}
            />
          )}
          {product_amount == 0 && <SubscribeButton product={product} />}
        </div>

        <div className="rich_text">
          <PortableText value={product.description} />
        </div>
      </section>
    </section>
  );
}
