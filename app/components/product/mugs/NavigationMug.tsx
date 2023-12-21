import styles from "./NavigationMug.module.css";
import Image from "next/image";
import placeholder from "@/public/placeholder/photo-on-the-way.svg";

export default function NavigationMug(props: {
  image: string | null;
  title: string;
}) {
  const {
    image,
    title,
  }: {
    image: string | null;
    title: string;
  } = props;
  return (
    <div className={styles.mug}>
      <div className={styles.image_wrapper}>
        <Image
          alt={title}
          src={image ? image : placeholder}
          width={300}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className={styles.title_wrapper}>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}
