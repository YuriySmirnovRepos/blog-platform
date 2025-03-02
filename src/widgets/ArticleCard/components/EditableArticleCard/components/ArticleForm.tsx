import styles from "./ArticleForm.module.scss";
import { ArticleData } from "@entities/Article/model/types";
import { useState } from "react";

interface ArticleFormProps {
  initialData?: ArticleData;
  onSubmit: (data: ArticleData) => Promise<void>;
  onCancel: () => void;
}

// Компонент формы для редактирования статьи
const ArticleForm: React.FC<ArticleFormProps> = ({ initialData, onSubmit }) => {
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
    console.log(e.target.name, e.target.value);
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
      <h2>Create new article</h2>

      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          title="Заголовок статьи"
          placeholder="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Short description</label>
        <input
          title="Краткое описание статьи"
          placeholder="Short description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Text</label>
        <textarea
          title="Текст статьи"
          placeholder="Text"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
          rows={10}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Tags</label>
        <div className={styles.tagsList}>
          {formData.tagList.map((tag) => (
            <div key={tag} className={styles.tagItem}>
              <input
                type="text"
                name="tag"
                value={tag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Tag"
              />
              <button
                type="button"
                className={styles.deleteTagButton}
                onClick={() => handleDeleteTag(tag)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className={styles.tagItem}>
          <input
            type="text"
            name="tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Tag"
          />
          <button
            type="button"
            className={styles.addTagButton}
            onClick={handleAddTag}
          >
            Add tag
          </button>
        </div>
      </div>
      <button type="submit" className={styles.sendButton}>
        Send
      </button>
    </form>
  );
};

export default ArticleForm;
