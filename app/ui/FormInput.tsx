import { RegisterOptions, useFormContext } from "react-hook-form";

type Props = {
  type: "text" | "number" | "datetime-local";
  id: string;
  label: string;
  defaultValue?: string | number;
  validation?: RegisterOptions;
};

export default function FormInput({
  type,
  id,
  defaultValue,
  validation,
  label,
}: Props) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className="flex mb-2">
        {label}
      </label>

      <input
        className="bg-[#0B0B0B] border-[#3A3A3A] rounded"
        type={type}
        id={id}
        defaultValue={defaultValue}
        {...register(id, validation)}
      />
    </div>
  );
}
