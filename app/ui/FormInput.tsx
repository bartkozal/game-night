import { RegisterOptions, useFormContext } from "react-hook-form";
import cx from "classnames";

type Props = {
  type: "text" | "number" | "datetime-local";
  id: string;
  label?: string;
  defaultValue?: string | number;
  validation?: RegisterOptions;
  inputClassName?: HTMLInputElement["className"];
  placeholder?: string;
};

export default function FormInput({
  type,
  id,
  defaultValue,
  validation,
  label,
  inputClassName,
  placeholder,
}: Props) {
  const { register } = useFormContext();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="flex mb-2">
          {label}
        </label>
      )}

      <input
        className={cx(
          "bg-[#0B0B0B] border-[#3A3A3A] rounded w-full",
          inputClassName
        )}
        type={type}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(id, validation)}
      />
    </div>
  );
}
