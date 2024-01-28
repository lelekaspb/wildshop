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

export async function getProductAmountInOrders(
  productId: string
): Promise<number> {
  // math::sum(*[_type == "orderProduct"]{quantity, product->{_id}, order->{orderStatus->{_id}}}[product._id == "69e18963-bbf4-41b0-b13d-7f4a005ef82a"][order.orderStatus._id == "134c0f05-ed8f-405f-ac77-16539b937914"].quantity)
  const activeStatusId = "134c0f05-ed8f-405f-ac77-16539b937914";

  return sanityFetch({
    query: `math::sum(
      *[_type == "orderProduct"]{
        quantity, 
        product->{_id}, 
        order->{orderStatus->{_id}}
      }[product._id == "${productId}"]
      [order.orderStatus._id == "${activeStatusId}"]
      .quantity
      )`,
    tags: ["orderProduct"],
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

export async function getNewProducts(): Promise<Product[]> {
  return sanityFetch({
    query: `*[_type == "product" && new == true && !(_id in path('drafts.**'))]{
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

export async function getSaleProducts(): Promise<Product[]> {
  return sanityFetch({
    query: `*[_type == "product" && sale == true && !(_id in path('drafts.**'))]{
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

export async function createOrder(): Promise<any> {
  // invoiceInfo: CreateInvoiceInfo,
  // orderInfo: CreateOrder,
  // shoppingCart: CartItem[]
  "use server";
  console.log("createOrder");
  const statusId = "134c0f05-ed8f-405f-ac77-16539b937914";

  // to substitute with data from checkout flow
  const invoiceInfo: CreateInvoiceInfo = {
    _type: "invoiceInfo",
    customerName: "Tina Turner",
    company: "",
    address: "Main Road 3",
    addressLineTwo: null,
    zipcode: "1000",
    city: "Gibber",
    country: "USA",
  };

  const orderInfo: CreateOrder = {
    _type: "order",
    customerEmail: "tine@turner.usa",
    customerPhone: "555-222-333",
    comment: "no comment",
  };

  const shoppingCart: CartItem[] = [
    {
      title: "Top Toptop # 3",
      image: null,
      amountInStorage: 5,
      amountInCart: 1,
      price: 44,
      id: "806ba2cf-2139-4c8a-ba68-bdad6ea42114",
    },
    {
      title: "Acrylgel #1 / 50 GR",
      image: null,
      amountInStorage: 6,
      amountInCart: 1,
      price: 44,
      id: "5972938d-bb18-4707-bee2-33dd981a00b9",
    },
  ];

  // to substitute with data from checkout flow ----- end

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

  const orderProdutcDocs: SanityDocumentStub[] = shoppingCart.map((item) => {
    return {
      _type: "orderProduct",
      product: {
        _type: "reference",
        _ref: item.id,
      },
      quantity: item.amountInCart,
    };
  });

  try {
    const transaction: any = new Transaction();
    transaction.create(invoiceDoc);
    transaction.create(orderDoc);

    orderProdutcDocs.forEach((element) => {
      transaction.create(element);
    });

    // @ts-ignore
    const result = await client.mutate(transaction);

    console.log("results of mutations in one transaction");
    // console.log(result);

    let invoice: any = {};
    let order: any = {};
    const orderProducts: any = [];

    result.results.forEach((doc: any) => {
      console.log(doc.document);
      if (doc.document._type == "invoiceInfo") {
        invoice = doc.document;
      }
      if (doc.document._type == "order") {
        order = doc.document;
      }
      if (doc.document._type == "orderProduct") {
        orderProducts.push(doc.document);
      }
    });

    console.log("invoice");
    console.log(invoice);
    console.log("order");
    console.log(order);
    console.log("orderProducts array");
    console.log(orderProducts);

    // set reference from invoice to order
    const invoicePatch = new Patch(invoice._id);
    invoicePatch.set({
      order: {
        _type: "reference",
        _ref: order._id,
      },
    });
    // @ts-ignore
    const invoicePatchResult = await client.mutate(invoicePatch);
    console.log("invoicePatchResult");
    console.log(invoicePatchResult);

    // set reference from order to invoice and orderProduct documents
    const orderPatch = new Patch(order._id);
    orderPatch.set({
      invoice: {
        _type: "reference",
        _ref: invoice._id,
      },
    });
    orderProducts.forEach(async (document: { _id: string }) => {
      orderPatch
        .setIfMissing({ orderProducts: [] })
        .append("orderProducts", [{ _type: "reference", _ref: document._id }]);

      // @ts-ignore
      const orderPatchResult = await client.mutate(orderPatch, {
        autoGenerateArrayKeys: true,
      });
      console.log("orderPatchResult");
      console.log(orderPatchResult);
    });

    // set reference from orderProduct documents to order
    orderProducts.forEach(async (document: { _id: string }) => {
      const orderProductPatch = new Patch(document._id);
      orderProductPatch.set({
        order: {
          _type: "reference",
          _ref: order._id,
        },
      });

      // @ts-ignore
      const orderProductPatchResult = await client.mutate(orderProductPatch);
      console.log("orderProductPatchResult");
      console.log(orderProductPatchResult);
    });

    // return success
    return {
      success: true,
    };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      error: err.message,
    };
  }
}
