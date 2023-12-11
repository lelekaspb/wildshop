const productCollection = {
  name: "productCollection",
  title: "Product Collection",
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
      title: "Product Subcategory",
      name: "productSubcategory",
      type: "reference",
      to: [{ type: "productSubcategory" }],
      options: { disableNew: true },
    },
  ],
};

export default productCollection;
