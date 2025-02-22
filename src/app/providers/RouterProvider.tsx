import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import ArticlesListPage from "../../pages/ArticlesList/ArticlesListPage";
import ArticlePage from "../../pages/Article/ArticlePage";
import SignInPage from "../../pages/SignIn/SignInPage";
import SignUpPage from "../../pages/SignUp/SignUpPage";
import ProfilePage from "../../pages/Profile/ProfilePage";

const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ArticlesListPage />} />
          <Route path="articles/" element={<Navigate to="/" replace />} />
          <Route path="articles/:page" element={<ArticlesListPage />} />
          <Route path="article/:id" element={<ArticlePage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterProvider;
