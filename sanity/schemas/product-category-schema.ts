const productCategory = {
  name: "productCategory",
  title: "Product Category",
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
      title: "Product Type",
      name: "productType",
      type: "reference",
      to: [{ type: "productType" }],
      options: { disableNew: true },
    },
  ],
};

export default productCategory;
