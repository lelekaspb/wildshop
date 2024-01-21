import { getNewProducts, createNotification } from "@/sanity/sanity-utils";
import Breadcrumbs from "./Breadcrumbs";
import styles from "./page.module.css";
import ProductMug from "@/app/components/product/mugs/ProductMug";
import { Metadata } from "next";
import SubscribeModal from "@/app/components/modals/SubscribeModal";
import AddToCartModal from "@/app/components/modals/AddToCartModal";

export const metadata: Metadata = {
  title: "Wild Orchid Professional | Ny Kollektion",
};

export default async function NewCollection() {
  const products = await getNewProducts();

  return (
    <>
      {products.length > 0 && (
        <div>
          <section className={styles.bredcrumbs}>
            <Breadcrumbs />
          </section>
          <section className={styles.heading}>
            <h1 className={styles.heading_text}>Ny Kollektion</h1>
          </section>
          <section className={styles.list}>
            {products.map((product, index) => (
              <ProductMug
                key={`${index}-${product._id}`}
                product={product}
                path="/products/new/product"
              />
            ))}
          </section>
          <AddToCartModal />
          <SubscribeModal gibberer={createNotification} />
        </div>
      )}

      {products.length == 0 && <p>There are currently no new products</p>}
    </>
  );
}
