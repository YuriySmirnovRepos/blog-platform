import styles from "./ArticleForm.module.css";
import { ArticleData } from "@entities/Article/model/types";
import { useState } from "react";

interface ArticleFormProps {
  initialData?: ArticleData;
  onSubmit: (data: ArticleData) => Promise<void>;
  onCancel: () => void;
}

// Компонент формы для редактирования статьи
const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    body: initialData?.body || "",
    tagList: initialData?.tagList || [],
  });

  const [newTag, setNewTag] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tagList.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tagList: [...prev.tagList, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      tagList: prev.tagList.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Создаем обновленный объект статьи
    const updatedArticle: ArticleData = {
      ...initialData,
      title: formData.title,
      description: formData.description,
      body: formData.body,
      tagList: formData.tagList,
    };

    await onSubmit(updatedArticle);
  };

  return (
    <form className={styles.articleForm} onSubmit={handleSubmit}>
      <h2>Редактирование статьи</h2>

      <div className={styles.formGroup}>
        <label>Заголовок</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Описание</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Содержание</label>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
          rows={10}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Теги</label>
        <div className={styles.tagsList}>
          {formData.tagList.map((tag) => (
            <div key={tag} className={styles.tagItem}>
              {tag}
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDeleteTag(tag)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
        <div className={styles.tagsInputGroup}>
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Добавить тег"
          />
          <button
            type="button"
            className={styles.addTagButton}
            onClick={handleAddTag}
          >
            Добавить тег
          </button>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.saveButton}>
          Сохранить
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
