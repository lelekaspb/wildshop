import productCategory from "./product-category-schema";
import productCollection from "./product-collection-schema";
import product from "./product-schema";
import productSubcategory from "./product-subcategory-schema";
import productType from "./product-type-schema";
import companyInfo from "./company-info-schema";
import notification from "./notification-schema";

const schemas = [
  productType,
  productCategory,
  productSubcategory,
  productCollection,
  product,
  companyInfo,
  notification,
];

export default schemas;
