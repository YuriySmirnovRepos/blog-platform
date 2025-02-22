import React from "react";
import { useForm } from "react-hook-form";
// import "./ProfileEditForm.scss";

type ProfileFormData = {
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
};

const ProfileEditForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-edit-form">
      <h2>Edit Profile</h2>
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
        placeholder="New password"
        type="password"
        {...register("password")}
      />

      <input placeholder="Avatar image (url)" {...register("avatarUrl")} />

      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileEditForm;
