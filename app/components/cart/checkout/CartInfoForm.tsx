"use client";

import { useEffect, useState } from "react";
import styles from "./CartInfoForm.module.css";
import { useCheckoutContext } from "@/app/context/checkout-context-provider";
import {
  validateEmail,
  validateOnlyDigits,
  validateOnlyLetters,
} from "@/app/client-utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartInfoForm() {
  const { contactInfo, setContactInfo, invoiceInfo, setInvoiceInfo } =
    useCheckoutContext();

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [formIsValid, setFormIsValid] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const isValid =
      emailError === false &&
      phoneError === false &&
      nameError === false &&
      addressError === false &&
      zipcodeError === false &&
      cityError === false;
    setFormIsValid(isValid);
  }, [
    emailError,
    phoneError,
    nameError,
    addressError,
    zipcodeError,
    cityError,
  ]);

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setContactInfo({
      ...contactInfo,
      email: e.currentTarget.value,
    });
  };

  const handleEmailBlur = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailError(!validateEmail(e.currentTarget.value));
  };

  const handlePhoneChange = (e: React.FormEvent<HTMLInputElement>) => {
    setContactInfo({
      ...contactInfo,
      phone: e.currentTarget.value,
    });
  };

  const handlePhoneBlur = (e: React.FormEvent<HTMLInputElement>) => {
    setPhoneError(!validateOnlyDigits(e.currentTarget.value));
  };

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInvoiceInfo({
      ...invoiceInfo,
      name: e.currentTarget.value,
    });
  };

  const handleNameBlur = (e: React.FormEvent<HTMLInputElement>) => {
    setNameError(!validateOnlyLetters(e.currentTarget.value));
  };

  const handleCompanyChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInvoiceInfo({
      ...invoiceInfo,
      company: e.currentTarget.value,
    });
  };

  const handleAddressChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInvoiceInfo({
      ...invoiceInfo,
      address: e.currentTarget.value,
    });
  };

  const handleAddressBlur = (e: React.FormEvent<HTMLInputElement>) => {
    setAddressError(e.currentTarget.value.length == 0);
  };

  const handleAddressLineTwoChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInvoiceInfo({
      ...invoiceInfo,
      address_line_2: e.currentTarget.value,
    });
  };

  const handleZipcodeChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInvoiceInfo({
      ...invoiceInfo,
      zipcode: e.currentTarget.value,
    });
  };

  const handleZipcodeBlur = (e: React.FormEvent<HTMLInputElement>) => {
    setZipcodeError(!validateOnlyDigits(e.currentTarget.value));
  };

  const handleCityChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInvoiceInfo({
      ...invoiceInfo,
      city: e.currentTarget.value,
    });
  };

  const handleCityBlur = (e: React.FormEvent<HTMLInputElement>) => {
    setCityError(!validateOnlyLetters(e.currentTarget.value));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactInfo({
      ...contactInfo,
      comment: e.currentTarget.value,
    });
  };

  const router = useRouter();

  const handleProceedFurtherClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.currentTarget as typeof e.currentTarget & {
      user_email: { value: string };
      user_phone_number: { value: string };
      invoice_name: { value: string };
      invoice_company: { value: string };
      invoice_address: { value: string };
      invoice_address_2: { value: string };
      invoice_zipcode: { value: string };
      invoice_city: { value: string };
      invoice_country: { value: string };
      cart_info_comment: { value: string };
    };

    const email = target.user_email.value;
    const phone = target.user_phone_number.value;
    const name = target.invoice_name.value;
    //const company = target.invoice_company.value;
    const address = target.invoice_address.value;
    //const address_line_2 = target.invoice_address_2.value;
    const zipcode = target.invoice_zipcode.value;
    const city = target.invoice_city.value;
    const country = target.invoice_country.value;
    //const comment = target.cart_info_comment.value;

    if (
      validateEmail(email) &&
      validateOnlyDigits(phone) &&
      validateOnlyLetters(name) &&
      address.length > 0 &&
      validateOnlyDigits(zipcode) &&
      validateOnlyLetters(city) &&
      country.length > 0
    ) {
      router.push("/cart/delivery");
    } else {
      console.log("form is not valid or country field is empty");
      // show errors
      setEmailError(!validateEmail(email));
      setPhoneError(!validateOnlyDigits(phone));
      setNameError(!validateOnlyLetters(name));
      setAddressError(address.length == 0);
      setZipcodeError(!validateOnlyDigits(zipcode));
      setCityError(!validateOnlyLetters(city));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleProceedFurtherClick}>
      <fieldset>
        <legend className={styles.form_legend}>Kontaktoplysninger</legend>
        <div className="form_field">
          <label htmlFor="user_email">
            E-mail <span className="required_star">*</span>
          </label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            className="form_input"
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            value={contactInfo.email}
          />
          <span
            className={`${"error_placeholder"} ${
              emailError ? "shown" : "hidden"
            }`}
          >
            Angiv venligst en gyldig e-mail
          </span>
        </div>

        <div className="form_field">
          <label htmlFor="user_phone_number">
            Telefon <span className="required_star">*</span>
          </label>
          <input
            type="tel"
            name="user_phone_number"
            id="user_phone_number"
            className="form_input"
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            value={contactInfo.phone}
          />
          <span
            className={`${"error_placeholder"} ${
              phoneError ? "shown" : "hidden"
            }`}
          >
            Telefonnummer kan kun bestå af tal
          </span>
        </div>
      </fieldset>

      <fieldset>
        <legend className={styles.form_legend}>Faktureringsoplysninger</legend>

        {/* Navn required */}
        <div className="form_field">
          <label htmlFor="invoice_name">
            Navn <span className="required_star">*</span>
          </label>
          <input
            type="text"
            name="invoice_name"
            id="invoice_name"
            className="form_input"
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            value={invoiceInfo.name}
          />
          <span
            className={`${"error_placeholder"} ${
              nameError ? "shown" : "hidden"
            }`}
          >
            Angiv venligst dit fulde navn
          </span>
        </div>

        {/* Firma */}
        <div className="form_field">
          <label htmlFor="invoice_company">Firma</label>
          <input
            type="text"
            name="invoice_company"
            id="invoice_company"
            className="form_input"
            onChange={handleCompanyChange}
            value={invoiceInfo.company}
          />
          <span className="error_placeholder hidden">
            Angiv venligst dit firma navn
          </span>
        </div>

        {/* Adresse required */}
        <div className="form_field">
          <label htmlFor="invoice_address">
            Adresse <span className="required_star">*</span>
          </label>
          <input
            type="text"
            name="invoice_address"
            id="invoice_address"
            className="form_input"
            onChange={handleAddressChange}
            onBlur={handleAddressBlur}
            value={invoiceInfo.address}
          />
          <span
            className={`${"error_placeholder"} ${
              addressError ? "shown" : "hidden"
            }`}
          >
            Angiv venligst din addresse
          </span>
        </div>

        {/* Adresselinje 2 */}
        <div className="form_field">
          <label htmlFor="invoice_address_2">Adresselinje 2</label>
          <input
            type="text"
            name="invoice_address_2"
            id="invoice_address_2"
            className="form_input"
            onChange={handleAddressLineTwoChange}
            value={invoiceInfo.address_line_2}
          />
          <span className="error_placeholder hidden">
            Angiv venligst din addresse
          </span>
        </div>

        {/* Postnummer required */}
        <div className="form_field">
          <label htmlFor="invoice_zipcode">
            Postnummer <span className="required_star">*</span>
          </label>
          <input
            type="text"
            name="invoice_zipcode"
            id="invoice_zipcode"
            className="form_input"
            onChange={handleZipcodeChange}
            onBlur={handleZipcodeBlur}
            value={invoiceInfo.zipcode}
          />
          <span
            className={`${"error_placeholder"} ${
              zipcodeError ? "shown" : "hidden"
            }`}
          >
            Angiv venligst dit postnummer
          </span>
        </div>

        {/* By required */}
        <div className="form_field">
          <label htmlFor="invoice_city">
            By <span className="required_star">*</span>
          </label>
          <input
            type="text"
            name="invoice_city"
            id="invoice_city"
            className="form_input"
            onChange={handleCityChange}
            onBlur={handleCityBlur}
            value={invoiceInfo.city}
          />
          <span
            className={`${"error_placeholder"} ${
              cityError ? "shown" : "hidden"
            }`}
          >
            Angiv venligst din by
          </span>
        </div>

        {/* Land required - only Denmark */}
        <div className="form_field">
          <label htmlFor="invoice_country">
            Land <span className="required_star">*</span>
          </label>
          <span className={styles.warning}>
            I øjeblikket arbejder vi kun i Danmark
          </span>
          <input
            type="text"
            name="invoice_country"
            id="invoice_country"
            className="form_input readonly"
            readOnly={true}
            value="Danmark"
          />
          <span className="error_placeholder hidden">
            Angiv venligst din land
          </span>
        </div>
      </fieldset>

      <fieldset>
        {/* <legend className={styles.form_legend}>Bemærkninger til ordren</legend> */}
        <div className="form_field">
          <label htmlFor="cart_info_comment">Bemærkninger til ordren</label>
          <textarea
            name="cart_info_comment"
            id="cart_info_comment"
            placeholder="Bemærkningen om din ordre, fx særlige bemækrninger for levering."
            className="form_input"
            onChange={handleCommentChange}
          ></textarea>
        </div>
      </fieldset>

      <div className={styles.buttons_wrapper}>
        <Link href="/cart">
          <button className="secondary_button">Tilbage</button>
        </Link>

        <button className="primary_button_upper_case" type="submit">
          Fortsæt
        </button>
      </div>
    </form>
  );
}
