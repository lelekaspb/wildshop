const invoiceInfo = {
  name: "invoiceInfo",
  title: "Infoice Info",
  type: "document",
  fields: [
    {
      name: "customerName",
      title: "Name",
      type: "string",
      description: "Customer's name",
    },
    {
      name: "company",
      title: "Firma",
      type: "string",
      description: "Customer's organization",
    },
    {
      name: "address",
      title: "Adresse",
      type: "string",
      description: "Customer's address - first line",
    },
    {
      name: "addressLineTwo",
      title: "Adresselinje 2",
      type: "string",
      description: "Customer's address - second line",
    },

    {
      name: "zipcode",
      title: "Postnummer",
      type: "string",
      description: "Customer's zip code",
    },
    {
      name: "city",
      title: "By",
      type: "string",
      description: "Customer's city (town)",
    },
    {
      name: "country",
      title: "Land",
      type: "string",
      description: "Customer's country",
    },
  ],
  preview: {
    select: {
      title: "customerName",
      city: "city",
      zipcode: "zipcode",
      createdAt: "_createdAt",
    },
    prepare(selection: any) {
      const { city, zipcode, createdAt } = selection;
      const createdDate = createdAt.split("T")[0];
      return Object.assign({}, selection, {
        subtitle: `${city}, ${zipcode} | ${createdDate} `,
      });
    },
  },
};

export default invoiceInfo;
