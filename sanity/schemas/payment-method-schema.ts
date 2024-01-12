const paymentMethod = {
  name: "paymentMethod",
  title: "Payment Method",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "How we refer to the payment method internally. Avoid adding words with special characters (e.g. æ, ø, å, and so on).",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "That is how the shop visitors will see the payment method. Add actual name here, in Danish.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description:
        "The payment method identifier. Click the 'Generate' button to generate a slug based on the name. Must be unique.",
    },
  ],
};

export default paymentMethod;
