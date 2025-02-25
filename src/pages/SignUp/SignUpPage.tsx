import { SignUpForm } from "@features/Auth/ui/SignUpForm/SignUpForm";

export const SignUpPage = () => {
  return (
    <div style={{ paddingTop: 59 }}>
      <SignUpForm
        title="Sign Up"
        defaultValues={{
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
          agreeToTerms: false,
        }}
      />
    </div>
  );
};

export default SignUpPage;
