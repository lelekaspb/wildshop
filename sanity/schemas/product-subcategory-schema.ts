const productSubcategory = {
  name: "productSubcategory",
  title: "Product Subcategory",
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
      description: "Upload product subcategory image here.",
    },
    {
      title: "Product Category",
      name: "productCategory",
      type: "reference",
      to: [{ type: "productCategory" }],
      options: { disableNew: true },
    },
    {
      title: "Related Collections",
      name: "productCollections",
      description: "Leave empty if there is none",
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
