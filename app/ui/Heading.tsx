import cx from "classnames";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export default function Heading({ children, className, ...props }: Props) {
  return (
    <h3 className={cx("text-lg mb-4", className)} {...props}>
      {children}
    </h3>
  );
}
