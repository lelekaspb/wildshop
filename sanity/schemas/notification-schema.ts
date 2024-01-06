const notification = {
  name: "notification",
  title: "Notification",
  type: "document",
  fields: [
    {
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
    },
    {
      title: "Related Product",
      name: "product",
      type: "reference",
      to: [{ type: "product" }],
      options: { disableNew: true },
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
