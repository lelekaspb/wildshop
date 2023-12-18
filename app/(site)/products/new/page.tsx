import { getNewProducts } from "@/sanity/sanity-utils";
import Link from "next/link";

export default async function NewCollection() {
  const products = await getNewProducts();

  return (
    <main>
      <h2>New</h2>

      {products.length > 0 && (
        <section>
          <p>New products are listed here</p>
          <div>
            {products.map((product) => (
              <div key={product._id}>
                <Link href={`/products/new/product/${product.slug}`}>
                  {product.title} - {product.amount} pieces
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {products.length == 0 && <p>There are currently no new products</p>}
    </main>
  );
}
