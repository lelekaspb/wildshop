import PrimaryButton from "@/app/components/product/buttons/PrimaryButton";
import ImageCarousel from "@/app/components/product/carousel/ImageCarousel";
import { ButtonAction } from "@/app/components/product/utils/utils";
import { Product } from "@/sanity/types/Product";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/sanity-utils";
import imageUrlBuilder from "@sanity/image-url";
import styles from "./ProductPage.module.css";

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
                  {product.regularPrice} kr
                </span>
                <span className={styles.price_current}>
                  {product.salePrice} kr
                </span>
                <span className={styles.percent}>
                  Spar{" "}
                  {((product.regularPrice - product.salePrice) /
                    product.regularPrice) *
                    100}{" "}
                  %
                </span>
              </>
            )}

            {!product.sale && (
              <span className={styles.price_current}>
                {product.regularPrice} kr
              </span>
            )}
          </div>
          <div className={styles.tax_wrapper}>
            <span className={styles.tax_text}>Moms inkl.</span>
          </div>
        </div>

        <div className={styles.action_section}>
          <PrimaryButton
            text={product_amount > 0 ? "Tiføj til kurven" : "Skriv mig op"}
            onClickAction={
              product_amount > 0
                ? ButtonAction.addtocart
                : ButtonAction.signuserup
            }
          />
        </div>

        <div className={styles.description_section}>
          <PortableText value={product.description} />
        </div>
      </section>
    </section>
  );
}
