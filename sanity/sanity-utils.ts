import { createClient, groq } from "next-sanity";
import { ProductCategory } from "./types/ProductCategory";
import { ProductType } from "./types/ProductType";
import clientConfig from "./config/client-config";
import { ProductSubcategory } from "./types/ProductSubcategory";
import { ProductCollection } from "./types/ProductCollection";
import { Product } from "./types/Product";
import { CompanyInfo } from "./types/CompanyInfo";

export const client = createClient(clientConfig);

export async function getNewProductsCount(): Promise<number> {
  return client.fetch(groq`count(*[_type == "product" && new == true])`);
}

export async function getNewProducts(): Promise<Product[]> {
  return client.fetch(
    groq`*[_type == "product" && new == true]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      title,
      description,
      "images": images[],
      regularPrice,
      sale,
      salePrice,
      new,
      amount,
      productType->{"slug": slug.current, title, _id},
      productCategory->{"slug": slug.current, title, _id},
      productSubcategory->{"slug": slug.current, title, _id},
      productCollection->{"slug": slug.current, title, _id},
    }`
  );
}

export async function getSaleProductsCount(): Promise<number> {
  return client.fetch(groq`count(*[_type == "product" && sale == true])`);
}

export async function getSaleProducts(): Promise<Product[]> {
  return client.fetch(
    groq`*[_type == "product" && sale == true]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      title,
      description,
      "images": images[],
      regularPrice,
      sale,
      salePrice,
      new,
      amount,
      productType->{"slug": slug.current, title, _id},
      productCategory->{"slug": slug.current, title, _id},
      productSubcategory->{"slug": slug.current, title, _id},
      productCollection->{"slug": slug.current, title, _id},
    }`
  );
}

export async function getProductBySlug(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == "${slug}"][0] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      title,
      description,
      "images": images[],
      regularPrice,
      sale,
      salePrice,
      new,
      amount,
      productType->{"slug": slug.current, title, _id},
      productCategory->{"slug": slug.current, title, _id},
      productSubcategory->{"slug": slug.current, title, _id},
      productCollection->{"slug": slug.current, title, _id},
    }`
  );
}

export async function getProductsByReference(
  subcategoryId: string
): Promise<Product[]> {
  return client.fetch(
    groq`*[_type == "product" && references("${subcategoryId}")]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      title,
      description,
      "images": images[],
      regularPrice,
      sale,
      salePrice,
      new,
      amount,
      productType->{"slug": slug.current, title, _id},
      productCategory->{"slug": slug.current, title, _id},
      productSubcategory->{"slug": slug.current, title, _id},
      productCollection->{"slug": slug.current, title, _id},
    }`
  );
}

export async function getProducts(): Promise<Product[]> {
  return client.fetch(
    groq`*[_type == "product"]{
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          title,
          description,
          "images": images[],
          regularPrice,
          sale,
          salePrice,
          new,
          amount,
          productType->{"slug": slug.current, title, _id},
          productCategory->{"slug": slug.current, title, _id},
          productSubcategory->{"slug": slug.current, title, _id},
          productCollection->{"slug": slug.current, title, _id},
        }`
  );
}

export async function getCollectionBySlug(
  slug: string
): Promise<ProductSubcategory> {
  return client.fetch(
    groq`*[_type == "productCollection" && slug.current == "${slug}"][0]`
  );
}

export async function getCollectionsForOneSubcategory(
  subcategoryId: string
): Promise<ProductCollection[]> {
  return client.fetch(
    groq`*[_type == "productCollection" && references("${subcategoryId}")]{
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    title,
    productSubcategory->
  }`
  );
}

export async function getCollections(): Promise<ProductCollection[]> {
  return client.fetch(
    groq`*[_type == "productCollection"]{
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          title,
          productSubcategory->
        }`
  );
}

export async function getSubcategoryBySlug(
  slug: string
): Promise<ProductSubcategory> {
  console.log(slug);
  return client.fetch(
    groq`*[_type == "productSubcategory" && slug.current == "${slug}"][0]`
  );
}

export async function getSubcategoriesForOneCategory(
  categoryId: string
): Promise<ProductSubcategory[]> {
  return client.fetch(
    groq`*[_type == "productSubcategory" && references("${categoryId}")]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        title,
        productCategory->
      }`
  );
}

export async function getSubcategories(): Promise<ProductSubcategory[]> {
  return client.fetch(
    groq`*[_type == "productSubcategory"]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        title,
        productCategory->
      }`
  );
}

export async function getCategoryBySlug(
  slug: string
): Promise<ProductCategory> {
  return client.fetch(
    groq`*[_type == "productCategory" && slug.current == "${slug}"][0]`
  );
}

export async function getCategoriesForOneType(
  typeId: string
): Promise<ProductCategory[]> {
  return client.fetch(
    groq`*[_type == "productCategory" && references("${typeId}")]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      title,
      productType->{"slug": slug.current, title, _id}
    }`
  );
}

export async function getTypeBySlug(slug: string): Promise<ProductType> {
  console.log(slug);
  return client.fetch(
    groq`*[_type == "productType" && slug.current == "${slug}"][0]`
  );
}

export async function getTypes(): Promise<ProductType[]> {
  return client.fetch(
    groq`*[_type == "productType"]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        title
      }`
  );
}

export async function getCompanyGeneralInformation(): Promise<CompanyInfo> {
  return client.fetch(groq`*[_type == "companyInfo"][0]`);
}
