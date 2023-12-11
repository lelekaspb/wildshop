import { PortableTextBlock } from "sanity";
import { ProductType } from "./ProductType";
import { ProductCategory } from "./ProductCategory";
import { ProductSubcategory } from "./ProductSubcategory";
import { ProductCollection } from "./ProductCollection";

export type Product = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  title: string;
  images: [any];
  regularPrice: number;
  sale: boolean;
  salePrice: number;
  new: boolean;
  amount: number;
  description: [PortableTextBlock];
  productType: ProductType;
  productCategory: ProductCategory;
  productSubcategory: ProductSubcategory;
  productCollection: ProductCollection;
};
