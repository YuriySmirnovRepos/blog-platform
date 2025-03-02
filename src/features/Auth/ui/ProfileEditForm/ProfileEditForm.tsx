import React, { useImperativeHandle } from "react";
import {
  withForm,
  BaseFormData,
} from "@shared/components/HOC/withForm/withForm";
import { useUpdateUserMutation } from "../../api/authSliceApi";
import { useAuth } from "@features/Auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProfileFormData extends BaseFormData {
  username: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  image?: string;
}

const ProfileEditFormContent = React.forwardRef<
  { onFormSubmit: (data: ProfileFormData) => Promise<void> },
  { form: any }
>(({ form: { register, formState, setError } }, ref) => {
  const [updateUserMutationTrigger, { isLoading }] = useUpdateUserMutation();
  const { currentUser, updateUser, logout } = useAuth();
  const { errors } = formState;
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    onFormSubmit: async (data: ProfileFormData) => {
      try {
        // Создаем базовый объект user без password
        const userUpdate: Record<
          string,
          string | number | boolean | undefined
        > = {
          username: data.username,
          email: data.email,
          image: data.avatarUrl,
        };

        // Условно добавляем password только если оно существует и не пустое
        if (data.password && data.password.trim() !== "") {
          userUpdate.password = data.password;
        }

        const response = await updateUserMutationTrigger({
          user: userUpdate,
        }).unwrap();

        if (data.password) {
          logout();
          navigate("/sign-in");
        } else {
          updateUser(response.user);
        }
      } catch (err) {
        if (err.data?.errors) {
          Object.keys(err.data.errors).forEach((key) => {
            setError(key as keyof ProfileFormData, {
              type: "server",
              message: err.data.errors[key],
            });
          });
        } else {
          setError("root", {
            type: "server",
            message: err.data.message,
          });
        }
      }
    },
  }));

  return (
    <fieldset disabled={isLoading}>
      <div className="form-group">
        <label>Username</label>
        <input
          defaultValue={currentUser?.username}
          autoComplete="username"
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />
        {errors.username && (
          <span className="error-message">{errors.username.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          defaultValue={currentUser?.email}
          placeholder="Email address"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>New password</label>
        <input
          placeholder="New password"
          type="password"
          autoComplete="new-password"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Avatar image (url)</label>
        <input
          defaultValue={currentUser?.image}
          placeholder="Avatar image"
          autoComplete="url"
          {...register("avatarUrl", {
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: "Please enter a valid URL",
            },
          })}
        />
        {errors.avatarUrl && (
          <span className="error-message">{errors.avatarUrl.message}</span>
        )}
      </div>

      <button type="submit" className="form-button">
        Save
      </button>
    </fieldset>
  );
});

ProfileEditFormContent.displayName = "ProfileEditFormContent";

export const ProfileEditForm = withForm(ProfileEditFormContent);
