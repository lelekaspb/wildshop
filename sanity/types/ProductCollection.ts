import { ProductSubcategory } from "./ProductSubcategory";

export type ProductCollection = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  title: string;
  image: string;
  productSubcategory: ProductSubcategory;
};
