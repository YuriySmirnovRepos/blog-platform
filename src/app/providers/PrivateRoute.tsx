import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@features/Auth/hooks/useAuth";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

/**
 * Компонент для защиты приватных маршрутов
 * Перенаправляет неавторизованных пользователей на страницу входа
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    // Сохраняем текущий путь для возврата после авторизации
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
