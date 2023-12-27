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
};

export default notification;
