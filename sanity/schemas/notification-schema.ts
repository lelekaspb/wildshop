const notification = {
  name: "notification",
  title: "Notification",
  type: "document",
  fields: [
    {
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      description:
        "The email address where the customer would like to receive the notification.",
    },
    {
      title: "Related Product",
      name: "product",
      type: "reference",
      to: [{ type: "product" }],
      options: { disableNew: true },
      description:
        "The product that the user would like to be notified about when this product is back in stock.",
    },
  ],
  preview: {
    select: {
      title: "customerEmail",
      product: "product.title",
      createdAt: "_createdAt",
    },
    prepare(selection: any) {
      const { product, createdAt } = selection;
      const createdDate = createdAt.split("T")[0];
      return Object.assign({}, selection, {
        subtitle: `${product} | ${createdDate} `,
      });
    },
  },
};

export default notification;
