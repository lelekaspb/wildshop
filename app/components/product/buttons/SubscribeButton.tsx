"use client";

import { Product } from "@/sanity/types/Product";
import SubscribeModal from "../../modals/SubscribeModal";
import { useProductsContext } from "@/app/context/context-provider";
import { CreateNotification } from "@/sanity/types/CreateNotification";
import { SanityDocumentStub } from "next-sanity";

export default function SubscribeButton(props: {
  product: Product;
  gibberer: (data: SanityDocumentStub<CreateNotification>) => Promise<any>;
}) {
  const { subscribeModalOpen, setSubscribeModalOpen, setSubscribeProduct } =
    useProductsContext();

  const action = () => {
    setSubscribeModalOpen(true);
    setSubscribeProduct({
      id: props.product._id,
      productTitle: props.product.title,
    });
  };
  return (
    <>
      <button className="primary_button" onClick={() => action()}>
        Skriv mig op
      </button>
      <SubscribeModal
        product={props.product}
        isOpen={subscribeModalOpen}
        setIsOpen={setSubscribeModalOpen}
        gibberer={props.gibberer}
      />
    </>
  );
}
