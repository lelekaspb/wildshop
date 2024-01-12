export type CreateInvoiceInfo = {
  _type: string;
  customerName: string;
  company: string;
  address: string;
  addressLineTwo: string | null;
  zipcode: string;
  city: string;
  country: string;
};
