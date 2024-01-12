const orderStatus = {
  name: "orderStatus",
  title: "Order Status",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "How we refer to the order status internally. Avoid adding words with special characters (e.g. æ, ø, å, and so on).",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Add actual name here.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description:
        "The order status identifier. Click the 'Generate' button to generate a slug based on the name. Must be unique.",
    },
  ],
};

export default orderStatus;
