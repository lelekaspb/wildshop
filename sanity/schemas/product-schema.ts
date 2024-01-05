const product = {
  name: "product",
  title: "Product",
  type: "document",
  liveEdit: true,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "How we refer to the product internally. Avoid adding words with special characters (e.g. æ, ø, å, and so on).",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "That is how the shop visitors will see products. Add actual product name here, in Danish.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description:
        "The product identifier. Click the 'Generate' button to generate a slug based on the name. Must be unique.",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      description: "Upload product image(s) here.",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Type in the product's description. Add bold text or italic text, headers, separate paragraphs, and so on.",
    },
    {
      name: "regularPrice",
      title: "Regular Price, DKK",
      type: "number",
      description: "Price without discount.",
    },
    {
      name: "sale",
      title: "Sale",
      type: "boolean",
      initialValue: false,
      description: "Is the product on sale?",
    },
    {
      name: "salePrice",
      title: "Sale Price, DKK",
      type: "number",
      description: "Sale price, with discount.",
    },
    {
      name: "new",
      title: "New",
      type: "boolean",
      initialValue: false,
      description: "Is the product new?",
    },
    {
      name: "amount",
      title: "Amount in storage",
      type: "number",
      initialValue: 0,
      description:
        "How many pieces of product are there in storage? Essential for displaying the correct amount on the website.",
    },
    {
      title: "Product Type",
      name: "productType",
      type: "reference",
      to: [{ type: "productType" }],
      options: { disableNew: true },
      description: "Choose the product's type. Required field.",
    },
    {
      title: "Product Category",
      name: "productCategory",
      type: "reference",
      to: [{ type: "productCategory" }],
      options: { disableNew: true },
      description: "Choose the product's category. Required field.",
    },
    {
      title: "Product Subategory",
      name: "productSubcategory",
      type: "reference",
      to: [{ type: "productSubcategory" }],
      weak: true,
      options: { disableNew: true },
      description: "Choose the product's subcategory. Optional field.",
    },
    {
      title: "Product Collection",
      name: "productCollection",
      type: "reference",
      to: [{ type: "productCollection" }],
      weak: true,
      options: { disableNew: true },
      description: "Choose the product's collection. Optional field.",
    },
  ],
};

export default product;
