import React, { useRef } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import "./Form.scss";

export interface BaseFormData {
  email?: string;
  password?: string;
  username?: string;
}

export interface FormProps {
  title: string;
  defaultValues?: Record<string, any>;
}

// Интерфейс для компонентов с методом onFormSubmit
interface FormComponentRef<T = any> {
  onFormSubmit?: (data: T) => Promise<void> | void;
}

export const withForm = <
  P extends { title: string; form?: UseFormReturn<any> },
>(
  WrappedComponent:
    | React.ForwardRefExoticComponent<
        P & React.RefAttributes<FormComponentRef<any>>
      >
    | React.ComponentType<P>,
  widthInVw = 29,
) => {
  const WithFormComponent = (props: Omit<P, "form">) => {
    const { title, defaultValues, ...rest } = props as FormProps &
      Omit<P, "form">;

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

    const wrappedRef = useRef<FormComponentRef<any>>(null);

    return (
      <form
        className={"base-form"}
        style={{ width: `${widthInVw}vw` }}
        onSubmit={handleSubmit}
      >
        <h2>{title}</h2>
        <WrappedComponent
          ref={wrappedRef}
          {...(rest as any)}
          form={form}
          title={title}
        />
      </form>
    );
  };

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithFormComponent.displayName = `WithForm(${wrappedComponentName})`;

  return WithFormComponent;
};
