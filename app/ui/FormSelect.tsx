import { RegisterOptions, useFormContext } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  defaultValue?: string | number;
  validation?: RegisterOptions;
  options: [string, string][];
};

export default function FormSelect({
  id,
  defaultValue,
  validation,
  label,
  options,
}: Props) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className="flex mb-2">
        {label}
      </label>

      <select
        className="bg-ui-400 border-ui-100 rounded w-full"
        defaultValue={defaultValue}
        {...register(id, validation)}
      >
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
