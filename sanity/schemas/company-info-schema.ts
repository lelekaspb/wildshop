const companyInfo = {
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  liveEdit: true,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "instagram",
      title: "Instagram",
      type: "string",
      description:
        "Name of the Instagram profile so that customers can search and find it.",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Company's phone number",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description: "Company's email",
    },
    {
      name: "address",
      title: "Address",
      type: "array",
      of: [{ type: "block" }],
      description: "Company's address",
    },
    {
      name: "workingHours",
      title: "Working Hours",
      type: "array",
      of: [{ type: "block" }],
      description: "Working hours during the week.",
    },
    {
      name: "deliveryInfo",
      title: "Delivery Information",
      type: "array",
      of: [{ type: "block" }],
      description: "Information on how delivery is done.",
    },
    {
      name: "returnInfo",
      title: "Return Information",
      type: "array",
      of: [{ type: "block" }],
      description: "Information about return policy.",
    },
    {
      name: "tradeConditions",
      title: "Trade Conditions",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Infornation that customers have to read and agree to in order to make the purchase (handelsbetingelserne).",
    },
  ],
};

export default companyInfo;
