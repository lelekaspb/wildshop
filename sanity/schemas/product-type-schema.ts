const productType = {
  name: "productType",
  title: "Product Type",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
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
    },
  ],
};

export default productType;
