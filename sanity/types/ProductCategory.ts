import { ProductSubcategory } from "./ProductSubcategory";
import { ProductType } from "./ProductType";

export type ProductCategory = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  title: string;
  image: string;
  productType: ProductType;
  productSubcategories: ProductSubcategory[] | null;
};
