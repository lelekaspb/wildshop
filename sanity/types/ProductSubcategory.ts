import { ProductCategory } from "./ProductCategory";
import { ProductCollection } from "./ProductCollection";

export type ProductSubcategory = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  title: string;
  productCategory: ProductCategory;
  productCollections: ProductCollection[] | null;
};
