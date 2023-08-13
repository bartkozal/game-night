import cx from "classnames";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export default function Heading({ children, className, ...props }: Props) {
  return (
    <h3 className={cx("text-lg", className ? className : "mb-4")} {...props}>
      {children}
    </h3>
  );
}
