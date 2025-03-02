import { useNavigate } from "react-router-dom";
import ArticleData from "@entities/Article/model/types";
import { useCreateArticleMutation } from "../api/createArticleApi";

interface UseCreateArticleReturn {
  isSubmitting: boolean;
  handleCreateArticle: (articleData: ArticleData) => Promise<void>;
  handleCancel: () => void;
}

export const useCreateArticle = (): UseCreateArticleReturn => {
  const navigate = useNavigate();
  const [createArticle, { isLoading: isSubmitting }] =
    useCreateArticleMutation();

  const handleCreateArticle = async (articleData: ArticleData) => {
    try {
      // Подготавливаем данные для запроса
      const articleRequest = {
        article: {
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
          tagList: articleData.tagList,
        },
      };

      // Отправляем запрос на создание статьи
      const result = await createArticle(articleRequest).unwrap();

      // После успешного создания перенаправляем на страницу просмотра новой статьи
      navigate(`/articles/${result.slug}`, { state: result });
    } catch (error) {
      console.error("Ошибка при создании статьи:", error);
      // Здесь можно добавить обработку ошибок, например, показ уведомления
    }
  };

  const handleCancel = () => {
    // Отмена создания и возврат на главную страницу
    navigate("/");
  };

  return {
    isSubmitting,
    handleCreateArticle,
    handleCancel,
  };
};
