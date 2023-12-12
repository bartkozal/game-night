import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn;
  onSubmit: SubmitHandler<FieldValues>;
};

export default function Form({ children, methods, onSubmit }: Props) {
  return (
    <FormProvider {...methods}>
      <form className="grid gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
