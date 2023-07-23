import cx from "classnames";

type Props = {
  children: React.ReactNode;
  styleType?: "inline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  styleType,
  ...props
}: Props) {
  return (
    <button
      className={cx(
        "py-2",
        {
          "bg-green-600 text-white rounded-xl px-4": styleType !== "inline",
          "px-2": styleType === "inline",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
