import { useAppSelector } from "../../../shared/hooks/redux";
import {
  selectCurrentUser,
  selectIsAuth,
  selectUserToken,
} from "@entities/User";
import { useAppDispatch } from "@shared/hooks/redux";
import { setCurrentUser, logoutUser } from "@entities/User";

/**
 * Хук для получения информации об авторизации пользователя
 * @returns Объект с данными о пользователе и статусе авторизации
 */
export const useAuth = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuth = useAppSelector(selectIsAuth);
  const token = useAppSelector(selectUserToken);
  const dispatch = useAppDispatch();

  const updateUser = (userData: CurrentUser) =>
    dispatch(setCurrentUser(userData));
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };

  return {
    currentUser,
    isAuth,
    token,
    updateUser,
    logout,
  };
};
