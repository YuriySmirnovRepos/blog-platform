import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import "./SignInForm.scss";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
      <h2>Sign In</h2>
      <input
        placeholder="Email address"
        type="email"
        {...register("email", { required: true })}
      />
      {errors.email && <span>Email is required</span>}

      <input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>Password is required</span>}

      <button type="submit">Login</button>
      <p>
        Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </form>
  );
};

export default SignInForm;
