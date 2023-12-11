import {
  getCategoriesForOneType,
  getSubcategoriesForOneCategory,
  getCategoryBySlug,
  getProductsByReference,
} from "@/sanity/sanity-utils";
import Link from "next/link";
import { Product } from "@/sanity/types/Product";
import { ProductCategory } from "@/sanity/types/ProductCategory";
import { ProductSubcategory } from "@/sanity/types/ProductSubcategory";

// export async function generateStaticParams() {
//   const productCategories = await getCategoriesForOneType("nails");

//   return productCategories.map((category) => ({
//     category: category.slug,
//   }));
// }

export default async function Category({
  params,
}: {
  params: { type: string; category: string };
}) {
  const category = await getCategoryBySlug(params.category);
  let subcategories: ProductSubcategory[] = [];
  let products: Product[] = [];
  if (category) {
    subcategories = await getSubcategoriesForOneCategory(category._id);
    if (subcategories.length == 0) {
      products = await getProductsByReference(category._id);
    }
  }

  return (
    <main>
      {category && <span>show category page</span>}

      <h2>
        Category {params.category} for Type {params.type}
      </h2>
      {subcategories.length > 0 && (
        <div>
          <h3>Subcategories</h3>
          {subcategories.map((subcategory) => (
            <div key={subcategory._id}>
              <Link
                href={`/products/${params.type}/${params.category}/${subcategory.slug}`}
              >
                {subcategory.title} ({subcategory.slug}) belongs to category{" "}
                {subcategory.productCategory.title}
              </Link>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div>
          <h3>Products</h3>
          {products.map((product) => (
            <div key={product._id}>
              <Link
                href={`/products/${params.type}/${params.category}/product/${product.slug}`}
              >
                {product.title} ({product.slug}) - {product.amount} pieces
              </Link>
            </div>
          ))}
        </div>
      )}

      {`Products: ${products.length}`}

      {!category && <span>show not found page</span>}
    </main>
  );
}
