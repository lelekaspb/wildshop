"use client";

import styles from "./CartInfoForm.module.css";

export default function CartInfoForm() {
  return (
    <form>
      <fieldset>
        <legend>Kontaktoplysninger</legend>
        <div className="form_field">
          <label htmlFor="user_email">
            E-mail <span className="required_star">*</span>
          </label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            className="form_input"
            //   onChange={handleInputChange}
            //   onBlur={handleInputBlur}
            //   value={email}
          />
          {/* <span
              className={`${"error_placeholder"} ${error ? "shown" : "hidden"}`}
            >
              Angiv venligst en gyldig e-mail
            </span> */}
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
            //   onChange={handleInputChange}
            //   onBlur={handleInputBlur}
            //   value={email}
          />
          {/* <span
              //className={`${"error_placeholder"} ${error ? "shown" : "hidden"}`}
            >
              Angiv venligst en gyldig e-mail
            </span> */}
        </div>
      </fieldset>

      <fieldset>
        <legend>Faktureringsoplysninger</legend>

        <div className="form_field">{/* Navn required */}</div>

        <div className="form_field">{/* Firma */}</div>

        <div className="form_field">{/* Adresse required */}</div>

        <div className="form_field">{/* Adresselinje 2 */}</div>

        <div className="form_field">{/* Postnummer required */}</div>

        <div className="form_field">{/* By required */}</div>

        <div className="form_field">{/* Land required - only Danmark */}</div>
      </fieldset>

      <fieldset>
        <div>
          <label htmlFor="cart_info_comment">Bemærkninger til ordren</label>
          <textarea placeholder="Bemærkningen om din ordre, fx særlige bemækrninger for levering."></textarea>
        </div>
      </fieldset>
    </form>
  );
}
