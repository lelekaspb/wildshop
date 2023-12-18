import { ProductCategory } from "@/sanity/types/ProductCategory";
import {
  getTypes,
  getCategoriesForOneType,
  getTypeBySlug,
} from "@/sanity/sanity-utils";
import NotFound from "@/app/components/shared/NotFound/NotFound";
import Link from "next/link";

export async function generateStaticParams() {
  const productTypes = await getTypes();

  return productTypes.map((type) => ({
    type: type.slug,
  }));
}

export default async function Type({ params }: { params: { type: string } }) {
  const type = await getTypeBySlug(params.type);
  console.log(type);
  let categories: ProductCategory[] = [];
  if (type) {
    categories = await getCategoriesForOneType(type._id);
  }

  return (
    <main>
      {type && (
        <section>
          <h2>Product Type - {type.title}</h2>
          <p>Product categories for {params.type} are listed here</p>
          <div>
            {categories.map((category) => (
              <div key={category._id}>
                <Link href={`/products/${params.type}/${category.slug}`}>
                  {category.title} ({category.name}) belongs to type{" "}
                  {category.productType.title}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {!type && <NotFound slug={params.type} />}
    </main>
  );
}
