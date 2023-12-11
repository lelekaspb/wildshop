import { ProductType } from "./ProductType";

export type ProductCategory = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  title: string;
  productType: ProductType;
};
