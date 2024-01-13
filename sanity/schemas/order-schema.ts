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
      title: "Related 'Order - Product' entries",
      name: "orderProducts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "orderProduct" }],
          options: { disableNew: true },
        },
      ],

      description:
        "Separated documents where pairs 'order - product' are stored along with the ordered product quantity.",
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
    {
      title: "Status",
      name: "orderStatus",
      type: "reference",
      to: [{ type: "orderStatus" }],
      options: { disableNew: true },
      readonly: false,
      description:
        "Whether the order is waiting for action - Active, has been already sent to the buyer - Sent, or has been canceled for some reason - Canceled.",
    },
  ],
  preview: {
    select: {
      customerEmail: "customerEmail",
      customer: "invoice.customerName",
      createdAt: "_createdAt",
      status: "orderStatus.title",
    },
    prepare(selection: any) {
      const { customer, createdAt, status, customerEmail } = selection;
      const createdDate = createdAt.split("T")[0];
      return Object.assign({}, selection, {
        title: `${customer}`,
        subtitle: `${customerEmail} | ${createdDate} | ${status} `,
      });
    },
  },
};

export default order;
