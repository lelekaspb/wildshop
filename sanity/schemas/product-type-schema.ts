const productType = {
  name: "productType",
  title: "Product Type",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "How we refer to the product type internally. Avoid adding words with special characters (e.g. æ, ø, å, and so on).",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "That is how the shop visitors will see the type. Add actual product type name here, in Danish.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description:
        "The type identifier. Click the 'Generate' button to generate a slug based on the name. Must be unique.",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload product type image here.",
    },
    {
      title: "Related Categories",
      name: "productCategories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "productCategory" }],
          options: { disableNew: true },
        },
      ],
      description:
        "Choose categories that relate to this product type. Required field.",
    },
  ],
};

export default productType;
