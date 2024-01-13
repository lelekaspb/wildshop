import productCategory from "./product-category-schema";
import productCollection from "./product-collection-schema";
import product from "./product-schema";
import productSubcategory from "./product-subcategory-schema";
import productType from "./product-type-schema";
import companyInfo from "./company-info-schema";
import notification from "./notification-schema";
import deliveryMethod from "./delivery-method-schema";
import paymentMethod from "./payment-method-schema";
import orderStatus from "./order-status-schema";
import invoiceInfo from "./invoice-info-schema";
import order from "./order-schema";
import orderProduct from "./order-product-schema";

const schemas = [
  productType,
  productCategory,
  productSubcategory,
  productCollection,
  product,
  companyInfo,
  notification,
  deliveryMethod,
  paymentMethod,
  orderStatus,
  invoiceInfo,
  order,
  orderProduct,
];

export default schemas;
