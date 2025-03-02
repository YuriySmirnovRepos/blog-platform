import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import "./Form.scss";

export interface BaseFormData {
  email?: string;
  password?: string;
  username?: string;
}

interface FormProps {
  title: string;
  defaultValues?: Record<string, any>;
}

interface WithFormProps extends FormProps {
  form?: any;
  onFormSubmit?: (data: any) => Promise<void> | void;
}

// Интерфейс для компонентов с методом onFormSubmit
interface FormComponentRef<T = any> {
  onFormSubmit?: (data: T) => Promise<void> | void;
}

export const withForm = <P extends WithFormProps>(
  WrappedComponent: React.ComponentType<P>,
  widthInVw = 29,
) => {
  const WithFormComponent = (props: P) => {
    const { title, defaultValues, ...rest } = props;

    // Приведение типа defaultValues к требуемому типу для useForm
    const form = useForm({
      defaultValues: defaultValues as Record<string, string | number | boolean>,
    });

    const handleSubmit = form.handleSubmit(async (data) => {
      const wrappedComponentInstance = wrappedRef.current;
      if (wrappedComponentInstance?.onFormSubmit) {
        await wrappedComponentInstance.onFormSubmit(data);
      }
    });

    const wrappedRef = useRef<FormComponentRef<P>>(null);

    return (
      <form
        className={"base-form"}
        style={{ width: `${widthInVw}vw` }}
        onSubmit={handleSubmit}
      >
        <h2>{title}</h2>
        <WrappedComponent ref={wrappedRef} {...(rest as P)} form={form} />
      </form>
    );
  };

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithFormComponent.displayName = `WithForm(${wrappedComponentName})`;

  return WithFormComponent;
};
