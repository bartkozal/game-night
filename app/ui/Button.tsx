import cx from "classnames";

type Props = {
  children: React.ReactNode;
  styleType?: "inline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  styleType,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={cx(
        "py-2",
        {
          " text-white rounded-xl px-4": styleType !== "inline",
          "bg-[#4A734A] shadow-md": !disabled && styleType !== "inline",
          "bg-gray-300": disabled && styleType !== "inline",
          "px-2": styleType === "inline",
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
