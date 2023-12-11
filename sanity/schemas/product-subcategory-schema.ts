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
      title: "Product Category",
      name: "productCategory",
      type: "reference",
      to: [{ type: "productCategory" }],
      options: { disableNew: true },
    },
  ],
};

export default productSubcategory;
