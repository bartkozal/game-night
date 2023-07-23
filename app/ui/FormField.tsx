type Props = {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
};

export default function FormField({ children, label, htmlFor }: Props) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex mb-2">
        {label}
      </label>

      {children}
    </div>
  );
}
