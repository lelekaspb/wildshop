const productCategory = {
  name: "productCategory",
  title: "Product Category",
  type: "document",
  liveEdit: true,
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
      description: "Upload product category image here.",
    },
    {
      title: "Product Type",
      name: "productType",
      type: "reference",
      to: [{ type: "productType" }],
      options: { disableNew: true },
    },
    {
      title: "Related Subcategories",
      name: "productSubcategories",
      description: "Leave empty if there is none",
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
