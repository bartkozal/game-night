import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type Props<FormData extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<FormData>;
  onSubmit: SubmitHandler<FormData>;
};

export default function Form<FormData extends FieldValues>({
  children,
  methods,
  onSubmit,
}: Props<FormData>) {
  return (
    <FormProvider {...methods}>
      <form className="grid gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
