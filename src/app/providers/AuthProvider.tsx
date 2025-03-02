// src/app/providers/AuthProvider/AuthProvider.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "@features/Auth/api/authSliceApi";
import { useAuth } from "@features/Auth/hooks/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { logout, updateUser } = useAuth();

  // Функция для проверки токена
  const checkToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    // Проверка срока действия токена
    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000; // переводим в миллисекунды

      if (Date.now() >= expirationTime) {
        // Токен истек
        localStorage.removeItem("token");
        return false;
      }

      return true;
    } catch (e) {
      // Если токен не в формате JWT или произошла ошибка при парсинге
      return true; // Считаем токен валидным и пусть API решает
    }
  };

  // Получение данных пользователя при наличии валидного токена
  const { data: userData, error } = useGetCurrentUserQuery(undefined, {
    skip: !checkToken(),
  });

  useEffect(() => {
    if (userData && userData.user) {
      updateUser(userData.user);
    } else if (error) {
      // Если API вернуло ошибку (например, токен недействителен)
      localStorage.removeItem("token");
      logout();
    }
  }, [userData, error, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
