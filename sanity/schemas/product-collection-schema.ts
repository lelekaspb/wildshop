const productCollection = {
  name: "productCollection",
  title: "Product Collection",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "How we refer to the collection internally. Avoid adding words with special characters (e.g. æ, ø, å, and so on).",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "That is how the shop visitors will see the collection. Add actual collection name here, in Danish.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description:
        "The collection identifier. Click the 'Generate' button to generate a slug based on the name. Must be unique.",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload product collection image here.",
    },
    {
      title: "Product Subcategory",
      name: "productSubcategory",
      type: "reference",
      to: [{ type: "productSubcategory" }],
      options: { disableNew: true },
      description:
        "Choose what subcategory the collection belongs to. Required field.",
    },
  ],
};

export default productCollection;
