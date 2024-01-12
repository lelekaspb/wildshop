"use client";

import Link from "next/link";
import styles from "./CartFooter.module.css";
import { useCheckoutContext } from "@/app/context/checkout-context-provider";
import DeliveryInfoModal from "@/app/components/modals/DeliveryInfoModal";
import { PortableTextBlock } from "sanity";
import ReturnInfoModal from "@/app/components/modals/ReturnInfoModal";

export default function CartFooter(props: {
  backPath: string;
  forwardPath: string;
  deliveryInfo: [PortableTextBlock];
  returnInfo: [PortableTextBlock];
}) {
  const { setDeliveryModalOpen, setReturnModalOpen } = useCheckoutContext();

  return (
    <div className={styles.footer}>
      <div className={styles.buttons_wrapper}>
        <Link href={props.backPath}>
          <button className="secondary_button">Tilbage</button>
        </Link>
        <Link href={props.forwardPath}>
          <button className="primary_button_upper_case">Fortsæt</button>
        </Link>
      </div>
      <div className={styles.links_wrapper}>
        <button
          type="button"
          className={styles.link}
          onClick={() => {
            setDeliveryModalOpen(true);
          }}
        >
          Leveringsoplysninger
        </button>
        <button
          type="button"
          className={styles.link}
          onClick={() => {
            setReturnModalOpen(true);
          }}
        >
          Returoplysninger
        </button>
      </div>

      <DeliveryInfoModal bodyText={props.deliveryInfo} />
      <ReturnInfoModal bodyText={props.returnInfo} />
    </div>
  );
}
