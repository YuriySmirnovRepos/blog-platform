// src/features/Article/hooks/useArticleEdit.ts
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArticleData } from "@entities/Article/model/types";
import { useAuth } from "@features/Auth/hooks/useAuth";

interface UseArticleEditReturn {
  article: ArticleData | null;
  isEditing: boolean;
  isAuthor: boolean;
  isDeleteConfirmOpen: boolean;
  toggleEditMode: () => void;
  handleSave: (updatedArticle: ArticleData) => Promise<void>;
  handleCancel: () => void;
  handleDelete: () => Promise<void>;
  openDeleteConfirm: () => void;
  closeDeleteConfirm: () => void;
}

export const useArticleEdit = (): UseArticleEditReturn => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Получаем данные статьи из state
  const articleData = location.state as ArticleData;

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Проверка, является ли текущий пользователь автором статьи
  // Здесь нужно добавить проверку на основе вашей логики авторизации
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (articleData) {
      setArticle(articleData);

      // Проверка, является ли текущий пользователь автором
      const isAuthor = articleData?.author?.username === currentUser?.username;
      setIsAuthor(isAuthor);
    }

    // Проверяем, находимся ли мы в режиме редактирования по URL
    if (location.pathname.includes("/edit")) {
      setIsEditing(true);
    }
  }, [articleData, location.pathname, currentUser?.username]);

  const toggleEditMode = () => {
    if (isEditing) {
      // Выход из режима редактирования
      navigate(`/articles/${id}`);
    } else {
      // Переход в режим редактирования
      navigate(`/articles/${id}/edit`);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async (updatedArticle: ArticleData) => {
    try {
      // Здесь должен быть вызов API для сохранения обновленной статьи
      // Например: await articleApi.updateArticle(id, updatedArticle);

      // После успешного сохранения обновляем локальное состояние
      setArticle(updatedArticle);

      // Выходим из режима редактирования и переходим на страницу просмотра
      navigate(`/articles/${id}`, { state: updatedArticle });
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении статьи:", error);
      // Здесь можно добавить обработку ошибок, например, показ уведомления
    }
  };

  const handleCancel = () => {
    // Отмена редактирования и возврат к просмотру
    navigate(`/articles/${id}`, { state: article });
    setIsEditing(false);
  };

  const openDeleteConfirm = () => {
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handleDelete = async () => {
    try {
      // Здесь должен быть вызов API для удаления статьи
      // Например: await articleApi.deleteArticle(id);

      // После успешного удаления перенаправляем на главную страницу
      navigate('/');
    } catch (error) {
      console.error("Ошибка при удалении статьи:", error);
      // Здесь можно добавить обработку ошибок, например, показ уведомления
    } finally {
      closeDeleteConfirm();
    }
  };

  return {
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
  };
};
