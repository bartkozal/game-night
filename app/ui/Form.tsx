type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLFormElement>;

export default function Form({ children, ...props }: Props) {
  return (
    <form className="grid gap-4" {...props}>
      {children}
    </form>
  );
}
