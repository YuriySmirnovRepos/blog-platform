import styles from "./ArticleCard.module.scss";
import { ArticleData } from "@entities/Article/model/types";
import User from "@entities/User/ui/User";
import { Link } from "react-router-dom";
import MarkdownParser from "@shared/components/MarkdownParser";
import TagsContainer from "./components/TagsContainer/TagsContainer";
import { useOverflowCheck } from "@shared/hooks";
import { useState } from "react";
import { useAuth } from "@features/Auth/hooks/useAuth";

export interface ArticleCardProps {
  isDetailed: boolean;
  articleData: ArticleData;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  isDetailed,
  articleData,
}) => {
  const {
    title,
    description,
    body,
    tagList,
    createdAt,
    updatedAt,
    favorited,
    favoritesCount,
    slug,
    author,
  } = articleData;

  const { isAuth } = useAuth();
  const { containerRef, isOverflowing } = useOverflowCheck({
    deps: [description],
    listenResize: true,
  });

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    if (isOverflowing) {
      setShowFullDescription(!showFullDescription);
    }
  };

  return (
    <article className={isDetailed ? styles.detailed : styles.compact}>
      <div className={styles.titleContainer}>
        <Link
          to={`/articles/${slug}`}
          className={styles.title}
          state={articleData}
          title={title}
        >
          {title}
        </Link>
        <button
          className={styles.likes}
          disabled={!isAuth}
          title={
            favorited ? "Добавлено в избранное" : "Не добавлено в избранное"
          }
        >
          {favoritesCount}
        </button>
      </div>
      <p
        className={`${styles.description} 
          ${isOverflowing && !showFullDescription ? styles.showMoreDescription : ""}`}
        ref={containerRef}
        onClick={toggleDescription}
        style={
          showFullDescription
            ? {
                WebkitLineClamp: "unset",
                maxHeight: "none",
                cursor: "pointer",
              }
            : {}
        }
      >
        {description}
      </p>
      <TagsContainer tagList={tagList} />
      <User
        user={author}
        variant="author"
        createdAt={createdAt}
        style={{ gridArea: "userInfo", height: "min-content" }}
      />
      {isDetailed && (
        <span className={styles.bodyText}>
          <MarkdownParser markdown={body} />
        </span>
      )}
    </article>
  );
};

export default ArticleCard;
