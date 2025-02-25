import React from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import "./Form.scss";

export interface BaseFormData {
  email?: string;
  password?: string;
  username?: string;
}

interface FormProps {
  title: string;
  defaultValues?: Record<string, string | number | boolean>;
}

interface WithFormProps extends FormProps {
  form: UseFormReturn<any>;
}

export const withForm = <P extends WithFormProps>(
  WrappedComponent: React.ComponentType<P>,
  widthInVw = 29,
) => {
  const WithFormComponent = (props: FormProps) => {
    const { title, defaultValues, ...rest } = props;

    const form = useForm({
      defaultValues,
    });

    return (
      <form className={"base-form"} style={{ width: `${widthInVw}vw` }}>
        <h2>{title}</h2>
        <WrappedComponent {...(rest as P)} form={form} />
      </form>
    );
  };

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithFormComponent.displayName = `WithForm(${wrappedComponentName})`;

  return WithFormComponent;
};
