import { EditableArticleCard } from "@widgets/ArticleCard";

const CreateArticlePage = () => {
  return (
    <div style={{ paddingTop: 24 }}>
      <EditableArticleCard isNewArticle />
    </div>
  );
};

export default CreateArticlePage;
