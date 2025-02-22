import styles from "../ui/Article.module.scss";
import { ArticleProps } from "../model/types";
import { v4 as uuidv4 } from "uuid";
import User from "../../User/ui/User";
import { Link } from "react-router-dom";
import MarkdownParser from "@shared/components/MarkdownParser";

const Article: React.FC<ArticleProps> = ({ isDetailed, articleData }) => {
  const {
    title,
    body,
    description,
    createdAt,
    updatedAt,
    tagList,
    favoritesCount,
    favorited,
    author,
  } = articleData;

  const tagsJSX = tagList?.map((tag) => <span key={uuidv4()}>{tag}</span>);

  return (
    <article className={isDetailed ? styles.detailed : styles.compact}>
      <div className={styles.titleContainer}>
        <Link
          to={`/article/${articleData.slug}`}
          className={styles.title}
          state={{ articleData }}
        >
          {title}
        </Link>

        <button
          type="button"
          className={`${styles.likes} ${favorited ? styles["likes--liked"] : ""}`}
        >
          {favoritesCount}
        </button>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>{tagsJSX}</div>
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

export default Article;
