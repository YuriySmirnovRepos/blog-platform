import React from "react";
import styles from "./EditableArticleCard.module.scss";
import ArticleForm from "./components/ArticleForm";
import { useArticleEdit } from "@features/CreateArticle/hooks/useArticleEdit";
import { ConfirmationDialog } from "@shared/ui/ConfirmationDialog";
import ArticleCard from "../../ArticleCard";

const EditableArticleCard: React.FC<{ isNewArticle?: boolean }> = ({
  isNewArticle = false,
}) => {
  const {
    article,
    isEditing,
    isAuthor,
    isDeleteConfirmOpen,
    toggleEditMode,
    handleSave,
    handleCancel,
    handleDelete,
    openDeleteConfirm,
    closeDeleteConfirm,
  } = useArticleEdit();

  if (!article && !isNewArticle) {
    // Если статья еще не загружена или отсутствует
    return <div className={styles.loading}>Загрузка статьи...</div>;
  }

  return (
    <div className={styles.editableArticleContainer}>
      {isAuthor && !isEditing && (
        <div className={styles.actionButtons}>
          <button onClick={toggleEditMode} className={styles.editButton}>
            Редактировать
          </button>
          <button onClick={openDeleteConfirm} className={styles.deleteButton}>
            Удалить
          </button>
        </div>
      )}

      {isEditing || isNewArticle ? (
        <ArticleForm
          initialData={article}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ArticleCard isDetailed={true} articleData={article} />
      )}

      {isDeleteConfirmOpen && (
        <ConfirmationDialog
          message="Are you sure to delete this article?"
          onConfirm={handleDelete}
          onCancel={closeDeleteConfirm}
        />
      )}
    </div>
  );
};

export default EditableArticleCard;
