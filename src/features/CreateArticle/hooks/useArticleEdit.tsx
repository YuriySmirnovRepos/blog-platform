// src/features/Article/hooks/useArticleEdit.ts
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ArticleData from "@entities/Article/model/types";
import { useAuth } from "@features/Auth/hooks/useAuth";
import {
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetArticleBySlugQuery,
} from "../api/createArticleApi";

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

  // Используем RTK Query хуки
  const { data: articleData } = useGetArticleBySlugQuery(id || "", {
    skip: !id || !!location.state,
  });
  const [updateArticle] = useUpdateArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();

  const [article, setArticle] = useState<ArticleData | null>(location.state);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Проверка, является ли текущий пользователь автором статьи
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    // Если данные пришли из запроса, обновляем состояние
    if (articleData && !article) {
      setArticle(articleData);
    }
  }, [articleData, article]);

  useEffect(() => {
    if (article) {
      // Проверка, является ли текущий пользователь автором
      const isAuthor = article?.author?.username === currentUser?.username;
      setIsAuthor(isAuthor);
    }

    // Проверяем, находимся ли мы в режиме редактирования по URL
    if (location.pathname.includes("/edit")) {
      setIsEditing(true);
    }
  }, [location.pathname, article, currentUser?.username]);

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
      if (!id) {
        throw new Error("ID статьи не определен");
      }

      // Подготавливаем данные для запроса
      const articleRequest = {
        article: {
          title: updatedArticle.title,
          description: updatedArticle.description,
          body: updatedArticle.body,
          tagList: updatedArticle.tagList,
        },
      };

      // Вызываем API для обновления статьи
      const result = await updateArticle({
        slug: id,
        data: articleRequest,
      }).unwrap();

      // После успешного сохранения обновляем локальное состояние
      setArticle(result);

      // Выходим из режима редактирования и переходим на страницу просмотра
      navigate(`/articles/${id}`, { state: result });
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
      if (!id) {
        throw new Error("ID статьи не определен");
      }

      // Вызываем API для удаления статьи
      await deleteArticle(id).unwrap();

      // После успешного удаления перенаправляем на главную страницу
      navigate("/");
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
