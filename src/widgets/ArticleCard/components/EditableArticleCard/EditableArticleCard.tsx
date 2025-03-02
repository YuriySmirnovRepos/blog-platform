import React from "react";
import styles from "./EditableArticleCard.module.scss";
import ArticleForm from "./components/ArticleForm";
import { useArticleEdit } from "@features/CreateArticle/hooks/useArticleEdit";
import { useCreateArticle } from "@features/CreateArticle/hooks/useCreateArticle";
import { ConfirmationDialog } from "@shared/ui/ConfirmationDialog";
import ArticleCard from "../ArticleCard/ArticleCard";

const EditableArticleCard: React.FC<{ isNewArticle?: boolean }> = ({
  isNewArticle = false,
}) => {
  // Используем хук для редактирования существующих статей
  const {
    article,
    isEditing,
    isDeleteConfirmOpen,
    handleSave,
    handleCancel,
    handleDelete,
    closeDeleteConfirm,
  } = useArticleEdit();

  // Используем хук для создания новых статей
  const { handleCreateArticle, handleCancel: handleCancelCreate } =
    useCreateArticle();

  // Генерируем уникальный ключ для автосохранения на основе ID статьи или "new" для новой статьи
  const autoSaveKey = `article_form_draft_${article?.slug || "new"}`;

  // Выбираем соответствующие обработчики в зависимости от режима (создание или редактирование)
  const onSubmit = isNewArticle ? handleCreateArticle : handleSave;
  const onCancel = isNewArticle ? handleCancelCreate : handleCancel;

  return (
    <div className={styles.editableArticleContainer}>
      {isEditing || isNewArticle ? (
        <ArticleForm
          initialData={article}
          onSubmit={onSubmit}
          onCancel={onCancel}
          autoSaveInterval={60000} // Автосохранение каждую минуту
          autoSaveKey={autoSaveKey}
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
