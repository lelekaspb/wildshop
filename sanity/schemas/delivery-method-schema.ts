const deliveryMethod = {
  name: "deliveryMethod",
  title: "Delivery Method",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "How we refer to the delivery method internally. Avoid adding words with special characters (e.g. æ, ø, å, and so on).",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "That is how the shop visitors will see the delivery method. Add actual name here, in Danish.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description:
        "The delivery method identifier. Click the 'Generate' button to generate a slug based on the name. Must be unique.",
    },
    {
      name: "price",
      title: "Price, DKK",
      type: "number",
      description:
        "How much it costs for customers to get products delivered by this delivery method.",
    },
  ],
};

export default deliveryMethod;
