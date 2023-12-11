import {
  getCategoriesForOneType,
  getCollections,
  getProducts,
  getSubcategories,
  getTypes,
} from "@/sanity/sanity-utils";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

export default async function Home() {
  const productTypes = await getTypes();

  // const productCategories = await getCategoriesForOneType();

  // const productSubcategories = await getSubcategories();

  // const productCollections = await getCollections();

  // const products = await getProducts();
  // console.log(products);

  // const builder = imageUrlBuilder(client);
  // const urlFor = (source: string) => {
  //   return builder.image(source);
  // };

  return (
    <main>
      <div>
        <h2>Product Types</h2>
        {productTypes.map((type) => (
          <div key={type._id}>
            <Link href={`/products/${type.slug}`}>
              {type.title} ({type.slug})
            </Link>
          </div>
        ))}
        <div>
          <Link href={`/products/sale`}>Tilbud</Link>
        </div>
        <div>
          <Link href={`/products/new`}>Ny kollektion</Link>
        </div>
      </div>

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
    </main>
  );
}
