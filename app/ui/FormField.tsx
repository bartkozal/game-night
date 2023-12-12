import { RegisterOptions, useFormContext } from "react-hook-form";

type Props = {
  type: "text";
  id: string;
  defaultValue?: string | number;
  options: RegisterOptions;
  label: string;
};

export default function FormField({
  type,
  id,
  defaultValue,
  options,
  label,
}: Props) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className="flex mb-2">
        {label}
      </label>

      <input
        className="text-gn-grey"
        type={type}
        id={id}
        defaultValue={defaultValue}
        {...register(id, options)}
      />
    </div>
  );
}
