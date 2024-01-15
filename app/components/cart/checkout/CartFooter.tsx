"use client";

import styles from "./CartFooter.module.css";
import { useCheckoutContext } from "@/app/context/checkout-context-provider";
import DeliveryInfoModal from "@/app/components/modals/DeliveryInfoModal";
import { PortableTextBlock } from "sanity";
import ReturnInfoModal from "@/app/components/modals/ReturnInfoModal";
import TradeConditionsInfoModal from "../../modals/TradeConditionsInfoModal";

export default function CartFooter(props: {
  deliveryInfo: [PortableTextBlock];
  returnInfo: [PortableTextBlock];
  tradeConditionsInfo: [PortableTextBlock];
}) {
  const {
    setDeliveryModalOpen,
    setReturnModalOpen,
    setTradeConditionsModalOpen,
  } = useCheckoutContext();

  return (
    <div className={styles.footer}>
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

        <button
          type="button"
          className={styles.link}
          onClick={() => {
            setTradeConditionsModalOpen(true);
          }}
        >
          Handelsbetingelse
        </button>
      </div>

      <DeliveryInfoModal bodyText={props.deliveryInfo} />
      <ReturnInfoModal bodyText={props.returnInfo} />
      <TradeConditionsInfoModal bodyText={props.tradeConditionsInfo} />
    </div>
  );
}
