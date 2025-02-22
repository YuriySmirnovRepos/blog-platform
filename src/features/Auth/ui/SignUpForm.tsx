import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import "./SignUpForm.scss";

type FormData = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreeToTerms: boolean;
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <h2>Create new account</h2>
      <input
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {errors.username && <span>Username is required</span>}

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

      <input
        placeholder="Repeat Password"
        type="password"
        {...register("repeatPassword", { required: true })}
      />
      {errors.repeatPassword && <span>Repeat Password is required</span>}

      <div>
        <input
          type="checkbox"
          {...register("agreeToTerms", { required: true })}
        />
        <label>I agree to the processing of my personal information</label>
        {errors.agreeToTerms && <span>You must agree to the terms</span>}
      </div>

      <button type="submit">Create</button>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </form>
  );
};

export default SignUpForm;
