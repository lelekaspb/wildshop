import "server-only";

import { QueryParams, Transaction, Patch } from "@sanity/client";
import { SanityDocumentStub, createClient, groq } from "next-sanity";
import { ProductCategory } from "./types/ProductCategory";
import { ProductType } from "./types/ProductType";
import clientConfig from "./config/client-config";
import { ProductSubcategory } from "./types/ProductSubcategory";
import { ProductCollection } from "./types/ProductCollection";
import { Product } from "./types/Product";
import { CompanyInfo } from "./types/CompanyInfo";
import { CreateNotification } from "./types/CreateNotification";
import { DeliveryMethod } from "./types/DeliveryMethod";
import { PaymentMethod } from "./types/PaymentMethod";
import { CreateInvoiceInfo } from "./types/CreateInvoiceInfo";
import { CreateOrder } from "./types/CreateOrder";
import { OrderStatus } from "./types/OrderStatus";
import { CartItem } from "@/app/client-utils/utils";

export const client = createClient(clientConfig);

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    cache: "force-cache",
    next: {
      //revalidate: 30, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return client.fetch(groq`*[_type == "paymentMethod" && !(_id in path('drafts.**'))]{
  _id,
  "slug": slug.current,
  title
}`);
}

export async function getDeliveryMethods(): Promise<DeliveryMethod[]> {
  return client.fetch(groq`*[_type == "deliveryMethod" && !(_id in path('drafts.**'))]{
    _id,
    "slug": slug.current,
    title,
    price
  }`);
}

export async function getNewProductsCount(): Promise<number> {
  return client.fetch(
    groq`count(*[_type == "product" && new == true && !(_id in path('drafts.**'))])`
  );
}

export async function getNewProducts(): Promise<Product[]> {
  return client.fetch(
    groq`*[_type == "product" && new == true && !(_id in path('drafts.**'))]{
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
  return client.fetch(
    groq`count(*[_type == "product" && sale == true && !(_id in path('drafts.**'))])`
  );
}

export async function getSaleProducts(): Promise<Product[]> {
  return client.fetch(
    groq`*[_type == "product" && sale == true && !(_id in path('drafts.**'))]{
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
  return sanityFetch({
    query: `*[_type == "product" && slug.current == "${slug}" && !(_id in path('drafts.**'))][0] {
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
    }`,
    tags: ["product"],
  });
}

export async function getProductsByReference(
  referenceId: string
): Promise<Product[]> {
  // revalidate if there are changes to either the product document
  return await sanityFetch({
    query: `*[_type == "product" && references("${referenceId}") && !(_id in path('drafts.**'))]{
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
      }`,
    tags: ["product"],
  });
}

export async function getProducts(): Promise<Product[]> {
  return client.fetch(
    groq`*[_type == "product" && !(_id in path('drafts.**'))]{
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
    groq`*[_type == "productCollection" && slug.current == "${slug}" && !(_id in path('drafts.**'))][0]`
  );
}

export async function getCollectionsForOneSubcategory(
  subcategoryId: string
): Promise<ProductCollection[]> {
  return client.fetch(
    groq`*[_type == "productCollection" && references("${subcategoryId}") && !(_id in path('drafts.**'))]{
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
    groq`*[_type == "productCollection" && !(_id in path('drafts.**'))]{
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
  return client.fetch(
    groq`*[_type == "productSubcategory" && slug.current == "${slug}" && !(_id in path('drafts.**'))][0]`
  );
}

export async function getSubcategoriesForOneCategory(
  categoryId: string
): Promise<ProductSubcategory[]> {
  return client.fetch(
    groq`*[_type == "productSubcategory" && references("${categoryId}") && !(_id in path('drafts.**'))]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        title,
        productCategory->,
        image
      }`
  );
}

export async function getSubcategories(): Promise<ProductSubcategory[]> {
  return client.fetch(
    groq`*[_type == "productSubcategory" && !(_id in path('drafts.**'))]{
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
    groq`*[_type == "productCategory" && slug.current == "${slug}" && !(_id in path('drafts.**'))][0]`
  );
}

export async function getCategoriesForOneType(
  typeId: string
): Promise<ProductCategory[]> {
  return client.fetch(
    groq`*[_type == "productCategory" && references("${typeId}") && !(_id in path('drafts.**'))]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      title,
      productType->{"slug": slug.current, title, _id}, image
    }`
  );
}

export async function getTypeBySlug(slug: string): Promise<ProductType> {
  return client.fetch(
    groq`*[_type == "productType" && slug.current == "${slug}" && !(_id in path('drafts.**'))][0]`
  );
}

export async function getTypes(): Promise<ProductType[]> {
  return client.fetch(
    groq`*[_type == "productType"  && !(_id in path('drafts.**'))]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        title,
        image
      }`
  );
}

export async function getNavigationItems(): Promise<ProductType[]> {
  return client.fetch(
    groq`*[_type == "productType" && !(_id in path('drafts.**'))]{
        _id,
        name,
        "slug": slug.current,
        title,
        productCategories[]->{
          _id,
          name,
          "slug": slug.current,
          title,
          productSubcategories[]->{
            _id,
            name,
            "slug": slug.current,
            title
          }
        }
      }`
  );
}

export async function getCompanyGeneralInformation(): Promise<CompanyInfo> {
  return client.fetch(
    groq`*[_type == "companyInfo" && !(_id in path('drafts.**'))][0]`
  );
}

export async function createNotification(
  data: CreateNotification
): Promise<any> {
  "use server";

  const doc: SanityDocumentStub = {
    _type: "notification",
    customerEmail: data.customerEmail,
    product: {
      _type: "reference",
      _ref: data.productId,
    },
  };

  try {
    const createResponse = await client.create(doc);

    return {
      ...createResponse,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
}

// async function getOrderStatuses(): Promise<OrderStatus[]> {
//   return client.fetch(
//     groq`*[_type == "orderStatus" && !(_id in path('drafts.**'))][0]`
//   );
// }

export async function createOrder(
  invoiceInfo: CreateInvoiceInfo,
  orderInfo: CreateOrder,
  shoppingCart: CartItem[]
): Promise<any> {
  "use server";
  console.log("createOrder");
  const statusId = "134c0f05-ed8f-405f-ac77-16539b937914";
  const orderDoc: SanityDocumentStub = {
    _type: "order",
    customerEmail: orderInfo.customerEmail,
    customerPhone: orderInfo.customerPhone,
    comment: orderInfo.comment,
    orderStatus: {
      _type: "reference",
      _ref: statusId,
    },
  };

  const invoiceDoc: SanityDocumentStub = {
    _type: "invoiceInfo",
    customerName: invoiceInfo.customerName,
    company: invoiceInfo.company,
    address: invoiceInfo.address,
    addressLineTwo: invoiceInfo.addressLineTwo,
    zipcode: invoiceInfo.zipcode,
    city: invoiceInfo.city,
    country: invoiceInfo.country,
  };

  const orderProdutcDocs = shoppingCart.map((item) => {
    return {
      _type: "orderProduct",
      product: {
        _type: "reference",
        _ref: item.id,
      },
      quantity: item.amountInCart,
    };
  });
  console.log(orderProdutcDocs);

  try {
    // // create order, save its id for setting reference later
    // const order = await client.create(orderDoc);
    // console.log(order);

    // // create invoice info, save its id
    // const invoice = await client.create(invoiceDoc);
    // console.log(invoice);
    const transaction = new Transaction()
      .create(invoiceDoc)
      .create(orderDoc)
      .create([...orderProdutcDocs]);
    console.log(transaction);

    // create as many as needed order-product documents, save ids
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
}
