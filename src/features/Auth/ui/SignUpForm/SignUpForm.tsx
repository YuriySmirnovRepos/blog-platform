import React from "react";
import { Link } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import {
  withForm,
  BaseFormData,
} from "@shared/components/HOC/withForm/withForm";
import { useRegisterMutation } from "@features/Auth/api/authSliceApi";

interface SignUpFormData extends BaseFormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreeToTerms: boolean;
}

interface SignUpFormProps {
  form: UseFormReturn<SignUpFormData>;
  title: string;
}

const SignUpFormContent: React.FC<SignUpFormProps> = ({ form }) => {
  const [registerMutationTrigger, { isLoading }] = useRegisterMutation();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = form;

  const handleButtonClick = (e: React.MouseEvent) => {
    const onSubmit = (data: SignUpFormData) => {
      registerMutationTrigger({
        user: {
          email: data.email,
          password: data.password,
          username: data.username,
        },
      })
        .unwrap()
        .then(() => {
          console.log("success");
        })
        .catch((err: any) => {
          if (err.data?.errors) {
            Object.keys(err.data.errors).forEach((key) => {
              setError(key as keyof SignUpFormData, {
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
        });
    };

    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <div className="form-group">
        <label>Username</label>
        <input
          disabled={isLoading}
          placeholder="Username"
          autoComplete="username"
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
          disabled={isLoading}
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
          disabled={isLoading}
          placeholder="Password"
          type="password"
          autoComplete="new-password"
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

      <div className="form-group">
        <label>Repeat Password</label>
        <input
          disabled={isLoading}
          placeholder="Repeat Password"
          type="password"
          autoComplete="new-password"
          {...register("repeatPassword", {
            required: "Please repeat your password",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
        />
        {errors.repeatPassword && (
          <span className="error-message">{errors.repeatPassword.message}</span>
        )}
      </div>

      <div className="form-group checkbox-group">
        <input
          disabled={isLoading}
          type="checkbox"
          {...register("agreeToTerms", {
            required: "You must agree to the terms",
          })}
        />
        <label>I agree to the processing of my personal information</label>
        {errors.agreeToTerms && (
          <span className="error-message">{errors.agreeToTerms.message}</span>
        )}
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="form-button"
        onClick={handleButtonClick}
      >
        Create
      </button>

      <p className="form-link">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </>
  );
};

export const SignUpForm = withForm<SignUpFormProps & { title: string }>(
  SignUpFormContent,
);
