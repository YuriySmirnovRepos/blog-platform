import React from "react";
import {
  withForm,
  BaseFormData,
} from "@shared/components/HOC/withForm/withForm";

interface ProfileFormData extends BaseFormData {
  username: string;
  email: string;
  password?: string;
  avatarUrl: string;
}

const ProfileEditFormContent: React.FC<{ form: any }> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <div className="form-group">
        <label>Username</label>
        <input
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
          placeholder="Email address"
          type="email"
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
          placeholder="Avatar image"
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
    </>
  );
};

export const ProfileEditForm = withForm<ProfileFormData>(
  ProfileEditFormContent,
);
