// import styles from "./ProfilePage.module.scss";
import { ProfileEditForm } from "@features/Auth/ui/ProfileEditForm/ProfileEditForm";

export const ProfilePage = () => {
  return (
    <div style={{ paddingTop: 59 }}>
      <ProfileEditForm
        title="Edit Profile"
        defaultValues={{
          username: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        }}
      />
    </div>
  );
};

export default ProfilePage;
