import { getCompanyGeneralInformation } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

export default async function Contact() {
  const companyInfo = await getCompanyGeneralInformation();
  return (
    <main>
      <h2>Contact</h2>
      <p>Phone: {companyInfo.phone}</p>
      <p>Email: {companyInfo.email}</p>
      <p>Instagram: {companyInfo.instagram}</p>
      <div>
        Address: <PortableText value={companyInfo.address} />
      </div>
      <div>
        Working hours: <PortableText value={companyInfo.workingHours} />
      </div>
    </main>
  );
}
