import React from "react";
import styles from "./ConfirmationDialog.module.scss";

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <span>!</span>
          </div>
          <p className={styles.message}>{message}</p>
          <div className={styles.actions}>
            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
