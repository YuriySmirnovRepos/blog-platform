// import { CreateArticleForm } from "@features/CreateArticle";
import EditableArticleCard from "@widgets/ArticleCard/components/EditableArticleCard/EditableArticleCard";

const CreateArticlePage = () => {
  return (
    <div style={{ paddingTop: 24 }}>
      <EditableArticleCard title="Create new article" isNewArticle />
    </div>
  );
};

export default CreateArticlePage;
