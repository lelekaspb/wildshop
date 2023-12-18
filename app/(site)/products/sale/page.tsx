import { getSaleProducts } from "@/sanity/sanity-utils";
import Link from "next/link";
import styles from "./Breadcrumbs.module.css";
import Breadcrumbs from "./Breadcrumbs";

export default async function Sale() {
  const products = await getSaleProducts();

  return (
    <main>
      <h2>Sale</h2>

      {products.length > 0 && (
        <section>
          <Breadcrumbs />
          <p>Product on sale are listed here</p>
          <div>
            {products.map((product) => (
              <div key={product._id}>
                <Link href={`/products/sale/product/${product.slug}`}>
                  {product.title} - Sale Price: {product.salePrice} dkk -
                  Regular Price: {product.regularPrice} dkk - {product.amount}{" "}
                  pieces
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {products.length == 0 && <p>There are no products currently on sale</p>}
    </main>
  );
}
