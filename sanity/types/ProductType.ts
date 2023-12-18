import { ProductCategory } from "./ProductCategory";

export type ProductType = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  title: string;
  image: string;
  productCategories: ProductCategory[];
};
