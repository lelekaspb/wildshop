const order = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      description:
        "The email address that should (might) be used to contact the customer.",
    },
    {
      name: "customerPhone",
      title: "Customer Phone Number",
      type: "string",
      description:
        "The phone number that should (might) be used to contact the customer.",
    },
    {
      name: "comment",
      title: "Customer's Comment to the order",
      type: "string",
      description:
        "The comment that customer left while filling in the order form.",
    },
    {
      title: "Related Products",
      name: "products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
          options: { disableNew: true },
        },
      ],

      description: "Products that the user ordered.",
    },
    {
      title: "Invoice Information",
      name: "invoice",
      type: "reference",
      to: [{ type: "invoiceInfo" }],
      options: { disableNew: true },
      description:
        "The invoice information provided by the customer for creating an invoice.",
    },
    {
      title: "Delivery Method",
      name: "deliveryMethod",
      type: "reference",
      to: [{ type: "deliveryMethod" }],
      options: { disableNew: true },
      description: "The chosen delivery method.",
    },
    {
      title: "Payment Method",
      name: "paymentMethod",
      type: "reference",
      to: [{ type: "paymentMethod" }],
      options: { disableNew: true },
      description: "The chosen payment method.",
    },
  ],
  preview: {
    select: {
      title: "customerEmail",
      invoice: "invoice.customerName",
      createdAt: "_createdAt",
    },
    prepare(selection: any) {
      const { invoice, createdAt } = selection;
      const createdDate = createdAt.split("T")[0];
      return Object.assign({}, selection, {
        subtitle: `${invoice} | ${createdDate} `,
      });
    },
  },
};

export default order;
