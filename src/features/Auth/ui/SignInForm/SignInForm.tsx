import React from "react";
import { Link } from "react-router-dom";
import {
  withForm,
  BaseFormData,
} from "@shared/components/HOC/withForm/withForm";
import { UseFormReturn } from "react-hook-form";

interface SignInFormData extends BaseFormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  form: UseFormReturn<SignInFormData>;
  title: string;
}

const SignInFormContent: React.FC<SignInFormProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <div className="form-group">
        <label>Email address</label>
        <input
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
        <label>Password</label>
        <input
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
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

      <button type="submit" className="form-button">
        Login
      </button>

      <p className="form-link">
        Don&apos;t have an account?<Link to="/sign-up">Sign Up</Link>
      </p>
    </>
  );
};

export const SignInForm = withForm<SignInFormProps & { title: string }>(
  SignInFormContent,
);
