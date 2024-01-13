const orderProduct = {
  name: "orderProduct",
  title: "Order - Product",
  type: "document",
  fields: [
    {
      title: "Order",
      name: "order",
      type: "reference",
      to: [{ type: "order" }],
      options: { disableNew: true },
      description: "Related order.",
    },
    {
      title: "Product",
      name: "product",
      type: "reference",
      to: [{ type: "product" }],
      options: { disableNew: true },
      description: "Product from a related order.",
    },
    {
      title: "Quantity",
      name: "quantity",
      type: "number",
      description: "The product's ordered quantity.",
    },
  ],
  preview: {
    select: {
      customer: "order.invoice.customerName",
      product: "product.title",
      createdAt: "_createdAt",
      status: "order.orderStatus.title",
      quantity: "quantity",
    },
    prepare(selection: any) {
      const { customer, product, createdAt, status, quantity } = selection;
      const createdDate = createdAt.split("T")[0];
      return Object.assign({}, selection, {
        title: `${customer}`,
        subtitle: `${product} - ${quantity}stk. | ${createdDate} | ${status} `,
      });
    },
  },
};

export default orderProduct;
