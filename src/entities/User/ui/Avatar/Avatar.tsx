import { useEffect, useState } from "react";
import Loader from "@shared/ui/Loader/Loader";
import styles from "./Avatar.module.scss";
import UserAvatar from "@assets/userAvatar.svg";

export default function Avatar({ imgSrc }: { imgSrc: string }) {
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const [isLoadingErrorOccurred, setIsLoadingErrorOccurred] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc || "";
    img.onload = () => setIsAvatarLoading(false);
    img.onerror = () => {
      setIsAvatarLoading(false);
      setIsLoadingErrorOccurred(true);
    };
  }, [imgSrc]);

  return (
    <div className={styles.avatarContainer}>
      {isAvatarLoading && <Loader isSmall />}
      {!isAvatarLoading && isLoadingErrorOccurred && (
        <img src={UserAvatar} className={styles.avatar} alt="User avatar" />
      )}
      {!isAvatarLoading && !isLoadingErrorOccurred && (
        <img src={imgSrc} className={styles.avatar} alt="User avatar" />
      )}
    </div>
  );
}
