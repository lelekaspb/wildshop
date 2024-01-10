const productCategory = {
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "How we refer to the category internally. Avoid adding words with special characters (e.g. æ, ø, å, and so on).",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "That is how the shop visitors will see the category. Add actual category name here, in Danish.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description:
        "The category identifier. Click the 'Generate' button to generate a slug based on the name. Must be unique.",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload product category image here.",
    },
    {
      title: "Product Type",
      name: "productType",
      type: "reference",
      to: [{ type: "productType" }],
      options: { disableNew: true },
      description:
        "Choose what product type the category belongs to. Required field.",
    },
    {
      title: "Related Subcategories",
      name: "productSubcategories",
      description:
        "Choose subcategories that relate to this category. Optional field, so leave empty if there is none.",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "productSubcategory" }],
          options: { disableNew: true },
        },
      ],
    },
  ],
};

export default productCategory;
