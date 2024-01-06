const productSubcategory = {
  name: "productSubcategory",
  title: "Product Subcategory",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "How we refer to the subcategory internally. Avoid adding words with special characters (e.g. æ, ø, å, and so on).",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "That is how the shop visitors will see the subcategory. Add actual subcategory name here, in Danish.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description:
        "The subcategory identifier. Click the 'Generate' button to generate a slug based on the name. Must be unique.",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload product subcategory image here.",
    },
    {
      title: "Product Category",
      name: "productCategory",
      type: "reference",
      to: [{ type: "productCategory" }],
      options: { disableNew: true },
      description:
        "Choose what category the collection belongs to. Required field.",
    },
    {
      title: "Related Collections",
      name: "productCollections",
      description:
        "Choose collections that relate to this subcategory. Optional field, so leave empty if there is none.",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "productCollection" }],
          options: { disableNew: true },
        },
      ],
    },
  ],
};

export default productSubcategory;
