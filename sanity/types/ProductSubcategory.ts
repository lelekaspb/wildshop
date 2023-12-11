import { ProductCategory } from "./ProductCategory";

export type ProductSubcategory = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  title: string;
  productCategory: ProductCategory;
};
